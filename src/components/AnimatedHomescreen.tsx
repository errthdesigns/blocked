import { motion } from 'motion/react';
import imgImage18 from "figma:asset/1ffd47cb9d4a47e07f8aa50dea5f36f79c34eee4.png";
import imgGroup21 from "figma:asset/d85c3eb857456ec96e23a929daffcd28374729dd.png";
import imgImage2 from "figma:asset/aba441c6984ddd88966846b48f2d123550cf1b3b.png";
import imgGroup31 from "figma:asset/fead91a18d276467d72427f35a1a6aa2c9baa7c7.png";
import imgImage7 from "figma:asset/3881de7c145f96fda594ebbc2a8697ad761f0e13.png";

const CANVAS = { w: 1920, h: 1080 };

export default function AnimatedHomescreen() {
  return (
    <div 
      style={{ 
        position: 'relative', 
        width: CANVAS.w, 
        height: CANVAS.h, 
        overflow: 'hidden', 
        transform: 'none',
        backgroundColor: '#FF00FF'
      }}
    >
      {/* Header - COCKBLOCK ALWAYS USE PROTECTION */}
      <motion.div
        style={{
          position: 'absolute',
          left: 649,
          top: 105,
          width: 622,
          height: 95,
          backgroundImage: `url('${imgImage7}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 20
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
        whileHover={{ 
          scale: 1.06,
          filter: 'drop-shadow(0 15px 30px rgba(255, 255, 255, 0.2))',
          transition: { type: "spring", stiffness: 300, damping: 10 }
        }}
      />

      {/* Red COCKBLOCK sticker - main centerpiece */}
      <motion.div 
        style={{
          position: 'absolute',
          left: 658,
          top: 397,
          width: 647,
          height: 259,
          backgroundImage: `url('${imgImage18}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 30
        }}
        initial={{ scale: 0, opacity: 0, rotate: -180 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        exit={{ x: -1000, opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 12, 
          delay: 0.3,
          duration: 1.5
        }}
        whileHover={{ 
          scale: 1.06,
          rotate: 2,
          filter: 'drop-shadow(0 20px 40px rgba(255, 255, 255, 0.3)) drop-shadow(0 0 20px rgba(255, 0, 0, 0.4))',
          transition: { type: "spring", stiffness: 300, damping: 10 }
        }}
      />
      
      {/* Black oval COCKBLOCK sticker - overlapping left */}
      <motion.div 
        style={{
          position: 'absolute',
          left: 487,
          top: 338.86,
          width: 283.594,
          height: 206.202,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 35
        }}
        initial={{ scale: 0, opacity: 0, x: -300, rotate: -270 }}
        animate={{ scale: 1, opacity: 1, x: 0, rotate: 0 }}
        exit={{ x: -1000, opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
        transition={{ 
          type: "spring", 
          stiffness: 110, 
          damping: 11, 
          delay: 0.5,
          duration: 1.6
        }}
        whileHover={{ 
          scale: 1.06,
          rotate: 5,
          filter: 'drop-shadow(0 20px 40px rgba(255, 255, 255, 0.3)) drop-shadow(0 0 20px rgba(0, 0, 0, 0.5))',
          transition: { type: "spring", stiffness: 300, damping: 8 }
        }}
      >
        <motion.div 
          style={{ transform: 'rotate(337.051deg)' }}
          animate={{ 
            rotate: [337.051, 342.051, 332.051, 337.051],
            y: [0, -5, 5, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 6, 
            ease: "easeInOut",
            delay: 3
          }}
        >
          <div 
            style={{
              width: 259.734,
              height: 113.962,
              backgroundImage: `url('${imgImage2}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </motion.div>
      </motion.div>
      
      {/* Yellow CB PROTECTED circle - overlapping top-right */}
      <motion.div 
        style={{
          position: 'absolute',
          left: 1190,
          top: 270,
          width: 253.522,
          height: 253.522,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 40
        }}
        initial={{ scale: 0, opacity: 0, x: 300, rotate: -360 }}
        animate={{ scale: 1, opacity: 1, x: 0, rotate: 0 }}
        exit={{ x: -1000, opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
        transition={{ 
          type: "spring", 
          stiffness: 120, 
          damping: 10, 
          delay: 0.7,
          duration: 1.8
        }}
        whileHover={{ 
          scale: 1.06,
          rotate: 10,
          filter: 'drop-shadow(0 25px 50px rgba(255, 255, 0, 0.5)) drop-shadow(0 0 25px rgba(255, 255, 255, 0.4))',
          transition: { type: "spring", stiffness: 300, damping: 8 }
        }}
      >
        <motion.div 
          style={{ transform: 'rotate(15deg)' }}
          animate={{ 
            rotate: [15, 25, 5, 15],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 4, 
            ease: "easeInOut",
            delay: 2
          }}
        >
          <div 
            style={{
              width: 207,
              height: 207,
              backgroundImage: `url('${imgGroup21}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </motion.div>
      </motion.div>
      
      {/* Green strip sticker - overlapping bottom */}
      <motion.div 
        style={{
          position: 'absolute',
          left: 759,
          top: 626.31,
          width: 416.558,
          height: 182.935,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50
        }}
        initial={{ scale: 0, opacity: 0, y: 200, rotate: -180 }}
        animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
        exit={{ x: -1000, opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
        transition={{ 
          type: "spring", 
          stiffness: 130, 
          damping: 12, 
          delay: 0.9,
          duration: 1.4
        }}
        whileHover={{ 
          scale: 1.06,
          rotate: -5,
          filter: 'drop-shadow(0 20px 40px rgba(0, 255, 0, 0.4)) drop-shadow(0 0 20px rgba(0, 255, 100, 0.6))',
          transition: { type: "spring", stiffness: 300, damping: 8 }
        }}
      >
        <motion.div 
          style={{ transform: 'rotate(348.058deg)' }}
          animate={{ 
            rotate: [348.058, 353.058, 343.058, 348.058],
            x: [0, 3, -3, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 5, 
            ease: "easeInOut",
            delay: 4
          }}
        >
          <div 
            style={{
              width: 404.324,
              height: 101.483,
              borderRadius: 15,
              backgroundImage: `url('${imgGroup31}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </motion.div>
      </motion.div>

      {/* CTA - CLICK ANYWHERE TO BEGIN */}
      <motion.div
        style={{
          position: 'absolute',
          left: 622,
          top: 890,
          width: 676,
          height: 49,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Michroma, sans-serif',
          fontSize: '20px',
          color: 'white',
          textAlign: 'center',
          zIndex: 60
        }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } }}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 15, 
          delay: 1.2,
          duration: 1
        }}
        whileHover={{ 
          scale: 1.06,
          y: -5,
          transition: { type: "spring", stiffness: 400, damping: 10 }
        }}
      >
        <motion.p 
          style={{ margin: 0, lineHeight: 'normal' }}
          animate={{ 
            scale: [1, 1.02, 1],
            opacity: [1, 0.85, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2.5, 
            ease: "easeInOut" 
          }}
        >
          CLICK ANYWHER TO BEGIN
        </motion.p>
      </motion.div>
    </div>
  );
}