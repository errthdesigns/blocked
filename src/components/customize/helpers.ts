import { IMAGE_CONSTRAINTS } from './constants';
import type { ImageDimensions } from './types';

// Utility function to normalize rotation to clean, predictable values
export const normalizeRotation = (angle: number): number => {
  // Round to nearest whole degree
  let normalized = Math.round(angle);
  
  // Normalize to 0-360 range first
  normalized = normalized % 360;
  if (normalized < 0) normalized += 360;
  
  // Convert to -180 to +180 range for cleaner values
  if (normalized > 180) {
    normalized = normalized - 360;
  }
  
  return normalized;
};

// Calculate optimal container dimensions based on image natural dimensions
export const calculateImageDimensions = (
  naturalWidth: number, 
  naturalHeight: number
): ImageDimensions => {
  // Calculate aspect ratio
  const aspectRatio = naturalWidth / naturalHeight;
  
  let containerWidth = naturalWidth;
  let containerHeight = naturalHeight;
  
  // Scale down if image is too large
  if (containerWidth > IMAGE_CONSTRAINTS.MAX_WIDTH || containerHeight > IMAGE_CONSTRAINTS.MAX_HEIGHT) {
    if (aspectRatio > 1) {
      // Landscape image
      containerWidth = Math.min(IMAGE_CONSTRAINTS.MAX_WIDTH, containerWidth);
      containerHeight = containerWidth / aspectRatio;
    } else {
      // Portrait image
      containerHeight = Math.min(IMAGE_CONSTRAINTS.MAX_HEIGHT, containerHeight);
      containerWidth = containerHeight * aspectRatio;
    }
  }
  
  // Set minimum dimensions
  containerWidth = Math.max(IMAGE_CONSTRAINTS.MIN_WIDTH, containerWidth);
  containerHeight = Math.max(IMAGE_CONSTRAINTS.MIN_HEIGHT, containerHeight);
  
  return { width: containerWidth, height: containerHeight };
};

// Get resize corner positions for sticker handles
export const getResizeCornerPositions = () => ({
  nw: { top: '-6px', left: '-6px', cursor: 'nw-resize' as const },
  ne: { top: '-6px', right: '-6px', cursor: 'ne-resize' as const },
  sw: { bottom: '-6px', left: '-6px', cursor: 'sw-resize' as const },
  se: { bottom: '-6px', right: '-6px', cursor: 'se-resize' as const },
});