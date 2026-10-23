import { RoomOption, StyleOption, ConditionOption, FormatOption, WindowViewConfig } from '../types/director';

export const MANDATORY_NEGATIVE_PROMPTS =
  'morphing objects, ghosting, double vision, floating furniture, extra limbs, warped walls, distorted window view, unstable camera, fast blur, overlapping actions, disappearing objects, blank white frames, empty wall frames, reverse furniture orientation, unnatural warping, deformed human hands, floating limbs, blurred details, architectural glitch, flickering light, sudden camera cuts within a single shot.';

export const ROOM_PRESETS: RoomOption[] = [
  // 1. หมวดห้องหลักภายในบ้าน (Interior Living Areas)
  {
    id: 'home-office',
    nameTh: 'ห้องทำงาน',
    nameEn: 'Home Office',
    category: 'living',
    description: 'พื้นที่ทำงานสร้างสรรค์ พร้อมชั้นหนังสือ กรอบรูปศิลปะ และโคมไฟโทนอุ่น',
    keyElements: [
      'ชั้นหนังสือไม้โอ๊คจัดเรียงหนังสือจริงอย่างเป็นระเบียบ',
      'กรอบรูปแขวนผนังที่มีภาพวาดและโปสเตอร์ศิลปะจริง (ห้ามเป็นกรอบว่างเปล่า)',
      'โคมไฟตั้งโต๊ะแสงสีส้มวอร์มไวท์ (Warm ambient light)',
      'อุปกรณ์สำนักงาน แล็ปท็อป และแก้วเซรามิก',
    ],
    suggestedAction: 'จัดวางโต๊ะทำงานไม้สน จัดเรียงหนังสือเข้าชั้น และเปิดโคมไฟทำงานริมหน้าต่าง',
    iconName: 'Briefcase',
  },
  {
    id: 'living-room',
    nameTh: 'ห้องนั่งเล่น / ห้องรับแขก',
    nameEn: 'Living Room',
    category: 'living',
    description: 'พื้นที่พักผ่อนส่วนกลาง โซฟาผ้าแสนนุ่ม พรมทอผืนใหญ่ และมุมดูทีวีพร้อมต้นไม้ประดับ',
    keyElements: [
      'ชั้นวางทีวีไม้มินิมอลและจอทีวีติดผนัง',
      'โซฟาผ้าลินินสีเบจครีมพร้อมหมอนอิง',
      'พรมปูพื้นทอหนานุ่มผืนใหญ่ (Large woven floor rug)',
      'กรอบรูปศิลปะแขวนผนังที่มีภาพวาดวิวธรรมชาติจริง',
      'ต้นไม้ประดับในกระถางดินเผา (Fiddle leaf fig / Olive tree)',
    ],
    suggestedAction: 'ปูพรมผืนใหญ่ เลื่อนโซฟาจัดกึ่งกลาง และวางกระถางต้นไม้ริมหน้าต่างรับแสง',
    iconName: 'Armchair',
  },
  {
    id: 'bedroom',
    nameTh: 'ห้องนอน',
    nameEn: 'Bedroom',
    category: 'living',
    description: 'ห้องนอนแสนสงบ โครงเตียงไม้มินิมอล ผ้านวมนุ่มฟู ม่านโปร่งแสง และโคมไฟหัวเตียง',
    keyElements: [
      'หัวเตียงไม้โอ๊คและโครงเตียงต่ำสไตล์ญี่ปุ่น',
      'โต๊ะข้างเตียงไม้พร้อมโคมไฟเซรามิกหัวเตียง',
      'ตู้เสื้อผ้าไม้บานเลื่อนมินิมอล',
      'ม่านโปร่งแสงสีขาวกรองแสงอาทิตย์ (Sheer white linen curtains)',
      'กรอบรูปภาพตั้งโต๊ะและแจกันดอกไม้แห้ง',
    ],
    suggestedAction: 'ประกอบโครงเตียง ปูผ้าปูที่นอนลายตารางและจัดหมอนอิงรูปทรงธรรมชาติ',
    iconName: 'Bed',
  },
  {
    id: 'dining-room',
    nameTh: 'ห้องทานอาหาร',
    nameEn: 'Dining Room',
    category: 'living',
    description: 'มุมรับประทานอาหารอบอุ่น เคาน์เตอร์บาร์ โต๊ะไม้ตัวยาว และโคมไฟห้อยเพดาน',
    keyElements: [
      'เคาน์เตอร์บาร์ไม้และเก้าอี้สตูลดีไซน์คลีน',
      'ชั้นวางแก้วไวน์ จานชามเซรามิกสไตล์งานคราฟต์',
      'โคมไฟห้อยเพดานทรงเรขาคณิต (Pendant warm light)',
      'แจกันดอกไม้สดประดับกึ่งกลางโต๊ะอาหาร',
    ],
    suggestedAction: 'ยกโต๊ะไม้ยาวเข้าตำแหน่ง เช็ดหน้าโต๊ะ จัดชุดจานชามและแขวนโคมไฟเพดาน',
    iconName: 'Utensils',
  },

  // 2. หมวดห้องใช้งานเฉพาะทาง (Interior Utility Areas)
  {
    id: 'kitchen',
    nameTh: 'ห้องครัว',
    nameEn: 'Kitchen',
    category: 'utility',
    description: 'ห้องครัวโมเดิร์นเจแปนดี เคาน์เตอร์หินขัด ตู้ลอยไม้ และชั้นวางเครื่องปรุงสุดเนี้ยบ',
    keyElements: [
      'เคาน์เตอร์ครัวท็อปหินสีเทาอ่อนและตู้เก็บของไม้บานเรียบ',
      'ตู้แขวนผนังพร้อมไฟซ่อน LED ใต้ตู้',
      'ชั้นวางเครื่องปรุงขวดแก้วจัดเรียงตามลำดับอย่างประณีต',
      'อุปกรณ์ทำครัว กาดริปกาแฟ และตู้เย็นสีแมตต์',
    ],
    suggestedAction: 'ติดตั้งชั้นลอยขวดเครื่องปรุง จัดวางกาดริปกาแฟ และเช็ดเคาน์เตอร์หินจนเงาแวววาว',
    iconName: 'ChefHat',
  },
  {
    id: 'bathroom',
    nameTh: 'ห้องน้ำ',
    nameEn: 'Bathroom',
    category: 'utility',
    description: 'ห้องน้ำสไตล์สปา ปูนขัดมัน กระจกเงารูปทรงอิสระ เคาน์เตอร์อ่างล้างหน้า และต้นไม้ในร่ม',
    keyElements: [
      'กระจกเงาบานใหญ่ทรงโค้งมนพร้อมไฟเรืองแสงด้านหลัง',
      'เคาน์เตอร์อ่างล้างหน้าเซรามิกสีขาวเนื้อแมตต์',
      'ชั้นวางไม้สำหรับผลิตภัณฑ์สกินแคร์และสบู่แฮนด์เมด',
      'ราวแขวนผ้าขนหนูไม้มินิมอลและม่านกั้นอาบน้ำสีครีม',
      'ต้นไม้ในร่มฟอกอากาศในกระถางเซรามิก',
    ],
    suggestedAction: 'ติดตั้งกระจกไฟ LED จัดวางขวดผลิตภัณฑ์ออร์แกนิก และแขวนผ้าขนหนูเนื้อนุ่ม',
    iconName: 'Bath',
  },
  {
    id: 'laundry-room',
    nameTh: 'ห้องซักล้าง',
    nameEn: 'Laundry Room',
    category: 'utility',
    description: 'มุมซักรีดสะอาดเป็นระเบียบ เครื่องซักผ้าฝาหน้า ชั้นวางน้ำยาซักผ้า และตะกร้าหวายสาน',
    keyElements: [
      'เครื่องซักผ้าและเครื่องอบผ้าฝาหน้าสีขาวเรียบหรู',
      'ชั้นวางไม้วางขวดแก้วน้ำยาซักผ้าและน้ำยาปรับผ้านุ่มฉลากมินิมอล',
      'ตะกร้าผ้าสานจากวัสดุธรรมชาติ (Woven laundry baskets)',
      'ราวตากผ้าไม้แบบพับเก็บได้ติดผนัง',
    ],
    suggestedAction: 'จัดเรียงขวดน้ำยาซักผ้าใส่ตะกร้าสาน วางพรมกันลื่น และกางราวไม้แขวนผ้า',
    iconName: 'Sparkles',
  },

  // 3. หมวดพื้นที่ภายนอกและรอบบ้าน (Exterior & Outdoor Areas)
  {
    id: 'garden-backyard',
    nameTh: 'สวนข้างบ้าน / สวนหลังบ้าน',
    nameEn: 'Garden / Backyard',
    category: 'outdoor',
    description: 'โอเอซิสสีเขียวส่วนตัว กำแพงรั้วตกแต่ง แผ่นทางเดินไม้ หินกรวดแม่น้ำ และมุมพักผ่อน',
    keyElements: [
      'กำแพงรั้วไม้ระแนงตกแต่งพร้อมไฟกิ่งภายนอก',
      'กระถางต้นไม้ดินเผาขนาดใหญ่และแนวหญ้าเขียวสดชื่น',
      'หินกรวดแม่น้ำสีขาวและแผ่นทางเดินไม้ธรรมชาติ',
      'ม้านั่งไม้ยาวกลางแจ้งสำหรับจิบกาแฟชมสวน',
    ],
    suggestedAction: 'เกลี่ยหินกรวด ปูแผ่นทางเดินไม้ และจัดวางกระถางไม้ใบเขียวรอบแนวกำแพง',
    iconName: 'Trees',
  },
  {
    id: 'balcony',
    nameTh: 'ระเบียงคอนโด / ระเบียงบ้าน',
    nameEn: 'Balcony',
    category: 'outdoor',
    description: 'ระเบียงชมวิวโปร่งสบาย ราวกันตกกระจก กระถางต้นไม้แขวน และแสงแดดยามเช้าแสนอบอุ่น',
    keyElements: [
      'ราวกระจกกันตกโปร่งตา มองเห็นวิวกว้างไกล',
      'วิวนอกหน้าต่าง/วิวธรรมชาติหรือวิวเมืองอันสวยงาม',
      'กระถางต้นไม้แขวนประดับและต้นไม้กระถางทรงสูง',
      'โต๊ะกาแฟและเก้าอี้พับไม้มินิมอลรับแสงแดดธรรมชาติ',
    ],
    suggestedAction: 'ปูแผ่นกระเบื้องไม้สำเร็จรูป จัดชุดเก้าอี้กาแฟ และรดน้ำกระถางต้นไม้แขวน',
    iconName: 'Sun',
  },
  {
    id: 'front-yard-garage',
    nameTh: 'ลานหน้าบ้าน / โรงรถ',
    nameEn: 'Front Yard / Garage',
    category: 'outdoor',
    description: 'ลานอเนกประสงค์หน้าบ้าน พื้นคอนกรีตขัด ไฟกิ่งผนัง และแผงเก็บเครื่องมือช่างสุดประณีต',
    keyElements: [
      'พื้นคอนกรีตขัดเรียบหรือแผ่นปูพื้นลายโมเดิร์น',
      'ประตูทางเข้าหน้าบ้านโทนไม้อบอุ่น',
      'ไฟกิ่งติดผนังแสงวอร์มไลท์ (Warm outdoor wall sconces)',
      'แผง Pegboard จัดเก็บอุปกรณ์และเครื่องมือช่างอย่างมีระบบ',
    ],
    suggestedAction: 'ล้างทำความสะอาดพื้นคอนกรีต ติดตั้งแผงแขวนเครื่องมือ และเปิดไฟกิ่งหน้าบ้าน',
    iconName: 'Warehouse',
  },
];

