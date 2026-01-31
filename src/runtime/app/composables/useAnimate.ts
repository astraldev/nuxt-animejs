import { toReactive, tryOnScopeDispose, useMounted } from '@vueuse/core'
import { shallowRef, toValue, watchEffect, type MaybeRefOrGetter } from '#imports'
import { normalizeAnimeTarget } from '../utils/normalize-targets'
import type { AnimationParams } from 'animejs'
import { animate } from 'animejs/animation'

export function useAnimate(
  target: Parameters<typeof normalizeAnimeTarget>[0],
  options?: MaybeRefOrGetter<AnimationParams>,
) {
  const mounted = useMounted()
  const animation = shallowRef(animate({}, {}))

  watchEffect(() => {
    if (!mounted.value) return
    if (animation.value) animation.value.revert()
    const targets = normalizeAnimeTarget(target)
    const newAnimation = animate(targets, toValue(options) || {})
    animation.value = newAnimation
  })

  tryOnScopeDispose(() => {
    animation.value?.revert()
  })

  return toReactive(animation)
}
