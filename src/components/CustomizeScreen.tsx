import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'motion/react';
import GlobalHeader from './GlobalHeader';
import DraggableStickerTray from './DraggableStickerTray';
import PlacedStickerComponent from './customize/PlacedStickerComponent';
import { calculateImageDimensions } from './customize/helpers';
import { STICKER_DEFAULTS, IMAGE_CONSTRAINTS } from './customize/constants';
import type { 
  StickerDef, 
  PlacedSticker, 
  ImageDimensions, 
  CustomizeScreenProps 
} from './customize/types';

// Real sticker dimensions mapped by sticker source URL
const STICKER_DIMENSIONS_MAP = new Map<string, { w: number; h: number; rotation?: number }>([
  ['figma:asset/1ffd47cb9d4a47e07f8aa50dea5f36f79c34eee4.png', { w: 460, h: 184 }],
  ['figma:asset/1ce035b5fa2e574bf38750d3f8e21c18505183f8.png', { w: 692.843, h: 337.168, rotation: 345 }],
  ['figma:asset/d85c3eb857456ec96e23a929daffcd28374729dd.png', { w: 200, h: 200 }],
  ['figma:asset/aba441c6984ddd88966846b48f2d123550cf1b3b.png', { w: 330.068, h: 239.992, rotation: 337.051 }],
  ['figma:asset/9eb72bff05e63bf1a10a6d0e0e9a1a7848730efc.png', { w: 440.93, h: 335.133, rotation: 27.352 }],
  ['figma:asset/9318e762097bdb0a643cc925f5de9ae11fa1c92c.png', { w: 315, h: 315 }],
  ['figma:asset/fead91a18d276467d72427f35a1a6aa2c9baa7c7.png', { w: 529.137, h: 186.057, rotation: 6.3 }],
  ['figma:asset/7e3670b5570ecbbdbf2fd131bb36b9e26e07f87d.png', { w: 172, h: 92 }],
  ['figma:asset/feed20764d16a1b14475aeac38e5b14342ea170e.png', { w: 124.393, h: 123.007, rotation: 313.482 }],
  ['figma:asset/59db2a219c37ee84a5118dcb99d24a4b13204a11.png', { w: 308, h: 100 }],
  ['figma:asset/d64d9cb8d649e238ff21365988ab6e1801c4c985.png', { w: 195, h: 195 }],
]);

// Helper function to get actual sticker dimensions
const getStickerDimensions = (src: string) => {
  // First try direct lookup
  let dimensions = STICKER_DIMENSIONS_MAP.get(src);
  
  if (!dimensions) {
    // If it's a blob URL, extract the original filename from the hash
    if (src.startsWith('blob:') && src.includes('#filename=')) {
      const filename = src.split('#filename=')[1];
      const originalAssetUrl = `figma:asset/${filename}`;
      dimensions = STICKER_DIMENSIONS_MAP.get(originalAssetUrl);
    }
  }
  
  if (!dimensions) {
    console.warn(`No dimensions found for sticker: ${src}`);
    return { w: STICKER_DEFAULTS.APPROXIMATE_WIDTH, h: STICKER_DEFAULTS.APPROXIMATE_HEIGHT };
  }
  return dimensions;
};



