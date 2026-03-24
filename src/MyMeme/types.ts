export type AppPhase = 'home' | 'editor' | 'generating' | 'result';

export interface Character {
  id: string;
  name: string;
  avatar: string;    // local import for display
  refUrl: string;    // public URL for API img2img reference
}

export interface MemeStyle {
  id: string;
  nameKey: string;
  descKey: string;
  category: 'work' | 'daily' | 'social' | 'tech';
  layout?: 'lr' | 'tb';        // left-right (default) or top-bottom
  promptTemplate: string;       // prompt with {character}, {scene1}, {scene2}
  defaultScene1: string;        // default left/top panel text
  defaultScene2: string;        // default right/bottom panel text
  preview?: string;             // preview image import
}

export type FilterTab = 'all' | 'work' | 'daily' | 'social' | 'tech' | 'vertical';
