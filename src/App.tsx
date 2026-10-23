/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  DirectorConfig,
  GeneratedPromptResult,
  RoomOption,
  StyleOption,
  ConditionOption,
  PromptFormatMode,
  WindowViewConfig,
  CharacterConfig,
  ImageReference,
} from './types/director';
import {
  ROOM_PRESETS,
  STYLE_PRESETS,
  CONDITION_PRESETS,
  WINDOW_VIEWS,
} from './data/spaceData';
import { generateDirectorPrompts } from './utils/promptGenerator';
import { Header } from './components/Header';
import { StepProgress } from './components/StepProgress';
import { Step1Location } from './components/Step1Location';
import { Step2Style } from './components/Step2Style';
import { Step3Condition } from './components/Step3Condition';
import { Step4Format } from './components/Step4Format';
import { PromptOutputView } from './components/PromptOutputView';
import { GeminiAiModal } from './components/GeminiAiModal';

const DEFAULT_CHARACTER: CharacterConfig = {
  gender: 'ผู้หญิง',
  ethnicity: 'เอเชีย (Young East Asian woman)',
  outfitColor: 'เอิร์ธโทน (Earth-tone: beige & muted cream)',
  outfitDetails: 'เสื้อยืดสีเบจและกางเกงผ้าลินินสีครีมเอิร์ธโทน',
  lockedOutfitText:
    'A graceful young East Asian woman dressed in a consistent earth-tone beige tee and muted cream linen trousers (wearing identical top and trousers throughout all scenes without changing clothing)',
};

