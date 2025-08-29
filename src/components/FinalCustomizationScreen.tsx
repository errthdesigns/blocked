import { motion } from 'motion/react';
import imgWatermarked3540C0595Eda400282001B643Cc1E2E31 from "figma:asset/596c4256123cb22cf58eabfcd8ac24e1c97ad788.png";
import SharedStickerBackground from './SharedStickerBackground';

// PERFECTLY CENTERED Group18 - moved to center of page
function Group18({ uploadedImage }: { uploadedImage: string | null }) {
  return (
    <motion.div 
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 120, 
        damping: 15, 
        delay: 1.0
      }}
    >
      {/* Image container centered on page */}
      <div className="flex h-[349px] items-center justify-center w-[390px]">
        <div className="flex-none rotate-[90deg]">
          {uploadedImage ? (
            <motion.img
              src={uploadedImage}
              alt="Uploaded"
              className="h-[390px] w-[349px] object-cover shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          ) : (
            <div 
              className="bg-center bg-cover bg-no-repeat h-[390px] w-[349px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" 
              data-name="watermarked_3540c059-5eda-4002-8200-1b643cc1e2e3 1" 
              style={{ backgroundImage: `url('${imgWatermarked3540C0595Eda400282001B643Cc1E2E31}')` }} 
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function FinalCustomizationScreen({ uploadedImage }: { uploadedImage: string | null }) {
  return (
    <div 
      className="bg-[magenta] relative overflow-hidden" 
      data-name="Desktop - 17"
      style={{
        width: '1920px',
        height: '1080px'
      }}
    >
      {/* Shared sticker background - consistent across all pages */}
      <SharedStickerBackground />
      
      {/* CENTERED image area - perfect center of page */}
      <Group18 uploadedImage={uploadedImage} />
    </div>
  );
}