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
  promptTemplate: string;       // full prompt with {character} placeholder
  preview?: string;             // preview image import
}
