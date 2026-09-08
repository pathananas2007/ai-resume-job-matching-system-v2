import React from 'react';
import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient';
import * as reactSpring from '@react-spring/three';

export default function ShaderGradientBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <ShaderGradientCanvas
        importedFiber={{ ...reactSpring }}
        style={{ position: 'absolute', top: 0, left: 0 }}
        pointerEvents="none"
      >
        <ShaderGradient
          control="query"
          urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.2&cAzimuthAngle=180&cDistance=3.6&cPolarAngle=90&cameraZoom=1&color1=%233b82f6&color2=%238b5cf6&color3=%23ec4899&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=1.5&positionX=-1.4&positionY=0&positionZ=0&range=off&rangeTheme=dark&reflection=0.1&rotationX=0&rotationY=10&rotationZ=50&shader=fluid&type=water&uAmplitude=0&uDensity=1.1&uFrequency=5.5&uSpeed=0.1&uStrength=1.5&uTime=0.2&wireframe=false"
        />
      </ShaderGradientCanvas>
    </div>
  );
}



