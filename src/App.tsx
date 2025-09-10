import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import AnimatedHomescreen from './components/AnimatedHomescreen';
import FullTransitionFlow from './components/FullTransitionFlow';
import CustomizeScreen from './components/CustomizeScreen';
import AnimatedCustomizePage from './components/AnimatedCustomizePage';
import imgImage7 from './assets/header1.png';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'upload' | 'instructions' | 'customize' | 'final'>('home');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [scale, setScale] = useState(1);

  // Force custom cursor restoration - Using data URL for reliability
  const forceCustomCursor = () => {
    const cursorDataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAeGVYSWZNTQAqAAAACAAEARoABQAAAAEAAAA+ARsABQAAAAEAAABGASgAAwAAAAEAAgAAh2kABAAAAAEAAABOAAAAAAAAAEgAAAABAAAASAAAAAEAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACfCVbEAAAACXBIWXMAAAsTAAALEwEAmpwYAAADJklEQVRYCe2WS2gTQRjHs3m/LS01kjQaIeCh2LQEvKkUvKgnQRFRES9F8GIRRBE0Fx8XRfBQlQoeWkQ8FOsDpBYPHvRS8NhDWqFKJaFeqm0S0ib+Rgyd3cyauH2cujDsfI/5/v/5vplv12bbfDYzsJkBkwy4XK4exmmn07k3nU67TNxWrXaoIvh8vni5XP5ot9ur2GO5XK4PIqXl5eVJlf+a68TuAXzPGPV6vQmPx5NkPuZwOIbC4XDrWgLaVcGCweB0tVqdA/RepVLxlkolIc9DYGpxcXHI7XZ3qdZZ0SlLUCwWS4ClAKUS5XGIXNQ0rcL8Cvos+ttkKUdJpqyANrUmEAhsA/gFQGd5v23hqS3kjHSge04mTtZ06/IG4AgHMS/OgRGgvb09CLkBRr/BprFuN5k6CMn9YiMGu07UdJJCIMh11NrS0lJGYbZjv0Z5WmKx2OV8Pt9Kme5wbsrovuHvY2xnPgvRW5yfWUWMhio243gE0FUzT4L3MYbxEWU5Jvslk0kPtjPEGBO3SbY1Pe/s7HQT5DEAN80WUaZeyjWD33mVj7Bje4bNclNzQOAuQQaj0ajfBGQHQPtUNqEjC/eJ0Wvmb0oPgQsEGQFoZ1MLJCfKc4osXZJUNmUfkB2Mcw7YJwL94FDeYEc+5M/4iJbd8MG/C/9W+siHhs6NHLheEbLxhKAPG/nW7PgOcBAP1WTxVrZi2cFsvrCwkGMnk1yxr0YfiJ1jdMt6gA/juzUej4/Leqcs/M88FAq1FQqFPZTihHEddZ6lH4yw41eQ/AJwgrbdIc5PNpstyf6WMwD4LoKLZqMLKILz8RoF9CVEKpCYZ/46lUodZ82MDC7mljPA2jCBfxkDSvI7CHaToUGhm5iYkEwrU8sZIMRPALashNLPIDeHpk2vrZcsE+AqThMuwlDG+EvuXxn6w0a5uJ5nvYYPy3dqXOBg9dRb+XppWg9jfX/h6IgHIPA0k8noNpJIJLzY3vj9/qiK3JrqRGvlpA9DJB2JRAICFPkBsvE/QYnb8H9AucqgFE2GFnuUuocYNkiN0wcGDG4bIgZAWc3V3hCSOpDfYPfqvXmUQpsAAAAASUVORK5CYII=';
    const cursorStyle = `${cursorDataUrl} 16 16, auto`;
    const pointerStyle = `${cursorDataUrl} 16 16, pointer`;
    
    // Apply to document and body
    document.documentElement.style.cursor = cursorStyle;
    document.body.style.cursor = cursorStyle;
    
    // Apply to all existing elements
    const allElements = document.querySelectorAll('*');
    allElements.forEach((element: Element) => {
      const htmlElement = element as HTMLElement;
      if (htmlElement.tagName === 'BUTTON' || 
          htmlElement.tagName === 'A' || 
          htmlElement.hasAttribute('onclick') ||
          htmlElement.getAttribute('role') === 'button' ||
          htmlElement.classList.contains('cursor-pointer')) {
        htmlElement.style.cursor = pointerStyle;
      } else {
        htmlElement.style.cursor = cursorStyle;
      }
    });
    
    // Also set CSS custom properties for global use
    document.documentElement.style.setProperty('--custom-cursor', cursorStyle);
    document.documentElement.style.setProperty('--custom-pointer', pointerStyle);
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

  // Cursor restoration effect
  useEffect(() => {
    // Initial cursor setup
    forceCustomCursor();

    // Restore cursor after various events that might reset it
    const events = [
      'mousemove',
      'mouseenter', 
      'mouseleave',
      'focus',
      'blur',
      'click',
      'keydown',
      'keyup',
      'scroll',
      'resize',
      'visibilitychange',
      'pointermove',
      'pointerenter',
      'pointerleave',
      'pointerdown',
      'pointerup',
      'contextmenu',
      'selectstart',
      'dragstart',
      'dragend'
    ];

    const restoreCursor = () => {
      // Immediate restoration
      forceCustomCursor();
      // Also restore after a small delay
      setTimeout(forceCustomCursor, 5);
    };

    events.forEach(event => {
      document.addEventListener(event, restoreCursor, true);
      window.addEventListener(event, restoreCursor, true);
    });

    // More frequent cursor restoration as fallback
    const cursorInterval = setInterval(forceCustomCursor, 100);

    // MutationObserver to catch new elements
    const observer = new MutationObserver(() => {
      forceCustomCursor();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, restoreCursor, true);
        window.removeEventListener(event, restoreCursor, true);
      });
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
        cursor: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAeGVYSWZNTQAqAAAACAAEARoABQAAAAEAAAA+ARsABQAAAAEAAABGASgAAwAAAAEAAgAAh2kABAAAAAEAAABOAAAAAAAAAEgAAAABAAAASAAAAAEAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIKADAAQAAAABAAAAIAAAAACfCVbEAAAACXBIWXMAAAsTAAALEwEAmpwYAAADJklEQVRYCe2WS2gTQRjHs3m/LS01kjQaIeCh2LQEvKkUvKgnQRFRES9F8GIRRBE0Fx8XRfBQlQoeWkQ8FOsDpBYPHvRS8NhDWqFKJaFeqm0S0ib+Rgyd3cyauH2cujDsfI/5/v/5vplv12bbfDYzsJkBkwy4XK4exmmn07k3nU67TNxWrXaoIvh8vni5XP5ot9ur2GO5XK4PIqXl5eVJlf+a68TuAXzPGPV6vQmPx5NkPuZwOIbC4XDrWgLaVcGCweB0tVqdA/RepVLxlkolIc9DYGpxcXHI7XZ3qdZZ0SlLUCwWS4ClAKUS5XGIXNQ0rcL8Cvos+ttkKUdJpqyANrUmEAhsA/gFQGd5v23hqS3kjHSge04mTtZ06/IG4AgHMS/OgRGgvb09CLkBRr/BprFuN5k6CMn9YiMGu07UdJJCIMh11NrS0lJGYbZjv0Z5WmKx2OV8Pt9Kme5wbsrovuHvY2xnPgvRW5yfWUWMhio243gE0FUzT4L3MYbxEWU5Jvslk0kPtjPEGBO3SbY1Pe/s7HQT5DEAN80WUaZeyjWD33mVj7Bje4bNclNzQOAuQQaj0ajfBGQHQPtUNqEjC/eJ0Wvmb0oPgQsEGQFoZ1MLJCfKc4osXZJUNmUfkB2Mcw7YJwL94FDeYEc+5M/4iJbd8MG/C/9W+siHhs6NHLheEbLxhKAPG/nW7PgOcBAP1WTxVrZi2cFsvrCwkGMnk1yxr0YfiJ1jdMt6gA/juzUej4/Leqcs/M88FAq1FQqFPZTihHEddZ6lH4yw41eQ/AJwgrbdIc5PNpstyf6WMwD4LoKLZqMLKILz8RoF9CVEKpCYZ/46lUodZ82MDC7mljPA2jCBfxkDSvI7CHaToUGhm5iYkEwrU8sZIMRPALashNLPIDeHpk2vrZcsE+AqThMuwlDG+EvuXxn6w0a5uJ5nvYYPy3dqXOBg9dRb+XppWg9jfX/h6IgHIPA0k8noNpJIJLzY3vj9/qiK3JrqRGvlpA9DJB2JRAICFPkBsvE/QYnb8H9AucqgFE2GFnuUuocYNkiN0wcGDG4bIgZAWc3V3hCSOpDfYPfqvXmUQpsAAAAASUVORK5CYII=) 16 16, auto'
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