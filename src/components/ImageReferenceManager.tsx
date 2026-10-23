import React, { useRef } from 'react';
import { ImageReference } from '../types/director';
import { Upload, X, Tag, UserCheck, Armchair, Palette, Sparkles, Image as ImageIcon } from 'lucide-react';

interface ImageReferenceManagerProps {
  references: ImageReference[];
  onChange: (refs: ImageReference[]) => void;
}

export const ImageReferenceManager: React.FC<ImageReferenceManagerProps> = ({
  references,
  onChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newRefs: ImageReference[] = [];
    const filesArray = Array.from(files);

    filesArray.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          const newRef: ImageReference = {
            id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            name: file.name,
            dataUrl: result,
            tag: file.name.toLowerCase().includes('person') || file.name.toLowerCase().includes('face')
              ? 'character'
              : 'furniture',
            note: 'ล็อกอัตลักษณ์ รายละเอียด และโทนสีตามภาพถ่ายอ้างอิง',
          };
          onChange([...references, newRef]);
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemove = (id: string) => {
    onChange(references.filter((r) => r.id !== id));
  };

  const handleTagChange = (id: string, tag: ImageReference['tag']) => {
    onChange(
      references.map((r) => {
        if (r.id === id) {
          return { ...r, tag };
        }
        return r;
      })
    );
  };

  const handleNoteChange = (id: string, note: string) => {
    onChange(
      references.map((r) => {
        if (r.id === id) {
          return { ...r, note };
        }
        return r;
      })
    );
  };

  const getTagBadge = (tag: ImageReference['tag']) => {
    switch (tag) {
      case 'character':
        return { label: 'ล็อกใบหน้า/ทรงผม/เสื้อผ้าคน', icon: UserCheck, color: 'text-amber-400 bg-amber-950/60 border-amber-800' };
      case 'furniture':
        return { label: 'ล็อกเฟอร์นิเจอร์หลัก/วัสดุ', icon: Armchair, color: 'text-emerald-400 bg-emerald-950/60 border-emerald-800' };
      case 'style':
        return { label: 'ล็อกมู้ดโทน/สไตล์ห้อง', icon: Palette, color: 'text-blue-400 bg-blue-950/60 border-blue-800' };
      case 'decor':
        return { label: 'ล็อกของประดับ/โลโก้/แจกัน', icon: Sparkles, color: 'text-purple-400 bg-purple-950/60 border-purple-800' };
      default:
        return { label: 'รูปอ้างอิงทั่วไป', icon: ImageIcon, color: 'text-stone-300 bg-stone-800 border-stone-700' };
    }
  };

  return (
    <div className="space-y-3 bg-stone-900/80 border border-stone-800 rounded-2xl p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800/80 pb-3">
        <div>
          <h4 className="text-sm font-semibold text-white flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-amber-400" />
            การอัปโหลดรูปภาพอ้างอิง (Image Reference Locking)
          </h4>
          <p className="text-xs text-stone-400 mt-0.5">
            อัปโหลดได้มากกว่า 1 รูปเพื่อล็อกรูปร่างหน้าตา ทรงผม เสื้อผ้าตัวละคร หรือขนาด สี รูปร่างของเฟอร์นิเจอร์และโลโก้
          </p>
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-medium transition cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5" />
          + เพิ่มรูปอ้างอิง
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileUpload}
        />
      </div>

      {references.length === 0 ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-stone-800 hover:border-amber-500/50 rounded-xl p-6 text-center cursor-pointer transition bg-stone-950/40 hover:bg-stone-950/70 group"
        >
          <div className="w-10 h-10 rounded-full bg-stone-800 group-hover:bg-amber-500/10 flex items-center justify-center mx-auto mb-2 text-stone-400 group-hover:text-amber-400 transition">
            <Upload className="w-5 h-5" />
          </div>
          <p className="text-xs font-medium text-stone-300 group-hover:text-amber-200">
            คลิกเพื่ออัปโหลดรูปภาพ Reference (รองรับหลายรูปพร้อมกัน)
          </p>
          <p className="text-[11px] text-stone-400 mt-1">
            เช่น รูปถ่ายหน้าตัวละคร, รูปโต๊ะ/เตียงที่ต้องการใช้, หรือมู้ดแอนด์โทนของห้องจริง
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {references.map((ref) => {
            const badge = getTagBadge(ref.tag);
            const BadgeIcon = badge.icon;

            return (
              <div
                key={ref.id}
                className="bg-stone-950 border border-stone-800 rounded-xl p-2.5 flex flex-col justify-between gap-2.5 relative group shadow-sm hover:border-stone-700 transition"
              >
                <div className="flex gap-2.5 items-start">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-stone-900 border border-stone-800 flex-shrink-0 relative">
                    <img
                      src={ref.dataUrl}
                      alt={ref.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 pr-6">
                    <p className="text-xs font-medium text-stone-200 truncate" title={ref.name}>
                      {ref.name}
                    </p>
                    <div className="mt-1 flex items-center gap-1">
                      <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium border ${badge.color}`}>
                        <BadgeIcon className="w-3 h-3" />
                        {badge.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick tag selector */}
                <div className="flex items-center gap-1 text-[11px] text-stone-400 pt-1 border-t border-stone-900">
                  <Tag className="w-3 h-3 text-stone-400" />
                  <span className="text-[10px]">ล็อกเป้าหมาย:</span>
                  <select
                    value={ref.tag}
                    onChange={(e) => handleTagChange(ref.id, e.target.value as ImageReference['tag'])}
                    className="bg-stone-900 border border-stone-800 text-stone-300 text-[10px] rounded px-1.5 py-0.5 focus:border-amber-500 focus:outline-none"
                  >
                    <option value="character">ตัวละคร (ใบหน้า/เสื้อผ้า)</option>
                    <option value="furniture">เฟอร์นิเจอร์ (โต๊ะ/เก้าอี้)</option>
                    <option value="style">มู้ดแอนด์โทน (ผนัง/พื้น)</option>
                    <option value="decor">ของตกแต่ง (แจกัน/โลโก้)</option>
                  </select>
                </div>

                <input
                  type="text"
                  value={ref.note}
                  onChange={(e) => handleNoteChange(ref.id, e.target.value)}
                  placeholder="ระบุข้อจำกัด เช่น ล็อกเสื้อยืดสีเบจ กางเกงลินิน..."
                  className="w-full bg-stone-900/80 border border-stone-800/80 rounded px-2 py-1 text-[11px] text-stone-300 placeholder-stone-600 focus:outline-none focus:border-stone-700"
                />

                <button
                  type="button"
                  onClick={() => handleRemove(ref.id)}
                  className="absolute top-2 right-2 w-5 h-5 rounded-full bg-stone-900 hover:bg-red-950 text-stone-400 hover:text-red-400 border border-stone-800 flex items-center justify-center transition"
                  title="ลบรูปนี้"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
