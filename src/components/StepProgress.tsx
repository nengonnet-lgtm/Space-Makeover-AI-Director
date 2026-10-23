import React from 'react';
import { Check, MapPin, Palette, Sparkles, Sliders, FileText } from 'lucide-react';

interface StepProgressProps {
  currentStep: number | 'output';
  onNavigateStep: (step: 1 | 2 | 3 | 4) => void;
  maxReachedStep: number;
}

export const StepProgress: React.FC<StepProgressProps> = ({
  currentStep,
  onNavigateStep,
  maxReachedStep,
}) => {
  const steps = [
    { number: 1, label: 'สถานที่', subLabel: 'Location', icon: MapPin },
    { number: 2, label: 'สไตล์ภาพรวม', subLabel: 'Style', icon: Palette },
    { number: 3, label: 'สภาพสถานที่', subLabel: 'Condition', icon: Sparkles },
    { number: 4, label: 'รูปแบบพรอมต์', subLabel: 'Format Mode', icon: Sliders },
  ];

  const currentNumericStep = currentStep === 'output' ? 5 : (currentStep as number);

  return (
    <div className="w-full bg-stone-900/60 border border-stone-800 rounded-2xl p-3 sm:p-4 shadow-sm backdrop-blur-sm">
      <div className="flex items-center justify-between relative max-w-4xl mx-auto">
        {/* Background track line */}
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-stone-800 -z-0" />

        {/* Progress highlight line */}
        <div
          className="absolute left-6 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-300 -z-0"
          style={{
            width: `${Math.min(100, Math.max(0, ((currentNumericStep - 1) / (steps.length - 1)) * 100))}%`,
          }}
        />

        {steps.map((st) => {
          const isCompleted = currentNumericStep > st.number;
          const isCurrent = currentNumericStep === st.number;
          const isAccessible = st.number <= maxReachedStep;
          const Icon = st.icon;

          return (
            <button
              key={st.number}
              disabled={!isAccessible}
              onClick={() => isAccessible && onNavigateStep(st.number as 1 | 2 | 3 | 4)}
              className={`relative z-10 flex flex-col items-center group transition focus:outline-none ${
                !isAccessible ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
              }`}
            >
              <div
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-200 border ${
                  isCompleted
                    ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md shadow-amber-500/20'
                    : isCurrent
                    ? 'bg-stone-950 text-amber-400 border-amber-500 ring-2 ring-amber-500/30 shadow-lg scale-105'
                    : 'bg-stone-800 text-stone-400 border-stone-700 group-hover:border-stone-600 group-hover:text-stone-300'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : <Icon className="w-4 h-4" />}
              </div>
              <span
                className={`mt-1.5 text-xs font-medium tracking-tight text-center transition ${
                  isCurrent ? 'text-amber-400 font-semibold' : isCompleted ? 'text-stone-200' : 'text-stone-400'
                }`}
              >
                {st.number}. {st.label}
              </span>
              <span className="hidden sm:block text-[10px] text-stone-400">{st.subLabel}</span>
            </button>
          );
        })}

        {/* 5th Node: Output */}
        <div
          className={`relative z-10 flex flex-col items-center ${
            currentNumericStep === 5 ? 'cursor-default' : 'opacity-40'
          }`}
        >
          <div
            className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm border transition ${
              currentNumericStep === 5
                ? 'bg-emerald-500 text-stone-950 border-emerald-400 shadow-md shadow-emerald-500/20 ring-2 ring-emerald-500/30'
                : 'bg-stone-800 text-stone-400 border-stone-700'
            }`}
          >
            <FileText className="w-4 h-4" />
          </div>
          <span
            className={`mt-1.5 text-xs font-medium ${
              currentNumericStep === 5 ? 'text-emerald-400 font-semibold' : 'text-stone-400'
            }`}
          >
            5. พรอมต์ผลลัพธ์
          </span>
          <span className="hidden sm:block text-[10px] text-stone-400">Results</span>
        </div>
      </div>
    </div>
  );
};
