import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { normalizeRotation, getResizeCornerPositions } from './helpers';
import { RESIZE_CONFIG, ROTATION_CONFIG, ANIMATION_CONFIG, UI_SPACING, Z_INDICES } from './constants';
import type { PlacedStickerComponentProps, RotationDirection } from './types';

export default function PlacedStickerComponent({ 
  sticker, 
  stickerDef, 
  onUpdate, 
  onDragEnd,
  isSelected,
  onSelect,
  onDelete,
  photoDropRef,
  imageDimensions
}: PlacedStickerComponentProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [rotationDirection, setRotationDirection] = useState<RotationDirection>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

  const handleDragStart = (e: React.DragEvent) => {
    if (isResizing || isRotating) return;
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEndInternal = (e: React.DragEvent) => {
    setIsDragging(false);
    onDragEnd(e, sticker, dragOffset);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(sticker.id);
    setShowContextMenu(false);
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect(sticker.id);
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
  };

  // Hide context menu when clicking elsewhere
  useEffect(() => {
    const hideContextMenu = () => setShowContextMenu(false);
    if (showContextMenu) {
      document.addEventListener('click', hideContextMenu);
      return () => document.removeEventListener('click', hideContextMenu);
    }
  }, [showContextMenu]);

  const handleStickerMouseDown = (e: React.MouseEvent) => {
    if (isResizing || isRotating) return;
    e.stopPropagation();
    e.preventDefault();

    setIsDragging(true);
    const startX = e.clientX;
    const startY = e.clientY;
    const startStickerX = sticker.x;
    const startStickerY = sticker.y;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      const newX = startStickerX + deltaX;
      const newY = startStickerY + deltaY;

      // Constrain to photo bounds
      const constrainedX = Math.max(0, Math.min(imageDimensions.width - stickerWidth, newX));
      const constrainedY = Math.max(0, Math.min(imageDimensions.height - stickerHeight, newY));

      onUpdate(sticker.id, { x: constrainedX, y: constrainedY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleResizeStart = (e: React.MouseEvent, corner: string) => {
    e.stopPropagation();
    e.preventDefault();
    setIsResizing(true);

    const startX = e.clientX;
    const startY = e.clientY;
    const startScale = sticker.scale;
    const centerX = sticker.x + (stickerDef.w * sticker.scale) / 2;
    const centerY = sticker.y + (stickerDef.h * sticker.scale) / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      // Calculate scale based on corner position
      let scaleMultiplier = 1;
      
      if (corner === 'se') {
        scaleMultiplier = 1 + (deltaX + deltaY) / RESIZE_CONFIG.SENSITIVITY;
      } else if (corner === 'nw') {
        scaleMultiplier = 1 + (-deltaX - deltaY) / RESIZE_CONFIG.SENSITIVITY;
      } else if (corner === 'ne') {
        scaleMultiplier = 1 + (deltaX - deltaY) / RESIZE_CONFIG.SENSITIVITY;
      } else if (corner === 'sw') {
        scaleMultiplier = 1 + (-deltaX + deltaY) / RESIZE_CONFIG.SENSITIVITY;
      }

      const newScale = Math.max(RESIZE_CONFIG.MIN_SCALE, Math.min(RESIZE_CONFIG.MAX_SCALE, startScale * scaleMultiplier));

      // Update position to keep center point stable
      const newWidth = stickerDef.w * newScale;
      const newHeight = stickerDef.h * newScale;
      const newX = centerX - newWidth / 2;
      const newY = centerY - newHeight / 2;

      // Constrain to photo bounds
      const constrainedX = Math.max(0, Math.min(imageDimensions.width - newWidth, newX));
      const constrainedY = Math.max(0, Math.min(imageDimensions.height - newHeight, newY));

      onUpdate(sticker.id, { 
        scale: newScale,
        x: constrainedX,
        y: constrainedY
      });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleRotateStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);

    const startRotation = sticker.r || 0;
    const startMouseX = e.clientX;
    let lastMouseX = startMouseX;
    let velocity = 0;
    let lastTime = Date.now();

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      const deltaTime = Math.max(1, currentTime - lastTime);
      const deltaX = e.clientX - lastMouseX;
      
      // Calculate velocity for momentum
      velocity = deltaX / deltaTime;
      
      // Update rotation direction indicator
      if (deltaX > 0) {
        setRotationDirection('right');
      } else if (deltaX < 0) {
        setRotationDirection('left');
      }
      
      // Smooth rotation speed
      const totalDelta = e.clientX - startMouseX;
      const newRotation = startRotation + (totalDelta * ROTATION_CONFIG.SPEED);
      
      // Normalize rotation to clean -180 to +180 range
      const normalizedRotation = normalizeRotation(newRotation);
      
      onUpdate(sticker.id, { r: normalizedRotation });
      
      lastMouseX = e.clientX;
      lastTime = currentTime;
    };

    const handleMouseUp = () => {
      setIsRotating(false);
      setRotationDirection(null);
      
      // Add momentum-based rotation continuation
      if (Math.abs(velocity) > ROTATION_CONFIG.MOMENTUM_THRESHOLD) {
        const momentumRotation = velocity * ROTATION_CONFIG.MOMENTUM_MULTIPLIER;
        const currentRotation = sticker.r || 0;
        const finalRotation = currentRotation + momentumRotation;
        
        // Normalize final rotation to clean -180 to +180 range
        const normalizedFinalRotation = normalizeRotation(finalRotation);
        
        // Smooth momentum animation
        onUpdate(sticker.id, { r: normalizedFinalRotation });
      }
      
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const stickerWidth = stickerDef.w * sticker.scale;
  const stickerHeight = stickerDef.h * sticker.scale;
  const cornerPositions = getResizeCornerPositions();

  return (
    <div
      style={{
        position: 'absolute',
        left: `${sticker.x}px`,
        top: `${sticker.y}px`,
        width: `${stickerWidth}px`,
        height: `${stickerHeight}px`,
        zIndex: isSelected ? sticker.z + Z_INDICES.SELECTED_BOOST : sticker.z,
      }}
    >
      {/* Main Sticker */}
      <motion.div
        draggable={false}
        onClick={handleClick}
        onContextMenu={handleRightClick}
        onMouseDown={isSelected ? handleStickerMouseDown : undefined}
        animate={{
          rotate: sticker.r || 0
        }}
        transition={{ 
          type: isRotating ? "tween" : "spring", 
          duration: isRotating ? ANIMATION_CONFIG.FAST_ROTATION_DURATION : undefined,
          stiffness: isRotating ? undefined : ANIMATION_CONFIG.SPRING_STIFFNESS,
          damping: isRotating ? undefined : ANIMATION_CONFIG.SPRING_DAMPING,
          ease: isRotating ? "linear" : undefined
        }}
        style={{
          width: '100%',
          height: '100%',
          backgroundImage: `url('${sticker.src}')`,
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          transformOrigin: 'center center',
          opacity: isDragging ? 0.5 : 1,
          cursor: isSelected ? 'move' : 'grab',
          pointerEvents: 'auto',
          border: isSelected ? '2px solid #00FFFF' : 'none',
          borderRadius: '4px',
          imageRendering: 'crisp-edges',
          backfaceVisibility: 'hidden',
          isolation: 'isolate',
        }}
        whileHover={!isSelected ? { 
          scale: 1.02,
          filter: 'drop-shadow(0 4px 8px rgba(255, 255, 255, 0.2))',
          transition: { duration: ANIMATION_CONFIG.HOVER_DURATION, ease: 'easeInOut' }
        } : {}}
      />
      
      {/* Rotation indicator and instructions */}
      {isSelected && (
        <div style={{
          position: 'absolute',
          top: `${UI_SPACING.TOOLTIP_TOP}px`,
          left: '0px',
          background: isRotating ? 'rgba(255,107,0,0.9)' : 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '6px 10px',
          borderRadius: '6px',
          fontSize: '12px',
          pointerEvents: 'none',
          zIndex: Z_INDICES.TOOLTIP,
          transition: 'background-color 0.2s ease',
          whiteSpace: 'nowrap',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>
            {isRotating ? 
              `${rotationDirection === 'right' ? '↻' : rotationDirection === 'left' ? '↺' : ''} ${sticker.r || 0}°` : 
              `${sticker.r || 0}°`}
          </div>
          <div style={{ fontSize: '10px', opacity: 0.8 }}>
            Press Delete/Backspace or click ×
          </div>
        </div>
      )}

      {/* Selection Handles */}
      {isSelected && (
        <>
          {/* Rotation Handle - Click to rotate */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              const currentRotation = sticker.r || 0;
              const newRotation = currentRotation + ROTATION_CONFIG.CLICK_INCREMENT;
              const normalizedRotation = normalizeRotation(newRotation);
              onUpdate(sticker.id, { r: normalizedRotation });
            }}
            onMouseDown={(e) => {
              handleRotateStart(e);
            }}
            style={{
              position: 'absolute',
              top: `${UI_SPACING.ROTATION_HANDLE_TOP}px`,
              left: '50%',
              transform: 'translateX(-50%)',
              width: `${UI_SPACING.ROTATION_HANDLE_SIZE}px`,
              height: `${UI_SPACING.ROTATION_HANDLE_SIZE}px`,
              backgroundColor: isRotating ? '#FF8C00' : '#FF6B00',
              borderRadius: '50%',
              cursor: isRotating ? 'grabbing' : 'pointer',
              border: '3px solid white',
              zIndex: Z_INDICES.HANDLES,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              color: 'white',
              fontWeight: 'bold',
              boxShadow: isRotating ? '0 4px 8px rgba(255,140,0,0.5)' : '0 3px 6px rgba(0,0,0,0.3)',
              userSelect: 'none',
              pointerEvents: 'auto',
              transition: 'all 0.2s ease',
            }}
            title="Click to rotate 45° or drag horizontally for smooth rotation (-180° to +180°)"
          >
            ↻
          </div>

          {/* Line from sticker to rotation handle */}
          <div
            style={{
              position: 'absolute',
              top: `${UI_SPACING.LINE_TOP}px`,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '2px',
              height: `${UI_SPACING.LINE_HEIGHT}px`,
              backgroundColor: '#00FFFF',
              zIndex: Z_INDICES.LINE,
              pointerEvents: 'none',
            }}
          />

          {/* Delete Button - Enhanced */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              onDelete(sticker.id);
            }}
            style={{
              position: 'absolute',
              top: `${UI_SPACING.DELETE_BUTTON_TOP}px`,
              right: `${UI_SPACING.DELETE_BUTTON_RIGHT}px`,
              width: `${UI_SPACING.DELETE_BUTTON_SIZE}px`,
              height: `${UI_SPACING.DELETE_BUTTON_SIZE}px`,
              backgroundColor: '#DD500B',
              borderRadius: '50%',
              cursor: 'pointer',
              border: '3px solid white',
              zIndex: Z_INDICES.HANDLES,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              color: 'white',
              fontWeight: 'bold',
              boxShadow: '0 2px 8px rgba(255, 0, 0, 0.4)',
              transition: 'all 0.2s ease',
            }}
            title="Delete sticker (or press Delete/Backspace)"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.backgroundColor = '#CC0000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.backgroundColor = '#DD500B';
            }}
          >
            ×
          </div>

          {/* Corner Resize Handles */}
          {['nw', 'ne', 'sw', 'se'].map((corner) => (
            <div
              key={corner}
              onMouseDown={(e) => handleResizeStart(e, corner)}
              style={{
                position: 'absolute',
                ...cornerPositions[corner as keyof typeof cornerPositions],
                width: `${UI_SPACING.RESIZE_HANDLE_SIZE}px`,
                height: `${UI_SPACING.RESIZE_HANDLE_SIZE}px`,
                backgroundColor: '#00FFFF',
                border: '2px solid white',
                borderRadius: '2px',
                zIndex: Z_INDICES.HANDLES,
              }}
            />
          ))}
        </>
      )}

      {/* Right-click Context Menu */}
      {showContextMenu && (
        <div
          style={{
            position: 'fixed',
            left: `${contextMenuPosition.x}px`,
            top: `${contextMenuPosition.y}px`,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '6px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            zIndex: Z_INDICES.CONTEXT_MENU,
            minWidth: '150px',
            overflow: 'hidden',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              padding: '12px 16px',
              cursor: 'pointer',
              backgroundColor: 'transparent',
              borderBottom: '1px solid #eee',
              fontSize: '14px',
              color: '#333',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(sticker.id);
              setShowContextMenu(false);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f5f5f5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <span style={{ color: '#DD500B', fontWeight: 'bold' }}>×</span>
            Delete Sticker
          </div>
          <div
            style={{
              padding: '12px 16px',
              cursor: 'pointer',
              backgroundColor: 'transparent',
              fontSize: '14px',
              color: '#333',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onClick={(e) => {
              e.stopPropagation();
              setShowContextMenu(false);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f5f5f5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Cancel
          </div>
        </div>
      )}
    </div>
  );
}