export default function App() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 'output'>(1);
  const [maxReachedStep, setMaxReachedStep] = useState<number>(1);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isGeminiModalOpen, setIsGeminiModalOpen] = useState<boolean>(false);

  // Configuration state
  const [config, setConfig] = useState<DirectorConfig>({
    step: 1,
    selectedRoom: ROOM_PRESETS[0], // Home Office
    customRoomName: '',
    customRoomElements: '',
    selectedStyle: STYLE_PRESETS[0], // Cozy Industrial-Japandi
    customStyleDesc: '',
    selectedCondition: CONDITION_PRESETS[0], // Clean Empty Space
    customConditionDesc: '',
    windowView: WINDOW_VIEWS[0], // Rice Field View
    character: DEFAULT_CHARACTER,
    referenceImages: [],
    selectedFormat: 'format1',
  });

  // Generated Result state
  const [result, setResult] = useState<GeneratedPromptResult | null>(null);

  // Step navigation helpers
  const goToNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
      setMaxReachedStep((prev) => Math.max(prev, 2));
    } else if (currentStep === 2) {
      setCurrentStep(3);
      setMaxReachedStep((prev) => Math.max(prev, 3));
    } else if (currentStep === 3) {
      setCurrentStep(4);
      setMaxReachedStep((prev) => Math.max(prev, 4));
    }
  };

  const goToPrevStep = () => {
    if (currentStep === 2) setCurrentStep(1);
    else if (currentStep === 3) setCurrentStep(2);
    else if (currentStep === 4) setCurrentStep(3);
    else if (currentStep === 'output') setCurrentStep(4);
  };

  const navigateToStep = (stepNumber: 1 | 2 | 3 | 4) => {
    if (stepNumber <= maxReachedStep) {
      setCurrentStep(stepNumber);
    }
  };

  // Reset to Step 1 ("เมื่อสร้างพรอมท์เสร็จแล้ว ให้กลับไปเริ่มต้นใหม่ทุกครั้ง")
  const handleResetToStart = () => {
    setCurrentStep(1);
    setMaxReachedStep(1);
    setResult(null);
    setConfig({
      step: 1,
      selectedRoom: ROOM_PRESETS[0],
      customRoomName: '',
      customRoomElements: '',
      selectedStyle: STYLE_PRESETS[0],
      customStyleDesc: '',
      selectedCondition: CONDITION_PRESETS[0],
      customConditionDesc: '',
      windowView: WINDOW_VIEWS[0],
      character: DEFAULT_CHARACTER,
      referenceImages: [],
      selectedFormat: 'format1',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generation Handler
  const handleGenerate = async (useAiEnhance: boolean) => {
    setIsGenerating(true);

    try {
      // 1. Generate precision structured prompt result using local engine
      const baseResult = generateDirectorPrompts(config);

      // 2. If user requested Gemini AI polish, send request to server endpoint
      if (useAiEnhance) {
        try {
          const systemInstruction = `You are an expert AI Director and Google Flow Prompt Architect for room renovation & space makeover time-lapse videos using Veo3.
Refine the provided English video prompts and concept while strictly maintaining all rules:
1. Cozy Industrial-Japandi: Polished micro-cement walls, light oak wood floor, large glass window with green rice field view, minimalist wooden furniture and beige cream textiles.
2. Continuity rule: Keep the ⚠️ Use last frame anchor instruction.
3. Keep the Asian female character in identical earth-tone clothes throughout.
4. Keep the mandatory negative prompts.
Respond with insightful polish suggestions in JSON or clean markdown.`;

          const response = await fetch('/api/gemini/generate-prompt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              prompt: `Please review and enhance this makeover prompt set for ${config.selectedRoom.nameEn} in ${config.selectedStyle.nameEn} style:\n${JSON.stringify(baseResult, null, 2)}`,
              systemInstruction,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            if (data.text) {
              baseResult.conceptOverview.cozyConcept += ` [AI Director Note: ${data.text.slice(0, 180)}...]`;
            }
          }
        } catch (err) {
          console.warn('Gemini AI polish unavailable, using built-in prompt architecture engine:', err);
        }
      }

      setResult(baseResult);
      setCurrentStep('output');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Failed to generate prompts:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* Top Header */}
      <Header
        onReset={handleResetToStart}
        currentStep={currentStep}
        onOpenGeminiAi={() => setIsGeminiModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Step Progress Bar */}
        <StepProgress
          currentStep={currentStep}
          onNavigateStep={navigateToStep}
          maxReachedStep={maxReachedStep}
        />

        {/* Step 1: Location */}
        {currentStep === 1 && (
          <Step1Location
            selectedRoom={config.selectedRoom}
            customRoomName={config.customRoomName}
            customRoomElements={config.customRoomElements}
            onSelectRoom={(room, customName, customElements) =>
              setConfig((prev) => ({
                ...prev,
                selectedRoom: room,
                customRoomName: customName || '',
                customRoomElements: customElements || '',
              }))
            }
            onNext={goToNextStep}
          />
        )}

        {/* Step 2: Style */}
        {currentStep === 2 && (
          <Step2Style
            selectedStyle={config.selectedStyle}
            customStyleDesc={config.customStyleDesc}
            onSelectStyle={(style, customDesc) =>
              setConfig((prev) => ({
                ...prev,
                selectedStyle: style,
                customStyleDesc: customDesc || '',
              }))
            }
            onNext={goToNextStep}
            onPrev={goToPrevStep}
          />
        )}

        {/* Step 3: Condition & Anchor Elements */}
        {currentStep === 3 && (
          <Step3Condition
            selectedCondition={config.selectedCondition}
            windowView={config.windowView}
            character={config.character}
            referenceImages={config.referenceImages}
            onSelectCondition={(cond) =>
              setConfig((prev) => ({ ...prev, selectedCondition: cond }))
            }
            onChangeWindowView={(wView) =>
              setConfig((prev) => ({ ...prev, windowView: wView }))
            }
            onChangeCharacter={(char) =>
              setConfig((prev) => ({ ...prev, character: char }))
            }
            onChangeReferenceImages={(refs) =>
              setConfig((prev) => ({ ...prev, referenceImages: refs }))
            }
            onNext={goToNextStep}
            onPrev={goToPrevStep}
          />
        )}

        {/* Step 4: Prompt Format & Generation */}
        {currentStep === 4 && (
          <Step4Format
            selectedFormat={config.selectedFormat}
            onSelectFormat={(formatMode: PromptFormatMode) =>
              setConfig((prev) => ({ ...prev, selectedFormat: formatMode }))
            }
            onGenerate={handleGenerate}
            onPrev={goToPrevStep}
            isGenerating={isGenerating}
          />
        )}

        {/* Output View: Complete 6-section Response */}
        {currentStep === 'output' && result && (
          <PromptOutputView
            result={result}
            config={config}
            onReset={handleResetToStart}
            onEdit={() => setCurrentStep(4)}
          />
        )}
      </main>

      {/* Floating Gemini AI Co-Pilot Button */}
      <button
        onClick={() => setIsGeminiModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-400 to-amber-500 hover:from-amber-400 hover:to-emerald-300 text-stone-950 font-black text-xs sm:text-sm shadow-2xl shadow-emerald-950/60 border border-emerald-300/40 transition-all hover:scale-105 cursor-pointer"
        title="ปรึกษาหรือสั่งงานกับ Gemini AI Director"
      >
        <span className="w-2 h-2 rounded-full bg-stone-950 animate-ping" />
        <span>ถาม / สั่งงาน Gemini AI</span>
      </button>

      {/* Gemini AI Modal */}
      <GeminiAiModal
        isOpen={isGeminiModalOpen}
        onClose={() => setIsGeminiModalOpen(false)}
        config={config}
      />

      {/* Footer */}
      <footer className="border-t border-stone-800 bg-stone-900/40 text-stone-400 py-6 text-center text-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            Google Flow Space Makeover AI Director • ออกแบบตามกฎเหล็กความต่อเนื่องระดับ Veo3-Quality
          </p>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Aspect Ratio: 9:16</span>
            <span>Duration: 10s per Scene</span>
            <span>Audio AI / ASMR Cues</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
