import React, { useState } from 'react';
import { RoomOption } from '../types/director';
import { ROOM_PRESETS } from '../data/spaceData';
import {
  Briefcase,
  Armchair,
  Bed,
  Utensils,
  ChefHat,
  Bath,
  Sparkles,
  Trees,
  Sun,
  Warehouse,
  CheckCircle2,
  ArrowRight,
  PlusCircle,
  Home,
  Check,
} from 'lucide-react';

interface Step1LocationProps {
  selectedRoom: RoomOption;
  customRoomName?: string;
  customRoomElements?: string;
  onSelectRoom: (room: RoomOption, customName?: string, customElements?: string) => void;
  onNext: () => void;
}

export const Step1Location: React.FC<Step1LocationProps> = ({
  selectedRoom,
  customRoomName = '',
  customRoomElements = '',
  onSelectRoom,
  onNext,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'living' | 'utility' | 'outdoor' | 'custom'>('all');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(selectedRoom.category === 'custom');
  const [customNameInput, setCustomNameInput] = useState<string>(customRoomName);
  const [customElementsInput, setCustomElementsInput] = useState<string>(customRoomElements);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase':
        return Briefcase;
      case 'Armchair':
        return Armchair;
      case 'Bed':
        return Bed;
      case 'Utensils':
        return Utensils;
      case 'ChefHat':
        return ChefHat;
      case 'Bath':
        return Bath;
      case 'Sparkles':
        return Sparkles;
      case 'Trees':
        return Trees;
      case 'Sun':
        return Sun;
      case 'Warehouse':
        return Warehouse;
      default:
        return Home;
    }
  };

  const handleSelectPreset = (room: RoomOption) => {
    setIsCustomMode(false);
    onSelectRoom(room);
  };

  const handleApplyCustom = () => {
    if (!customNameInput.trim()) return;

    const customRoom: RoomOption = {
      id: 'custom-room',
      nameTh: customNameInput.trim(),
      nameEn: customNameInput.trim(),
      category: 'custom',
      description: 'พื้นที่ออกแบบเองตามความต้องการของผู้ใช้',
      keyElements: customElementsInput
        .split('\n')
        .map((e) => e.trim())
        .filter(Boolean),
      suggestedAction: 'จัดวางองค์ประกอบหลักตามที่ผู้ใช้กำหนด',
      iconName: 'Home',
    };

    setIsCustomMode(true);
    onSelectRoom(customRoom, customNameInput.trim(), customElementsInput.trim());
  };

  const filteredRooms = ROOM_PRESETS.filter((r) => {
    if (activeTab === 'all') return true;
    return r.category === activeTab;
  });

  return (
    <div className="space-y-6">
      {/* Title & Description */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 sm:p-6 shadow-md backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800/80 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-2">
              ขั้นตอนที่ 1 จาก 4
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              เลือกหรือระบุสถานที่ที่ต้องการแปลงโฉม (Location Selection)
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mt-1">
              เลือกจาก 3 หมวดหมู่มาตรฐาน พร้อมระบุสิ่งของตกแต่งเฉพาะเจาะจง หรือพิมพ์ระบุสถานที่เอง
            </p>
          </div>

          <button
            onClick={onNext}
            className="self-end sm:self-center flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition cursor-pointer"
          >
            <span>ถัดไป: เลือกสไตล์</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={() => {
              setActiveTab('all');
              setIsCustomMode(false);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
              activeTab === 'all' && !isCustomMode
                ? 'bg-amber-500 text-stone-950 font-semibold shadow-sm'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
            }`}
          >
            ทั้งหมด (10 ห้อง)
          </button>
          <button
            onClick={() => {
              setActiveTab('living');
              setIsCustomMode(false);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
              activeTab === 'living' && !isCustomMode
                ? 'bg-amber-500 text-stone-950 font-semibold shadow-sm'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
            }`}
          >
            1. ห้องหลักในบ้าน (Interior Living)
          </button>
          <button
            onClick={() => {
              setActiveTab('utility');
              setIsCustomMode(false);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
              activeTab === 'utility' && !isCustomMode
                ? 'bg-amber-500 text-stone-950 font-semibold shadow-sm'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
            }`}
          >
            2. ห้องเฉพาะทาง (Utility Areas)
          </button>
          <button
            onClick={() => {
              setActiveTab('outdoor');
              setIsCustomMode(false);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
              activeTab === 'outdoor' && !isCustomMode
                ? 'bg-amber-500 text-stone-950 font-semibold shadow-sm'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
            }`}
          >
            3. พื้นที่ภายนอก (Exterior &amp; Outdoor)
          </button>
          <button
            onClick={() => {
              setActiveTab('custom');
              setIsCustomMode(true);
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
              isCustomMode
                ? 'bg-amber-500 text-stone-950 font-semibold shadow-sm'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            ระบุสถานที่เอง (Custom)
          </button>
        </div>
      </div>

      {/* Preset Cards Grid */}
      {!isCustomMode ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRooms.map((room) => {
            const isSelected = selectedRoom.id === room.id && !isCustomMode;
            const Icon = getIcon(room.iconName);

            return (
              <div
                key={room.id}
                onClick={() => handleSelectPreset(room)}
                className={`relative flex flex-col justify-between p-5 rounded-2xl border transition-all duration-200 cursor-pointer text-left ${
                  isSelected
                    ? 'bg-stone-900/90 border-amber-500 ring-2 ring-amber-500/30 shadow-xl shadow-amber-950/30 -translate-y-0.5'
                    : 'bg-stone-900/50 border-stone-800 hover:border-stone-700 hover:bg-stone-900/80'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          isSelected
                            ? 'bg-amber-500 text-stone-950'
                            : 'bg-stone-800 text-stone-300'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                          {room.nameTh}
                        </h3>
                        <p className="text-[11px] text-stone-400 font-medium">{room.nameEn}</p>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="p-1 rounded-full bg-amber-500 text-stone-950">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-stone-400 mt-3 leading-relaxed">
                    {room.description}
                  </p>

                  {/* Mandated key elements from prompt specifications */}
                  <div className="mt-3 pt-3 border-t border-stone-800/80 space-y-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                      องค์ประกอบบังคับในฉาก:
                    </span>
                    <ul className="space-y-1">
                      {room.keyElements.map((elem, idx) => (
                        <li
                          key={idx}
                          className="text-[11px] text-stone-300 flex items-start gap-1.5 leading-tight"
                        >
                          <span className="text-amber-500 mt-0.5 text-xs">•</span>
                          <span>{elem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-800/60 flex items-center justify-between text-[11px]">
                  <span className="text-stone-400">
                    หมวดหมู่:{' '}
                    {room.category === 'living'
                      ? 'ห้องหลักในบ้าน'
                      : room.category === 'utility'
                      ? 'ห้องเฉพาะทาง'
                      : 'พื้นที่ภายนอก'}
                  </span>
                  <span
                    className={`font-semibold ${
                      isSelected ? 'text-amber-400' : 'text-stone-400 group-hover:text-stone-300'
                    }`}
                  >
                    {isSelected ? 'เลือกแล้ว ✓' : 'คลิกเพื่อเลือก'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Custom Location Form */
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4 max-w-2xl mx-auto shadow-xl">
          <div className="flex items-center gap-2.5 border-b border-stone-800 pb-3">
            <PlusCircle className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-base font-bold text-white">ระบุสถานที่และองค์ประกอบเอง (Custom Space)</h3>
              <p className="text-xs text-stone-400">กำหนดชื่อห้องและรายละเอียดเฟอร์นิเจอร์ตามที่คุณต้องการ</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                ชื่อสถานที่ / ห้อง (เช่น สตูดิโอบันทึกเสียง, ห้องแต่งตัว Walk-in Closet, คาเฟ่เล็กในบ้าน):
              </label>
              <input
                type="text"
                value={customNameInput}
                onChange={(e) => setCustomNameInput(e.target.value)}
                placeholder="ระบุชื่อสถานที่..."
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                องค์ประกอบและเฟอร์นิเจอร์หลัก (พิมพ์แยกบรรทัดละ 1 อย่าง):
              </label>
              <textarea
                rows={4}
                value={customElementsInput}
                onChange={(e) => setCustomElementsInput(e.target.value)}
                placeholder="เช่น:&#10;- ราวแขวนเสื้อผ้าไม้สีโอ๊คอ่อน&#10;- กระจกเต็มตัวทรงโค้งมนติดไฟ LED&#10;- ลิ้นชักเครื่องประดับท็อปกระจก"
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 leading-relaxed"
              />
            </div>

            <button
              type="button"
              onClick={handleApplyCustom}
              disabled={!customNameInput.trim()}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-stone-800 disabled:text-stone-600 text-stone-950 font-bold text-xs sm:text-sm transition cursor-pointer"
            >
              บันทึกสถานที่กำหนดเอง
            </button>
          </div>
        </div>
      )}

      {/* Bottom Floating Bar */}
      <div className="flex items-center justify-between p-4 bg-stone-900/90 border border-stone-800 rounded-2xl shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
            1/4
          </div>
          <div>
            <p className="text-xs text-stone-400">สถานที่ที่เลือกในปัจจุบัน:</p>
            <p className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>{isCustomMode ? customNameInput || 'สถานที่กำหนดเอง' : selectedRoom.nameTh}</span>
              <span className="text-xs text-amber-400">
                ({isCustomMode ? 'Custom' : selectedRoom.nameEn})
              </span>
            </p>
          </div>
        </div>

        <button
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm shadow-md transition cursor-pointer"
        >
          <span>ถัดไป: เลือกสไตล์</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
