export type RoomCategory = 'living' | 'utility' | 'outdoor' | 'custom';

export interface RoomOption {
  id: string;
  nameTh: string;
  nameEn: string;
  category: RoomCategory;
  description: string;
  keyElements: string[];
  suggestedAction: string;
  iconName: string;
}

export type DesignStyle = 'cozy-japandi-loft' | 'loft' | 'minimalist' | 'japandi' | 'custom';

export interface StyleOption {
  id: DesignStyle;
  nameTh: string;
  nameEn: string;
  description: string;
  wallTexture: string;
  floorTexture: string;
  colorPalette: string[];
  furnitureTraits: string;
  lightingMood: string;
}

export type RoomCondition = 'empty' | 'messy' | 'unfinished' | 'custom';

export interface ConditionOption {
  id: RoomCondition;
  titleTh: string;
  titleEn: string;
  descriptionTh: string;
  initialVisualPrompt: string;
  cleanUpPhaseTh: string;
}

export type PromptFormatMode = 'format1' | 'format2' | 'format3';

export interface FormatOption {
  id: PromptFormatMode;
  number: number;
  nameTh: string;
  nameEn: string;
  badge: string;
  descriptionTh: string;
  structureSummary: string;
  recommendedFor: string;
}

export interface ImageReference {
  id: string;
  name: string;
  dataUrl: string;
  tag: 'character' | 'furniture' | 'decor' | 'style' | 'window-view';
  note: string;
}

export interface CharacterConfig {
  gender: string;
  ethnicity: string;
  outfitColor: string;
  outfitDetails: string;
  lockedOutfitText: string;
}

export interface WindowViewConfig {
  type: 'rice-field' | 'garden' | 'city' | 'mountain' | 'custom';
  labelTh: string;
  descriptionEn: string;
}

export interface DirectorConfig {
  step: 1 | 2 | 3 | 4 | 'output';
  selectedRoom: RoomOption;
  customRoomName?: string;
  customRoomElements?: string;
  selectedStyle: StyleOption;
  customStyleDesc?: string;
  selectedCondition: ConditionOption;
  customConditionDesc?: string;
  windowView: WindowViewConfig;
  character: CharacterConfig;
  referenceImages: ImageReference[];
  selectedFormat: PromptFormatMode;
  aiRefined?: boolean;
}

export interface GeneratedPhase {
  timecode: string;
  phaseTitle: string;
  promptText: string;
  cameraMovement: string;
  asmrAudioTarget: string;
  visualSummary: string;
}

export interface GeneratedShot {
  shotNumber: number;
  timecode: string;
  shotNameTh: string;
  shotNameEn: string;
  cameraType: string;
  duration: string;
  promptText: string;
  negativePrompt: string;
  asmrAudioTarget: string;
  decorDetailFocus?: string;
}

export interface GeneratedSceneOutput {
  sceneTitle: string;
  duration: string;
  continuityWarning?: string;
  promptText: string;
  negativePrompt: string;
  asmrAudioTarget: string;
  phases?: GeneratedPhase[];
}

export interface StoryboardKeyframe {
  id: number;
  timecode: string;
  titleTh: string;
  titleEn: string;
  cameraAngle: string;
  cameraMotion: string;
  actionSummaryTh: string;
  asmrTarget: string;
  useLastFrameAnchor?: boolean;
  imagePrompt: string;
}

export interface GeneratedPromptResult {
  conceptOverview: {
    overallStyle: string;
    cozyConcept: string;
    textures: {
      walls: string;
      floor: string;
      window: string;
      furniture: string;
    };
    characterDesign: string;
    audioDesignMood: string;
  };
  googleFlowPrompts: {
    formatMode: PromptFormatMode;
    formatTitle: string;
    negativePromptMandatory: string;
    scenes?: GeneratedSceneOutput[];
    shots?: GeneratedShot[];
  };
  stepByStepWorkflow: {
    stepNumber: number;
    titleTh: string;
    actionDetail: string;
    veoSettings: {
      aspectRatio: string;
      duration: string;
      model: string;
      resolution: string;
    };
    continuityTips: string;
  }[];
  editingAndEngagementTips: {
    tipTitle: string;
    tipDetail: string;
    viralHookIdea: string;
  }[];
  captionsAndHashtags: {
    hookTh: string;
    hookEn: string;
    captionTh: string;
    captionEn: string;
    hashtagsTh: string[];
    hashtagsEn: string[];
  };
  storyboardPrompts: {
    formatMode: PromptFormatMode;
    storyboardImages: {
      imageTitle: string;
      aspectRatio: string;
      frameCoverage: string;
      hasContinuityLock: boolean;
      storyboardImagePrompt: string;
      keyframes: StoryboardKeyframe[];
    }[];
  };
}
