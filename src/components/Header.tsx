import React, { useState } from 'react';
import { Film, Sparkles, BookOpen, RotateCcw, Clapperboard, CheckCircle2, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
  currentStep: number | string;
  onOpenGeminiAi: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReset, currentStep, onOpenGeminiAi }) => {
  const [showGuide, setShowGuide] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-stone-900/90 backdrop-blur-md border-b border-stone-800 text-stone-100 px-4 lg:px-8 py-3.5 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-emerald-500 flex items-center justify-center shadow-md shadow-amber-900/30">
              <Clapperboard className="w-5 h-5 text-stone-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                  AI Director <span className="text-amber-400">&amp;</span> Google Flow Prompt Architect
                </h1>
                <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-800/80">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  Veo3-Quality Ready
                </span>
              </div>
              <p className="text-xs text-stone-400 hidden sm:block">
                ออกแบบพรอมต์วิดีโอสั้นแปลงโฉมห้อง รีโนเวท ไทม์แลปส์ พร้อม Audio AI / ASMR แม่นยำระดับวินาที
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Gemini AI Status & Assistant button */}
            <button
              onClick={onOpenGeminiAi}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-700/60 transition shadow-sm cursor-pointer"
              title="ใช้งาน Gemini AI Director ผ่าน Google Account"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Gemini AI (Google)</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-0.5" />
            </button>

            <button
              onClick={() => setShowGuide(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 transition cursor-pointer"
              title="คู่มือการใช้งานและกฎเหล็ก"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">คู่มือ</span>
            </button>

            {currentStep !== 1 && (
              <button
                onClick={onReset}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-800 hover:bg-amber-900/40 text-stone-300 hover:text-amber-200 border border-stone-700 hover:border-amber-700/60 transition cursor-pointer"
                title="เริ่มขั้นตอนใหม่ทั้งหมด"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">เริ่มต้นใหม่</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Guide Modal */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl text-stone-200 max-h-[85vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
                  <Film className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">คู่มือการใช้งาน Google Flow Prompt Director</h3>
                  <p className="text-xs text-stone-400">กฎเหล็กและเทคนิคการคุมมู้ดห้องแบบมืออาชีพ</p>
                </div>
              </div>
              <button
                onClick={() => setShowGuide(false)}
                className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="bg-amber-950/40 border border-amber-800/60 rounded-xl p-3.5 space-y-1.5">
                <h4 className="font-semibold text-amber-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  กฎเหล็ก 6 ข้อในการคุมความต่อเนื่องและมู้ดภาพ:
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-stone-300">
                  <li>
                    <strong className="text-stone-100">Cozy Industrial-Japandi:</strong> ผนังปูนเปลือยฉาบขัดมัน (Polished micro-cement), พื้นไม้โอ๊คอ่อน, หน้าต่างกระจกสไลด์บานใหญ่เห็นวิวทุ่งนาสีเขียว
                  </li>
                  <li>
                    <strong className="text-amber-300">Continuity Lock:</strong> บังคับใช้ฟีเจอร์ <strong>"Use last frame"</strong> ที่วินาทีที่ 10 เสมอก่อนรันซีนถัดไป เพื่อล็อกไม่ให้โครงสร้างห้องและวิวทุ่งนาสลับจุด
                  </li>
                  <li>
                    <strong className="text-stone-100">Human Interaction:</strong> ตัวละครหญิงเอเชีย สวมชุดเอิร์ธโทนเดิมตลอดทั้งคลิป ไม่เปลี่ยนชุด ทำกิจกรรมจริงทีละสเต็ป
                  </li>
                  <li>
                    <strong className="text-stone-100">Image Reference Focus:</strong> ท้ายคลิปกล้องจะ Close-up หรือ Tracking เจาะลึกความประณีตของของตกแต่ง
                  </li>
                  <li>
                    <strong className="text-stone-100">Image Reference Upload:</strong> รองรับการอัปโหลดมากกว่า 1 รูปเพื่อล็อกหน้าตา/เสื้อผ้า/เฟอร์นิเจอร์
                  </li>
                  <li>
                    <strong className="text-stone-100">Mandatory Negative Prompt:</strong> ต้องใส่กล่องข้อความลบทุกครั้งเพื่อป้องกันภาพเบี้ยวหรือสิ่งของลอย
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-stone-800/60 p-3 rounded-xl border border-stone-700/60">
                  <h5 className="font-semibold text-white text-xs mb-1">รูปแบบที่ 1 (Phase)</h5>
                  <p className="text-xs text-stone-400">
                    2 ซีนใหญ่ ซีนละ 10s ระบุเฟส [0-3s], [3-7s], [7-10s] คุมการเปลี่ยนแปลงเป็นสเต็ปยาว
                  </p>
                </div>
                <div className="bg-stone-800/60 p-3 rounded-xl border border-stone-700/60">
                  <h5 className="font-semibold text-white text-xs mb-1">รูปแบบที่ 2 (Jump Cut)</h5>
                  <p className="text-xs text-stone-400">
                    7 ช็อตสั้น (2-4s) สไตล์ Jump Cut Satisfying Makeover อัตราส่วน 9:16 กระชับฉับไว
                  </p>
                </div>
                <div className="bg-stone-800/60 p-3 rounded-xl border border-stone-700/60">
                  <h5 className="font-semibold text-white text-xs mb-1">รูปแบบที่ 3 (ASMR 20s)</h5>
                  <p className="text-xs text-stone-400">
                    20 ฉากย่อย ละเอียดระดับ 1s ต่อฉาก คุมทั้งการเคลื่อนไหวและจังหวะเสียง ASMR แม่นยำที่สุด
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-stone-800">
              <button
                onClick={() => setShowGuide(false)}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs rounded-xl transition"
              >
                เข้าใจแล้ว เริ่มใช้งาน
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
