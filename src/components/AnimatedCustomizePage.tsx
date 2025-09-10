import { motion } from 'motion/react';
import GlobalHeader from './GlobalHeader';
import AnimatedGlobalStickerCluster from './AnimatedGlobalStickerCluster';

interface AnimatedCustomizePageProps {
  onReady: () => void;
}

export default function AnimatedCustomizePage({ onReady }: AnimatedCustomizePageProps) {
  // Card coordinates matching FullTransitionFlow customize screen
  const cardLeft = 1920 - 705 - 509; // ≈ 706px  
  const cardTop = 1080 - 336.23 - 407.774; // ≈ 336px
  const cardWidth = 509;
  const cardHeight = 407.774;

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

      {/* Global Sticker Cluster - animated for instructions screen */}
      <AnimatedGlobalStickerCluster />

      {/* Customization Card Container - Animates in from right, exits to left */}
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
    </div>
  );
}