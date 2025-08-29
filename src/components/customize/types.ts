// Type definitions for the CustomizeScreen component

export type StickerDef = { 
  id: string; 
  src: string; 
  w: number; 
  h: number; 
  rotation?: number; 
};

export type PlacedSticker = { 
  id: string; 
  src: string; 
  x: number; 
  y: number; 
  scale: number; 
  r: number; 
  z: number; 
};

export type ImageDimensions = {
  width: number;
  height: number;
};

export type RotationDirection = 'left' | 'right' | null;

export type ResizeCorner = 'nw' | 'ne' | 'sw' | 'se';

export interface CustomizeScreenProps {
  uploadedImage: string | null;
  onComplete?: () => void;
}

export interface PlacedStickerComponentProps {
  sticker: PlacedSticker; 
  stickerDef: StickerDef;
  onUpdate: (id: string, updates: Partial<PlacedSticker>) => void;
  onDragEnd: (e: React.DragEvent, sticker: PlacedSticker, dragOffset: { x: number; y: number }) => void;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  photoDropRef: React.RefObject<HTMLDivElement>;
  imageDimensions: ImageDimensions;
}