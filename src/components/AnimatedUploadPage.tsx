import { motion } from 'motion/react';
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

interface AnimatedUploadPageProps {
  onNext: () => void;
  onImageUpload: (imageUrl: string) => void;
}

export default function AnimatedUploadPage({ onNext, onImageUpload }: AnimatedUploadPageProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleFileUpload = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    onImageUpload(url);
    setIsExiting(true);
    setTimeout(() => {
      onNext();
    }, 800); // Reduced to 800ms to match exit animation timing
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



  // EXACT coordinates from Desktop8-73-113.tsx converted properly
  // Card coordinates: bottom-[340.34px] right-[711.37px] w-[497.626px] h-[398.662px]
  // Convert to top/left: top = 1080 - 340.34 - 398.662 = 340.998px, left = 1920 - 711.37 - 497.626 = 711.004px
  
  const cardLeft = 1920 - 711.37 - 497.626; // ≈ 711px
  const cardTop = 1080 - 340.34 - 398.662;  // ≈ 341px
  const cardWidth = 497.626;  // Rounded to 498
  const cardHeight = 398.662; // Rounded to 399

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
      data-name="Desktop - 8"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Header: image 7 - exact coordinates from Figma: top: 105px, centered */}
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

      {/* Upload Card Container */}
      <motion.div
        style={{
          position: 'absolute',
          left: `${cardLeft}px`,
          top: `${cardTop}px`,
          width: `${cardWidth}px`,
          height: `${cardHeight}px`,
          backgroundColor: '#DD500B',
          borderRadius: '13px',
          boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)',
          zIndex: 100
        }}
        initial={{ x: 500, opacity: 0 }}
        animate={{ 
          x: isExiting ? -600 : 0, 
          opacity: isExiting ? 0 : 1 
        }}
        transition={{ 
          type: isExiting ? "tween" : "spring", 
          stiffness: 100, 
          damping: 15, 
          delay: isExiting ? 0 : 0.3,
          duration: isExiting ? 0.6 : 1.2,
          ease: isExiting ? "easeInOut" : undefined
        }}
        data-name="Upload Card Container"
      >
        {/* UPLOAD SHOT Title - centered horizontally within card */}
        {/* Original: bottom-[685.66px] right-[959.13px] w-[443.582px] h-[49.131px] translate-x-[50%] translate-y-[50%] text-center */}
        {/* Centered within the 498px wide card: (498 - 444) / 2 = 27px */}
        <div
          style={{
            position: 'absolute',
            left: '27px', // Centered horizontally within card
            top: '29px', // Exact local position from Figma calculation  
            width: '444px',
            height: '49px',
            fontFamily: 'Michroma, sans-serif',
            fontSize: '35px',
            color: 'white',
            textAlign: 'center', // Center-aligned text as in Figma
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

        {/* Inner Drop Area - positioned relative to card */}
        {/* Original: bottom-[402.81px] right-[737.34px] w-[442.178px] h-[223.896px] */}
        {/* Relative to card: right offset = 737.34 - 711.37 = 25.97, bottom offset = 402.81 - 340.34 = 62.47 */}
        <motion.div
          style={{
            position: 'absolute',
            left: '28px', // 497.626 - 25.97 - 442.178 ≈ 28px from left
            top: '112px', // 398.662 - 62.47 - 223.896 ≈ 112px from top
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

          {/* Upload Icon - positioned relative to drop area */}
          {/* Original: bottom-[512.98px] right-[932.46px] w-[54.746px] h-[42.814px] */}
          {/* Center in drop area */}
          <div
            style={{
              position: 'absolute',
              left: '194px', // (442 - 55) / 2 ≈ 194px
              top: '70px', // Center vertically in drop area
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

          {/* Drag & Drop Text - positioned relative to drop area */}
          {/* Original: bottom-[490.47px] right-[959.81px] w-[140.374px] h-[21.056px] translate-x-[50%] translate-y-[50%] */}
          {/* Center in drop area */}
          <div
            style={{
              position: 'absolute',
              left: '151px', // (442 - 140) / 2 ≈ 151px
              top: '130px', // Below icon
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
                fontFamily: 'Chivo',
                fontSize: '20px',
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

      {/* All 13 stickers with exact coordinates from Desktop8-73-113.tsx - with entrance animations */}
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
    </div>
  );
}