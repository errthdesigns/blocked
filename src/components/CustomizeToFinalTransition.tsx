import { motion, AnimatePresence } from 'motion/react';
import imgImage18 from "figma:asset/1ffd47cb9d4a47e07f8aa50dea5f36f79c34eee4.png";
import imgGroup171 from "figma:asset/1ce035b5fa2e574bf38750d3f8e21c18505183f8.png";
import imgGroup22 from "figma:asset/d85c3eb857456ec96e23a929daffcd28374729dd.png";
import imgImage2 from "figma:asset/aba441c6984ddd88966846b48f2d123550cf1b3b.png";
import imgImage17 from "figma:asset/9eb72bff05e63bf1a10a6d0e0e9a1a7848730efc.png";
import imgGroup121 from "figma:asset/9318e762097bdb0a643cc925f5de9ae11fa1c92c.png";
import imgGroup32 from "figma:asset/fead91a18d276467d72427f35a1a6aa2c9baa7c7.png";
import imgImage6 from "figma:asset/7e3670b5570ecbbdbf2fd131bb36b9e26e07f87d.png";
import imgImage12 from "figma:asset/feed20764d16a1b14475aeac38e5b14342ea170e.png";
import imgImage7 from "figma:asset/3881de7c145f96fda594ebbc2a8697ad761f0e13.png";
import imgImage1 from "figma:asset/59db2a219c37ee84a5118dcb99d24a4b13204a11.png";
import imgGroup161 from "figma:asset/d64d9cb8d649e238ff21365988ab6e1801c4c985.png";
import imgWatermarked3540C0595Eda400282001B643Cc1E2E31 from "figma:asset/596c4256123cb22cf58eabfcd8ac24e1c97ad788.png";

interface CustomizeToFinalTransitionProps {
  currentScreen: 'customize' | 'final';
  onReady: () => void;
  uploadedImage: string | null;
}

export default function CustomizeToFinalTransition({ 
  currentScreen, 
  onReady,
  uploadedImage 
}: CustomizeToFinalTransitionProps) {
  // Card coordinates for customize screen
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
        backgroundColor: '#FF00FF',
        transform: 'none'
      }}
    >
      {/* Header: image 7 - STATIC, never animates */}
      <div 
        style={{
          position: 'absolute',
          left: '649px', // (1920 - 622) / 2
          top: '105px',
          width: '622px',
          height: '95px',
          backgroundImage: `url('${imgImage7}')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          zIndex: 10
        }}
        data-name="image 7"
      />

      {/* All 13 stickers - STATIC, never animate during transition */}
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
        whileHover={{ 
          scale: 1.06,
          filter: 'drop-shadow(0 8px 16px rgba(255, 255, 255, 0.3)) drop-shadow(0 0 12px rgba(255, 0, 255, 0.4))',
          transition: { duration: 0.2, ease: 'easeInOut' }
        }}
      />

      {/* Animated Content - Only this changes */}
      <AnimatePresence mode="wait">
        {currentScreen === 'customize' ? (
          <motion.div
            key="customize-popup"
            style={{
              position: 'absolute',
              left: `${customizeCardLeft}px`,
              top: `${customizeCardTop}px`,
              width: `${customizeCardWidth}px`,
              height: `${customizeCardHeight}px`,
              backgroundColor: '#FF0000',
              borderRadius: '13px',
              boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)',
              zIndex: 100
            }}
            initial={{ x: 0, opacity: 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -600, opacity: 0 }}
            transition={{ 
              type: "tween", 
              duration: 0.6,
              ease: "easeInOut"
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
                fontFamily: 'Michroma, sans-serif',
                fontSize: '20px',
                color: 'white',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                lineHeight: 'normal',
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
                backgroundColor: '#FF00FF',
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
                fontFamily: 'Michroma, sans-serif',
                fontSize: '12px',
                color: 'white',
                textAlign: 'center',
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
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
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
            <div style={{
              display: 'flex',
              height: '349px',
              alignItems: 'center',
              justifyContent: 'center',
              width: '390px'
            }}>
              <div style={{ transform: 'rotate(90deg)' }}>
                {uploadedImage ? (
                  <motion.img
                    src={uploadedImage}
                    alt="Uploaded"
                    style={{
                      height: '390px',
                      width: '349px',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)'
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
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
                      boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)'
                    }}
                    data-name="watermarked_3540c059-5eda-4002-8200-1b643cc1e2e3 1"
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}