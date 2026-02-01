import { toReactive, tryOnScopeDispose, useMounted } from '@vueuse/core'
import { shallowRef, toValue, watchEffect, type MaybeRefOrGetter } from '#imports'
import type { WAAPIAnimationParams } from 'animejs'
import { normalizeWaapiAnimeTarget } from '../utils/normalize-targets'
import { waapi, type WAAPIAnimation } from 'animejs/waapi'

export function useWaapiAnimate(
  target: Parameters<typeof normalizeWaapiAnimeTarget>[0],
  options?: MaybeRefOrGetter<WAAPIAnimationParams>,
): WAAPIAnimation {
  const mounted = useMounted()
  const animation = shallowRef(waapi.animate([], {}))

  watchEffect(() => {
    const targets = normalizeWaapiAnimeTarget(target)
    if (!mounted.value || !targets) return
    if (animation.value) animation.value.revert()
    const newAnimation = waapi.animate(targets, toValue(options) || {})
    animation.value = newAnimation
  })

  tryOnScopeDispose(() => {
    animation.value?.revert()
  })

  return toReactive(animation)
}
