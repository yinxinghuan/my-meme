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
  promptTemplate: string;       // prompt with {character}, {scene1}, {scene2}
  defaultScene1: string;        // default left panel / scene 1 text
  defaultScene2: string;        // default right panel / scene 2 text
  preview?: string;             // preview image import
}
