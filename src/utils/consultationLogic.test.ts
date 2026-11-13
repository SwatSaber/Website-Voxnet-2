import test from 'node:test';
import assert from 'node:assert/strict';
import { COVERAGE_CITIES } from '../data/voxnetContent';
import {
  calculateInfrastructureRecommendation,
  filterCoverageCities,
  validateConsultationForm,
} from './consultationLogic';

test('calculateInfrastructureRecommendation scales concurrent SIP channels and returns active-active SBC for BPO', () => {
  const smallSaas = calculateInfrastructureRecommendation({
    sector: 'saas-ai',
    dailyCalls: 1500,
    pbxMode: 'cloud',
    numbering: 'local-22',
  });
  assert.ok(smallSaas.recommendedChannels >= 30);
  assert.equal(smallSaas.estimatedMonthlyMinutes, 115500);
  assert.equal(smallSaas.sbcTopology, 'Dual-Node High-Availability SBC');
  assert.match(smallSaas.summaryText, /Cloud PBX Multi-Region/);
  assert.equal(smallSaas.numberingLabel, 'Penomoran Lokal Resmi (22 Kota)');

  const enterpriseBpo = calculateInfrastructureRecommendation({
    sector: 'bpo',
    dailyCalls: 60000,
    pbxMode: 'hybrid',
    numbering: '1500',
  });
  assert.ok(enterpriseBpo.recommendedChannels > smallSaas.recommendedChannels);
  assert.equal(enterpriseBpo.estimatedMonthlyMinutes, 4620000);
  assert.equal(enterpriseBpo.sbcTopology, 'Active-Active Geo-Redundant SBC');
  assert.equal(enterpriseBpo.securityLayer, 'IP Whitelisting + Enkripsi TLS/SRTP + DLP Suara');
  assert.equal(enterpriseBpo.numberingLabel, 'Call Center Komdigi (140XY / 150XYZ / 1500XYZ)');
});

test('filterCoverageCities matches 22 Indonesian cities by region and area code', () => {
  assert.equal(COVERAGE_CITIES.length, 22);

  const surabaya = filterCoverageCities(COVERAGE_CITIES, 'Semua', '031');
  assert.equal(surabaya.length, 1);
  assert.equal(surabaya[0].city, 'Surabaya');

  const sumateraCities = filterCoverageCities(COVERAGE_CITIES, 'Sumatera', '');
  assert.equal(sumateraCities.length, 6);
  assert.ok(sumateraCities.some((item) => item.city === 'Medan' && item.areaCode === '061'));
});

test('validateConsultationForm rejects empty or malformed input and accepts valid enterprise details', () => {
  const invalid = validateConsultationForm({
    fullName: '',
    companyName: 'A',
    corporateEmail: 'bukan-email',
    phoneNumber: '123',
    primaryNeed: '',
    technicalNotes: '',
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.companyName);
  assert.ok(invalid.errors.corporateEmail);
  assert.ok(invalid.errors.phoneNumber);
  assert.ok(invalid.errors.primaryNeed);

  const valid = validateConsultationForm({
    fullName: 'Budi Santoso',
    companyName: 'PT Nusantara Contact Solutions',
    corporateEmail: 'budi.santoso@nusantarabpo.co.id',
    phoneNumber: '+62 812 8899 7766',
    primaryNeed: 'SIP Trunk & Interkoneksi SBC',
    technicalNotes: 'Butuh 300 kanal konkuren di Jakarta dan Surabaya',
  });
  assert.equal(valid.isValid, true);
  assert.deepEqual(valid.errors, {});
});

import {
  computeDesktopSideSpace,
  computeGoldenColumns,
  GOLDEN_SCALE,
  PHI,
} from './goldenRatio';

test('golden ratio spatial scale produces balanced 1440px desktop margins and 1.618 split', () => {
  assert.deepEqual(GOLDEN_SCALE, {
    micro: 6,
    xs: 10,
    base: 16,
    sm: 26,
    md: 42,
    lg: 68,
    xl: 110,
    xxl: 178,
  });

  const mobile390 = computeDesktopSideSpace(390);
  assert.equal(mobile390.innerPadding, 26);
  assert.equal(mobile390.usableContentWidth, 338);

  const laptop1024 = computeDesktopSideSpace(1024);
  assert.equal(laptop1024.innerPadding, 68);
  assert.equal(laptop1024.usableContentWidth, 888);

  const desktop1440 = computeDesktopSideSpace(1440);
  assert.equal(desktop1440.outerMargin, 0);
  assert.equal(desktop1440.innerPadding, 110);
  assert.equal(desktop1440.totalSideSpace, 110);
  assert.equal(desktop1440.usableContentWidth, 1220);

  const desktop1920 = computeDesktopSideSpace(1920);
  assert.equal(desktop1920.outerMargin, 210);
  assert.equal(desktop1920.innerPadding, 110);
  assert.equal(desktop1920.totalSideSpace, 320);
  assert.equal(desktop1920.usableContentWidth, 1280);

  const cols = computeGoldenColumns(desktop1440.usableContentWidth);
  assert.equal(cols.majorColumn, 728);
  assert.equal(cols.minorColumn, 450);
  assert.ok(Math.abs(cols.ratio - PHI) < 0.005);
});

import { filterCallCenterNumbers, getCallCenterFormatLabel } from './consultationLogic';

test('filterCallCenterNumbers filters by format sub-tab and query accurately', () => {
  const sampleData = {
    allNumbers: ['14027', '150103', '1500950', '1500951'],
    sample140: ['14027'],
    sample150: ['150103'],
    sample1500: ['1500950', '1500951'],
  };

  assert.equal(filterCallCenterNumbers(sampleData, 'all', '').length, 4);
  assert.deepEqual(filterCallCenterNumbers(sampleData, '140', ''), ['14027']);
  assert.deepEqual(filterCallCenterNumbers(sampleData, '1500', '951'), ['1500951']);
  assert.deepEqual(filterCallCenterNumbers(sampleData, 'all', '1501'), ['150103']);

  assert.equal(getCallCenterFormatLabel('14027'), '140XY');
  assert.equal(getCallCenterFormatLabel('150103'), '150XYZ');
  assert.equal(getCallCenterFormatLabel('1500950'), '1500XYZ');
});
