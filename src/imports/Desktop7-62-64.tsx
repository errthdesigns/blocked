import imgImage18 from "figma:asset/1ffd47cb9d4a47e07f8aa50dea5f36f79c34eee4.png";
import imgGroup21 from "figma:asset/d85c3eb857456ec96e23a929daffcd28374729dd.png";
import imgImage2 from "figma:asset/aba441c6984ddd88966846b48f2d123550cf1b3b.png";
import imgImage7 from "figma:asset/3881de7c145f96fda594ebbc2a8697ad761f0e13.png";

export default function Desktop7() {
  return (
    <div className="bg-[magenta] relative size-full" data-name="Desktop - 7">
      <div className="absolute bg-center bg-cover bg-no-repeat h-[259px] left-[658px] top-[397px] w-[647px]" data-name="image 18" style={{ backgroundImage: `url('${imgImage18}')` }} />
      <div className="absolute flex h-[253.522px] items-center justify-center left-[1190px] top-[270px] w-[253.522px]">
        <div className="flex-none rotate-[15deg]">
          <div className="bg-center bg-cover bg-no-repeat size-[207px]" data-name="Group 2 1" style={{ backgroundImage: `url('${imgGroup21}')` }} />
        </div>
      </div>
      <div className="absolute flex h-[206.202px] items-center justify-center left-[487px] top-[338.86px] w-[283.594px]">
        <div className="flex-none rotate-[337.051deg]">
          <div className="bg-center bg-cover bg-no-repeat h-[113.962px] w-[259.734px]" data-name="image 2" style={{ backgroundImage: `url('${imgImage2}')` }} />
        </div>
      </div>
      <div className="absolute bottom-[140.5px] flex flex-col font-['Michroma:Regular',_sans-serif] h-[49px] justify-center leading-[0] left-1/2 not-italic text-[20px] text-center text-white translate-x-[-50%] translate-y-[50%] w-[676px]">
        <p className="leading-[normal]">CLICK ANYWHER TO BEGIN</p>
      </div>
      <div className="absolute bg-center bg-cover bg-no-repeat h-[95px] left-1/2 top-[105px] translate-x-[-50%] w-[622px]" data-name="image 7" style={{ backgroundImage: `url('${imgImage7}')` }} />
    </div>
  );
}