import React, { useState, useEffect } from 'react';
import { StoryboardKeyframe } from '../types/director';
import { Play, Pause, RotateCcw, Volume2, Camera, ShieldAlert, Sparkles } from 'lucide-react';

interface InteractiveTimelineProps {
  keyframes: StoryboardKeyframe[];
  roomTitle: string;
}

export const InteractiveTimeline: React.FC<InteractiveTimelineProps> = ({
  keyframes,
  roomTitle,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev >= keyframes.length - 1) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, keyframes.length]);

  if (!keyframes || keyframes.length === 0) return null;

  const currentFrame = keyframes[currentIndex] || keyframes[0];
  const isLastFrameAnchor = currentFrame.useLastFrameAnchor;

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-4 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              Time-lapse Storyboard Simulator (จำลองไทม์ไลน์การแปลงโฉม)
            </h4>
            <p className="text-[11px] text-stone-400">
              กดเล่นเพื่อดูการเปลี่ยนแปลงตามรหัสเวลา (Timecode) และสัญญาณเสียง ASMR
            </p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>หยุดชั่วคราว</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-stone-950" />
                <span>เล่นไทม์แลปส์</span>
              </>
            )}
          </button>
          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentIndex(0);
            }}
            className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition"
            title="รีเซ็ตกลับไปวินาทีแรก"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Scrubber Stage */}
      <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 sm:p-5 relative overflow-hidden">
        {/* Subtle glow effect */}
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Keyframe Visual Badge */}
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono font-bold text-xs">
                {currentFrame.timecode}
              </span>
              <span className="text-sm font-bold text-white">
                {currentFrame.titleTh}
              </span>
              <span className="text-xs text-stone-400">
                ({currentFrame.titleEn})
              </span>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              {currentFrame.actionSummaryTh}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
              <span className="text-stone-400 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-stone-400" />
                <span>มุมกล้อง:</span>
                <strong className="text-stone-200">{currentFrame.cameraAngle}</strong>
              </span>

              <span className="text-amber-400/90 flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-amber-500" />
                <span>เสียง ASMR:</span>
                <span className="text-stone-300 italic">{currentFrame.asmrTarget}</span>
              </span>
            </div>
          </div>

          {/* Continuity Lock Anchor Alert */}
          {isLastFrameAnchor && (
            <div className="p-3 rounded-xl bg-amber-950/80 border border-amber-500/80 text-amber-200 text-xs flex items-center gap-2 shadow-lg animate-pulse">
              <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <strong className="block text-amber-300">⚠️ USE LAST FRAME ANCHOR</strong>
                <span>จุดต่อเชื่อมวินาทีที่ 10 ล็อกโครงสร้างก่อนเริ่มซีน 2</span>
              </div>
            </div>
          )}
        </div>

        {/* Scrubber step buttons */}
        <div className="mt-5 pt-3 border-t border-stone-800/80">
          <div className="flex items-center justify-between text-[11px] text-stone-400 mb-2">
            <span>วินาทีที่ 0.0</span>
            <span className="text-amber-400 font-semibold">
              เฟรม {currentIndex + 1} จาก {keyframes.length}
            </span>
            <span>วินาทีที่ 20.0</span>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-20 gap-1">
            {keyframes.map((kf, idx) => {
              const isSelected = idx === currentIndex;
              const isAnchor = kf.useLastFrameAnchor;

              return (
                <button
                  key={kf.id}
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentIndex(idx);
                  }}
                  className={`h-7 rounded text-[10px] font-mono font-medium transition cursor-pointer flex items-center justify-center relative ${
                    isSelected
                      ? 'bg-amber-500 text-stone-950 font-bold scale-105 shadow-md z-10'
                      : isAnchor
                      ? 'bg-amber-950 border border-amber-600 text-amber-300'
                      : 'bg-stone-800 hover:bg-stone-700 text-stone-400'
                  }`}
                  title={`${kf.timecode} - ${kf.titleTh}`}
                >
                  {idx + 1}
                  {isAnchor && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-stone-950" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
