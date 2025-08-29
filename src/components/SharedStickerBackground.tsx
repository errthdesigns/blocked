import { motion } from 'motion/react';
import imgImage1 from "figma:asset/59db2a219c37ee84a5118dcb99d24a4b13204a11.png";
import imgImage3 from "figma:asset/3786eeabdba8b5810195b06503cbc234a53208a0.png";
import imgImage7 from "figma:asset/0ff590c81c61518fcd9a34724116161a23b84e4e.png";
import imgImage18 from "figma:asset/1ffd47cb9d4a47e07f8aa50dea5f36f79c34eee4.png";
import imgImage2 from "figma:asset/aba441c6984ddd88966846b48f2d123550cf1b3b.png";
import imgImage17 from "figma:asset/9eb72bff05e63bf1a10a6d0e0e9a1a7848730efc.png";
import imgImage6 from "figma:asset/7e3670b5570ecbbdbf2fd131bb36b9e26e07f87d.png";
import imgImage12 from "figma:asset/feed20764d16a1b14475aeac38e5b14342ea170e.png";
import imgImage8 from "figma:asset/3881de7c145f96fda594ebbc2a8697ad761f0e13.png";

// Shared hover animation properties
const hoverAnimation = {
  scale: 1.06,
  filter: 'drop-shadow(0 8px 16px rgba(255, 255, 255, 0.3)) drop-shadow(0 0 12px rgba(255, 0, 255, 0.4))'
};

const hoverTransition = {
  duration: 0.2,
  ease: 'easeInOut'
};

// EXACT sticker positions from the customization page - locked coordinates with hover animations
function Group3() {
  return (
    <motion.div 
      className="absolute contents left-[400px] top-[804px]"
      whileHover={hoverAnimation}
      transition={hoverTransition}
    >
      <div className="absolute flex h-[258.459px] items-center justify-center left-[400px] top-[804px] w-[258.459px]">
        <div className="flex-none rotate-[15deg]">
          <div className="relative size-[211.042px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 212 212">
              <circle cx="105.521" cy="105.521" fill="var(--fill-0, #B2EBFF)" id="Ellipse 1" r="105.521" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute bg-center bg-cover bg-no-repeat h-[44.449px] left-[459.87px] top-[910.22px] w-[137.034px]" data-name="image 1" style={{ backgroundImage: `url('${imgImage1}')` }} />
    </motion.div>
  );
}

function Group1() {
  return (
    <motion.div 
      className="absolute contents left-[1644px] top-[484px]"
      whileHover={hoverAnimation}
      transition={hoverTransition}
    >
      <div className="absolute flex h-[266.956px] items-center justify-center left-[1644px] top-[484px] w-[266.956px]">
        <div className="flex-none rotate-[15deg]">
          <div className="relative size-[217.973px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 218 218">
              <circle cx="108.987" cy="108.987" fill="var(--fill-0, #F1FF76)" id="Ellipse 1" r="108.987" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[120.029px] items-center justify-center left-[1692.71px] top-[557.46px] w-[169.604px]">
        <div className="flex-none rotate-[15deg]">
          <div className="bg-center bg-cover bg-no-repeat h-[83.192px] w-[153.304px]" data-name="image 3" style={{ backgroundImage: `url('${imgImage3}')` }} />
        </div>
      </div>
    </motion.div>
  );
}

function Group2() {
  return (
    <motion.div 
      className="absolute contents left-[150px] top-[946px]"
      whileHover={hoverAnimation}
      transition={hoverTransition}
    >
      <div className="absolute flex h-[147.463px] items-center justify-center left-[150px] top-[946px] w-[339.261px]">
        <div className="flex-none rotate-[348.344deg]">
          <div className="bg-[#a2d8a4] h-[82.626px] rounded-[16px] w-[329.37px]" />
        </div>
      </div>
      <div className="absolute flex h-[103.948px] items-center justify-center left-[170.4px] top-[967.68px] w-[298.637px]">
        <div className="flex-none rotate-[348.344deg]">
          <div className="bg-center bg-cover bg-no-repeat h-[45.158px] w-[295.612px]" data-name="image 7" style={{ backgroundImage: `url('${imgImage7}')` }} />
        </div>
      </div>
    </motion.div>
  );
}

function Group14() {
  return (
    <motion.div 
      className="absolute contents left-[897.15px] top-[890.34px]"
      whileHover={hoverAnimation}
      transition={hoverTransition}
    >
      <div className="absolute flex h-[225.189px] items-center justify-center left-[897.15px] top-[890.34px] w-[518.103px]">
        <div className="flex-none rotate-[348.344deg]">
          <div className="bg-white h-[126.182px] rounded-[16px] w-[502.998px]" />
        </div>
      </div>
      <div className="absolute flex h-[158.736px] items-center justify-center left-[928.31px] top-[923.45px] w-[456.059px]">
        <div className="flex-none rotate-[348.344deg]">
          <div className="bg-center bg-cover bg-no-repeat h-[68.962px] w-[451.444px]" data-name="image 7" style={{ backgroundImage: `url('${imgImage7}')` }} />
        </div>
      </div>
    </motion.div>
  );
}

