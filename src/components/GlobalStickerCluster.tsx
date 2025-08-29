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
import { STICKER_POSITIONS, STICKER_ROTATIONS } from './sticker-positioning-constants';

// Global sticker cluster with locked positioning - bottom-aligned layout
export default function GlobalStickerCluster() {
  return (
    <>
      <div style={{ position: 'absolute', ...STICKER_POSITIONS.image18, backgroundImage: `url('${imgImage18}')`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', zIndex: 0, pointerEvents: 'none' }} data-name="image 18" />
      
      <div style={{ position: 'absolute', ...STICKER_POSITIONS.group171, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ transform: STICKER_ROTATIONS.group171, width: '672px', height: '169px', backgroundImage: `url('${imgGroup171}')`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', borderRadius: '25px' }} data-name="Group 17 1" />
      </div>
      
      <div style={{ position: 'absolute', ...STICKER_POSITIONS.group22, backgroundImage: `url('${imgGroup22}')`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', zIndex: -1, pointerEvents: 'none' }} data-name="Group 2 2" />
      
      <div style={{ position: 'absolute', ...STICKER_POSITIONS.image2, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, pointerEvents: 'none' }}>
        <div style={{ transform: STICKER_ROTATIONS.image2, width: '302.296px', height: '132.636px', backgroundImage: `url('${imgImage2}')`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} data-name="image 2" />
      </div>
      
      <div style={{ position: 'absolute', ...STICKER_POSITIONS.image17, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ transform: STICKER_ROTATIONS.image17, width: '411.314px', height: '164.556px', backgroundImage: `url('${imgImage17}')`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} data-name="image 17" />
      </div>
      
      <div style={{ position: 'absolute', ...STICKER_POSITIONS.group121, backgroundImage: `url('${imgGroup121}')`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', zIndex: 0, pointerEvents: 'none' }} data-name="Group 12 1" />
      
      <div style={{ position: 'absolute', ...STICKER_POSITIONS.group32, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ transform: STICKER_ROTATIONS.group32, width: '518px', height: '130px', backgroundImage: `url('${imgGroup32}')`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', flexShrink: 0, aspectRatio: '259/65' }} data-name="Group 3 2" />
      </div>
      
      <div style={{ position: 'absolute', ...STICKER_POSITIONS.image6, backgroundImage: `url('${imgImage6}')`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', zIndex: 0, pointerEvents: 'none' }} data-name="image 6" />
      
      <div style={{ position: 'absolute', ...STICKER_POSITIONS.image12, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ transform: STICKER_ROTATIONS.image12, width: '69px', height: '106px', backgroundImage: `url('${imgImage12}')`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} data-name="image 12" />
      </div>
      
      <div style={{ position: 'absolute', ...STICKER_POSITIONS.image1, backgroundImage: `url('${imgImage1}')`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', zIndex: 0, pointerEvents: 'none' }} data-name="image 1" />
      
      <div style={{ position: 'absolute', ...STICKER_POSITIONS.group161, backgroundImage: `url('${imgGroup161}')`, backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', zIndex: 0, pointerEvents: 'none' }} data-name="Group 16 1" />
    </>
  );
}