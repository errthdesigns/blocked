import { motion, AnimatePresence } from 'motion/react';
import { useState, useCallback } from 'react';
import imgImage from "figma:asset/650f68861f42b8ad929ecd54343886e1ae2bf790.png";
import imgImage18 from "figma:asset/1ffd47cb9d4a47e07f8aa50dea5f36f79c34eee4.png";
import imgGroup171 from "figma:asset/1ce035b5fa2e574bf38750d3f8e21c18505183f8.png";
import imgGroup22 from "figma:asset/d85c3eb857456ec96e23a929daffcd28374729dd.png";
import imgImage2 from "figma:asset/aba441c6984ddd88966846b48f2d123550cf1b3b.png";
import imgImage17 from "figma:asset/9eb72bff05e63bf1a10a6d0e0e9a1a7848730efc.png";
import imgGroup121 from "figma:asset/9318e762097bdb0a643cc925f5de9ae11fa1c92c.png";
import imgGroup32 from "figma:asset/fead91a18d276467d72427f35a1a6aa2c9baa7c7.png";
import imgImage6 from "figma:asset/7e3670b5570ecbbdbf2fd131bb36b9e26e07f87d.png";
import imgImage12 from "figma:asset/feed20764d16a1b14475aeac38e5b14342ea170e.png";
import imgImage1 from "figma:asset/59db2a219c37ee84a5118dcb99d24a4b13204a11.png";
import imgGroup161 from "figma:asset/d64d9cb8d649e238ff21365988ab6e1801c4c985.png";

interface UploadToCustomizeTransitionProps {
  currentScreen: 'upload' | 'customize';
  onNext: () => void;
  onImageUpload: (imageUrl: string) => void;
  onReady: () => void;
}

