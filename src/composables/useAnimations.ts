import gsap from 'gsap';
import {
  type AnimationMode,
  type GsapTarget,
  type StepPreset,
  type TimelineOptions
} from 'src/util/Interface';

type AnimationPreset = keyof typeof presets
type GsapVars = Record<string, unknown>;

const presets = {
  exampleAnimation: {
    duration: 2,
    repeat: -1,
    yoyo: true,
    rotate: -2,
    ease: 'power1.inOut'
  }
} as const;

export const useAnimations = () => {
  const animate = (
    target: GsapTarget,
    preset: AnimationPreset | null = null,
    options: Partial<GsapVars> | Partial<TimelineOptions> = {},
    mode: AnimationMode = 'from'
  ) => {
    const presetConfig = preset ? presets[preset] : null

    const hasSteps = (obj: any): obj is StepPreset => !!obj && Array.isArray(obj.steps)

    // Caso: preset com steps ou options com steps
    if (hasSteps(presetConfig) || ('steps' in options && Array.isArray((options as TimelineOptions).steps))) {
      const steps = hasSteps(presetConfig) ? presetConfig.steps : (options as TimelineOptions).steps
      const repeat = hasSteps(presetConfig) ? presetConfig.repeat ?? 0 : (options as TimelineOptions).repeat ?? 0
      const yoyo = hasSteps(presetConfig) ? presetConfig.yoyo ?? false : (options as TimelineOptions).yoyo ?? false
      const delay = hasSteps(presetConfig) ? presetConfig.delay ?? 0 : (options as TimelineOptions).delay ?? 0
      const defaults = hasSteps(presetConfig) ? presetConfig.defaults : (options as TimelineOptions).defaults
      const onComplete = hasSteps(presetConfig) ? presetConfig.onComplete : (options as TimelineOptions).onComplete

      const tl = gsap.timeline({
        repeat,
        yoyo,
        delay,
        ...(defaults ? { defaults } : {}),
        ...(onComplete ? { onComplete } : {})
      })

      for (const step of steps) {
        tl.to(target, step)
      }

      return tl
    }

    // fromTo (manual)
    if (mode === 'fromTo') {
      const { fromVars, toVars } = options as unknown as {
        fromVars: gsap.TweenVars
        toVars: gsap.TweenVars
      };

      if (!fromVars || !toVars) {
        return
      }

      return gsap.fromTo(target, fromVars, toVars)
    }

    // from / to
    const flatConfig = presetConfig && !hasSteps(presetConfig) ? presetConfig : {}
    return gsap[mode](target, {
      ...flatConfig,
      ...(options as gsap.TweenVars)
    })
  }

  return { animate }
}