export const STYLE_PRESETS: StyleOption[] = [
  {
    id: 'cozy-japandi-loft',
    nameTh: 'Cozy Industrial-Japandi (ซิกเนเจอร์ยอดนิยม)',
    nameEn: 'Cozy Industrial-Japandi',
    description:
      'การผสมผสานอันสมบูรณ์แบบระหว่างปูนเปลือยฉาบขัดมัน ไม้โอ๊คอ่อนธรรมชาติ และวิวทุ่งนาสีเขียว ให้ความรู้สึกดิบแต่แสนอบอุ่น ผ่อนคลาย',
    wallTexture: 'ผนังปูนเปลือยฉาบขัดมัน (Polished micro-cement/loft walls)',
    floorTexture: 'พื้นไม้ลามิเนตสีโอ๊คอ่อน (Light oak wood floor)',
    colorPalette: ['#E6DFD5', '#D2B48C', '#8A7968', '#4A4036', '#6E8B3D'],
    furnitureTraits: 'เฟอร์นิเจอร์งานไม้ดีไซน์มินิมอล ผสมผสานเบาะผ้าลินินสีเบจครีมและเหล็กดำด้าน',
    lightingMood: 'แสงแดดยามบ่ายส่องผ่านหน้าต่างบานใหญ่ ผสานโคมไฟแสงส้มวอร์มโทน 2700K',
  },
  {
    id: 'loft',
    nameTh: 'Loft (อินดัสเทรียล ลอฟต์)',
    nameEn: 'Industrial Loft',
    description:
      'สไตล์ลอฟต์เท่ ดิบ ชัดเจนด้วยผนังปูนเปลือย โครงสร้างเหล็กสีดำด้าน โคมไฟท่อ และเฟอร์นิเจอร์ไม้แท้สีเข้ม',
    wallTexture: 'ผนังปูนเปลือยขัดหยาบและอิฐโชว์แนวสีส้มอิฐอบอุ่น',
    floorTexture: 'พื้นปูนขัดมันเคลือบเงาหรือไม้สักลายชัด',
    colorPalette: ['#3A3A3A', '#8B4513', '#A89F91', '#1A1A1A', '#C48243'],
    furnitureTraits: 'โครงสร้างเหล็กกล่องสีดำผสมผสานไม้เนื้อแข็งและหนังแท้สีแทน',
    lightingMood: 'หลอดไฟเอดิสันไส้ขดแสงสีส้มทอง และไฟสปอตไลท์ส่องเน้นจุด',
  },
  {
    id: 'minimalist',
    nameTh: 'Minimalist (มินิมอล คลีน สว่าง)',
    nameEn: 'Pure Minimalist',
    description:
      'ความสงบเรียบง่าย เน้นความสะอาดตา ตัดสิ่งไม่จำเป็นออกทั้งหมด เส้นสายตรง คมชัด สีขาวอุ่นและเทาอ่อน',
    wallTexture: 'ผนังทาสีขาวออฟไวท์เนื้อด้านเรียบเนียนไร้รอยต่อ',
    floorTexture: 'พื้นกระเบื้องยางลายไม้บีชโทนสว่างหรือไม้ยางพาราขัดขาว',
    colorPalette: ['#FDFDFD', '#F4F1EA', '#D6D3D1', '#78716C', '#1C1917'],
    furnitureTraits: 'เฟอร์นิเจอร์ทรงเรขาคณิตไร้มือจับ ผิวสัมผัสเนื้อแมตต์ ซ่อนสายไฟและฟังก์ชันจัดเก็บ',
    lightingMood: 'แสงธรรมชาติกระจายทั่วทั้งห้อง (Diffused daylight) เสริมไฟหลืบ Indirect light',
  },
  {
    id: 'japandi',
    nameTh: 'Japandi (เจแปนดี อบอุ่น ผ่อนคลาย)',
    nameEn: 'Warm Japandi',
    description:
      'การบรรจบกันของปรัชญา Wabi-Sabi ญี่ปุ่น และ Hygge สแกนดิเนเวีย เน้นวัสดุธรรมชาติ ผ้าลินิน หวาย และเครื่องปั้นดินเผา',
    wallTexture: 'ผนังฉาบดินธรรมชาติหรือปูนขัดโทนสีทรายอ่อน (Wabi-sabi plaster)',
    floorTexture: 'พื้นไม้สนสีธรรมชาติหรือเสื่อทาทามิประยุกต์',
    colorPalette: ['#F5EBE0', '#E3D5CA', '#D5BDAF', '#9C8875', '#586450'],
    furnitureTraits: 'เฟอร์นิเจอร์เตี้ยติดพื้น โค้งมน งานไม้ดัด และกระดาษสา/ผ้าฝ้ายธรรมชาติ',
    lightingMood: 'โคมไฟกระดาษสไตล์ Noguchi แสงสลัวอบอุ่น นุ่มนวลละมุนตา',
  },
];

