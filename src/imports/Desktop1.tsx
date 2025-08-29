import imgImage3 from "figma:asset/3786eeabdba8b5810195b06503cbc234a53208a0.png";
import imgImage7 from "figma:asset/0ff590c81c61518fcd9a34724116161a23b84e4e.png";
import imgImage18 from "figma:asset/1ffd47cb9d4a47e07f8aa50dea5f36f79c34eee4.png";
import imgImage2 from "figma:asset/aba441c6984ddd88966846b48f2d123550cf1b3b.png";
import imgImage8 from "figma:asset/3881de7c145f96fda594ebbc2a8697ad761f0e13.png";

function Group1() {
  return (
    <div className="absolute contents left-[929px] top-[217px]">
      <div className="absolute flex h-[240.873px] items-center justify-center left-[929px] top-[217px] w-[240.873px]">
        <div className="flex-none rotate-[15deg]">
          <div className="relative size-[196.679px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 197 197">
              <circle cx="98.3393" cy="98.3393" fill="var(--fill-0, #F1FF76)" id="Ellipse 1" r="98.3393" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[108.303px] items-center justify-center left-[972.95px] top-[283.28px] w-[153.027px]">
        <div className="flex-none rotate-[15deg]">
          <div className="bg-center bg-cover bg-no-repeat h-[75.065px] w-[138.327px]" data-name="image 3" style={{ backgroundImage: `url('${imgImage3}')` }} />
        </div>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[496px] top-[572px]">
      <div className="absolute flex h-[171.621px] items-center justify-center left-[496px] top-[572px] w-[394.865px]">
        <div className="flex-none rotate-[348.344deg]">
          <div className="bg-[#a2d8a4] h-[96.167px] rounded-[16px] w-[383.35px]" />
        </div>
      </div>
      <div className="absolute flex h-[120.972px] items-center justify-center left-[519.75px] top-[597.23px] w-[347.568px]">
        <div className="flex-none rotate-[348.344deg]">
          <div className="bg-center bg-cover bg-no-repeat h-[52.558px] w-[344.06px]" data-name="image 7" style={{ backgroundImage: `url('${imgImage7}')` }} />
        </div>
      </div>
    </div>
  );
}

export default function Desktop1() {
  return (
    <div className="bg-[magenta] relative size-full" data-name="Desktop - 1">
      <Group1 />
      <div className="absolute bg-center bg-cover bg-no-repeat h-[259px] left-[394px] top-[337px] w-[647px]" data-name="image 18" style={{ backgroundImage: `url('${imgImage18}')` }} />
      <div className="absolute flex h-[206.202px] items-center justify-center left-[223px] top-[278.86px] w-[283.594px]">
        <div className="flex-none rotate-[337.051deg]">
          <div className="bg-center bg-cover bg-no-repeat h-[113.962px] w-[259.734px]" data-name="image 2" style={{ backgroundImage: `url('${imgImage2}')` }} />
        </div>
      </div>
      <Group2 />
      <div className="absolute bg-center bg-cover bg-no-repeat h-[95px] left-[409px] top-[108px] w-[622px]" data-name="image 7" style={{ backgroundImage: `url('${imgImage8}')` }} />
      <div className="absolute bottom-[86.5px] flex flex-col font-['Michroma:Regular',_sans-serif] h-[49px] justify-center leading-[0] left-1/2 not-italic text-[20px] text-center text-white translate-x-[-50%] translate-y-[50%] w-[676px]">
        <p className="leading-[normal]">CLICK ANYWHER TO BEGIN</p>
      </div>
    </div>
  );
}