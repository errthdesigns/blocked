import imgImage7 from "figma:asset/3881de7c145f96fda594ebbc2a8697ad761f0e13.png";

// Global header component with locked positioning - exact coordinates from FullTransitionFlow
export default function GlobalHeader() {
  return (
    <div 
      style={{
        position: 'absolute',
        left: '649px',
        top: '105px',
        width: '622px',
        height: '95px',
        backgroundImage: `url('${imgImage7}')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        zIndex: 10
      }}
      data-name="image 7"
    />
  );
}