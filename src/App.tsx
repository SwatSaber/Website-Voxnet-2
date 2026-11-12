import { useState } from 'react';
import { ClientLogosSection } from './components/ClientLogosSection';
import { CompetitiveEdgeSection } from './components/CompetitiveEdgeSection';
import { ConsultationSection } from './components/ConsultationSection';
import { CredibilitySection } from './components/CredibilitySection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ProblemSection } from './components/ProblemSection';
import { SolutionsSection } from './components/SolutionsSection';
import { UseCasesSection } from './components/UseCasesSection';
import { SizingRecommendation } from './utils/consultationLogic';

export default function App() {
  const [prefillNeed, setPrefillNeed] = useState<string | undefined>(undefined);
  const [prefillNotes, setPrefillNotes] = useState<string | undefined>(undefined);

  const scrollToConsultation = () => {
    const target = document.getElementById('konsultasi');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      const firstInput = document.getElementById('consult-fullName');
      if (firstInput instanceof HTMLInputElement) {
        setTimeout(() => firstInput.focus({ preventScroll: true }), 450);
      }
    }
  };

  const handleSelectSolutionForConsultation = (solutionTitle: string) => {
    setPrefillNeed(solutionTitle);
    setPrefillNotes(`Ingin berdiskusi mengenai implementasi ${solutionTitle} untuk perusahaan kami.`);
    scrollToConsultation();
  };

  const handleApplyConfiguration = (
    summary: string,
    sectorLabel: string,
    _rec: SizingRecommendation
  ) => {
    const mappedNeed =
      sectorLabel === 'Call Center & BPO'
        ? 'Solusi Call Center & BPO'
        : sectorLabel === 'Perusahaan SaaS & Voice AI'
          ? 'Terminasi Voice AI & SaaS'
          : 'SIP Trunk Berkapasitas Tinggi';
    setPrefillNeed(mappedNeed);
    setPrefillNotes(`[${sectorLabel}] ${summary}`);
    scrollToConsultation();
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] flex flex-col">
      <Navbar onConsultClick={scrollToConsultation} />

      <main className="flex-1">
        <HeroSection onScheduleClick={scrollToConsultation} />
        <ClientLogosSection onExploreSolutions={scrollToConsultation} />
        <ProblemSection />
        <SolutionsSection onSelectSolutionForConsultation={handleSelectSolutionForConsultation} />
        <CompetitiveEdgeSection />
        <UseCasesSection onApplyConfiguration={handleApplyConfiguration} />
        <CredibilitySection />
        <ConsultationSection prefillNeed={prefillNeed} prefillNotes={prefillNotes} />
      </main>

      <Footer />
    </div>
  );
}

