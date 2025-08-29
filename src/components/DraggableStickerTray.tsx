import { useState } from 'react';
import { motion } from 'motion/react';
import imgImage18 from "figma:asset/1ffd47cb9d4a47e07f8aa50dea5f36f79c34eee4.png";
import imgGroup171 from "figma:asset/1ce035b5fa2e574bf38750d3f8e21c18505183f8.png";
import imgGroup22 from "figma:asset/d85c3eb857456ec96e23a929daffcd28374729dd.png";
import imgImage2 from "figma:asset/aba441c6984ddd88966846b48f2d123550cf1b3b.png";
import imgImage17 from "figma:asset/9eb72bff05e63bf1a10a6d0e0e9a1a7848730efc.png";
import imgGroup122 from "figma:asset/9318e762097bdb0a643cc925f5de9ae11fa1c92c.png";
import imgGroup32 from "figma:asset/fead91a18d276467d72427f35a1a6aa2c9baa7c7.png";
import imgImage6 from "figma:asset/7e3670b5570ecbbdbf2fd131bb36b9e26e07f87d.png";
import imgImage12 from "figma:asset/feed20764d16a1b14475aeac38e5b14342ea170e.png";
import imgImage1 from "figma:asset/59db2a219c37ee84a5118dcb99d24a4b13204a11.png";
import imgGroup161 from "figma:asset/d64d9cb8d649e238ff21365988ab6e1801c4c985.png";
import { STICKER_POSITIONS } from './sticker-positioning-constants';

type StickerDef = { id: string; src: string; w: number; h: number; rotation?: number; };

interface DraggableStickerTrayProps {
  onDragEnd: (e: React.DragEvent, sticker: StickerDef) => void;
}

const stickerDefs: StickerDef[] = [
  { id: 'image18', src: imgImage18, w: 460, h: 184 },
  { id: 'group171', src: imgGroup171, w: 692.843, h: 337.168, rotation: 345 },
  { id: 'group22', src: imgGroup22, w: 200, h: 200 },
  { id: 'image2', src: imgImage2, w: 330.068, h: 239.992, rotation: 337.051 },
  { id: 'image17', src: imgImage17, w: 440.93, h: 335.133, rotation: 27.352 },
  { id: 'group122-1', src: imgGroup122, w: 315, h: 315 },
  { id: 'group32', src: imgGroup32, w: 529.137, h: 186.057, rotation: 6.3 },
  { id: 'image6', src: imgImage6, w: 172, h: 92 },
  { id: 'image12', src: imgImage12, w: 124.393, h: 123.007, rotation: 313.482 },
  { id: 'image1', src: imgImage1, w: 308, h: 100 },
  { id: 'group161', src: imgGroup161, w: 195, h: 195 },
];

function DraggableSticker({ stickerDef, style, containerStyle, onDragEnd }: { 
  stickerDef: StickerDef; style?: React.CSSProperties; containerStyle?: React.CSSProperties;
  onDragEnd: (e: React.DragEvent, sticker: StickerDef) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.setData('application/json', JSON.stringify(stickerDef));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setIsDragging(false);
    onDragEnd(e, stickerDef);
  };

  const stickerElement = (
    <motion.div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{
        width: `${stickerDef.w}px`, height: `${stickerDef.h}px`,
        backgroundImage: `url('${stickerDef.src}')`, backgroundPosition: 'center',
        backgroundSize: 'contain', backgroundRepeat: 'no-repeat',
        opacity: isDragging ? 0.5 : 1, cursor: isDragging ? 'grabbing' : 'grab',
        transform: stickerDef.rotation ? `rotate(${stickerDef.rotation}deg)` : undefined,
        pointerEvents: 'auto', imageRendering: 'crisp-edges',
        backfaceVisibility: 'hidden', isolation: 'isolate',
        flexShrink: stickerDef.id === 'group32' ? 0 : undefined,
        aspectRatio: stickerDef.id === 'group32' ? '259/65' : undefined,
        ...style,
      }}
      whileHover={{ 
        scale: 1.06,
        filter: 'drop-shadow(0 8px 16px rgba(255, 255, 255, 0.3)) drop-shadow(0 0 12px rgba(255, 0, 255, 0.4))',
        transition: { duration: 0.2, ease: 'easeInOut' }
      }}
    />
  );

  return containerStyle ? <div style={containerStyle}>{stickerElement}</div> : stickerElement;
}

export default function DraggableStickerTray({ onDragEnd }: DraggableStickerTrayProps) {
  return (
    <>
      <DraggableSticker stickerDef={stickerDefs.find(s => s.id === 'image18')!} style={{ position: 'absolute', ...STICKER_POSITIONS.image18, zIndex: 10 }} onDragEnd={onDragEnd} />
      <DraggableSticker stickerDef={stickerDefs.find(s => s.id === 'group171')!} containerStyle={{ position: 'absolute', ...STICKER_POSITIONS.group171, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }} style={{ borderRadius: '25px' }} onDragEnd={onDragEnd} />
      <DraggableSticker stickerDef={stickerDefs.find(s => s.id === 'group22')!} style={{ position: 'absolute', ...STICKER_POSITIONS.group22, zIndex: 10 }} onDragEnd={onDragEnd} />
      <DraggableSticker stickerDef={stickerDefs.find(s => s.id === 'image2')!} containerStyle={{ position: 'absolute', ...STICKER_POSITIONS.image2, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }} onDragEnd={onDragEnd} />
      <DraggableSticker stickerDef={stickerDefs.find(s => s.id === 'image17')!} containerStyle={{ position: 'absolute', ...STICKER_POSITIONS.image17, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }} onDragEnd={onDragEnd} />
      <DraggableSticker stickerDef={stickerDefs.find(s => s.id === 'group122-1')!} style={{ position: 'absolute', ...STICKER_POSITIONS.group121, zIndex: 10 }} onDragEnd={onDragEnd} />
      <DraggableSticker stickerDef={stickerDefs.find(s => s.id === 'group32')!} containerStyle={{ position: 'absolute', ...STICKER_POSITIONS.group32, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }} onDragEnd={onDragEnd} />
      <DraggableSticker stickerDef={stickerDefs.find(s => s.id === 'image6')!} style={{ position: 'absolute', ...STICKER_POSITIONS.image6, zIndex: 10 }} onDragEnd={onDragEnd} />
      <DraggableSticker stickerDef={stickerDefs.find(s => s.id === 'image12')!} containerStyle={{ position: 'absolute', ...STICKER_POSITIONS.image12, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }} onDragEnd={onDragEnd} />
      <DraggableSticker stickerDef={stickerDefs.find(s => s.id === 'image1')!} style={{ position: 'absolute', ...STICKER_POSITIONS.image1, zIndex: 10 }} onDragEnd={onDragEnd} />
      <DraggableSticker stickerDef={stickerDefs.find(s => s.id === 'group161')!} style={{ position: 'absolute', ...STICKER_POSITIONS.group161, zIndex: 10 }} onDragEnd={onDragEnd} />
    </>
  );
}