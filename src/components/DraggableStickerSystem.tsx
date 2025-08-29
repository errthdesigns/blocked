import { useState, useCallback } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { motion } from 'motion/react';

interface DroppedSticker {
  id: string;
  imageSrc: string;
  x: number;
  y: number;
  originalWidth: number;
  originalHeight: number;
  rotation?: number;
}

interface DraggableStickerProps {
  imageSrc: string;
  width: number;
  height: number;
  rotation?: number;
  style?: React.CSSProperties;
  id: string;
}

interface ImageDropZoneProps {
  children: React.ReactNode;
  onDrop: (item: any, offset: { x: number; y: number }) => void;
  imageStyle: React.CSSProperties;
}

const ItemType = 'STICKER';

function DraggableSticker({ imageSrc, width, height, rotation = 0, style = {}, id }: DraggableStickerProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { id, imageSrc, width, height, rotation },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <motion.div
      ref={drag}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundImage: `url('${imageSrc}')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab',
        transform: rotation ? `rotate(${rotation}deg)` : undefined,
        ...style,
      }}
      whileHover={{ 
        scale: 1.06,
        filter: 'drop-shadow(0 8px 16px rgba(255, 255, 255, 0.3)) drop-shadow(0 0 12px rgba(255, 0, 255, 0.4))',
        transition: { duration: 0.2, ease: 'easeInOut' }
      }}
    />
  );
}

function ImageDropZone({ children, onDrop, imageStyle }: ImageDropZoneProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (item, monitor) => {
      console.log('Drop triggered!', { item }); // Debug log
      const offset = monitor.getClientOffset();
      console.log('Client offset:', offset); // Debug log
      if (offset) {
        // Calculate relative position within the image
        const dropZoneElement = (drop as any).current;
        if (dropZoneElement) {
          const rect = dropZoneElement.getBoundingClientRect();
          const relativeX = offset.x - rect.left;
          const relativeY = offset.y - rect.top;
          
          console.log('Drop zone rect:', rect, 'Relative position:', { relativeX, relativeY }); // Debug log
          
          // Only trigger drop if within bounds
          if (relativeX >= 0 && relativeY >= 0 && relativeX <= rect.width && relativeY <= rect.height) {
            console.log('Within bounds, calling onDrop'); // Debug log
            onDrop(item, { x: relativeX, y: relativeY });
          } else {
            console.log('Outside bounds, not dropping'); // Debug log
          }
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        ...imageStyle,
        border: isOver ? '3px dashed #00FF00' : 'none',
        position: 'relative',
      }}
    >
      {children}
    </div>
  );
}

interface DraggableStickerSystemProps {
  uploadedImage: string | null;
  imageContainerStyle: React.CSSProperties;
  staticStickers: Array<{
    id: string;
    imageSrc: string;
    style?: React.CSSProperties;
    width: number;
    height: number;
    rotation?: number;
    containerStyle?: React.CSSProperties;
  }>;
  draggableStickers: Array<{
    id: string;
    imageSrc: string;
    style?: React.CSSProperties;
    width: number;
    height: number;
    rotation?: number;
    containerStyle?: React.CSSProperties;
  }>;
}

export default function DraggableStickerSystem({ 
  uploadedImage, 
  imageContainerStyle, 
  staticStickers,
  draggableStickers 
}: DraggableStickerSystemProps) {
  const [droppedStickers, setDroppedStickers] = useState<DroppedSticker[]>([]);

  const handleStickerDrop = useCallback((item: any, offset: { x: number; y: number }) => {
    const halfWidth = item.width / 2;
    const halfHeight = item.height / 2;
    
    const newSticker: DroppedSticker = {
      id: `${item.id}-${Date.now()}`, // Unique ID for each drop
      imageSrc: item.imageSrc,
      x: Math.max(0, Math.min(offset.x - halfWidth/2, 349 - halfWidth)), // Keep within image bounds
      y: Math.max(0, Math.min(offset.y - halfHeight/2, 390 - halfHeight)),
      originalWidth: halfWidth, // Half size
      originalHeight: halfHeight,
      rotation: item.rotation || 0,
    };
    
    console.log('Dropping sticker:', { item, offset, newSticker }); // Debug log
    setDroppedStickers(prev => {
      const updated = [...prev, newSticker];
      console.log('Updated dropped stickers:', updated); // Debug log
      return updated;
    });
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {/* Static Stickers (not draggable) */}
        {staticStickers.map((sticker) => {
          if (sticker.containerStyle) {
            return (
              <div key={sticker.id} style={sticker.containerStyle}>
                <motion.div
                  style={{
                    width: `${sticker.width}px`,
                    height: `${sticker.height}px`,
                    backgroundImage: `url('${sticker.imageSrc}')`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    transform: sticker.rotation ? `rotate(${sticker.rotation}deg)` : undefined,
                    ...(sticker.style || {})
                  }}
                  whileHover={{ 
                    scale: 1.06,
                    filter: 'drop-shadow(0 8px 16px rgba(255, 255, 255, 0.3)) drop-shadow(0 0 12px rgba(255, 0, 255, 0.4))',
                    transition: { duration: 0.2, ease: 'easeInOut' }
                  }}
                />
              </div>
            );
          } else {
            return (
              <motion.div
                key={sticker.id}
                style={{
                  width: `${sticker.width}px`,
                  height: `${sticker.height}px`,
                  backgroundImage: `url('${sticker.imageSrc}')`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  transform: sticker.rotation ? `rotate(${sticker.rotation}deg)` : undefined,
                  ...(sticker.style || {})
                }}
                whileHover={{ 
                  scale: 1.06,
                  filter: 'drop-shadow(0 8px 16px rgba(255, 255, 255, 0.3)) drop-shadow(0 0 12px rgba(255, 0, 255, 0.4))',
                  transition: { duration: 0.2, ease: 'easeInOut' }
                }}
              />
            );
          }
        })}

        {/* Draggable Stickers */}
        {draggableStickers.map((sticker) => {
          if (sticker.containerStyle) {
            return (
              <div key={sticker.id} style={sticker.containerStyle}>
                <DraggableSticker
                  id={sticker.id}
                  imageSrc={sticker.imageSrc}
                  width={sticker.width}
                  height={sticker.height}
                  rotation={sticker.rotation}
                  style={sticker.style || {}}
                />
              </div>
            );
          } else {
            return (
              <DraggableSticker
                key={sticker.id}
                id={sticker.id}
                imageSrc={sticker.imageSrc}
                width={sticker.width}
                height={sticker.height}
                rotation={sticker.rotation}
                style={sticker.style || {}}
              />
            );
          }
        })}

        {/* Debug: Show dropped stickers count */}
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 999,
          background: 'rgba(255,0,0,0.8)',
          color: 'white',
          padding: '5px',
          fontSize: '12px',
          borderRadius: '3px'
        }}>
          Dropped: {droppedStickers.length}
        </div>

        {/* Image Drop Zone */}
        <ImageDropZone onDrop={handleStickerDrop} imageStyle={imageContainerStyle}>
          {uploadedImage && (
            <img
              src={uploadedImage}
              alt="Uploaded"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)'
              }}
            />
          )}
          
          {/* Dropped Stickers Overlay */}
          {droppedStickers.map((sticker) => (
            <div
              key={sticker.id}
              style={{
                position: 'absolute',
                left: `${sticker.x}px`,
                top: `${sticker.y}px`,
                width: `${sticker.originalWidth}px`,
                height: `${sticker.originalHeight}px`,
                transform: sticker.rotation ? `rotate(${sticker.rotation}deg)` : undefined,
                backgroundImage: `url('${sticker.imageSrc}')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                pointerEvents: 'none', // Prevent interference with further drops
                zIndex: 20,
                border: '2px solid red', // Temporary debug border to see if stickers are rendering
              }}
            />
          ))}
        </ImageDropZone>
      </div>
    </DndProvider>
  );
}