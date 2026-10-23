import {
  DirectorConfig,
  GeneratedPromptResult,
  GeneratedSceneOutput,
  GeneratedShot,
  StoryboardKeyframe,
  PromptFormatMode,
} from '../types/director';
import { MANDATORY_NEGATIVE_PROMPTS } from '../data/spaceData';

export function generateDirectorPrompts(config: DirectorConfig): GeneratedPromptResult {
  const room = config.selectedRoom;
  const style = config.selectedStyle;
  const condition = config.selectedCondition;
  const windowView = config.windowView;
  const character = config.character;
  const format = config.selectedFormat;

  const roomNameEn = config.customRoomName || room.nameEn;
  const roomNameTh = config.customRoomName || room.nameTh;
  const roomElementsDesc = config.customRoomElements || room.keyElements.join(', ');

  // Reference images lock summary
  let imageRefInjection = '';
  if (config.referenceImages && config.referenceImages.length > 0) {
    const refTags = config.referenceImages.map((img) => `${img.tag}: ${img.name}`).join('; ');
    imageRefInjection = ` Maintain strict consistency with attached reference images (${refTags}).`;
  }

  // 1. CONCEPT OVERVIEW
  const conceptOverview = {
    overallStyle: `${style.nameTh} (${style.nameEn}) ผสานแนว Cozy Space Makeover`,
    cozyConcept: `การแปลงโฉมพื้นที่ ${roomNameTh} จาก "${condition.titleTh}" ให้กลายเป็นพื้นที่อันเงียบสงบ อบอุ่น ผ่อนคลาย น่าอยู่ ด้วยแสงธรรมชาติจากหน้าต่างบานใหญ่และแสงไฟส้มโทนอุ่น 2700K ในช่วงท้าย`,
    textures: {
      walls: style.wallTexture,
      floor: style.floorTexture,
      window: `${windowView.labelTh} - ${windowView.descriptionEn}`,
      furniture: `${style.furnitureTraits} พร้อมรายละเอียดองค์ประกอบ: ${roomElementsDesc}`,
    },
    characterDesign: `${character.gender} ${character.ethnicity} สวม${character.lockedOutfitText} (ล็อกชุดเดิมตลอดทั้งคลิป ไม่เปลี่ยนชุด)`,
    audioDesignMood: `ASMR Craftsmanship Soundscape ผสานเสียงธรรมชาตินอกหน้าต่าง: เสียงกวาดทำความสะอาด, เสียงแปรงฉาบปูน, เสียงแผ่นไม้คลิกล็อก, เสียงขันน็อตเฟอร์นิเจอร์, เสียงคลิกสวิตช์ไฟส้ม, และเสียงลมพัดทุ่งนา/ยอดไม้`,
  };

  // 2. GOOGLE FLOW GENERATION PROMPTS
  let googleFlowPrompts: GeneratedPromptResult['googleFlowPrompts'];

  if (format === 'format1') {
    // FORMAT 1: Line-by-line Phase Progression (2 Large Scenes, 10s each)
    const scene1Prompt = `[0-3s] Phase 1: High-angle static shot, 9:16 vertical orientation. Fast-paced time-lapse. ${character.lockedOutfitText} starts by inspecting the ${roomNameEn} in ${condition.titleEn.toLowerCase()}, clearing obstacles, sweeping away residual dust, and laying down baseline tools near the ${windowView.descriptionEn}.
[3-7s] Phase 2: Smooth low-angle panning time-lapse. Structural work unfolds rapidly: she applies smooth micro-cement coating to create clean ${style.wallTexture}, followed by quick-locking planks of ${style.floorTexture} seamlessly covering the floor.
[7-10s] Phase 3: Steady eye-level shot, 9:16 aspect ratio. The empty foundation of the ${style.nameEn} ${roomNameEn} stands pristine with freshly finished walls, immaculate oak flooring, and crystal-clear panoramic window view. Crisp architectural hold, perfectly ready for furniture layout.${imageRefInjection}`;

    const scene2Prompt = `[0-5s] Phase 4: High eye-level static time-lapse, 9:16 aspect ratio. CONTINUITY: Seamless continuation from Scene 1 last frame. ${character.lockedOutfitText} carries in the primary wooden furniture for ${roomNameEn}, placing down ${room.keyElements[0]} and ${room.keyElements[1]}, precisely anchoring them along the wall and window.
[5-10s] Phase 5: Smooth cinematic push-in tracking shot, 9:16 vertical. Final decor styling: she arranges ${room.keyElements[2]}, books, ceramic mug, and green potted plants on the shelves. At the final seconds, she turns on the warm amber 2700K desk lamp, sits down gracefully, and offers a gentle genuine smile directly to the camera against the golden hour countryside backlight.${imageRefInjection}`;

    const scenes: GeneratedSceneOutput[] = [
      {
        sceneTitle: 'Scene 1: The Foundation & Build (วินาทีที่ 0-10)',
        duration: '10 วินาที (10s)',
        promptText: scene1Prompt,
        negativePrompt: MANDATORY_NEGATIVE_PROMPTS,
        asmrAudioTarget:
          'Crisp bristle sweeping sounds, light footsteps on subfloor, rhythmic trowel scraping micro-cement onto walls, satisfying wood-plank snap-and-click locking echoes, subtle outdoor wind ambiance.',
      },
      {
        sceneTitle: 'Scene 2: The Styling & Final Reveal (วินาทีที่ 10-20)',
        duration: '10 วินาที (10s)',
        continuityWarning:
          '⚠️ บังคับเปิดฟีเจอร์ "Use last frame" จากวินาทีที่ 10 ของซีนแรกก่อนสั่งรัน เพื่อล็อกตำแหน่งห้อง หน้าต่างปูนเปลือย และวิวภายนอกให้คงที่ 100%',
        promptText: scene2Prompt,
        negativePrompt: MANDATORY_NEGATIVE_PROMPTS,
        asmrAudioTarget:
          'Heavy smooth wood sliding on floor, soft textile rustle, ceramic mug set down with a clean clink, tactile mechanical click of warm lamp switch, gentle breath of warm ambient room tone.',
      },
    ];

    googleFlowPrompts = {
      formatMode: 'format1',
      formatTitle: 'รูปแบบที่ 1: Line-by-line Phase Progression (2 ซีนใหญ่ ซีนละ 10 วินาที)',
      negativePromptMandatory: MANDATORY_NEGATIVE_PROMPTS,
      scenes,
    };
  } else if (format === 'format2') {
    // FORMAT 2: Shot-by-Shot Short Prompts Structure (7 Short Shots, 2-4s each)
    const shots: GeneratedShot[] = [
      {
        shotNumber: 1,
        timecode: '[0:00-0:03]',
        shotNameTh: 'Shot 1: จุดเริ่มต้นห้องเดิม (Before State)',
        shotNameEn: 'Before Condition Assessment',
        cameraType: 'Wide Establishing Shot',
        duration: '3s',
        promptText: `Wide angle establishing shot, 9:16 vertical ratio. ${character.lockedOutfitText} stands in the center of the ${roomNameEn} assessing the ${condition.titleEn.toLowerCase()}, large window showing ${windowView.descriptionEn}. Natural raw lighting.${imageRefInjection}`,
        negativePrompt: MANDATORY_NEGATIVE_PROMPTS,
        asmrAudioTarget: 'Subtle ambient room echo, single deep breath, faint outdoor birdsong through glass.',
      },
      {
        shotNumber: 2,
        timecode: '[0:03-0:06]',
        shotNameTh: 'Shot 2: เคลียร์พื้นที่และทำความสะอาด (Clear & Clean)',
        shotNameEn: 'Cleaning & Surface Prep',
        cameraType: 'Medium Wide Dynamic Shot',
        duration: '3s',
        promptText: `Medium wide time-lapse shot, 9:16 vertical ratio. ${character.lockedOutfitText} sweeps residual dust with a bamboo broom, wiping down structural ledges, leaving the subfloor spotless.${imageRefInjection}`,
        negativePrompt: MANDATORY_NEGATIVE_PROMPTS,
        asmrAudioTarget: 'Crisp broom bristle sweeping, dry dust particles, cloth wiping squeak.',
      },
      {
        shotNumber: 3,
        timecode: '[0:06-0:09]',
        shotNameTh: 'Shot 3: ปรับปรุงผิวผนัง (Wall Texture Application)',
        shotNameEn: 'Wall Finish & Plastering',
        cameraType: 'Close-up Action Shot',
        duration: '3s',
        promptText: `Close-up dynamic angle, 9:16 vertical ratio. ${character.lockedOutfitText} expertly applies smooth plaster with a stainless trowel, sculpting ${style.wallTexture} with satisfying tactile strokes.${imageRefInjection}`,
        negativePrompt: MANDATORY_NEGATIVE_PROMPTS,
        asmrAudioTarget: 'Wet plaster squelch, metallic trowel gliding smoothly over concrete wall.',
      },
      {
        shotNumber: 4,
        timecode: '[0:09-0:12]',
        shotNameTh: 'Shot 4: ปูพื้นไม้ธรรมชาติ (Flooring Installation)',
        shotNameEn: 'Oak Flooring Lock',
        cameraType: 'Low-angle Close-up Shot',
        duration: '3s',
        promptText: `Low-angle tracking shot, 9:16 vertical ratio. ${character.lockedOutfitText} taps interlocking planks of ${style.floorTexture} into position using a wooden mallet until perfectly seamless.${imageRefInjection}`,
        negativePrompt: MANDATORY_NEGATIVE_PROMPTS,
        asmrAudioTarget: 'Solid rhythmic wooden mallet taps, crisp interlocking wood-click locking sounds.',
      },
      {
        shotNumber: 5,
        timecode: '[0:12-0:15]',
        shotNameTh: 'Shot 5: ประกอบและจัดวางเฟอร์นิเจอร์หลัก (Main Furniture Placement)',
        shotNameEn: 'Primary Furniture Assembly',
        cameraType: 'Wide Eye-Level Shot',
        duration: '3s',
        promptText: `Wide eye-level time-lapse, 9:16 vertical ratio. ${character.lockedOutfitText} glides primary wooden furniture into place: ${room.keyElements[0]} and ${room.keyElements[1]}, dressing with natural linen textiles.${imageRefInjection}`,
        negativePrompt: MANDATORY_NEGATIVE_PROMPTS,
        asmrAudioTarget: 'Smooth wood sliding friction over floor, soft fabric shaking and settling, tightening bolt clicks.',
      },
      {
        shotNumber: 6,
        timecode: '[0:15-0:18]',
        shotNameTh: 'Shot 6: ตกแต่งสิ่งของขนาดเล็กและงานศิลปะ (Decor & Lighting Styling)',
        shotNameEn: 'Styling & Art Placement',
        cameraType: 'Medium Close-up Tracking Shot',
        duration: '3s',
        promptText: `Medium close-up slow tracking shot, 9:16 vertical ratio. ${character.lockedOutfitText} places ${room.keyElements[2]}, art frames with painted graphics, ceramic vase, and fresh greenery onto wooden surfaces.${imageRefInjection}`,
        negativePrompt: MANDATORY_NEGATIVE_PROMPTS,
        asmrAudioTarget: 'Gentle ceramic cup placement on timber, glass frame adjustment, leafy rustling sound.',
      },
      {
        shotNumber: 7,
        timecode: '[0:18-0:20]',
        shotNameTh: 'Shot 7: เปิดตัวความสำเร็จและแสงส้มอบอุ่น (Final Reveal & Warm Smile)',
        shotNameEn: 'Final Reveal & Atmosphere',
        cameraType: 'Cinematic Slow Push-in Shot',
        duration: '2s',
        promptText: `Cinematic slow push-in shot, 9:16 vertical ratio. Golden hour sunlight filters through the sheer curtain into the fully transformed ${style.nameEn} ${roomNameEn}. Warm 2700K lamp glows cozily. ${character.lockedOutfitText} sits comfortably in the completed space, looking up with a serene warm smile toward the camera.${imageRefInjection}`,
        negativePrompt: MANDATORY_NEGATIVE_PROMPTS,
        asmrAudioTarget: 'Warm analog lamp switch click, calming soft ambient drone, peaceful outdoor wind chime.',
      },
    ];

    googleFlowPrompts = {
      formatMode: 'format2',
      formatTitle: 'รูปแบบที่ 2: Shot-by-Shot Short Prompts Structure (7 ช็อตสั้น ช็อตละ 2-4 วินาที)',
      negativePromptMandatory: MANDATORY_NEGATIVE_PROMPTS,
      shots,
    };
  } else {
    // FORMAT 3: ASMR Time-lapse Storyboard (2 Large Scenes / 20 Detailed Scenes, 1s each)
    const scene1SubPrompts = `[0:00-0:01] Scene 1: Before / Eye-level static wide shot, 9:16. The ${roomNameEn} starts in ${condition.titleEn.toLowerCase()} condition with bare boundaries and daylight pouring from ${windowView.descriptionEn}.
[0:01-0:02] Scene 2: Preparation / ${character.lockedOutfitText} enters with cleaning supplies, sweeping away residual dust and debris into a dustpan.
[0:02-0:03] Scene 3: Material Inflow / Time-lapse accelerates: scaffolding, buckets of plaster, and neat bundles of timber materials glide into the room perimeter.
[0:03-0:04] Scene 4: Wall Base Coating / Close-up diagonal angle: she applies initial base coat of ${style.wallTexture} across the main feature wall with decisive strokes.
[0:04-0:05] Scene 5: Wall Finish Perfection / Panning shot: the micro-cement finish sets smoothly, revealing uniform velvety texture and matte reflection.
[0:05-0:06] Scene 6: Subfloor & Underlay / Low-angle floor-level shot: laying down soundproofing foam underlay onto the clean concrete subfloor.
[0:06-0:07] Scene 7: Flooring Interlock / Rapid floor time-lapse: planks of ${style.floorTexture} snap into place row by row, completing the entire floor expanse.
[0:07-0:08] Scene 8: Wall Fixture Mounting / Medium shot: using a cordless drill to securely mount structural wall shelves and real artwork frames (no empty frames).
[0:08-0:09] Scene 9: Final Dust Sweeping / She damp-mops the freshly laid oak floor, removing fine sawdust to reveal rich golden wood grain sheen.
[0:09-0:10] Scene 10: Structural Milestone Hold / High-angle pristine hold: the architectural envelope of ${style.nameEn} is 100% complete, flawless and ready for furniture.${imageRefInjection}`;

    const scene2SubPrompts = `[0:10-0:11] Scene 11: Main Rug & Heavy Frame / CONTINUITY ANCHOR: From Scene 1 last frame. A large textured natural fiber rug rolls out, and main wooden furniture base slides into room center.
[0:11-0:12] Scene 12: Furniture Assembly / ${character.lockedOutfitText} assembles ${room.keyElements[0]}, fitting comfortable cushions in warm beige linen.
[0:12-0:13] Scene 13: Work & Accent Station / She positions ${room.keyElements[1]} precisely near the panoramic window frame, aligning angles with outdoor light.
[0:13-0:14] Scene 14: Lighting Fixture Setup / Tight shot: screwing in warm-tone LED bulbs and positioning ${room.keyElements[2]} on table surface.
[0:14-0:15] Scene 15: Small Personal Objects / Arranging ceramic coffee mug, open notebook, and laptop on the smooth oak desk.
[0:16-0:17] Scene 16: Shelf Styling & Botanicals / Placing terracotta potted plants, curated books, and minimalist dried floral arrangements onto the wall shelves.
[0:17-0:18] Scene 17: Sheer Curtains Hanging / Installing soft white sheer linen curtains on a slim black rod, diffusing the bright window daylight into a soft dreamy haze.
[0:18-0:19] Scene 18: Final Detail Alignment / She fluffs the accent cushions, aligns tabletop ceramics, and checks every detail with satisfying precision.
[0:19-0:20] Scene 19: Atmospheric Illumination / Evening glow descends: turning on the warm 2700K amber desk lamp, washing the room in golden cozy serenity.
[0:20-0:20] Scene 20: Final Reveal & Peaceful Smile / Cinematic tracking close: she sits back comfortably in the finished space, turning to smile warmly at the camera.${imageRefInjection}`;

    const scenes: GeneratedSceneOutput[] = [
      {
        sceneTitle: 'Scene 1: The Foundation & Build (วินาทีที่ 0-10 / 10 ฉากย่อย)',
        duration: '10 วินาที (10s)',
        promptText: scene1SubPrompts,
        negativePrompt: MANDATORY_NEGATIVE_PROMPTS,
        asmrAudioTarget:
          '[0-1s: Quiet room silence] [1-2s: Dry broom sweeping] [2-3s: Tools clanking] [3-5s: Wet plaster scraping trowel] [5-7s: Foam roll out & crisp interlocking floor snaps] [7-8s: Cordless drill whir] [8-9s: Wet mop glide] [9-10s: Satisfying clean room echo].',
      },
      {
        sceneTitle: 'Scene 2: The Styling & Final Reveal (วินาทีที่ 10-20 / 10 ฉากย่อย)',
        duration: '10 วินาที (10s)',
        continuityWarning:
          '⚠️ บังคับเปิดฟีเจอร์ "Use last frame" จากวินาทีที่ 10 ของซีนแรกก่อนสั่งรัน เพื่อล็อกตำแหน่งห้อง หน้าต่างปูนเปลือย และวิวภายนอกให้คงที่ 100%',
        promptText: scene2SubPrompts,
        negativePrompt: MANDATORY_NEGATIVE_PROMPTS,
        asmrAudioTarget:
          '[10-11s: Heavy rug unrolling thud] [11-13s: Smooth timber slide] [13-14s: Bulb screw-in squeak] [14-16s: Ceramic clink on oak & leafy rustle] [16-17s: Curtain rings gliding on rod] [17-18s: Cushion pat] [18-19s: Crisp tactile lamp click] [19-20s: Deep warm cozy room ambiance].',
      },
    ];

    googleFlowPrompts = {
      formatMode: 'format3',
      formatTitle: 'รูปแบบที่ 3: ASMR Time-lapse Storyboard (2 ซีนใหญ่ ซีนละ 10 วินาที / รวม 20 ฉากย่อย)',
      negativePromptMandatory: MANDATORY_NEGATIVE_PROMPTS,
      scenes,
    };
  }

  // 3. STEP-BY-STEP WORKFLOW IN GOOGLE FLOW
  const stepByStepWorkflow = [
    {
      stepNumber: 1,
      titleTh: 'สร้างโปรเจกต์ใหม่และตั้งค่าเฟรม (Project Setup)',
      actionDetail:
        'เข้าสู่ Google Flow เลือกโมเดล Veo3-Quality (หรือ Veo3.1). ปรับอัตราส่วนหน้าจอเป็น 9:16 (Vertical) สำหรับคลิปสไตล์ Reels / TikTok / Shorts และตั้งระยะเวลา (Duration) เป็น 10 วินาที (10s)',
      veoSettings: {
        aspectRatio: '9:16',
        duration: '10s',
        model: 'Veo3-Quality',
        resolution: '1080p',
      },
      continuityTips:
        'หากมีรูปภาพอ้างอิงใบหน้าตัวละครหรือเฟอร์นิเจอร์ ให้กดแท็บ "Image Reference" แนบรูปพร้อมระบุแท็กก่อนกด Generate',
    },
    {
      stepNumber: 2,
      titleTh: 'รันซีนที่ 1: โครงสร้างและงานช่าง (Generate Scene 1: The Foundation)',
      actionDetail:
        'คัดลอกพรอมต์ "Scene 1: The Foundation & Build" วางลงในช่อง Prompt และคัดลอกกล่อง Mandatory Negative Prompt วางในช่อง Negative Prompt จากนั้นกด Generate รอจนคลิป 10 วินาทีประมวลผลเสร็จ',
      veoSettings: {
        aspectRatio: '9:16',
        duration: '10s',
        model: 'Veo3-Quality',
        resolution: '1080p',
      },
      continuityTips:
        'สังเกตวินาทีที่ 10 ว่าผนังปูนเปลือย พื้นไม้ และวิวหน้าต่างหยุดอยู่ในสภาพที่สมบูรณ์แบบ',
    },
    {
      stepNumber: 3,
      titleTh: 'ล็อกความต่อเนื่องด้วย "Use Last Frame" (Mandatory Continuity Lock)',
      actionDetail:
        '⚠️ สำคัญที่สุด: คลิกขวาหรือกดปุ่มตัวเลือกที่คลิปซีนแรก แล้วเลือกเปิดฟังก์ชัน "Use last frame" (หรือ Set as First Frame for next scene) เพื่อดึงภาพวินาทีที่ 10.0 มาเป็นจุดเริ่มต้นของซีนที่ 2 ป้องกันไม่ให้ห้องบิดเบี้ยวหรือตำแหน่งหน้าต่างสลับจุด',
      veoSettings: {
        aspectRatio: '9:16',
        duration: '10s',
        model: 'Veo3-Quality (Extended)',
        resolution: '1080p',
      },
      continuityTips:
        'ห้ามข้ามขั้นตอนนี้เด็ดขาด เพื่อรักษาให้วิวทุ่งนาและมุมกล้องของห้องสอดประสานกัน 100%',
    },
    {
      stepNumber: 4,
      titleTh: 'รันซีนที่ 2: จัดวางเฟอร์นิเจอร์และเปิดตัว (Generate Scene 2: The Styling)',
      actionDetail:
        'คัดลอกพรอมต์ "Scene 2: The Styling & Final Reveal" พร้อมกล่อง Negative Prompt วางลงในระบบ แล้วกด Generate ซีนที่ 2 ความยาว 10 วินาที',
      veoSettings: {
        aspectRatio: '9:16',
        duration: '10s',
        model: 'Veo3-Quality',
        resolution: '1080p',
      },
      continuityTips:
        'ระบบ Veo3 จะต่อยอดการจัดเฟอร์นิเจอร์ การเปิดไฟ และการส่งยิ้มของตัวละครอย่างต่อเนื่องสมจริง',
    },
  ];

  // 4. EDITING & ENGAGEMENT TIPS
  const editingAndEngagementTips = [
    {
      tipTitle: 'ตัดต่อแบบ Beat Sync กับเพลงสไตล์ Lofi / Chill Beats',
      tipDetail:
        'นำฟุตเทจทั้ง 2 ซีนมารวมกันในโปรแกรมตัดต่อ (CapCut / Premiere) ตัดเชื่อมเฟรมวินาทีที่ 10 ให้เนียนที่สุด แล้วตัดสลับจังหวะของตกแต่งให้ตรงกับเสียง Kick และ Snare ของเพลง',
      viralHookIdea: 'เปิดคลิป 1-2 วินาทีแรกด้วยภาพห้องเดิมที่รกหรือโล่ง พร้อมข้อความ "ทำห้องใหม่ในงบหลักร้อย!" หรือ "เปลี่ยนห้องร้างเป็นสตูดิโอในฝัน"',
    },
    {
      tipTitle: 'เล่นกับคอนทราสต์แสงธรรมชาติสู่แสงโคมไฟส้ม (Lighting Contrast)',
      tipDetail:
        'เน้นย้ำความแตกต่างระหว่างแสงแดดสดใสจากวิวหน้าต่างในช่วงต้น สู่แสงอบอุ่นโทนสีส้ม 2700K จากโคมไฟในช่วงท้าย จะทำให้ผู้ชมรู้สึกอบอุ่น สบายใจ และอยากดูซ้ำ (High Replay Rate)',
      viralHookIdea: 'ใช้เอฟเฟกต์เสียง ASMR "คลิกสวิตช์ไฟ" ให้ดังชัดเจนช่วง 2 วินาทีสุดท้ายเพื่อสร้างความฟิน (Satisfying ASMR payoff)',
    },
    {
      tipTitle: 'การล็อกความสนใจด้วย Jump Cut และ Zoom-in Detail',
      tipDetail:
        'ในส่วนจัดของประดับขนาดเล็กช่วงท้ายคลิป ให้ใส่การซูมช้าๆ (Slow Zoom In 105%) เจาะลึกผิวไม้โอ๊คและแก้วเซรามิกเพื่อโชว์ความประณีตระดับ 4K',
      viralHookIdea: 'ใส่คำถามกระตุ้นคอมเมนต์: "ชอบสไตล์ปูนเปลือยหรือไม้โอ๊คมากกว่ากัน? คอมเมนต์บอกหน่อย!"',
    },
  ];

  // 5. Captions & Hashtags
  const captionsAndHashtags = {
    hookTh: `✨ จากพื้นที่โล่งสู่ ${roomNameTh} สไตล์ ${style.nameTh} ที่อบอุ่นจนไม่อยากออกไปไหน!`,
    hookEn: `✨ Transforming a raw space into a dreamy cozy ${style.nameEn} ${roomNameEn}!`,
    captionTh: `แปลงโฉม ${roomNameTh} ด้วยโทนปูนเปลือยฉาบขัดมันผสานงานไม้โอ๊คอ่อน ละมุนตาด้วยแสงธรรมชาติริมหน้าต่าง ทุกชิ้นจัดวางอย่างตั้งใจเพื่อให้ได้บรรยากาศสงบ ผ่อนคลายที่สุด 🌿🕯️ ลองเอาไอเดียนี้ไปแต่งตามกันได้เลย!`,
    captionEn: `Full time-lapse makeover of our ${roomNameEn}. Blending raw micro-cement textures with warm oak timber and gentle golden hour daylight. A calming sanctuary to start every morning right 🤍`,
    hashtagsTh: [
      `#แต่งห้องสไตล์${style.nameTh.split(' ')[0]}`,
      `#รีโนเวท${roomNameTh}`,
      '#ไอเดียแต่งห้อง',
      '#ห้องในฝัน',
      '#ASMRรีโนเวท',
      '#GoogleFlow',
      '#Veo3',
    ],
    hashtagsEn: [
      '#RoomMakeover',
      '#SpaceTransformation',
      '#CozyJapandi',
      '#InteriorDesignTimeLapse',
      '#GoogleFlow',
      '#Veo3',
      '#LoftLiving',
    ],
  };

  // 6. STORYBOARD PROMPTS (ขนาด 9:16)
  let storyboardImages: GeneratedPromptResult['storyboardPrompts']['storyboardImages'] = [];

  if (format === 'format1') {
    // 2 images: Scene 1 (Phase 1, 2A, 2B, 3) & Scene 2 (Phase 4, 5)
    storyboardImages = [
      {
        imageTitle: 'สตอรี่บอร์ดภาพที่ 1: ซีนที่ 1 (งานโครงสร้างและพื้นผิว Phase 1 ถึง Phase 3)',
        aspectRatio: '9:16 Vertical Grid',
        frameCoverage: 'ครอบคลุม Phase 1 เคลียร์พื้นที่, Phase 2A ฉาบปูนเปลือย, Phase 2B ปูพื้นไม้, Phase 3 สรุปโครงสร้างห้อง/จุดล็อกเฟรม',
        hasContinuityLock: true,
        storyboardImagePrompt: `A 4-panel vertical storyboard strip in 9:16 aspect ratio, cinematic lighting, ultra-detailed architectural rendering.
Panel 1 (Top, Phase 1 [0-3s]): Asian female character in earth-tone outfit sweeping clean an empty ${roomNameEn} in front of ${windowView.descriptionEn}.
Panel 2 (Phase 2A [3-5s]): Close-up action applying smooth micro-cement plaster onto walls.
Panel 3 (Phase 2B [5-7s]): Low angle snapping light oak wood laminate planks across the floor.
Panel 4 (Bottom, Phase 3 [7-10s]): Pristine empty ${style.nameEn} room ready for furniture, sharp clean lines, labelled "⚠️ CONTINUITY LOCK: Use Last Frame".
Clean graphic dividers, timecode labels [0-3s], [3-5s], [5-7s], [7-10s], crisp 8k photorealistic quality.`,
        keyframes: [
          {
            id: 1,
            timecode: '[0-3s]',
            titleTh: 'Phase 1: เคลียร์พื้นที่และเตรียมฐาน',
            titleEn: 'Space Clearing & Prep',
            cameraAngle: 'High-angle Static Wide',
            cameraMotion: 'Static with subtle drift',
            actionSummaryTh: 'กวาดทำความสะอาดฝุ่นและตรวจระยะห้อง',
            asmrTarget: 'Bristle sweeping & dust settling',
            imagePrompt: `Asian woman sweeping empty ${roomNameEn}, daylight from large window showing green fields, 9:16.`,
          },
          {
            id: 2,
            timecode: '[3-5s]',
            titleTh: 'Phase 2A: ฉาบปูนเปลือยผนังห้อง',
            titleEn: 'Micro-cement Plastering',
            cameraAngle: 'Dynamic Low-angle Close-up',
            cameraMotion: 'Slow upward tilt',
            actionSummaryTh: 'ใช้เกรียงฉาบปูนเปลือยขัดมันลงบนผนัง',
            asmrTarget: 'Wet plaster scraping squeaks',
            imagePrompt: `Close-up hands with stainless trowel smoothing polished micro-cement on wall, 9:16.`,
          },
          {
            id: 3,
            timecode: '[5-7s]',
            titleTh: 'Phase 2B: ปูแผ่นพื้นไม้ลามิเนต',
            titleEn: 'Oak Flooring Installation',
            cameraAngle: 'Low-angle Tracking',
            cameraMotion: 'Lateral tracking along floor',
            actionSummaryTh: 'วางแผ่นไม้โอ๊คอ่อนล็อกเข้าลิ้นแนบสนิท',
            asmrTarget: 'Solid interlocking wood click',
            imagePrompt: `Low angle shot of hands tapping light oak laminate flooring planks into place, 9:16.`,
          },
          {
            id: 4,
            timecode: '[7-10s]',
            titleTh: 'Phase 3: สรุปโครงสร้างห้องใหม่ (จุดล็อกเฟรม)',
            titleEn: 'Structural Milestone & Frame Lock',
            cameraAngle: 'Eye-level Wide Master',
            cameraMotion: 'Static anchor hold',
            actionSummaryTh: 'ห้องเปล่าโครงสร้างเสร็จสมบูรณ์ 100% พร้อมล็อกเฟรม',
            asmrTarget: 'Clean ambient room silence',
            useLastFrameAnchor: true,
            imagePrompt: `Pristine empty ${style.nameEn} room with finished polished concrete walls and oak floor, sunny window, 9:16.`,
          },
        ],
      },
      {
        imageTitle: 'สตอรี่บอร์ดภาพที่ 2: ซีนที่ 2 (การจัดเฟอร์นิเจอร์และเปิดตัว Phase 4 ถึง Phase 5)',
        aspectRatio: '9:16 Vertical Grid',
        frameCoverage: 'ครอบคลุม Phase 4 จัดวางเฟอร์นิเจอร์หลัก, Phase 5 ตกแต่งของชิ้นเล็กและเปิดตัวพร้อมแสงส้มอบอุ่น',
        hasContinuityLock: false,
        storyboardImagePrompt: `A 3-panel vertical storyboard strip in 9:16 aspect ratio, warm cozy atmosphere, ultra-detailed interior photography.
Panel 1 (Top, Phase 4 [0-5s]): Asian woman in earth-tone outfit moving main wooden furniture into place in the ${style.nameEn} ${roomNameEn}.
Panel 2 (Middle, Phase 5A [5-8s]): Close-up arranging ceramics, books, and green potted plants on wooden shelves.
Panel 3 (Bottom, Phase 5B [8-10s]): The woman sitting peacefully in the completed cozy room, warm 2700K amber lamp glowing, smiling at camera under soft twilight.
Clean minimalist framing, timecode labels [0-5s], [5-8s], [8-10s], hyper-detailed textures, 8k quality.`,
        keyframes: [
          {
            id: 5,
            timecode: '[10-15s / 0-5s]',
            titleTh: 'Phase 4: จัดวางเฟอร์นิเจอร์หลัก',
            titleEn: 'Main Furniture Placement',
            cameraAngle: 'Eye-level Master Shot',
            cameraMotion: 'Slow push-in',
            actionSummaryTh: 'ยกโต๊ะ โครงเตียง/โซฟาหลักเข้าตำแหน่ง',
            asmrTarget: 'Heavy wood sliding friction',
            imagePrompt: `Asian woman arranging minimalist wooden furniture inside modern cozy loft room, 9:16.`,
          },
          {
            id: 6,
            timecode: '[15-18s / 5-8s]',
            titleTh: 'Phase 5A: ตกแต่งสิ่งของและจัดองค์ประกอบ',
            titleEn: 'Styling & Micro Decor',
            cameraAngle: 'Medium Close-up',
            cameraMotion: 'Subtle lateral pan',
            actionSummaryTh: 'จัดวางหนังสือ แจกันดอกไม้ และกระถางต้นไม้',
            asmrTarget: 'Ceramic clinks & plant leaf rustle',
            imagePrompt: `Hands styling decorative pottery and green plants on light oak desk, 9:16.`,
          },
          {
            id: 7,
            timecode: '[18-20s / 8-10s]',
            titleTh: 'Phase 5B: เปิดไฟส้มอบอุ่นและส่งยิ้มเปิดตัว',
            titleEn: 'Cozy Glow & Final Smile',
            cameraAngle: 'Cinematic Push-in',
            cameraMotion: 'Slow gentle push-in to character',
            actionSummaryTh: 'เปิดไฟส้ม 2700K และนั่งพักพร้อมรอยยิ้มอย่างมีความสุข',
            asmrTarget: 'Lamp switch click & warm room resonance',
            imagePrompt: `Asian woman sitting in dream ${style.nameEn} room with glowing warm table lamp, smiling warmly, 9:16.`,
          },
        ],
      },
    ];
  } else if (format === 'format2') {
    // 1 image: 7 keyframes jump cut
    storyboardImages = [
      {
        imageTitle: 'สตอรี่บอร์ด 7 คีย์เฟรมแยกช็อต สไตล์ Jump Cut (1 รูป ขนาด 9:16)',
        aspectRatio: '9:16 Vertical Multi-Panel Grid (7 Keyframes)',
        frameCoverage: 'ช็อตที่ 1 ถึงช็อตที่ 7 ตามลำดับวินาทีการแปลงโฉมห้อง',
        hasContinuityLock: true,
        storyboardImagePrompt: `A 7-panel vertical collage storyboard in 9:16 aspect ratio showing dynamic room transformation.
Shot 1 [0-3s]: Before state of ${roomNameEn}.
Shot 2 [3-6s]: Asian woman sweeping and preparing floor.
Shot 3 [6-9s]: Close-up hands troweling smooth concrete on wall.
Shot 4 [9-12s]: Tapping oak floor planks into place.
Shot 5 [12-15s]: Assembling primary wooden furniture.
Shot 6 [15-18s]: Styling small accessories and plants.
Shot 7 [18-20s]: Final reveal with glowing warm light and relaxed warm smile.
Sleek cinematic presentation, bold timecode stamps, 8k resolution, photorealistic interior design.`,
        keyframes: (googleFlowPrompts.shots || []).map((sh) => ({
          id: sh.shotNumber,
          timecode: sh.timecode,
          titleTh: sh.shotNameTh,
          titleEn: sh.shotNameEn,
          cameraAngle: sh.cameraType,
          cameraMotion: 'Dynamic jump-cut pacing',
          actionSummaryTh: sh.promptText.slice(0, 75) + '...',
          asmrTarget: sh.asmrAudioTarget,
          useLastFrameAnchor: sh.shotNumber === 4,
          imagePrompt: `${sh.promptText.replace(/\(.*\)/g, '')}, 9:16 photorealistic.`,
        })),
      },
    ];
  } else {
    // FORMAT 3: 2 images (Scene 1-10 1 รูป, Scene 11-20 1 รูป)
    storyboardImages = [
      {
        imageTitle: 'สตอรี่บอร์ด ซีน 1: The Foundation & Build (10 วินาที 10 ฉากย่อย / 1 รูป 9:16)',
        aspectRatio: '9:16 Vertical 10-Frame Contact Sheet',
        frameCoverage: 'ฉากย่อย 1 ถึง 10 วินาทีต่อวินาที พร้อมป้ายเตือน Use last frame ที่วินาที 10',
        hasContinuityLock: true,
        storyboardImagePrompt: `A 10-frame vertical contact sheet storyboard in 9:16 ratio for Scene 1 (The Foundation & Build).
Frames 1-10 progressing second-by-second:
1. Bare room before
2. Sweeping
3. Materials moving in
4. Troweling micro-cement wall
5. Polished wall finish
6. Floor underlay
7. Oak floor click
8. Wall shelf drilling
9. Sawdust wiping
10. Architectural milestone hold with bright warning banner '⚠️ USE LAST FRAME'.
Crisp timecodes [0:00] to [0:10], immaculate architectural details, photorealistic Japandi-loft style.`,
        keyframes: [
          { id: 1, timecode: '[0:00-0:01]', titleTh: 'ฉาก 1: Before ห้องเดิม', titleEn: 'Before Condition', cameraAngle: 'Eye-level Static', cameraMotion: 'Static', actionSummaryTh: 'จุดเริ่มต้นห้องโล่ง/สภาพเดิม', asmrTarget: 'Room silence', imagePrompt: 'Empty room before makeover' },
          { id: 2, timecode: '[0:01-0:02]', titleTh: 'ฉาก 2: เตรียมพื้นที่', titleEn: 'Preparation & Sweep', cameraAngle: 'High-angle', cameraMotion: 'Subtle tilt', actionSummaryTh: 'กวาดฝุ่น เคลียร์สิ่งกีดขวาง', asmrTarget: 'Bristle sweep', imagePrompt: 'Woman sweeping dust' },
          { id: 3, timecode: '[0:02-0:03]', titleTh: 'ฉาก 3: ขนย้ายวัสดุ', titleEn: 'Materials Inflow', cameraAngle: 'Wide time-lapse', cameraMotion: 'Fast-forward', actionSummaryTh: 'นำปูน ไม้ เครื่องมือเข้าฉาก', asmrTarget: 'Tools clanking', imagePrompt: 'Wood planks and plaster arriving' },
          { id: 4, timecode: '[0:03-0:04]', titleTh: 'ฉาก 4: ฉาบปูนเปลือยผนัง', titleEn: 'Wall Plastering 1', cameraAngle: 'Close-up Diagonal', cameraMotion: 'Smooth glide', actionSummaryTh: 'ฉาบเกรียงขึ้นลายผนังขัดมัน', asmrTarget: 'Wet plaster scraping', imagePrompt: 'Hand plastering concrete wall' },
          { id: 5, timecode: '[0:04-0:05]', titleTh: 'ฉาก 5: ผนังเสร็จเนียนตา', titleEn: 'Wall Plastering 2', cameraAngle: 'Medium Panning', cameraMotion: 'Slow lateral pan', actionSummaryTh: 'ผิวผนังเรียบเนียนสม่ำเสมอ', asmrTarget: 'Plaster drying tone', imagePrompt: 'Finished micro-cement wall' },
          { id: 6, timecode: '[0:05-0:06]', titleTh: 'ฉาก 6: ปูแผ่นรองพื้น', titleEn: 'Floor Underlay', cameraAngle: 'Low-angle', cameraMotion: 'Tracking', actionSummaryTh: 'ปูโฟมรองพื้นเก็บเสียง', asmrTarget: 'Foam roll glide', imagePrompt: 'Laying acoustic foam underlay' },
          { id: 7, timecode: '[0:06-0:07]', titleTh: 'ฉาก 7: แผ่นพื้นคลิกล็อก', titleEn: 'Flooring Lock', cameraAngle: 'Close-up Floor Level', cameraMotion: 'Low tracking', actionSummaryTh: 'ล็อกแผ่นไม้โอ๊คเต็มพื้นที่', asmrTarget: 'Wood plank snap click', imagePrompt: 'Snapping oak floor planks' },
          { id: 8, timecode: '[0:07-0:08]', titleTh: 'ฉาก 8: ติดตั้งชั้นผนัง', titleEn: 'Wall Fixtures', cameraAngle: 'Medium Action', cameraMotion: 'Subtle push', actionSummaryTh: 'เจาะยึดชั้นและภาพศิลปะจริง', asmrTarget: 'Cordless drill whir', imagePrompt: 'Mounting wooden shelves on wall' },
          { id: 9, timecode: '[0:08-0:09]', titleTh: 'ฉาก 9: เช็ดทำความสะอาด', titleEn: 'Sawdust Wipe', cameraAngle: 'Eye-level', cameraMotion: 'Medium pan', actionSummaryTh: 'ถูเก็บฝุ่นไม้จนพื้นขึ้นเงา', asmrTarget: 'Wet mop glide', imagePrompt: 'Mopping clean wooden floor' },
          { id: 10, timecode: '[0:09-0:10]', titleTh: 'ฉาก 10: สรุปโครงสร้างใหม่', titleEn: 'Foundation Milestone', cameraAngle: 'High-angle Master Hold', cameraMotion: 'Static Anchor', actionSummaryTh: 'ห้องเปล่าโครงสร้างเสร็จ 100% ล็อกเฟรม', asmrTarget: 'Clean room silence', useLastFrameAnchor: true, imagePrompt: 'Empty finished architectural room ready for styling' },
        ],
      },
      {
        imageTitle: 'สตอรี่บอร์ด ซีน 2: The Styling & Final Reveal (10 วินาที 10 ฉากย่อย / 1 รูป 9:16)',
        aspectRatio: '9:16 Vertical 10-Frame Contact Sheet',
        frameCoverage: 'ฉากย่อย 11 ถึง 20 วินาทีต่อวินาที จากวินาทีที่ 10 สู่การเปิดตัวและแสงส้มอบอุ่น',
        hasContinuityLock: false,
        storyboardImagePrompt: `A 10-frame vertical contact sheet storyboard in 9:16 ratio for Scene 2 (The Styling & Final Reveal).
Frames 11-20 progressing second-by-second:
11. Rug rolling out
12. Main furniture assembly
13. Placing table near window
14. Lighting fixture setup
15. Placing laptop and coffee mug
16. Plants and books on shelves
17. Hanging sheer curtains
18. Cushion fluffing
19. Switching on warm 2700K amber lamp
20. Woman sitting comfortably, smiling warmly at camera.
Photorealistic, cozy golden hour light, beautiful typography timecodes [0:10] to [0:20].`,
        keyframes: [
          { id: 11, timecode: '[0:10-0:11]', titleTh: 'ฉาก 11: ปูพรมและเริ่มจัดเฟอร์ฯ', titleEn: 'Rug & Core Base', cameraAngle: 'High Eye-level', cameraMotion: 'Slow drift', actionSummaryTh: 'ปูพรมผืนใหญ่ เลื่อนโครงหลักเข้าฉาก', asmrTarget: 'Rug unroll thud', imagePrompt: 'Rolling out textured rug' },
          { id: 12, timecode: '[0:11-0:12]', titleTh: 'ฉาก 12: ประกอบเฟอร์นิเจอร์', titleEn: 'Furniture Assembly', cameraAngle: 'Medium Time-lapse', cameraMotion: 'Subtle tilt', actionSummaryTh: 'จัดวางเบาะและโครงสร้างหลัก', asmrTarget: 'Fabric fluff and cushion', imagePrompt: 'Assembling wooden furniture' },
          { id: 13, timecode: '[0:12-0:13]', titleTh: 'ฉาก 13: วางโต๊ะริมหน้าต่าง', titleEn: 'Window Station', cameraAngle: 'Medium Wide', cameraMotion: 'Push toward window', actionSummaryTh: 'ขยับโต๊ะและเก้าอี้เข้ามุมชมวิว', asmrTarget: 'Timber slide on floor', imagePrompt: 'Placing oak desk near bright window' },
          { id: 14, timecode: '[0:13-0:14]', titleTh: 'ฉาก 14: ติดตั้งระบบไฟ', titleEn: 'Lamp Installation', cameraAngle: 'Close-up Hands', cameraMotion: 'Tight focus', actionSummaryTh: 'หมุนหลอดไฟ จัดสายโคมไฟตั้งโต๊ะ', asmrTarget: 'Bulb screw squeak', imagePrompt: 'Hands screwing warm LED bulb' },
          { id: 15, timecode: '[0:14-0:15]', titleTh: 'ฉาก 15: ตกแต่งของใช้ส่วนตัว', titleEn: 'Personal Gadgets', cameraAngle: 'Medium Close-up', cameraMotion: 'Lateral drift', actionSummaryTh: 'วางแล็ปท็อป แก้วกาแฟเซรามิก', asmrTarget: 'Ceramic mug clink on oak', imagePrompt: 'Setting laptop and ceramic cup' },
          { id: 16, timecode: '[0:15-0:16]', titleTh: 'ฉาก 16: ตกแต่งต้นไม้และหนังสือ', titleEn: 'Botanical & Books', cameraAngle: 'Close-up Shelf', cameraMotion: 'Upward tilt', actionSummaryTh: 'จัดหนังสือและกระถางต้นไม้ใบเขียว', asmrTarget: 'Leafy plant rustle', imagePrompt: 'Styling plants and books on shelf' },
          { id: 17, timecode: '[0:16-0:17]', titleTh: 'ฉาก 17: ติดตั้งผ้าม่านโปร่ง', titleEn: 'Sheer Curtains', cameraAngle: 'Wide Backlit', cameraMotion: 'Slow glide', actionSummaryTh: 'แขวนผ้าม่านสีขาวกรองแสงอาทิตย์', asmrTarget: 'Curtain rings gliding on rod', imagePrompt: 'Hanging sheer white curtains' },
          { id: 18, timecode: '[0:17-0:18]', titleTh: 'ฉาก 18: ตรวจทานความเรียบร้อย', titleEn: 'Detail Check', cameraAngle: 'Medium Close-up', cameraMotion: 'Subtle pan', actionSummaryTh: 'จัดหมอนอิง เช็ดหน้าจอให้เรียบเนียน', asmrTarget: 'Cushion pat & cloth wipe', imagePrompt: 'Fluffing cushions on seating' },
          { id: 19, timecode: '[0:18-0:19]', titleTh: 'ฉาก 19: เปิดระบบไฟส้มอบอุ่น', titleEn: 'Atmospheric Glow', cameraAngle: 'Atmospheric Medium', cameraMotion: 'Slow push-in', actionSummaryTh: 'เปิดไฟส้ม 2700K ห้องเปลี่ยนสู่อารมณ์อบอุ่น', asmrTarget: 'Tactile switch click', imagePrompt: 'Warm table lamp turning on in dusk room' },
          { id: 20, timecode: '[0:19-0:20]', titleTh: 'ฉาก 20: Final Result ส่งยิ้ม', titleEn: 'Final Reveal & Smile', cameraAngle: 'Cinematic Push-in Close', cameraMotion: 'Cinematic push to face', actionSummaryTh: 'นั่งลงบนเก้าอี้อย่างผ่อนคลายและส่งยิ้มให้กล้อง', asmrTarget: 'Gentle breath & cozy ambient drone', imagePrompt: 'Woman smiling warmly in finished cozy space' },
        ],
      },
    ];
  }

  return {
    conceptOverview,
    googleFlowPrompts,
    stepByStepWorkflow,
    editingAndEngagementTips,
    captionsAndHashtags,
    storyboardPrompts: {
      formatMode: format,
      storyboardImages,
    },
  };
}