export default function CustomizeScreen({ uploadedImage, onComplete }: CustomizeScreenProps) {
  const [placedStickers, setPlacedStickers] = useState<PlacedSticker[]>([]);
  const [nextZ, setNextZ] = useState(STICKER_DEFAULTS.BASE_Z_INDEX);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions>({ 
    width: 521, 
    height: 466.219 
  });
  const photoDropRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleStickerDragEnd = useCallback((e: React.DragEvent, stickerDef: StickerDef) => {
    if (!photoDropRef.current) return;

    const rect = photoDropRef.current.getBoundingClientRect();
    const dropX = e.clientX - rect.left;
    const dropY = e.clientY - rect.top;

    // Check if drop is inside photo bounds
    if (dropX >= 0 && dropY >= 0 && dropX <= rect.width && dropY <= rect.height) {
      // Create new placed sticker
      const newSticker: PlacedSticker = {
        id: `placed-${stickerDef.id}-${Date.now()}`,
        src: stickerDef.src,
        x: dropX - (stickerDef.w * STICKER_DEFAULTS.SCALE) / 2,
        y: dropY - (stickerDef.h * STICKER_DEFAULTS.SCALE) / 2,
        scale: STICKER_DEFAULTS.SCALE,
        r: stickerDef.rotation || STICKER_DEFAULTS.ROTATION,
        z: nextZ,
      };

      setPlacedStickers(prev => [...prev, newSticker]);
      setNextZ(prev => prev + 1);
    }
    // If outside, do nothing (cancel/snap-back behavior)
  }, [nextZ, imageDimensions]);

  const handlePlacedStickerDragEnd = useCallback((e: React.DragEvent, sticker: PlacedSticker, dragOffset: { x: number; y: number }) => {
    if (!photoDropRef.current) return;

    const rect = photoDropRef.current.getBoundingClientRect();
    const dropX = e.clientX - rect.left - dragOffset.x;
    const dropY = e.clientY - rect.top - dragOffset.y;

    // Get actual dimensions for this sticker
    const actualDimensions = getStickerDimensions(sticker.src);

    const stickerWidth = actualDimensions.w * sticker.scale;
    const stickerHeight = actualDimensions.h * sticker.scale;

    // Constrain to photo bounds using dynamic dimensions
    const constrainedX = Math.max(0, Math.min(imageDimensions.width - stickerWidth, dropX));
    const constrainedY = Math.max(0, Math.min(imageDimensions.height - stickerHeight, dropY));

    // Update sticker position
    setPlacedStickers(prev => 
      prev.map(s => s.id === sticker.id ? { ...s, x: constrainedX, y: constrainedY } : s)
    );
  }, [imageDimensions]);

  const updatePlacedSticker = useCallback((id: string, updates: Partial<PlacedSticker>) => {
    setPlacedStickers(prev => 
      prev.map(s => s.id === id ? { ...s, ...updates } : s)
    );
  }, []);

  const handleStickerSelect = useCallback((id: string) => {
    setSelectedStickerId(id);
  }, []);

  const handleBackgroundClick = useCallback(() => {
    setSelectedStickerId(null);
  }, []);

  const handleDeleteSticker = useCallback((id: string) => {
    setPlacedStickers(prev => prev.filter(s => s.id !== id));
    setSelectedStickerId(null);
  }, []);

  // Handle image load to get natural dimensions
  const handleImageLoad = useCallback(() => {
    if (!imageRef.current) return;
    
    const naturalWidth = imageRef.current.naturalWidth;
    const naturalHeight = imageRef.current.naturalHeight;
    
    const dimensions = calculateImageDimensions(naturalWidth, naturalHeight);
    setImageDimensions(dimensions);
  }, []);

  // Download functionality for the customized image
  const handleDownloadCustomizedImage = useCallback(() => {
    if (!photoDropRef.current || !uploadedImage) return;



    // Create a high-DPI canvas to combine the image and stickers
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use device pixel ratio for high-quality rendering
    const devicePixelRatio = window.devicePixelRatio || 1;
    const scaleFactor = Math.max(devicePixelRatio, 2); // Minimum 2x for quality

    // Set actual canvas size (high resolution)
    canvas.width = imageDimensions.width * scaleFactor;
    canvas.height = imageDimensions.height * scaleFactor;

    // Scale the drawing context to match
    ctx.scale(scaleFactor, scaleFactor);

    // Enable high-quality image smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Create an image element for the uploaded image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      // Draw the base image at logical size (ctx is already scaled)
      ctx.drawImage(img, 0, 0, imageDimensions.width, imageDimensions.height);

      // If no stickers, just download the base image
      if (placedStickers.length === 0) {
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `cockblock-customized-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            // Call completion callback to refresh to homepage after download
            if (onComplete) {
              setTimeout(() => {
                onComplete();
              }, 500); // Small delay to ensure download starts
            }
          }
        }, 'image/png', 1.0);
        return;
      }

      // Load all sticker images first, then draw them in order
      let loadedCount = 0;
      const stickerImages: { img: HTMLImageElement; sticker: PlacedSticker }[] = [];

      // Function to draw each sticker
      const drawSticker = (stickerData: { img: HTMLImageElement; sticker: PlacedSticker }, index: number) => {
        const { img: stickerImg, sticker } = stickerData;
        ctx.save();
        
        // Enable high-quality rendering for this sticker
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        // Get actual dimensions for this sticker (these match the container size in display)
        const actualDimensions = getStickerDimensions(sticker.src);
        
        // Calculate container size (this matches what's used in PlacedStickerComponent)
        const containerWidth = actualDimensions.w * sticker.scale;
        const containerHeight = actualDimensions.h * sticker.scale;
        
        // Calculate how the image fits within the container using contain logic
        // This mimics CSS background-size: contain
        const imageAspectRatio = stickerImg.naturalWidth / stickerImg.naturalHeight;
        const containerAspectRatio = actualDimensions.w / actualDimensions.h;
        
        let drawWidth, drawHeight;
        
        if (imageAspectRatio > containerAspectRatio) {
          // Image is wider than container aspect ratio - fit to width
          drawWidth = containerWidth;
          drawHeight = containerWidth / imageAspectRatio;
        } else {
          // Image is taller than container aspect ratio - fit to height
          drawHeight = containerHeight;
          drawWidth = containerHeight * imageAspectRatio;
        }
        
        // Center the image within the container
        const offsetX = (containerWidth - drawWidth) / 2;
        const offsetY = (containerHeight - drawHeight) / 2;
        
        // Move to the center point of where the sticker container should be
        ctx.translate(sticker.x + containerWidth / 2, sticker.y + containerHeight / 2);
        // Apply rotation
        ctx.rotate((sticker.r * Math.PI) / 180);
        
        // Draw the sticker with contain sizing, centered at high quality
        ctx.drawImage(
          stickerImg, 
          -containerWidth / 2 + offsetX, 
          -containerHeight / 2 + offsetY,
          drawWidth,
          drawHeight
        );
        
        ctx.restore();
      };

      // Load all sticker images first
      placedStickers.forEach((sticker, index) => {
        const stickerImg = new Image();
        stickerImg.crossOrigin = 'anonymous';
        
        stickerImg.onload = () => {
          loadedCount++;
          stickerImages.push({ img: stickerImg, sticker });
          
          // When all images are loaded, draw them all and download
          if (loadedCount === placedStickers.length) {
            // Sort by z-index to maintain proper layering
            stickerImages.sort((a, b) => a.sticker.z - b.sticker.z);
            
            // Draw all stickers
            stickerImages.forEach((stickerData, index) => {
              drawSticker(stickerData, index);
            });
            
            // Download the final image
            canvas.toBlob((blob) => {
              if (blob) {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `cockblock-customized-${Date.now()}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                
                // Call completion callback to refresh to homepage after download
                if (onComplete) {
                  setTimeout(() => {
                    onComplete();
                  }, 500); // Small delay to ensure download starts
                }
              }
            }, 'image/png', 1.0); // Maximum quality
          }
        };
        
        stickerImg.onerror = (error) => {
          console.error(`Failed to load sticker ${index}:`, error, sticker.src);
          // Continue with partial loading
          loadedCount++;
          if (loadedCount === placedStickers.length) {
            canvas.toBlob((blob) => {
              if (blob) {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `cockblock-customized-${Date.now()}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                
                // Call completion callback to refresh to homepage after download
                if (onComplete) {
                  setTimeout(() => {
                    onComplete();
                  }, 500); // Small delay to ensure download starts
                }
              }
            }, 'image/png', 1.0);
          }
        };
        
        stickerImg.src = sticker.src;
      });
    };

    img.src = uploadedImage;
  }, [uploadedImage, placedStickers, imageDimensions]);

  // Keyboard deletion support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedStickerId) {
        e.preventDefault();
        handleDeleteSticker(selectedStickerId);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedStickerId, handleDeleteSticker]);

  return (
    <div 
      id="Stage"
      onClick={handleBackgroundClick}
      style={{
        position: 'relative',
        width: '1920px',
        height: '1080px',
        overflow: 'hidden',
        backgroundColor: '#FF00FF',
        transform: 'none'
      }}
    >
      {/* Global Header - locked positioning */}
      <GlobalHeader />
      
      {/* Draggable Sticker Tray - Interactive stickers only (no background stickers on customize screen) */}
      <DraggableStickerTray onDragEnd={handleStickerDragEnd} />

      {/* Photo Drop Zone */}
      <div
        id="photoDrop"
        ref={photoDropRef}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedStickerId(null);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragOver(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
        }}
        style={{
          position: 'relative',
          left: `${(1920 - imageDimensions.width) / 2}px`, // Center horizontally in 1920px frame
          top: '307px',
          width: `${imageDimensions.width}px`,
          height: `${imageDimensions.height}px`,
          pointerEvents: 'auto',
          border: isDragOver ? '3px dashed rgba(255, 255, 255, 0.8)' : 'none',
          backgroundColor: isDragOver ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
          transition: 'all 0.2s ease',
        }}
      >
        {uploadedImage && (
          <motion.img
            ref={imageRef}
            src={uploadedImage}
            alt="Uploaded"
            onLoad={handleImageLoad}
            initial={{ x: 600, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 15, 
              duration: 1.2
            }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center',
              pointerEvents: 'auto',
            }}
          />
        )}

        {/* Placed Stickers */}
        {placedStickers.map((sticker) => {
          const actualDimensions = getStickerDimensions(sticker.src);
          return (
            <PlacedStickerComponent
              key={sticker.id}
              sticker={sticker}
              stickerDef={{ 
                id: sticker.id, 
                src: sticker.src, 
                w: actualDimensions.w, 
                h: actualDimensions.h,
                rotation: actualDimensions.rotation
              }}
              onUpdate={updatePlacedSticker}
              onDragEnd={handlePlacedStickerDragEnd}
              isSelected={selectedStickerId === sticker.id}
              onSelect={handleStickerSelect}
              onDelete={handleDeleteSticker}
              photoDropRef={photoDropRef}
              imageDimensions={imageDimensions}
            />
          );
        })}
      </div>

      {/* Download Button */}
      <motion.div
        style={{
          position: 'absolute',
          left: `${(1920 - imageDimensions.width) / 2}px`, // Match image left position
          top: '240px', // Above the image
          width: `${imageDimensions.width}px`, // Match image width
          height: '40px',
          backgroundColor: '#FF0000',
          borderRadius: '10px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 200,
          boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)'
        }}
        onClick={handleDownloadCustomizedImage}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        data-name="Download Button"
      >
        <div style={{
          fontFamily: 'Michroma, sans-serif',
          fontSize: '12px',
          color: 'white',
          textAlign: 'center',
          lineHeight: 'normal'
        }}>
          <p style={{ margin: 0, lineHeight: 'normal' }}>DOWNLOAD</p>
        </div>
      </motion.div>
    </div>
  );
}