export const CONDITION_PRESETS: ConditionOption[] = [
  {
    id: 'empty',
    titleTh: 'สภาพว่างเปล่ายังไม่ตกแต่ง',
    titleEn: 'Clean Empty Space',
    descriptionTh:
      'สภาพห้องสะอาดเรียบร้อย พื้นและผนังดูดีแล้ว แต่ยังเป็นห้องโล่งๆ ที่ไม่มีเฟอร์นิเจอร์หรือการตกแต่งใดๆ',
    initialVisualPrompt:
      'A completely empty and clean room, bare walls, clean floors, clear daylight from a large window, awaiting stylish interior decoration.',
    cleanUpPhaseTh: 'ตรวจเช็คพื้นที่ความสะอาด กวาดฝุ่นรอบห้อง และวัดระยะจัดวางเฟอร์นิเจอร์',
  },
  {
    id: 'messy',
    titleTh: 'สภาพเก่าหรือรกไม่เรียบร้อย',
    titleEn: 'Cluttered & Messy Room',
    descriptionTh:
      'สภาพห้องที่เคยถูกใช้งานมาแล้ว ดูเก่า หรือมีข้าวของวางรกไม่เป็นระเบียบ เต็มไปด้วยเอกสารหรือกล่องที่ยังไม่ได้เก็บกวาด',
    initialVisualPrompt:
      'A cluttered and unorganized room with old cardboard boxes, messy scattered items, dusty surfaces, outdated decor needing complete transformation.',
    cleanUpPhaseTh: 'เคลียร์กล่องพัสดุและสิ่งกีดขวาง ทิ้งขยะ เช็ดถูทำความสะอาดคราบฝุ่นบนพื้นและผนัง',
  },
  {
    id: 'unfinished',
    titleTh: 'สภาพยังไม่เสร็จเรียบร้อย',
    titleEn: 'Under-Construction / Raw State',
    descriptionTh:
      'สภาพห้องที่เพิ่งสร้างหรือรีโนเวทใหม่ ยังไม่เสร็จสมบูรณ์ เช่น ยังเป็นผนังปูนเปลือยที่ไม่ได้ฉาบเรียบ ทาสี หรือยังไม่ได้ปูพื้น/ติดวอลเปเปอร์',
    initialVisualPrompt:
      'A raw under-construction room, unfinished concrete walls, bare subfloor, construction dust, exposed architectural structures needing full renovation.',
    cleanUpPhaseTh: 'เริ่มขั้นตอนงานช่าง ฉาบปรับระดับผนังปูนขัดมัน และเริ่มปูแผ่นพื้นไม้ลามิเนต',
  },
];

