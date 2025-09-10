import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import AnimatedHomescreen from './components/AnimatedHomescreen';
import FullTransitionFlow from './components/FullTransitionFlow';
import CustomizeScreen from './components/CustomizeScreen';
import AnimatedCustomizePage from './components/AnimatedCustomizePage';
import imgImage7 from './assets/header1.png';
import cursorImage from './assets/cursor1.png';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'upload' | 'instructions' | 'customize' | 'final'>('home');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showCustomCursor, setShowCustomCursor] = useState(true);

  // Using overlay cursor; hide the native cursor globally
  const forceCustomCursor = () => {
    document.documentElement.style.cursor = 'none';
    document.body.style.cursor = 'none';
  };

  // Calculate scale to cover viewport completely (crop overflow, no gaps)
  useEffect(() => {
    const updateScale = () => {
      const scaleX = window.innerWidth / 1920;
      const scaleY = window.innerHeight / 1080;
      const newScale = Math.max(scaleX, scaleY); // Cover entire viewport, crop overflow
      setScale(newScale);
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // Custom cursor overlay approach - ultra aggressive cursor hiding
  useEffect(() => {
    const forceHideCursor = () => {
      // Hide cursor on all elements
      document.documentElement.style.cursor = 'none';
      document.body.style.cursor = 'none';
      
      // Force hide on all interactive elements
      const allElements = document.querySelectorAll('*');
      allElements.forEach(el => {
        (el as HTMLElement).style.cursor = 'none';
      });
    };

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      forceHideCursor(); // Re-hide cursor on every mouse move
    };

    // Track all possible events that might show cursor
    const handleAnyEvent = () => {
      forceHideCursor();
    };

    // Track external file drag position and force hide native cursor
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      document.documentElement.classList.add('cb-dragging');
      setShowCustomCursor(true);
      forceHideCursor();
      if (typeof e.clientX === 'number' && typeof e.clientY === 'number') {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    const handleDragEnter = (e: DragEvent) => {
      document.documentElement.classList.add('cb-dragging');
      setShowCustomCursor(true);
      forceHideCursor();
    };

    const clearDragState = () => {
      document.documentElement.classList.remove('cb-dragging');
      forceHideCursor();
    };

    // Initial hide
    forceHideCursor();

    // Add all event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleAnyEvent);
    document.addEventListener('mouseenter', handleAnyEvent);
    document.addEventListener('mouseleave', handleAnyEvent);
    document.addEventListener('click', handleAnyEvent);
    document.addEventListener('focus', handleAnyEvent);
    document.addEventListener('blur', handleAnyEvent);
    document.addEventListener('keydown', handleAnyEvent);
    document.addEventListener('keyup', handleAnyEvent);
    document.addEventListener('scroll', handleAnyEvent);
    document.addEventListener('resize', handleAnyEvent);
    document.addEventListener('visibilitychange', handleAnyEvent);
    document.addEventListener('pointermove', handleAnyEvent);
    document.addEventListener('pointerenter', handleAnyEvent);
    document.addEventListener('pointerleave', handleAnyEvent);
    document.addEventListener('contextmenu', handleAnyEvent);
    document.addEventListener('dragstart', handleAnyEvent);
    document.addEventListener('dragend', handleAnyEvent);
    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('dragenter', handleDragEnter);
    window.addEventListener('dragleave', clearDragState);
    window.addEventListener('drop', clearDragState);

    // Ultra aggressive interval to constantly re-hide cursor
    const cursorInterval = setInterval(forceHideCursor, 10); // Every 10ms

    // Mutation observer to catch new elements
    const observer = new MutationObserver(() => {
      forceHideCursor();
    });
    observer.observe(document.body, { 
      childList: true, 
      subtree: true, 
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleAnyEvent);
      document.removeEventListener('mouseenter', handleAnyEvent);
      document.removeEventListener('mouseleave', handleAnyEvent);
      document.removeEventListener('click', handleAnyEvent);
      document.removeEventListener('focus', handleAnyEvent);
      document.removeEventListener('blur', handleAnyEvent);
      document.removeEventListener('keydown', handleAnyEvent);
      document.removeEventListener('keyup', handleAnyEvent);
      document.removeEventListener('scroll', handleAnyEvent);
      document.removeEventListener('resize', handleAnyEvent);
      document.removeEventListener('visibilitychange', handleAnyEvent);
      document.removeEventListener('pointermove', handleAnyEvent);
      document.removeEventListener('pointerenter', handleAnyEvent);
      document.removeEventListener('pointerleave', handleAnyEvent);
      document.removeEventListener('contextmenu', handleAnyEvent);
      document.removeEventListener('dragstart', handleAnyEvent);
      document.removeEventListener('dragend', handleAnyEvent);
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('dragenter', handleDragEnter);
      window.removeEventListener('dragleave', clearDragState);
      window.removeEventListener('drop', clearDragState);
      clearInterval(cursorInterval);
      observer.disconnect();
    };
  }, []);

  const handleScreenClick = () => {
    if (currentPage === 'home') {
      setCurrentPage('upload');
    }
  };

  const handleNextPage = () => {
    if (currentPage === 'upload') {
      setCurrentPage('instructions');
    }
  };

  const handleInstructionsReady = () => {
    if (currentPage === 'instructions') {
      setCurrentPage('customize');
    }
  };

  const handleFinalCustomization = () => {
    if (currentPage === 'customize') {
      setCurrentPage('final');
    }
  };

  const handleDownloadComplete = () => {
    // Reset to homepage after download
    setCurrentPage('home');
    setUploadedImage(null);
  };

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
  };

  return (
    <div 
      style={{ 
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(255, 231, 224, 1)',
        cursor: 'none'
      }}
      onClick={currentPage === 'home' ? handleScreenClick : undefined}
    >
      <div
        style={{
          width: '1920px',
          height: '1080px',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          position: 'absolute',
          left: '50%',
          top: '50%',
          marginLeft: '-960px', // Half of 1920px
          marginTop: '-540px',  // Half of 1080px
          backgroundColor: 'rgba(255, 231, 224, 1)'
        }}
      >
        {/* Global Header - COCKBLOCK ALWAYS USE PROTECTION */}
        <motion.div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '1920px',
            height: '26px',
            flexShrink: 0,
            backgroundImage: `url('${imgImage7}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 1000
          }}
          initial={{ y: -150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 120, 
            damping: 12, 
            delay: 0.1,
            duration: 1.2
          }}
        />
      {/* Custom Cursor Overlay */}
      {showCustomCursor && (
        <img
          src={cursorImage}
          alt="cursor"
          draggable={false}
          style={{
            position: 'fixed',
            left: mousePosition.x,
            top: mousePosition.y,
            width: '32px',
            height: '32px',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 9999,
            imageRendering: 'auto',
            willChange: 'transform'
          }}
        />
      )}

      <AnimatePresence mode="wait">
        {currentPage === 'home' ? (
          <motion.div
            key="home"
            className="cursor-pointer"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
          >
            <AnimatedHomescreen />
          </motion.div>
        ) : currentPage === 'instructions' ? (
          <div
            key="instructions"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
          >
            <AnimatedCustomizePage onReady={handleInstructionsReady} />
          </div>
        ) : currentPage === 'customize' && uploadedImage ? (
          <div
            key="customize-screen"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
          >
            <CustomizeScreen 
              uploadedImage={uploadedImage} 
              onComplete={handleDownloadComplete}
            />
          </div>
        ) : (
          <motion.div
            key="app-flow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
          >
            <FullTransitionFlow 
              currentScreen={currentPage}
              onNext={handleNextPage} 
              onImageUpload={handleImageUpload}
              onReady={handleFinalCustomization}
              uploadedImage={uploadedImage}
            />
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}