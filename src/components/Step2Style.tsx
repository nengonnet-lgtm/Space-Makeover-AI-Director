import React, { useState } from 'react';
import { StyleOption } from '../types/director';
import { STYLE_PRESETS } from '../data/spaceData';
import {
  Palette,
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Layers,
  SunMedium,
  CheckCircle2,
  Crown,
} from 'lucide-react';

interface Step2StyleProps {
  selectedStyle: StyleOption;
  customStyleDesc?: string;
  onSelectStyle: (style: StyleOption, customDesc?: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step2Style: React.FC<Step2StyleProps> = ({
  selectedStyle,
  customStyleDesc = '',
  onSelectStyle,
  onNext,
  onPrev,
}) => {
  const [isCustom, setIsCustom] = useState<boolean>(selectedStyle.id === 'custom');
  const [customName, setCustomName] = useState<string>(
    selectedStyle.id === 'custom' ? selectedStyle.nameTh : ''
  );
  const [customDetails, setCustomDetails] = useState<string>(customStyleDesc);

  const handleSelectPreset = (style: StyleOption) => {
    setIsCustom(false);
    onSelectStyle(style);
  };

  const handleApplyCustom = () => {
    if (!customName.trim()) return;

    const custom: StyleOption = {
      id: 'custom',
      nameTh: customName.trim(),
      nameEn: customName.trim(),
      description: customDetails.trim() || 'สไตล์ตกแต่งเฉพาะที่กำหนดโดยผู้ใช้',
      wallTexture: 'ผนังตกแต่งตามสั่ง (Custom Wall Texture)',
      floorTexture: 'พื้นผิววัสดุตามสั่ง (Custom Floor Surface)',
      colorPalette: ['#A89F91', '#4A4036', '#E6DFD5', '#D2B48C'],
      furnitureTraits: 'เฟอร์นิเจอร์ดีไซน์เฉพาะตัว สอดรับกับแนวคิดที่กำหนด',
      lightingMood: 'แสงไฟโทนอบอุ่นและแสงธรรมชาติสมดุล',
    };

    setIsCustom(true);
    onSelectStyle(custom, customDetails);
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 sm:p-6 shadow-md backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800/80 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-2">
              ขั้นตอนที่ 2 จาก 4
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              เลือกหรือระบุสไตล์ภาพรวม (Style Selection)
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mt-1">
              กำหนดแนวคิด ดีไซน์ ผิวสัมผัสผนัง-พื้น และอุณหภูมิแสงให้เป็นเอกลักษณ์ตามที่คุณต้องการ
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
              <span>ถัดไป: สภาพสถานที่</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Highlight Reference Banner */}
        <div className="mt-4 p-3.5 bg-amber-950/30 border border-amber-800/60 rounded-xl flex items-start gap-3">
          <div className="p-1.5 bg-amber-500/20 text-amber-400 rounded-lg mt-0.5">
            <Crown className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <span className="font-bold text-amber-300">
              💡 แนะนำสไตล์ยอดนิยมตาม Reference: Cozy Industrial-Japandi
            </span>
            <p className="text-stone-300 mt-0.5">
              การผสานผนังปูนเปลือยฉาบขัดมัน (Polished micro-cement) + พื้นไม้ลามิเนตสีโอ๊คอ่อน +
              หน้าต่างกระจกสไลด์มองเห็นวิวธรรมชาติสีเขียว/ทุ่งนา สร้างผลงานวิดีโอที่มียอดการดูซ้ำสูงสุด!
            </p>
          </div>
        </div>
      </div>

      {/* Style Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {STYLE_PRESETS.map((st) => {
          const isSelected = selectedStyle.id === st.id && !isCustom;
          const isSignature = st.id === 'cozy-japandi-loft';

          return (
            <div
              key={st.id}
              onClick={() => handleSelectPreset(st)}
              className={`relative p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-stone-900/90 border-amber-500 ring-2 ring-amber-500/30 shadow-xl shadow-amber-950/30 -translate-y-0.5'
                  : 'bg-stone-900/50 border-stone-800 hover:border-stone-700 hover:bg-stone-900/80'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        {st.nameTh}
                      </h3>
                      {isSignature && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-400 font-medium">{st.nameEn}</p>
                  </div>
                  {isSelected && (
                    <span className="p-1 rounded-full bg-amber-500 text-stone-950">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  )}
                </div>

                <p className="text-xs text-stone-300 mt-2.5 leading-relaxed">
                  {st.description}
                </p>

                {/* Color Palette Preview */}
                <div className="mt-3.5 flex items-center gap-1.5">
                  <span className="text-[10px] font-medium text-stone-400 mr-1">จานสี:</span>
                  {st.colorPalette.map((color, cIdx) => (
                    <div
                      key={cIdx}
                      className="w-5 h-5 rounded-md border border-stone-700 shadow-sm"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>

                {/* Detail Specifications */}
                <div className="mt-3 pt-3 border-t border-stone-800 space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <Layers className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-stone-400 text-[11px] block">ผิวสัมผัสผนัง &amp; พื้น:</span>
                      <span className="text-stone-200 text-[11px] font-medium">
                        {st.wallTexture} / {st.floorTexture}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <SunMedium className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-stone-400 text-[11px] block">แสงและบรรยากาศ:</span>
                      <span className="text-stone-200 text-[11px] font-medium">
                        {st.lightingMood}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs">
                <span className="text-stone-400 text-[11px]">{st.furnitureTraits.slice(0, 45)}...</span>
                <span
                  className={`font-semibold text-[11px] ${
                    isSelected ? 'text-amber-400' : 'text-stone-400'
                  }`}
                >
                  {isSelected ? 'เลือกแล้ว ✓' : 'คลิกเพื่อเลือก'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Style Accordion / Card */}
      <div className="bg-stone-900/60 border border-stone-800 rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white">ต้องการกำหนดสไตล์เองหรือไม่? (Custom Style)</h4>
            <p className="text-xs text-stone-400">
              เช่น Modern Luxury คอนโดหรูหรา, Minimalist Scandinavian สีพาสเทล, หรือ Rustic Farmhouse
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsCustom(!isCustom)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
              isCustom
                ? 'bg-amber-500 text-stone-950 border-amber-400'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-300 border-stone-700'
            }`}
          >
            {isCustom ? 'โหมดกำหนดเองเปิดอยู่' : '+ ระบุสไตล์เอง'}
          </button>
        </div>

        {isCustom && (
          <div className="mt-4 pt-4 border-t border-stone-800 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                ชื่อสไตล์ (เช่น Modern Earthy Luxury):
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="ชื่อสไตล์..."
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                คำอธิบายวัสดุและมู้ดโทน:
              </label>
              <textarea
                rows={2}
                value={customDetails}
                onChange={(e) => setCustomDetails(e.target.value)}
                placeholder="ระบุ เช่น หินอ่อนสีดำ ผนังไม้ระแนงสีวอลนัท โคมไฟคริสตัล..."
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <button
              type="button"
              onClick={handleApplyCustom}
              disabled={!customName.trim()}
              className="py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-stone-800 disabled:text-stone-600 text-stone-950 font-bold text-xs transition cursor-pointer"
            >
              บันทึกสไตล์กำหนดเอง
            </button>
          </div>
        )}
      </div>

      {/* Floating Bottom Bar */}
      <div className="flex items-center justify-between p-4 bg-stone-900/90 border border-stone-800 rounded-2xl shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
            2/4
          </div>
          <div>
            <p className="text-xs text-stone-400">สไตล์ที่เลือกในปัจจุบัน:</p>
            <p className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>{isCustom ? customName || 'สไตล์กำหนดเอง' : selectedStyle.nameTh}</span>
              <span className="text-xs text-amber-400">
                ({isCustom ? 'Custom' : selectedStyle.nameEn})
              </span>
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
            <span>ถัดไป: สภาพสถานที่</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
