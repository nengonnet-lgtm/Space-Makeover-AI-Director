import React from 'react';
import {
  ConditionOption,
  WindowViewConfig,
  CharacterConfig,
  ImageReference,
} from '../types/director';
import { CONDITION_PRESETS, WINDOW_VIEWS } from '../data/spaceData';
import { ImageReferenceManager } from './ImageReferenceManager';
import {
  Sparkles,
  Check,
  ArrowRight,
  ArrowLeft,
  User,
  ShieldCheck,
  Eye,
} from 'lucide-react';

interface Step3ConditionProps {
  selectedCondition: ConditionOption;
  windowView: WindowViewConfig;
  character: CharacterConfig;
  referenceImages: ImageReference[];
  onSelectCondition: (cond: ConditionOption) => void;
  onChangeWindowView: (view: WindowViewConfig) => void;
  onChangeCharacter: (char: CharacterConfig) => void;
  onChangeReferenceImages: (refs: ImageReference[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step3Condition: React.FC<Step3ConditionProps> = ({
  selectedCondition,
  windowView,
  character,
  referenceImages,
  onSelectCondition,
  onChangeWindowView,
  onChangeCharacter,
  onChangeReferenceImages,
  onNext,
  onPrev,
}) => {
  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 sm:p-6 shadow-md backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800/80 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-2">
              ขั้นตอนที่ 3 จาก 4
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              สภาพของสถานที่ &amp; รายละเอียดองค์ประกอบ (Condition &amp; Anchor)
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mt-1">
              กำหนดสภาพห้องเริ่มต้น วิวภายนอกหน้าต่าง และล็อกชุดตัวละครเพื่อความต่อเนื่อง
            </p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={onPrev}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>ย้อนกลับ</span>
            </button>
            <button
              onClick={onNext}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition cursor-pointer"
            >
              <span>ถัดไป: เลือกรูปแบบพรอมต์</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Condition 3 Presets */}
      <div>
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          1. เลือกสภาพเริ่มต้นของสถานที่ (Initial Condition):
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CONDITION_PRESETS.map((cond) => {
            const isSelected = selectedCondition.id === cond.id;

            return (
              <div
                key={cond.id}
                onClick={() => onSelectCondition(cond)}
                className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-stone-900/90 border-amber-500 ring-2 ring-amber-500/30 shadow-xl shadow-amber-950/30 -translate-y-0.5'
                    : 'bg-stone-900/50 border-stone-800 hover:border-stone-700 hover:bg-stone-900/80'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-white leading-snug">
                      {cond.titleTh}
                    </h4>
                    {isSelected && (
                      <span className="p-1 rounded-full bg-amber-500 text-stone-950 flex-shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-400 font-medium mt-0.5">{cond.titleEn}</p>

                  <p className="text-xs text-stone-300 mt-2.5 leading-relaxed">
                    {cond.descriptionTh}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-800/80 text-[11px]">
                  <span className="text-amber-400 font-medium block mb-0.5">การเตรียมพื้นที่ในคลิป:</span>
                  <span className="text-stone-400">{cond.cleanUpPhaseTh}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Window View Selection */}
      <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-bold text-white">2. วิวภายนอกหน้าต่างบานใหญ่ (Window Panorama):</h4>
          </div>
          <span className="text-[11px] text-amber-400 font-medium">ตามกฎข้อที่ 1 (Reference Mood)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {WINDOW_VIEWS.map((w) => {
            const isSelected = windowView.type === w.type;

            return (
              <div
                key={w.type}
                onClick={() => onChangeWindowView(w)}
                className={`p-3 rounded-xl border text-xs cursor-pointer transition ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500 text-amber-200'
                    : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-white">{w.labelTh}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                </div>
                <p className="text-[11px] line-clamp-2 text-stone-400">{w.descriptionEn}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Human Character Locking */}
      <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-bold text-white">
              3. ตัวละครที่ร่วมดำเนินกิจกรรม (Human Interaction &amp; Outfit Lock):
            </h4>
          </div>
          <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> กฎเหล็ก: เสื้อผ้าเดิมตลอดทั้งคลิป
          </span>
        </div>

        <div className="bg-stone-950/60 border border-stone-800/80 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div>
            <p className="font-semibold text-white">
              {character.gender} {character.ethnicity}
            </p>
            <p className="text-stone-400 mt-0.5">
              คำสั่งล็อกในพรอมต์:{' '}
              <span className="text-amber-300 font-mono text-[11px]">
                "{character.lockedOutfitText}"
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-stone-400 text-[11px]">โทนเสื้อผ้า:</span>
            <input
              type="text"
              value={character.outfitDetails}
              onChange={(e) =>
                onChangeCharacter({
                  ...character,
                  outfitDetails: e.target.value,
                  lockedOutfitText: `A graceful young East Asian woman dressed in a consistent ${e.target.value} (wearing identical top and trousers throughout all scenes without changing clothing)`,
                })
              }
              className="bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-amber-500 w-52"
              placeholder="เช่น beige tee and linen trousers"
            />
          </div>
        </div>
      </div>

      {/* Multi-Image Reference Uploader */}
      <ImageReferenceManager
        references={referenceImages}
        onChange={onChangeReferenceImages}
      />

      {/* Floating Bottom Bar */}
      <div className="flex items-center justify-between p-4 bg-stone-900/90 border border-stone-800 rounded-2xl shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
            3/4
          </div>
          <div>
            <p className="text-xs text-stone-400">สภาพเริ่มต้น:</p>
            <p className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>{selectedCondition.titleTh}</span>
              <span className="text-xs text-stone-400">| {windowView.labelTh.split(' ')[0]}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium transition cursor-pointer"
          >
            ย้อนกลับ
          </button>
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm shadow-md transition cursor-pointer"
          >
            <span>ถัดไป: เลือกรูปแบบพรอมต์</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