export default function UploadToCustomizeTransition({ 
  currentScreen, 
  onNext, 
  onImageUpload,
  onReady 
}: UploadToCustomizeTransitionProps) {
  const [isDragActive, setIsDragActive] = useState(false);

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
      {/* Header: image 7 - STATIC, never animates */}
      <div 
        style={{
          position: 'absolute',
          left: '649px', // (1920 - 622) / 2
          top: '105px',
          width: '622px',
          height: '95px',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          zIndex: 10
        }}
        data-name="image 7"
      />

      {/* All 13 stickers - Animate in ONLY on upload screen, static during transitions */}
      <motion.div 
        style={{
          position: 'absolute',
          left: '1451px',
          top: '867px',
          width: '460px',
          height: '184px',
          backgroundImage: `url('${imgImage18}')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          zIndex: 1
        }} 
        data-name="image 18"
        initial={{ scale: 0, opacity: 0, rotate: -180 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 12, 
          delay: 0.8,
          duration: 1.5
        }}
        whileHover={{ 
          scale: 1.06,
          filter: 'drop-shadow(0 8px 16px rgba(255, 255, 255, 0.3)) drop-shadow(0 0 12px rgba(255, 0, 255, 0.4))',
          transition: { duration: 0.2, ease: 'easeInOut' }
        }}
      />

      <motion.div 
        style={{
          position: 'absolute',
          left: '784px',
          top: '840px',
          width: '692.843px',
          height: '337.168px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1
        }}
        initial={{ scale: 0, opacity: 0, y: 200, rotate: -180 }}
        animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 130, 
          damping: 12, 
          delay: 1.1,
          duration: 1.4
        }}
        whileHover={{ 
          scale: 1.06,
          filter: 'drop-shadow(0 8px 16px rgba(255, 255, 255, 0.3)) drop-shadow(0 0 12px rgba(255, 0, 255, 0.4))',
          transition: { duration: 0.2, ease: 'easeInOut' }
        }}
      >
        <div style={{
          transform: 'rotate(345deg)',
          width: '672px',
          height: '169px',
          backgroundImage: `url('${imgGroup171}')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          borderRadius: '25px'
        }} data-name="Group 17 1" />
      </motion.div>

      <motion.div 
        style={{
          position: 'absolute',
          left: '1495px',
          top: '677px',
          width: '200px',
          height: '200px',
          backgroundImage: `url('${imgGroup22}')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          zIndex: 1
        }} 
        data-name="Group 2 2"
        initial={{ scale: 0, opacity: 0, x: 300, rotate: -360 }}
        animate={{ scale: 1, opacity: 1, x: 0, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 120, 
          damping: 10, 
          delay: 1.0,
          duration: 1.8
        }}
        whileHover={{ 
          scale: 1.06,
          filter: 'drop-shadow(0 8px 16px rgba(255, 255, 255, 0.3)) drop-shadow(0 0 12px rgba(255, 0, 255, 0.4))',
          transition: { duration: 0.2, ease: 'easeInOut' }
        }}
      />

      <motion.div 
        style={{
          position: 'absolute',
          left: '1634.46px',
          top: '657.17px',
          width: '330.068px',
          height: '239.992px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1
        }}
        initial={{ scale: 0, opacity: 0, x: -300, rotate: -270 }}
        animate={{ scale: 1, opacity: 1, x: 0, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 110, 
          damping: 11, 
          delay: 0.9,
          duration: 1.6
        }}
        whileHover={{ 
          scale: 1.06,
          filter: 'drop-shadow(0 8px 16px rgba(255, 255, 255, 0.3)) drop-shadow(0 0 12px rgba(255, 0, 255, 0.4))',
          transition: { duration: 0.2, ease: 'easeInOut' }
        }}
      >
        <div style={{
          transform: 'rotate(337.051deg)',
          width: '302.296px',
          height: '132.636px',
          backgroundImage: `url('${imgImage2}')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }} data-name="image 2" />
      </motion.div>

      <motion.div 
        style={{
          position: 'absolute',
          left: '-20px',
          top: '560.81px',
          width: '440.93px',
          height: '335.133px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1
        }}
        initial={{ scale: 0, opacity: 0, x: -200, rotate: -90 }}
        animate={{ scale: 1, opacity: 1, x: 0, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 12, 
          delay: 0.7,
          duration: 1.4
        }}
        whileHover={{ 
          scale: 1.06,
          filter: 'drop-shadow(0 8px 16px rgba(255, 255, 255, 0.3)) drop-shadow(0 0 12px rgba(255, 0, 255, 0.4))',
          transition: { duration: 0.2, ease: 'easeInOut' }
        }}
      >
        <div style={{
          transform: 'rotate(27.352deg)',
          width: '411.314px',
          height: '164.556px',
          backgroundImage: `url('${imgImage17}')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }} data-name="image 17" />
      </motion.div>

      <motion.div 
        style={{
          position: 'absolute',
          left: '287px',
          top: '737px',
          width: '315px',
          height: '315px',
          backgroundImage: `url('${imgGroup121}')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          zIndex: 1
        }} 
        data-name="Group 12 1"
        initial={{ scale: 0, opacity: 0, rotate: 180 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 90, 
          damping: 10, 
          delay: 0.6,
          duration: 1.3
        }}
        whileHover={{ 
          scale: 1.06,
          filter: 'drop-shadow(0 8px 16px rgba(255, 255, 255, 0.3)) drop-shadow(0 0 12px rgba(255, 0, 255, 0.4))',
          transition: { duration: 0.2, ease: 'easeInOut' }
        }}
      />

      <motion.div 
        style={{
          position: 'absolute',
          left: '-20px',
          top: '932px',
          width: '529.137px',
          height: '186.057px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1
        }}
        initial={{ scale: 0, opacity: 0, y: 200, rotate: -180 }}
        animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 130, 
          damping: 12, 
          delay: 1.2,
          duration: 1.4
        }}
        whileHover={{ 
          scale: 1.06,
          filter: 'drop-shadow(0 8px 16px rgba(255, 255, 255, 0.3)) drop-shadow(0 0 12px rgba(255, 0, 255, 0.4))',
          transition: { duration: 0.2, ease: 'easeInOut' }
        }}
      >
        <div style={{
          transform: 'rotate(6.3deg)',
          width: '518px',
          height: '130px',
          backgroundImage: `url('${imgGroup32}')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }} data-name="Group 3 2" />
      </motion.div>

      <motion.div 
        style={{
          position: 'absolute',
          left: '43px',
          top: '834px',
          width: '172px',
          height: '92px',
          backgroundImage: `url('${imgImage6}')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          zIndex: 1
        }} 
        data-name="image 6"
        initial={{ scale: 0, opacity: 0, x: -100 }}
        animate={{ scale: 1, opacity: 1, x: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 110, 
          damping: 10, 
          delay: 0.5,
          duration: 1.1
        }}
        whileHover={{ 
          scale: 1.06,
          filter: 'drop-shadow(0 8px 16px rgba(255, 255, 255, 0.3)) drop-shadow(0 0 12px rgba(255, 0, 255, 0.4))',
          transition: { duration: 0.2, ease: 'easeInOut' }
        }}
      />

      <motion.div 
        style={{
          position: 'absolute',
          left: '1358px',
          top: '777px',
          width: '124.393px',
          height: '123.007px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1
        }}
        initial={{ scale: 0, opacity: 0, rotate: -180 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 8, 
          delay: 0.4,
          duration: 1.0
        }}
        whileHover={{ 
          scale: 1.06,
          filter: 'drop-shadow(0 8px 16px rgba(255, 255, 255, 0.3)) drop-shadow(0 0 12px rgba(255, 0, 255, 0.4))',
          transition: { duration: 0.2, ease: 'easeInOut' }
        }}
      >
        <div style={{
          transform: 'rotate(313.482deg)',
          width: '69px',
          height: '106px',
          backgroundImage: `url('${imgImage12}')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }} data-name="image 12" />
      </motion.div>

      <motion.div 
        style={{
          position: 'absolute',
          left: '456px',
          top: '979px',
          width: '308px',
          height: '100px',
          backgroundImage: `url('${imgImage1}')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          zIndex: 1
        }} 
        data-name="image 1"
        initial={{ scale: 0, opacity: 0, y: 100 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 120, 
          damping: 12, 
          delay: 1.3,
          duration: 1.2
        }}
        whileHover={{ 
          scale: 1.06,
          filter: 'drop-shadow(0 8px 16px rgba(255, 255, 255, 0.3)) drop-shadow(0 0 12px rgba(255, 0, 255, 0.4))',
          transition: { duration: 0.2, ease: 'easeInOut' }
        }}
      />

      <motion.div 
        style={{
          position: 'absolute',
          left: '733px',
          top: '834px',
          width: '195px',
          height: '195px',
          backgroundImage: `url('${imgGroup161}')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          zIndex: 1
        }} 
        data-name="Group 16 1"
        initial={{ scale: 0, opacity: 0, rotate: 270 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 110, 
          damping: 11, 
          delay: 1.4,
          duration: 1.3
        }}
        whileHover={{ 
          scale: 1.06,
          filter: 'drop-shadow(0 8px 16px rgba(255, 255, 255, 0.3)) drop-shadow(0 0 12px rgba(255, 0, 255, 0.4))',
          transition: { duration: 0.2, ease: 'easeInOut' }
        }}
      />

      {/* Animated Popup Content - Only this changes */}
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
                backgroundColor: isDragActive ? '#a2d8a4' : 'rgba(255, 231, 224, 1)',
                borderRadius: '7px',
                cursor: 'pointer',
                zIndex: 2
              }}
              animate={{
                backgroundColor: isDragActive ? '#a2d8a4' : 'rgba(255, 231, 224, 1)'
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              data-name="Upload Drop Area"
            >
              <motion.div 
                style={{
                  position: 'absolute',
                  border: isDragActive ? '3px dashed #a2d8a4' : '3px solid rgba(255, 231, 224, 1)',
                  borderRadius: '10px',
                  inset: '-3px',
                  pointerEvents: 'none',
                  boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)'
                }}
                animate={{
                  borderColor: isDragActive ? '#a2d8a4' : 'rgba(255, 231, 224, 1)',
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
        ) : (
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
            exit={{ x: 600, opacity: 0 }}
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
        )}
      </AnimatePresence>
    </div>
  );
}