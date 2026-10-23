import React, { useState } from 'react';
import { GeneratedPromptResult, DirectorConfig } from '../types/director';
import { InteractiveTimeline } from './InteractiveTimeline';
import {
  Copy,
  Check,
  RotateCcw,
  Download,
  Share2,
  Sparkles,
  ShieldAlert,
  Volume2,
  Camera,
  Film,
  Layers,
  FileText,
  Sliders,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface PromptOutputViewProps {
  result: GeneratedPromptResult;
  config: DirectorConfig;
  onReset: () => void;
  onEdit: () => void;
}

export const PromptOutputView: React.FC<PromptOutputViewProps> = ({
  result,
  config,
  onReset,
  onEdit,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<'all' | 'prompts' | 'workflow' | 'storyboard' | 'captions'>('all');

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const handleDownload = (format: 'markdown' | 'txt') => {
    let content = `# AI Director & Google Flow Prompt Architecture\n`;
    content += `Room: ${config.selectedRoom.nameTh} (${config.selectedRoom.nameEn})\n`;
    content += `Style: ${config.selectedStyle.nameTh} (${config.selectedStyle.nameEn})\n`;
    content += `Condition: ${config.selectedCondition.titleTh}\n\n`;

    content += `## 1. CONCEPT OVERVIEW\n${JSON.stringify(result.conceptOverview, null, 2)}\n\n`;
    content += `## 2. GOOGLE FLOW GENERATION PROMPTS\n`;
    if (result.googleFlowPrompts.scenes) {
      result.googleFlowPrompts.scenes.forEach((sc) => {
        content += `### ${sc.sceneTitle} (${sc.duration})\n`;
        if (sc.continuityWarning) content += `${sc.continuityWarning}\n`;
        content += `Prompt:\n${sc.promptText}\n\n`;
        content += `Negative Prompt:\n${sc.negativePrompt}\n\n`;
        content += `ASMR Audio Target:\n${sc.asmrAudioTarget}\n\n`;
      });
    }
    if (result.googleFlowPrompts.shots) {
      result.googleFlowPrompts.shots.forEach((sh) => {
        content += `### ${sh.shotNameTh} (${sh.cameraType} - ${sh.duration})\n`;
        content += `Prompt:\n${sh.promptText}\n\n`;
        content += `Negative Prompt:\n${sh.negativePrompt}\n\n`;
        content += `ASMR Audio Target:\n${sh.asmrAudioTarget}\n\n`;
      });
    }

    content += `## 3. STEP-BY-STEP WORKFLOW IN GOOGLE FLOW\n`;
    result.stepByStepWorkflow.forEach((st) => {
      content += `Step ${st.stepNumber}: ${st.titleTh}\n${st.actionDetail}\nContinuity: ${st.continuityTips}\n\n`;
    });

    content += `## 4. EDITING & ENGAGEMENT TIPS\n`;
    result.editingAndEngagementTips.forEach((tip) => {
      content += `- ${tip.tipTitle}: ${tip.tipDetail}\n  Hook: ${tip.viralHookIdea}\n\n`;
    });

    content += `## 5. CAPTIONS & HASHTAGS\n`;
    content += `Hook (TH): ${result.captionsAndHashtags.hookTh}\nCaption (TH): ${result.captionsAndHashtags.captionTh}\nHashtags (TH): ${result.captionsAndHashtags.hashtagsTh.join(' ')}\n\n`;
    content += `Hook (EN): ${result.captionsAndHashtags.hookEn}\nCaption (EN): ${result.captionsAndHashtags.captionEn}\nHashtags (EN): ${result.captionsAndHashtags.hashtagsEn.join(' ')}\n\n`;

    content += `## 6. STORYBOARD IMAGE PROMPTS (9:16)\n`;
    result.storyboardPrompts.storyboardImages.forEach((sb, idx) => {
      content += `### ${sb.imageTitle}\nPrompt:\n${sb.storyboardImagePrompt}\n\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `google-flow-director-${config.selectedRoom.id}.${format === 'markdown' ? 'md' : 'txt'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Flatten keyframes for timeline simulator
  const allKeyframes = result.storyboardPrompts.storyboardImages.flatMap((img) => img.keyframes);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner with Action Buttons */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-900 to-amber-950/40 border border-stone-800 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                <Check className="w-3 h-3 stroke-[3]" /> สร้างเสร็จสมบูรณ์ พร้อมใช้งาน
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-stone-800 text-stone-300">
                {result.googleFlowPrompts.formatTitle.split(' ')[2] || 'Format Ready'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              ชุดคำสั่งกำกับวิดีโอ &amp; สตอรี่บอร์ด Google Flow / Veo3
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mt-1">
              {config.selectedRoom.nameTh} • สไตล์ {config.selectedStyle.nameTh} • สภาพเริ่มต้น: {config.selectedCondition.titleTh}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => copyToClipboard(JSON.stringify(result, null, 2), 'copy-all-json')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium border border-stone-700 transition cursor-pointer"
            >
              {copiedKey === 'copy-all-json' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'copy-all-json' ? 'คัดลอก JSON แล้ว!' : 'คัดลอก JSON'}</span>
            </button>

            <button
              onClick={() => handleDownload('markdown')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium border border-stone-700 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>ดาวน์โหลด .MD</span>
            </button>

            <button
              onClick={onEdit}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-amber-900/30 text-stone-300 hover:text-amber-300 text-xs font-medium border border-stone-700 transition cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>ปรับแก้พารามิเตอร์</span>
            </button>

            {/* MANDATED RETURN TO START BUTTON */}
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md shadow-amber-500/20 transition cursor-pointer"
              title="เมื่อสร้างพรอมท์เสร็จแล้ว ให้กลับไปเริ่มต้นใหม่ทุกครั้ง"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>เริ่มสร้างโปรเจกต์ใหม่</span>
            </button>
          </div>
        </div>

        {/* Section Navigation Pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={() => setActiveSection('all')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
              activeSection === 'all'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
            }`}
          >
            แสดงทั้งหมด (6 ส่วน)
          </button>
          <button
            onClick={() => setActiveSection('prompts')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
              activeSection === 'prompts'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
            }`}
          >
            2. Google Flow Prompts
          </button>
          <button
            onClick={() => setActiveSection('workflow')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
              activeSection === 'workflow'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
            }`}
          >
            3. Step-by-Step Workflow
          </button>
          <button
            onClick={() => setActiveSection('storyboard')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
              activeSection === 'storyboard'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
            }`}
          >
            6. Storyboard Image Prompts (9:16)
          </button>
          <button
            onClick={() => setActiveSection('captions')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
              activeSection === 'captions'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
            }`}
          >
            5. Captions &amp; Hashtags
          </button>
        </div>
      </div>

      {/* Interactive Visual Timeline Simulator */}
      {allKeyframes.length > 0 && (
        <InteractiveTimeline
          keyframes={allKeyframes}
          roomTitle={config.selectedRoom.nameTh}
        />
      )}

      {/* ================= 1. CONCEPT OVERVIEW ================= */}
      {(activeSection === 'all') && (
        <section className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-amber-500 text-stone-950 flex items-center justify-center font-bold text-xs">
                1
              </span>
              CONCEPT OVERVIEW (แนวคิดและภาพรวมการออกแบบ)
            </h3>
            <span className="text-xs text-amber-400 font-medium">Loft + Minimalist + Japandi</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-2 bg-stone-950/60 p-4 rounded-xl border border-stone-800/80">
              <h4 className="font-semibold text-amber-300 text-sm">สไตล์และการคุมบรรยากาศ (Cozy Mood)</h4>
              <p className="text-stone-300 leading-relaxed">{result.conceptOverview.cozyConcept}</p>
              <div className="pt-2 text-stone-400">
                <span className="text-stone-200 font-medium">ภาพรวม:</span> {result.conceptOverview.overallStyle}
              </div>
            </div>

            <div className="space-y-2 bg-stone-950/60 p-4 rounded-xl border border-stone-800/80">
              <h4 className="font-semibold text-amber-300 text-sm">ตัวละครและการออกแบบเสียง (Character &amp; ASMR)</h4>
              <p className="text-stone-300 leading-relaxed">
                <strong className="text-stone-100">ตัวละคร:</strong> {result.conceptOverview.characterDesign}
              </p>
              <p className="text-stone-300 leading-relaxed pt-1">
                <strong className="text-stone-100">มู้ดเสียง:</strong> {result.conceptOverview.audioDesignMood}
              </p>
            </div>
          </div>

          {/* Textures Breakdown */}
          <div className="p-4 rounded-xl bg-stone-950/40 border border-stone-800/60 space-y-2 text-xs">
            <span className="font-semibold text-stone-200 block text-xs">ผิวสัมผัสและองค์ประกอบสำคัญ (Textures &amp; Materials):</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-[11px]">
              <div className="bg-stone-900 p-2.5 rounded-lg border border-stone-800">
                <span className="text-amber-400 font-semibold block">ผนัง (Walls):</span>
                <span className="text-stone-300">{result.conceptOverview.textures.walls}</span>
              </div>
              <div className="bg-stone-900 p-2.5 rounded-lg border border-stone-800">
                <span className="text-amber-400 font-semibold block">พื้น (Floor):</span>
                <span className="text-stone-300">{result.conceptOverview.textures.floor}</span>
              </div>
              <div className="bg-stone-900 p-2.5 rounded-lg border border-stone-800">
                <span className="text-amber-400 font-semibold block">วิวหน้าต่าง (Window):</span>
                <span className="text-stone-300">{result.conceptOverview.textures.window}</span>
              </div>
              <div className="bg-stone-900 p-2.5 rounded-lg border border-stone-800">
                <span className="text-amber-400 font-semibold block">เฟอร์นิเจอร์ (Furniture):</span>
                <span className="text-stone-300">{result.conceptOverview.textures.furniture}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= 2. GOOGLE FLOW GENERATION PROMPTS ================= */}
      {(activeSection === 'all' || activeSection === 'prompts') && (
        <section className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-md space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-amber-500 text-stone-950 flex items-center justify-center font-bold text-xs">
                2
              </span>
              <div>
                <h3 className="text-base font-bold text-white">
                  GOOGLE FLOW GENERATION PROMPTS
                </h3>
                <p className="text-xs text-stone-400">
                  {result.googleFlowPrompts.formatTitle}
                </p>
              </div>
            </div>

            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
              Veo3-Quality / 9:16 Vertical
            </span>
          </div>

          {/* Mandatory Negative Prompt Master Display */}
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                MANDATORY NEGATIVE PROMPT (กฎบังคับใส่ควบคู่ทุกคำสั่ง):
              </span>
              <button
                onClick={() =>
                  copyToClipboard(result.googleFlowPrompts.negativePromptMandatory, 'neg-master')
                }
                className="text-[11px] font-semibold text-red-300 hover:text-white px-2.5 py-1 rounded-md bg-red-900/40 hover:bg-red-800/60 border border-red-700/60 transition flex items-center gap-1 cursor-pointer"
              >
                {copiedKey === 'neg-master' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copiedKey === 'neg-master' ? 'คัดลอกแล้ว!' : 'คัดลอก Negative Prompt'}
              </button>
            </div>
            <p className="text-xs font-mono text-stone-300 bg-stone-950 p-2.5 rounded-lg border border-stone-800 break-words leading-relaxed select-all">
              {result.googleFlowPrompts.negativePromptMandatory}
            </p>
          </div>

          {/* Format 1 & Format 3: Scenes Output */}
          {result.googleFlowPrompts.scenes && (
            <div className="space-y-6">
              {result.googleFlowPrompts.scenes.map((scene, idx) => (
                <div key={idx} className="space-y-4">
                  {/* Continuity warning anchor if present */}
                  {scene.continuityWarning && (
                    <div className="p-4 rounded-xl bg-amber-950/60 border-2 border-amber-500/80 shadow-lg text-amber-200 text-xs sm:text-sm flex items-start gap-3 animate-pulse">
                      <ShieldAlert className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="block text-amber-300 font-bold text-sm">
                          {scene.continuityWarning}
                        </strong>
                        <p className="text-stone-300 text-xs mt-1">
                          ฟังก์ชันนี้จะล็อกมุมกล้อง หน้าต่างปูนเปลือย และวิวทุ่งนาให้ตรงกับเฟรมสุดท้ายของซีนที่ 1 อย่างสมบูรณ์แบบ
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="bg-stone-950 border border-stone-800 rounded-xl p-5 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-2">
                      <div className="flex items-center gap-2">
                        <Film className="w-4 h-4 text-amber-400" />
                        <h4 className="text-sm font-bold text-white">{scene.sceneTitle}</h4>
                        <span className="text-xs text-stone-400">({scene.duration})</span>
                      </div>

                      <button
                        onClick={() => copyToClipboard(scene.promptText, `scene-prompt-${idx}`)}
                        className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition cursor-pointer"
                      >
                        {copiedKey === `scene-prompt-${idx}` ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>{copiedKey === `scene-prompt-${idx}` ? 'คัดลอกพรอมต์แล้ว!' : 'คัดลอกพรอมต์หลัก'}</span>
                      </button>
                    </div>

                    {/* Prompt Content */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-semibold text-amber-400">Main Prompt (ภาษาอังกฤษ):</span>
                      <pre className="text-xs font-mono text-stone-200 bg-stone-900 p-3.5 rounded-xl border border-stone-800 whitespace-pre-wrap leading-relaxed select-all">
                        {scene.promptText}
                      </pre>
                    </div>

                    {/* ASMR Audio Target */}
                    <div className="p-3 bg-stone-900/80 rounded-xl border border-stone-800/80 space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                          <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                          Audio AI / ASMR Target (เป้าหมายเสียงของ Veo3):
                        </span>
                        <button
                          onClick={() => copyToClipboard(scene.asmrAudioTarget, `asmr-${idx}`)}
                          className="text-[10px] text-stone-400 hover:text-stone-200 cursor-pointer"
                        >
                          {copiedKey === `asmr-${idx}` ? 'คัดลอกแล้ว' : 'คัดลอกเสียง'}
                        </button>
                      </div>
                      <p className="text-stone-300 text-[11px] font-mono leading-relaxed">
                        {scene.asmrAudioTarget}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Format 2: 7 Shots Output */}
          {result.googleFlowPrompts.shots && (
            <div className="space-y-4">
              {result.googleFlowPrompts.shots.map((shot, idx) => (
                <div
                  key={shot.shotNumber}
                  className="bg-stone-950 border border-stone-800 rounded-xl p-4 sm:p-5 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-stone-800 text-amber-400 font-mono font-bold text-xs flex items-center justify-center">
                        {shot.shotNumber}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                          <span>{shot.shotNameTh}</span>
                          <span className="text-xs text-stone-400">({shot.timecode} - {shot.duration})</span>
                        </h4>
                        <span className="text-[11px] text-amber-400 font-mono">
                          {shot.cameraType}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => copyToClipboard(shot.promptText, `shot-${idx}`)}
                      className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition cursor-pointer"
                    >
                      {copiedKey === `shot-${idx}` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === `shot-${idx}` ? 'คัดลอกแล้ว!' : 'คัดลอกช็อตนี้'}</span>
                    </button>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-stone-400">Prompt:</span>
                    <pre className="text-xs font-mono text-stone-200 bg-stone-900 p-3 rounded-lg border border-stone-800 whitespace-pre-wrap select-all">
                      {shot.promptText}
                    </pre>
                  </div>

                  <div className="p-2.5 bg-stone-900/60 rounded-lg text-xs space-y-1">
                    <span className="text-[11px] text-amber-400 font-medium flex items-center gap-1">
                      <Volume2 className="w-3 h-3" /> ASMR Audio Target:
                    </span>
                    <p className="text-[11px] font-mono text-stone-300">{shot.asmrAudioTarget}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ================= 3. STEP-BY-STEP WORKFLOW IN GOOGLE FLOW ================= */}
      {(activeSection === 'all' || activeSection === 'workflow') && (
        <section className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-amber-500 text-stone-950 flex items-center justify-center font-bold text-xs">
                3
              </span>
              STEP-BY-STEP WORKFLOW IN GOOGLE FLOW
            </h3>
            <span className="text-xs text-stone-400">ขั้นตอนการกดเครื่องมืออย่างละเอียด</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.stepByStepWorkflow.map((step) => (
              <div
                key={step.stepNumber}
                className="bg-stone-950 border border-stone-800 rounded-xl p-4 space-y-2.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center">
                      {step.stepNumber}
                    </span>
                    <h4 className="text-sm font-bold text-white">{step.titleTh}</h4>
                  </div>
                  <p className="text-xs text-stone-300 mt-2 leading-relaxed">{step.actionDetail}</p>
                </div>

                <div className="pt-2 border-t border-stone-800/80 space-y-1.5 text-[11px]">
                  <div className="flex items-center gap-2 text-stone-400">
                    <span className="text-amber-400 font-medium">การตั้งค่า:</span>
                    <span>
                      {step.veoSettings.aspectRatio} • {step.veoSettings.duration} • {step.veoSettings.model}
                    </span>
                  </div>
                  <div className="text-stone-400">
                    <strong className="text-stone-300">ความต่อเนื่อง:</strong> {step.continuityTips}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= 4. EDITING & ENGAGEMENT TIPS ================= */}
      {(activeSection === 'all') && (
        <section className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-amber-500 text-stone-950 flex items-center justify-center font-bold text-xs">
                4
              </span>
              EDITING &amp; ENGAGEMENT TIPS (ทริคตัดต่อ &amp; ไวรัลคลิป)
            </h3>
            <span className="text-xs text-amber-400 font-medium">Reels / TikTok / Shorts</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {result.editingAndEngagementTips.map((tip, idx) => (
              <div
                key={idx}
                className="bg-stone-950 border border-stone-800 rounded-xl p-4 space-y-2 text-xs flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-bold text-amber-300 text-xs sm:text-sm">{tip.tipTitle}</h4>
                  <p className="text-stone-300 mt-1.5 leading-relaxed">{tip.tipDetail}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-stone-900/80 border border-stone-800/80 text-[11px] text-amber-200">
                  <span className="font-semibold text-amber-400 block mb-0.5">Viral Hook Idea:</span>
                  {tip.viralHookIdea}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= 5. CAPTIONS & HASHTAGS ================= */}
      {(activeSection === 'all' || activeSection === 'captions') && (
        <section className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-amber-500 text-stone-950 flex items-center justify-center font-bold text-xs">
                5
              </span>
              CAPTIONS &amp; HASHTAGS (แคปชันและแฮชแท็ก 2 ภาษา)
            </h3>
            <button
              onClick={() => {
                const text = `${result.captionsAndHashtags.hookTh}\n\n${result.captionsAndHashtags.captionTh}\n\n${result.captionsAndHashtags.hashtagsTh.join(' ')}`;
                copyToClipboard(text, 'captions-all');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-medium cursor-pointer"
            >
              {copiedKey === 'captions-all' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>คัดลอกแคปชันภาษาไทย</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Thai Version */}
            <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 space-y-2.5">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-800 text-stone-200">
                ภาษาไทย (Thai Version)
              </span>
              <div>
                <span className="font-semibold text-amber-400 text-xs block">Hook:</span>
                <p className="text-white font-medium">{result.captionsAndHashtags.hookTh}</p>
              </div>
              <div>
                <span className="font-semibold text-stone-400 text-xs block">Caption:</span>
                <p className="text-stone-300 leading-relaxed">{result.captionsAndHashtags.captionTh}</p>
              </div>
              <div className="pt-2 border-t border-stone-800">
                <span className="font-semibold text-stone-400 text-[11px] block mb-1">Hashtags:</span>
                <p className="text-amber-400 font-medium">{result.captionsAndHashtags.hashtagsTh.join(' ')}</p>
              </div>
            </div>

            {/* English Version */}
            <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 space-y-2.5">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-800 text-stone-200">
                ภาษาอังกฤษ (English Version)
              </span>
              <div>
                <span className="font-semibold text-amber-400 text-xs block">Hook:</span>
                <p className="text-white font-medium">{result.captionsAndHashtags.hookEn}</p>
              </div>
              <div>
                <span className="font-semibold text-stone-400 text-xs block">Caption:</span>
                <p className="text-stone-300 leading-relaxed">{result.captionsAndHashtags.captionEn}</p>
              </div>
              <div className="pt-2 border-t border-stone-800">
                <span className="font-semibold text-stone-400 text-[11px] block mb-1">Hashtags:</span>
                <p className="text-amber-400 font-medium">{result.captionsAndHashtags.hashtagsEn.join(' ')}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= 6. STORYBOARD PROMPTS (ขนาด 9:16) ================= */}
      {(activeSection === 'all' || activeSection === 'storyboard') && (
        <section className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-amber-500 text-stone-950 flex items-center justify-center font-bold text-xs">
                  6
                </span>
                พรอมต์รูปภาพสตอรี่บอร์ด (Storyboard Image Prompts ขนาด 9:16 ในรูปเดียว)
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                สำหรับนำไปเจนเป็นภาพสตอรี่บอร์ดบน Imagen 3 หรือนำมาใช้เป็น Image Reference ใน Google Flow
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-800 text-stone-300">
              {result.storyboardPrompts.storyboardImages.length} รูปสตอรี่บอร์ด
            </span>
          </div>

          <div className="space-y-6">
            {result.storyboardPrompts.storyboardImages.map((sb, sbIdx) => (
              <div
                key={sbIdx}
                className="bg-stone-950 border border-stone-800 rounded-xl p-5 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-3">
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                      <Camera className="w-4 h-4 text-amber-400" />
                      {sb.imageTitle}
                    </h4>
                    <p className="text-xs text-stone-400">{sb.frameCoverage}</p>
                  </div>

                  <button
                    onClick={() =>
                      copyToClipboard(sb.storyboardImagePrompt, `storyboard-prompt-${sbIdx}`)
                    }
                    className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition cursor-pointer"
                  >
                    {copiedKey === `storyboard-prompt-${sbIdx}` ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {copiedKey === `storyboard-prompt-${sbIdx}`
                        ? 'คัดลอกพรอมต์ภาพแล้ว!'
                        : 'คัดลอกพรอมต์รูปภาพ (Imagen 3)'}
                    </span>
                  </button>
                </div>

                {/* Prompt display */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-amber-400">
                    Storyboard Image Generation Prompt (อัตราส่วน 9:16):
                  </span>
                  <pre className="text-xs font-mono text-stone-200 bg-stone-900 p-3.5 rounded-xl border border-stone-800 whitespace-pre-wrap leading-relaxed select-all">
                    {sb.storyboardImagePrompt}
                  </pre>
                </div>

                {/* Sub-keyframes table */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-semibold text-stone-300 block">
                    ป้ายกำกับแม่นยำ (Timecode, Camera Angle &amp; ASMR Target):
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {sb.keyframes.map((kf) => (
                      <div
                        key={kf.id}
                        className={`p-3 rounded-xl border text-xs space-y-1.5 ${
                          kf.useLastFrameAnchor
                            ? 'bg-amber-950/60 border-amber-600 text-amber-200'
                            : 'bg-stone-900 border-stone-800 text-stone-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-[11px] text-amber-400">
                            {kf.timecode}
                          </span>
                          {kf.useLastFrameAnchor && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500 text-stone-950 font-bold">
                              ⚠️ Last Frame
                            </span>
                          )}
                        </div>

                        <div className="font-semibold text-stone-100 text-xs">
                          {kf.titleTh}
                        </div>

                        <div className="text-[11px] text-stone-400">
                          มุมกล้อง: <span className="text-stone-200">{kf.cameraAngle}</span>
                        </div>

                        <div className="text-[10px] text-amber-400/90 italic">
                          ASMR: {kf.asmrTarget}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Floating Bottom Bar: Reset & Restart Project */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-stone-900/90 border border-stone-800 rounded-2xl shadow-xl gap-3">
        <div className="text-xs text-stone-300 text-center sm:text-left">
          <p className="font-semibold text-white">ต้องการสร้างคลิปสำหรับห้องอื่น หรือทดสอบสไตล์ใหม่?</p>
          <p className="text-stone-400 text-[11px]">
            กดปุ่มด้านขวาเพื่อเริ่มขั้นตอนใหม่ตั้งแต่ต้นตามกฎเหล็กของระบบ
          </p>
        </div>

        <button
          onClick={onReset}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-sm shadow-lg transition cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>เริ่มต้นโปรเจกต์ใหม่ (Start Over)</span>
        </button>
      </div>
    </div>
  );
};
