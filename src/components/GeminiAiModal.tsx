import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Send,
  X,
  Bot,
  User,
  Zap,
  ShieldCheck,
  Lightbulb,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { DirectorConfig } from '../types/director';

interface GeminiAiModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: DirectorConfig;
  onApplyConcept?: (conceptText: string) => void;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const GeminiAiModal: React.FC<GeminiAiModalProps> = ({
  isOpen,
  onClose,
  config,
  onApplyConcept,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `สวัสดีครับ! ผมคือ **Gemini AI Director Co-Pilot** (โมเดล Gemini 3.8 Flash) เชื่อมต่อผ่าน Google Cloud เรียบร้อยแล้ว พร้อมช่วยคุณออกแบบคอนเซ็ปต์แปลงโฉมห้อง คิดมุมกล้อง หรือขัดเกลาพรอมต์ภาษาอังกฤษสำหรับ Google Flow / Veo3 ลองพิมพ์สอบถามหรือเลือกไอเดียด้านล่างได้เลยครับ!`,
    },
  ]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const quickPrompts = [
    '💡 ช่วยคิดห้องนอนสไตล์ Cozy Japandi ปูนเปลือย พร้อมม่านโปร่งแสงและวิวทุ่งนา',
    '🛠️ แนะนำไอเดียรีโนเวทห้องทำงานเก่ารก ให้เป็นสตูดิโอมินิมอลสุดอบอุ่น',
    '🌿 ไอเดียแปลงโฉมระเบียงคอนโดแคบๆ ให้กลายเป็นมุมจิบกาแฟชมวิวเมือง',
  ];

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading) return;

    const newMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', content: textToSend },
    ];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMessage: textToSend,
          currentConfig: config,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from Gemini AI');
      }

      const data = await response.json();
      setMessages([
        ...newMessages,
        { role: 'assistant', content: data.text || 'ไม่มีข้อมูลตอบกลับจากโมเดล' },
      ]);
    } catch (err: any) {
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: `เกิดข้อผิดพลาดในการเชื่อมต่อกับ Gemini AI: ${err.message || 'กรุณาลองใหม่อีกครั้ง'}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-700/80 rounded-2xl max-w-2xl w-full flex flex-col max-h-[90vh] shadow-2xl text-stone-200 overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 bg-stone-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-emerald-400 flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-stone-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                  Gemini AI Director Co-Pilot
                </h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-700/80">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  API Connected (Google)
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                โมเดล: gemini-3.8-flash ผ่านระบบ Server-Side ปลอดภัย ไม่ต้องกรอก Key เอง
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status Callout */}
        <div className="px-4 py-2.5 bg-emerald-950/30 border-b border-emerald-900/40 text-[11px] text-emerald-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>
              <strong>สถานะการเข้าใช้งาน:</strong> ระบบเปิดใช้ Gemini AI อัตโนมัติด้วยบัญชี Google ของโปรเจกต์
            </span>
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs sm:text-sm">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-amber-500 text-stone-950 font-medium rounded-tr-none'
                    : 'bg-stone-950 border border-stone-800 text-stone-200 rounded-tl-none shadow-sm'
                }`}
              >
                {msg.content}
              </div>
              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-stone-800 text-stone-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 items-center text-stone-400 text-xs">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-stone-950 border border-stone-800">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] text-stone-400 ml-1">Gemini AI กำลังคิดคำตอบ...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-stone-950/80 border-t border-stone-800 flex gap-1.5 overflow-x-auto text-[11px]">
          {quickPrompts.map((q, qIdx) => (
            <button
              key={qIdx}
              type="button"
              onClick={() => handleSend(q)}
              className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 whitespace-nowrap transition cursor-pointer flex-shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-3 sm:p-4 border-t border-stone-800 bg-stone-950">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="พิมพ์ถาม Gemini AI เช่น 'อยากได้ไอเดียห้องครัวโมเดิร์นปูนเปลือย'..."
              className="flex-1 bg-stone-900 border border-stone-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 transition"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-stone-800 disabled:text-stone-600 text-stone-950 font-bold text-xs sm:text-sm transition flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">ส่งคำถาม</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
