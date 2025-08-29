import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import AnimatedHomescreen from './components/AnimatedHomescreen';
import FullTransitionFlow from './components/FullTransitionFlow';
import CustomizeScreen from './components/CustomizeScreen';
import AnimatedCustomizePage from './components/AnimatedCustomizePage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'upload' | 'instructions' | 'customize' | 'final'>('home');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [scale, setScale] = useState(1);

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
        backgroundColor: '#FF00FF'
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
          backgroundColor: '#FF00FF'
        }}
      >
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