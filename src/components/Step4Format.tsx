import React, { useState } from 'react';
import { PromptFormatMode } from '../types/director';
import { FORMAT_PRESETS } from '../data/spaceData';
import {
  Sliders,
  Check,
  Sparkles,
  ArrowLeft,
  Wand2,
  Film,
  Zap,
  Clock,
  Volume2,
  Play,
  RotateCcw,
} from 'lucide-react';

interface Step4FormatProps {
  selectedFormat: PromptFormatMode;
  onSelectFormat: (format: PromptFormatMode) => void;
  onGenerate: (useAiEnhance: boolean) => void;
  onPrev: () => void;
  isGenerating: boolean;
}

export const Step4Format: React.FC<Step4FormatProps> = ({
  selectedFormat,
  onSelectFormat,
  onGenerate,
  onPrev,
  isGenerating,
}) => {
  const [useAiEnhance, setUseAiEnhance] = useState<boolean>(true);

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 sm:p-6 shadow-md backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800/80 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-2">
              ขั้นตอนที่ 4 จาก 4
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              เลือกรูปแบบการเขียนพรอมต์ &amp; สร้างผลงาน (Format &amp; Generate)
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mt-1">
              เลือกโหมดการควบคุมจังหวะเวลา (Timecode) มุมกล้อง และการจับคู่เสียง ASMR ตามที่ต้องการ
            </p>
          </div>

          <button
            onClick={onPrev}
            className="self-start sm:self-auto flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>ย้อนกลับ</span>
          </button>
        </div>
      </div>

      {/* 3 Formats Cards */}
      <div className="space-y-4">
        {FORMAT_PRESETS.map((fmt) => {
          const isSelected = selectedFormat === fmt.id;

          return (
            <div
              key={fmt.id}
              onClick={() => onSelectFormat(fmt.id)}
              className={`p-5 sm:p-6 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-stone-900/95 border-amber-500 ring-2 ring-amber-500/30 shadow-xl shadow-amber-950/30'
                  : 'bg-stone-900/50 border-stone-800 hover:border-stone-700 hover:bg-stone-900/80'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                      isSelected
                        ? 'bg-amber-500 text-stone-950'
                        : 'bg-stone-800 text-stone-300'
                    }`}
                  >
                    #{fmt.number}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-white">{fmt.nameTh}</h3>
                      <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-stone-800 text-stone-300 border border-stone-700">
                        {fmt.badge}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 font-medium">{fmt.nameEn}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  {isSelected && (
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-stone-950">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      เลือกโหมดนี้
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-300 mt-3 leading-relaxed">
                {fmt.descriptionTh}
              </p>

              {/* Structure Preview Box */}
              <div className="mt-3.5 p-3 rounded-xl bg-stone-950/70 border border-stone-800/80 text-xs space-y-1.5 font-mono">
                <div className="text-amber-400 font-semibold flex items-center gap-1.5 font-sans">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  โครงสร้างเวลาและการประมวลผล:
                </div>
                <div className="text-stone-300 text-[11px] leading-relaxed">
                  {fmt.structureSummary}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs">
                <span className="text-stone-400 text-[11px] flex items-center gap-1">
                  <Volume2 className="w-3.5 h-3.5 text-amber-500" />
                  {fmt.recommendedFor}
                </span>
                <span
                  className={`font-semibold text-xs ${
                    isSelected ? 'text-amber-400' : 'text-stone-400'
                  }`}
                >
                  {isSelected ? 'พร้อมสร้างคำสั่ง' : 'คลิกเพื่อเลือก'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Generation Options & Launch Button */}
      <div className="bg-gradient-to-br from-stone-900 to-stone-950 border border-amber-500/30 rounded-2xl p-6 shadow-2xl text-stone-200 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Film className="w-5 h-5 text-amber-400" />
              พร้อมสร้างชุดพรอมต์และสตอรี่บอร์ดแล้ว
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 mt-1">
              ระบบจะประมวลผลตามกฎเหล็ก 6 ข้อ คุมโทนภาพ และสร้างผลลัพธ์ครบ 6 ส่วนพร้อมนำไปใช้งานบน Google Flow ทันที
            </p>
          </div>

          {/* AI Polish toggle */}
          <label className="flex items-center gap-2.5 bg-emerald-950/40 hover:bg-emerald-950/60 p-2.5 px-3.5 rounded-xl border border-emerald-600/60 cursor-pointer transition select-none">
            <input
              type="checkbox"
              checked={useAiEnhance}
              onChange={(e) => setUseAiEnhance(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 bg-stone-900 border-stone-600"
            />
            <div className="text-xs">
              <span className="font-semibold text-emerald-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                เปิดใช้ Gemini AI (3.8 Flash) เชื่อมต่อ Google แล้ว
              </span>
              <span className="text-[10px] text-stone-300 block">
                ให้ AI ช่วยขัดเกลาคำศัพท์ภาษาอังกฤษและกำกับภาพยนตร์โดยอัตโนมัติ
              </span>
            </div>
          </label>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            disabled={isGenerating}
            onClick={() => onGenerate(useAiEnhance)}
            className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-black text-sm sm:text-base tracking-wide shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                <span>กำลังประมวลผลและสร้างพรอมต์...</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-stone-950" />
                <span>สร้างพรอมต์แปลงโฉมห้อง (Generate Prompts &amp; Storyboard)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
