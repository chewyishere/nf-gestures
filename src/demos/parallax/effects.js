import { forwardRef } from "react";
import { useThree } from "@react-three/fiber";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

const Effects = forwardRef((props, ref) => {
  const {
    viewport: { width, height },
  } = useThree();

  return (
    <EffectComposer>
      <DepthOfField
        ref={ref}
        focusDistance={0.01}
        focalLength={0.2}
        bokehScale={2}
        width={(width * 5) / 2}
        height={(height * 5) / 2}
      />
      <Bloom luminanceThreshold={2} luminanceSmoothing={0.9} height={900} />
      <Noise opacity={0.05} />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
  );
});

export default Effects;
