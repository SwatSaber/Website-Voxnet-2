import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'src', 'data', 'komdigiCallCenterNumbers.json');

let isRefreshing = false;

function loadLocalData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      return {
        ...parsed,
        lastUpdated: parsed.lastUpdated || '12 November 2026, 08:03 WIB',
        source: 'Komdigi RI (Direktorat Telekomunikasi)',
      };
    }
  } catch (err) {
    console.error('Failed reading local data:', err);
  }
  return {
    total: 0,
    count140: 0,
    count150: 0,
    count1500: 0,
    sample140: [],
    sample150: [],
    sample1500: [],
    allNumbers: [],
    lastUpdated: '12 November 2026',
    source: 'Komdigi RI',
  };
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // 1. GET Current Numbers Data
  app.get('/api/komdigi-numbers', (_req: Request, res: Response) => {
    const data = loadLocalData();
    res.json({
      success: true,
      data,
      isRefreshing,
    });
  });

  // 2. POST Refresh Trigger (Called when user clicks "Refresh Data Komdigi")
  app.post('/api/komdigi-numbers/refresh', async (_req: Request, res: Response) => {
    if (isRefreshing) {
      return res.json({
        success: true,
        message: 'Proses sinkronisasi ke server Komdigi sedang berjalan...',
        isRefreshing: true,
      });
    }

    isRefreshing = true;

    // Run scraper in the background using playwright-cli
    const script = `
      SESSION="scrape_$RANDOM"
      playwright-cli -s=$SESSION open "https://dittel.komdigi.go.id/informasi/data-perizinan/data-alokasi-penomoran-telekomunikasi-tersedia.html" >/dev/null 2>&1
      sleep 3
      playwright-cli -s=$SESSION eval 'async () => {
        const select = document.querySelector("select[name=\\"kategoriDpjt\\"]");
        if (select) {
          select.value = "Kode Akses Pusat Panggilan Informasi (Call Center)";
          select.dispatchEvent(new Event("change", { bubbles: true }));
          await new Promise(r => setTimeout(r, 2500));
        }
        const lengthSelect = document.querySelector("select[name=\\"example_length\\"]");
        if (lengthSelect) {
          lengthSelect.value = "-1";
          lengthSelect.dispatchEvent(new Event("change", { bubbles: true }));
          await new Promise(r => setTimeout(r, 3500));
        }
        const rows = Array.from(document.querySelectorAll("table tbody tr")).map(tr => {
          const tds = Array.from(tr.querySelectorAll("td"));
          return tds[2] ? tds[2].innerText.trim() : "";
        }).filter(Boolean);

        return {
          total: rows.length,
          count140: rows.filter(r => r.startsWith("140")).length,
          count150: rows.filter(r => r.startsWith("150") && !r.startsWith("1500")).length,
          count1500: rows.filter(r => r.startsWith("1500")).length,
          sample140: rows.filter(r => r.startsWith("140")),
          sample150: rows.filter(r => r.startsWith("150") && !r.startsWith("1500")),
          sample1500: rows.filter(r => r.startsWith("1500")),
          allNumbers: rows,
          lastUpdated: new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }) + " WIB",
          source: "Direktorat Telekomunikasi Komdigi RI"
        };
      }' > /tmp/komdigi_live_raw.json 2>&1
      playwright-cli -s=$SESSION close >/dev/null 2>&1
    `;

    exec(script, (error) => {
      isRefreshing = false;
      if (!error && fs.existsSync('/tmp/komdigi_live_raw.json')) {
        try {
          const raw = fs.readFileSync('/tmp/komdigi_live_raw.json', 'utf-8');
          const marker = '### Ran Playwright code';
          const cutIdx = raw.indexOf(marker);
          const jsonStr = cutIdx !== -1 ? raw.slice(0, cutIdx) : raw;
          const s = jsonStr.indexOf('{');
          const e = jsonStr.lastIndexOf('}');
          if (s !== -1 && e !== -1) {
            const parsed = JSON.parse(jsonStr.slice(s, e + 1));
            if (parsed.total && parsed.total > 0) {
              fs.writeFileSync(DATA_FILE, JSON.stringify(parsed, null, 2));
              console.log('Successfully updated Komdigi data live! Total numbers:', parsed.total);
            }
          }
        } catch (e) {
          console.error('Error parsing live Komdigi response:', e);
        }
      }
    });

    return res.json({
      success: true,
      message: 'Sinkronisasi langsung dengan server Komdigi dimulai. Silakan tunggu beberapa detik.',
      isRefreshing: true,
    });
  });

  // 3. Mount Vite middlewares in development
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Voxnet Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