export const FORMAT_PRESETS: FormatOption[] = [
  {
    id: 'format1',
    number: 1,
    nameTh: 'รูปแบบที่ 1: Line-by-line Phase Progression',
    nameEn: 'Line-by-line Phase Progression (2 Large Scenes, 10s each)',
    badge: '2 Scenes × 10s = 20s Full Run',
    descriptionTh:
      'แบ่งเป็น 2 ซีนใหญ่ ซีนละ 10 วินาที พร้อมระบุเวลาและเฟสในวงเล็บ [0-3s] Phase 1, [3-7s] Phase 2... เพื่อบังคับให้ AI ประมวลผลทีละขั้นตอนในคลิปยาวต่อเนื่อง',
    structureSummary:
      'Scene 1 (0-10s): Phase 1 (0-3s), Phase 2 (3-7s), Phase 3 (7-10s) | Scene 2 (10-20s): Phase 4 (0-5s), Phase 5 (5-10s) พร้อมป้ายเตือน Use last frame',
    recommendedFor: 'เหมาะสำหรับวิดีโอคลิปยาว 20 วินาทีที่ต้องการความลื่นไหลของงานช่างและงานตกแต่งใน 2 คำสั่ง',
  },
  {
    id: 'format2',
    number: 2,
    nameTh: 'รูปแบบที่ 2: Shot-by-Shot Short Prompts Structure',
    nameEn: 'Shot-by-Shot Short Prompts (7 Fast Jump Cut Shots, 2-4s each)',
    badge: '7 Short Shots (Jump Cut Makeover)',
    descriptionTh:
      'แบ่งเป็น 7 ช็อตสั้นๆ (2-4 วินาทีต่อช็อต) สไตล์ Jump Cut / Satisfying Makeover ระบุทิศทางมุมกล้อง อัตราส่วน 9:16 ตัวละครหญิงเอเชีย และการกระทำ 1 อย่างต่อช็อต',
    structureSummary:
      'Shot 1 (Before) -> Shot 2 (Prep) -> Shot 3 (Wall Finish) -> Shot 4 (Flooring) -> Shot 5 (Furniture Assembly) -> Shot 6 (Decor Details) -> Shot 7 (Final Reveal & Cozy Smile)',
    recommendedFor: 'เหมาะสำหรับทำคลิปสั้นสไตล์ Reels / TikTok / Shorts ที่เน้นจังหวะกระชับ ฉับไว ดูเพลินไม่น่าเบื่อ',
  },
  {
    id: 'format3',
    number: 3,
    nameTh: 'รูปแบบที่ 3: ASMR Time-lapse Storyboard',
    nameEn: 'ASMR Time-lapse Storyboard (2 Large Scenes / 20 Detailed Scenes, 1s each)',
    badge: '20 Sub-Scenes × 1s = Ultimate Timing & ASMR',
    descriptionTh:
      'แบ่งความต่อเนื่องแบบเฟสต่อเฟสอย่างประณีตที่สุด วินาทีต่อวินาที (รวม 20 ฉากย่อย) เพื่อให้การเปลี่ยนแปลงเป็น Step-by-Step และควบคุมจังหวะเสียง ASMR ให้ตรงล็อกเป๊ะ',
    structureSummary:
      'Scene 1: The Foundation & Build (0:00-0:10 / 10 วินาที 10 ฉาก) | Scene 2: The Styling & Final Reveal (0:10-0:20 / 10 วินาที 10 ฉาก พร้อม ⚠️ Use last frame)',
    recommendedFor: 'เหมาะสำหรับงานระดับพรีเมียม ไวรัลคลิปยอดวิวสูง ที่ต้องการควบคุมทั้งภาพ การเคลื่อนไหว และเสียง ASMR ละเอียดที่สุด',
  },
];

export const WINDOW_VIEWS: WindowViewConfig[] = [
  {
    type: 'rice-field',
    labelTh: 'วิวทุ่งนาสีเขียวธรรมชาติ (ตาม Reference Video)',
    descriptionEn: 'Large glass sliding window with a panoramic view of lush green rice fields swaying gently in the countryside breeze, soft natural daylight pouring in.',
  },
  {
    type: 'garden',
    labelTh: 'วิวสวนป่าฝนร่มรื่น (Lush Garden View)',
    descriptionEn: 'Floor-to-ceiling glass window overlooking a serene courtyard garden with tropical green foliage, monstera leaves, and dappled sunlight.',
  },
  {
    type: 'city',
    labelTh: 'วิวเมืองโมเดิร์น (Modern Skyline)',
    descriptionEn: 'Expansive window looking out towards a clean modern skyline with soft warm sunset hues in the sky.',
  },
  {
    type: 'mountain',
    labelTh: 'วิวภูเขาและหมอกบาง (Misty Mountain View)',
    descriptionEn: 'Panoramic window framing misty mountain ridgelines and pine treetops under soft diffused morning light.',
  },
];