function Group15() {
  return (
    <motion.div 
      className="absolute contents left-[739px] top-[777px]"
      whileHover={hoverAnimation}
      transition={hoverTransition}
    >
      <div className="absolute flex h-[266.956px] items-center justify-center left-[739px] top-[777px] w-[266.956px]">
        <div className="flex-none rotate-[15deg]">
          <div className="relative size-[217.973px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 218 218">
              <circle cx="108.987" cy="108.987" fill="var(--fill-0, #9787BA)" id="Ellipse 1" r="108.987" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[120.029px] items-center justify-center left-[787.71px] top-[850.46px] w-[169.604px]">
        <div className="flex-none rotate-[15deg]">
          <div className="bg-center bg-cover bg-no-repeat h-[83.192px] w-[153.304px]" data-name="image 3" style={{ backgroundImage: `url('${imgImage3}')` }} />
        </div>
      </div>
    </motion.div>
  );
}

export default function SharedStickerBackground() {
  return (
    <>
      {/* LOCKED sticker positions - consistent across all pages with hover animations */}
      <Group3 />
      <Group1 />
      
      {/* Image 18 - EXACT position with hover animation */}
      <motion.div 
        className="absolute bg-center bg-cover bg-no-repeat h-[184px] left-[1451px] top-[867px] w-[460px]" 
        data-name="image 18" 
        style={{ backgroundImage: `url('${imgImage18}')` }}
        whileHover={hoverAnimation}
        transition={hoverTransition}
      />
      
      {/* Image 2 rotated - EXACT position with hover animation */}
      <motion.div 
        className="absolute flex h-[239.992px] items-center justify-center left-[1634.46px] top-[657.17px] w-[330.068px]"
        whileHover={hoverAnimation}
        transition={hoverTransition}
      >
        <div className="flex-none rotate-[337.051deg]">
          <div className="bg-center bg-cover bg-no-repeat h-[132.636px] w-[302.296px]" data-name="image 2" style={{ backgroundImage: `url('${imgImage2}')` }} />
        </div>
      </motion.div>
      
      <Group2 />
      <Group14 />
      
      {/* Image 17 - EXACT position with hover animation */}
      <motion.div 
        className="absolute flex h-[335.133px] items-center justify-center left-[120px] top-[560.81px] w-[440.93px]"
        whileHover={hoverAnimation}
        transition={hoverTransition}
      >
        <div className="flex-none rotate-[27.352deg]">
          <div className="bg-center bg-cover bg-no-repeat h-[164.556px] w-[411.314px]" data-name="image 17" style={{ backgroundImage: `url('${imgImage17}')` }} />
        </div>
      </motion.div>
      
      {/* Image 6 - EXACT position with hover animation */}
      <motion.div 
        className="absolute bg-center bg-cover bg-no-repeat h-[92px] left-[180px] top-[847px] w-[172px]" 
        data-name="image 6" 
        style={{ backgroundImage: `url('${imgImage6}')` }}
        whileHover={hoverAnimation}
        transition={hoverTransition}
      />
      
      <Group15 />
      
      {/* Bottom image 1 - EXACT position with hover animation */}
      <motion.div 
        className="absolute bg-center bg-cover bg-no-repeat h-[100px] left-[456px] top-[979px] w-[308px]" 
        data-name="image 1" 
        style={{ backgroundImage: `url('${imgImage1}')` }}
        whileHover={hoverAnimation}
        transition={hoverTransition}
      />
      
      {/* Image 12 rotated - EXACT position with hover animation */}
      <motion.div 
        className="absolute flex h-[123.007px] items-center justify-center left-[1353px] top-[939px] w-[124.393px]"
        whileHover={hoverAnimation}
        transition={hoverTransition}
      >
        <div className="flex-none rotate-[313.482deg]">
          <div className="bg-center bg-cover bg-no-repeat h-[106px] w-[69px]" data-name="image 12" style={{ backgroundImage: `url('${imgImage12}')` }} />
        </div>
      </motion.div>
      
      {/* Top header image - EXACT position with hover animation */}
      <motion.div 
        className="absolute bg-center bg-cover bg-no-repeat h-[95px] left-1/2 top-[105px] translate-x-[-50%] w-[622px]" 
        data-name="image 7" 
        style={{ backgroundImage: `url('${imgImage8}')` }}
        whileHover={hoverAnimation}
        transition={hoverTransition}
      />
    </>
  );
}