import { motion, AnimatePresence } from 'motion/react';
import { useState, useCallback } from 'react';
import imgImage from "figma:asset/650f68861f42b8ad929ecd54343886e1ae2bf790.png";
import imgWatermarked3540C0595Eda400282001B643Cc1E2E31 from "figma:asset/596c4256123cb22cf58eabfcd8ac24e1c97ad788.png";
import GlobalHeader from './GlobalHeader';
import GlobalStickerCluster from './GlobalStickerCluster';
import AnimatedGlobalStickerCluster from './AnimatedGlobalStickerCluster';

interface FullTransitionFlowProps {
  currentScreen: 'upload' | 'customize' | 'final';
  onNext: () => void;
  onImageUpload: (imageUrl: string) => void;
  onReady: () => void;
  uploadedImage: string | null;
}

export default function FullTransitionFlow({ 
  currentScreen, 
  onNext, 
  onImageUpload,
  onReady,
  uploadedImage 
}: FullTransitionFlowProps) {
  const [isDragActive, setIsDragActive] = useState(false);

  // Download functionality for the final image
  const handleImageDownload = useCallback(() => {
    if (!uploadedImage) return;

    // Create a temporary link element and trigger download
    const link = document.createElement('a');
    link.href = uploadedImage;
    link.download = `cockblock-customized-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [uploadedImage]);

  const handleFileUpload = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    onImageUpload(url);
    setTimeout(() => {
      onNext();
    }, 600); // Time for upload card to slide out
  }, [onImageUpload, onNext]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  // Card coordinates for both screens
  const uploadCardLeft = 1920 - 711.37 - 497.626; // ≈ 711px
  const uploadCardTop = 1080 - 340.34 - 398.662;  // ≈ 341px
  const uploadCardWidth = 497.626;
  const uploadCardHeight = 398.662;

  const customizeCardLeft = 1920 - 705 - 509; // ≈ 706px  
  const customizeCardTop = 1080 - 336.23 - 407.774; // ≈ 336px
  const customizeCardWidth = 509;
  const customizeCardHeight = 407.774;



  // Conditional render for FINAL screen with draggable functionality
  if (currentScreen === 'final' && uploadedImage) {
    return (
      <div 
        style={{ 
          position: 'relative', 
          width: '1920px', 
          height: '1080px', 
          overflow: 'hidden',
          backgroundColor: 'rgba(255, 231, 224, 1)',
          transform: 'none'
        }}
      >
        {/* Global Header - locked positioning */}
        <GlobalHeader />

        {/* Global Sticker Cluster - static for final screen */}
        <GlobalStickerCluster />

        {/* Final Image Display */}
        <div 
          style={{
            position: 'absolute',
            left: '785px', // (1920 - 349) / 2 = 785.5px ≈ 785px to center 349px wide container
            top: '345px',  // (1080 - 390) / 2 = 345px to center 390px tall container
            width: '349px',
            height: '390px',
            zIndex: 100,
            cursor: 'pointer'
          }}
          onClick={handleImageDownload}
          title="Click to download your customized image"
        >
          {uploadedImage && (
            <img
              src={uploadedImage}
              alt="Final Result - Click to Download"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div 
      style={{
        position: 'relative',
        width: '1920px', 
        height: '1080px', 
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 231, 224, 1)',
        transform: 'none'
      }}
      onDragOver={currentScreen === 'upload' ? handleDragOver : undefined}
      onDragLeave={currentScreen === 'upload' ? handleDragLeave : undefined}
      onDrop={currentScreen === 'upload' ? handleDrop : undefined}
    >
      {/* Global Header - locked positioning */}
      <GlobalHeader />

      {/* Global Sticker Cluster - animated for upload screen */}
      <AnimatedGlobalStickerCluster />


      {/* Animated Content - Only this changes between screens */}
      <AnimatePresence mode="wait">
        {currentScreen === 'upload' ? (
          <motion.div
            key="upload-popup"
            style={{
              position: 'absolute',
              left: `${uploadCardLeft}px`,
              top: `${uploadCardTop}px`,
              width: `${uploadCardWidth}px`,
              height: `${uploadCardHeight}px`,
              backgroundColor: '#DD500B',
              borderRadius: '13px',
              boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)',
              zIndex: 100
            }}
            initial={{ x: 500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -600, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 15, 
              duration: 0.8
            }}
            data-name="Upload Card Container"
          >
            {/* Upload Content */}
            <div
              style={{
                position: 'absolute',
                left: '27px',
                top: '29px',
                width: '444px',
                height: '49px',
                fontFamily: 'Michroma, sans-serif',
                fontSize: '35px',
                color: 'white',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 0,
                zIndex: 1
              }}
              data-name="Upload Shot Title"
            >
              <p style={{ 
                margin: 0, 
                lineHeight: 'normal',
                color: '#FFE7E0',
                textAlign: 'center',
                fontFamily: 'Akira Expanded',
                fontSize: '27px',
                fontStyle: 'normal',
                fontWeight: 800,
                letterSpacing: '2.7px'
              }}>UPLOAD SHOT</p>
            </div>

            <motion.div
              style={{
                position: 'absolute',
                left: '28px',
                top: '112px',
                width: '442px',
                height: '224px',
                backgroundColor: isDragActive ? 'rgba(255, 0, 255, 1)' : 'rgba(255, 231, 224, 1)',
                borderRadius: '7px',
                cursor: 'pointer',
                zIndex: 2
              }}
              animate={{
                backgroundColor: isDragActive ? 'rgba(255, 0, 255, 1)' : 'rgba(255, 231, 224, 1)'
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              data-name="Upload Drop Area"
            >
              <motion.div 
                style={{
                  position: 'absolute',
                  border: isDragActive ? '3px dashed rgba(255, 0, 255, 1)' : '3px solid rgba(255, 231, 224, 1)',
                  borderRadius: '10px',
                  inset: '-3px',
                  pointerEvents: 'none',
                  boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)'
                }}
                animate={{
                  borderColor: isDragActive ? 'rgba(255, 0, 255, 1)' : 'rgba(255, 231, 224, 1)',
                  borderStyle: isDragActive ? 'dashed' : 'solid'
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />

              <div
                style={{
                  position: 'absolute',
                  left: '194px',
                  top: '70px',
                  width: '55px',
                  height: '43px',
                  backgroundImage: `url('${imgImage}')`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  zIndex: 1
                }}
                data-name="Upload Icon"
              />

              <div
                style={{
                  position: 'absolute',
                  left: '151px',
                  top: '130px',
                  width: '140px',
                  height: '21px',
                  fontFamily: 'Michroma, sans-serif',
                  fontSize: '12px',
                  color: 'white',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  lineHeight: 'normal',
                  zIndex: 1
                }}
                data-name="Drag Drop Text"
              >
                {isDragActive ? (
                  <p style={{ 
                    margin: 0,
                    color: '#1E1E1E',
                    textAlign: 'center',
                    WebkitTextStrokeWidth: '0.3px',
                    WebkitTextStrokeColor: '#1E1E1E',
                    fontFamily: 'Chivo, sans-serif',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: 'normal'
                  }}>DROP EM HERE</p>
                ) : (
                  <>
                    <p style={{ 
                      margin: 0,
                      color: '#1E1E1E',
                      textAlign: 'center',
                      WebkitTextStrokeWidth: '0.3px',
                      WebkitTextStrokeColor: '#1E1E1E',
                      fontFamily: 'Chivo, sans-serif',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: 'normal'
                    }}>DRAG & DROP</p>
                    <p style={{ 
                      margin: 0,
                      color: '#1E1E1E',
                      textAlign: 'center',
                      WebkitTextStrokeWidth: '0.3px',
                      WebkitTextStrokeColor: '#1E1E1E',
                      fontFamily: 'Chivo, sans-serif',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: 'normal'
                    }}>TO UPLOAD</p>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        ) : currentScreen === 'customize' ? (
          <motion.div
            key="customize-popup"
            style={{
              position: 'absolute',
              left: `${customizeCardLeft}px`,
              top: `${customizeCardTop}px`,
              width: `${customizeCardWidth}px`,
              height: `${customizeCardHeight}px`,
              backgroundColor: '#DD500B',
              borderRadius: '13px',
              boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)',
              zIndex: 100
            }}
            initial={{ x: 500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -600, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 15, 
              duration: 0.8
            }}
            data-name="Customization Card Container"
          >
            {/* Customize Content */}
            <div
              style={{
                position: 'absolute',
                left: '33px',
                top: '29px',
                width: '444px',
                height: '49px',
                fontFamily: 'Akira Expanded, sans-serif',
                fontSize: '35px',
                color: '#FFE7E0',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 'normal',
                fontWeight: 800,
                zIndex: 1
              }}
              data-name="Customise Title"
            >
              <p style={{ margin: 0, lineHeight: 'normal' }}>CUSTOMISE</p>
            </div>

            <div
              style={{
                position: 'absolute',
                left: '28px',
                top: '120px',
                width: '453px',
                height: '154px',
                fontFamily: 'Chivo, sans-serif',
                fontSize: '32px',
                color: '#FFE7E0',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                lineHeight: 'normal',
                fontWeight: 400,
                zIndex: 1
              }}
              data-name="Instructions Text"
            >
              <p style={{ margin: 0, lineHeight: 'normal' }}>
                GRAB ANY STICKER ON THE SCREEN AND DRAG ONTO YOUR IMAGE!
              </p>
            </div>

            <div
              style={{
                position: 'absolute',
                left: '56px',
                top: '320px',
                width: '397px',
                height: '43px',
                backgroundColor: '#F0F',
                border: '1px solid #F0F',
                borderRadius: '15px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 3
              }}
              onClick={onReady}
              data-name="Ready Button"
            >
              <div style={{
                fontFamily: 'Akira Expanded, sans-serif',
                fontSize: '14px',
                color: '#FFE7E0',
                textAlign: 'center',
                fontStyle: 'normal',
                fontWeight: 800,
                lineHeight: 'normal'
              }}>
                <p style={{ margin: 0, lineHeight: 'normal' }}>I'M READY</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="final-image"
            style={{
              position: 'absolute',
              left: '785px', // (1920 - 349) / 2 = 785.5px ≈ 785px to center 349px wide container
              top: '345px',  // (1080 - 390) / 2 = 345px to center 390px tall container
              width: '349px',
              height: '390px',
              zIndex: 100
            }}
            initial={{ x: 500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -500, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 120, 
              damping: 15, 
              duration: 0.8
            }}
            data-name="Final Image Container"
          >
            {/* Image container centered on page */}
            <div 
              style={{
                display: 'flex',
                height: '390px',
                alignItems: 'center',
                justifyContent: 'center',
                width: '349px',
                cursor: 'pointer'
              }}
              onClick={handleImageDownload}
              title="Click to download your customized image"
            >
              {uploadedImage ? (
                <motion.img
                  src={uploadedImage}
                  alt="Uploaded - Click to Download"
                  style={{
                    height: '390px',
                    width: '349px',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)',
                    transition: 'transform 0.2s ease'
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
              ) : (
                <div 
                  style={{
                    backgroundImage: `url('${imgWatermarked3540C0595Eda400282001B643Cc1E2E31}')`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    height: '390px',
                    width: '349px',
                    boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)',
                    cursor: 'pointer'
                  }}
                  data-name="watermarked_3540c059-5eda-4002-8200-1b643cc1e2e3 1"
                  onClick={handleImageDownload}
                  title="Click to download the default image"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}