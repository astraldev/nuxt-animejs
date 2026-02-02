import { toValue, type MaybeRef } from '#imports'
import type { MaybeElementRef, VueInstance } from '@vueuse/core'
import type { TargetsParam, DOMTargetsParam, DOMTargetSelector } from 'animejs'

function isVueInstance(value: unknown): value is VueInstance {
  return value !== null && typeof value === 'object' && '$el' in value
}

type WaapiElementTargets = VueInstance | HTMLElement | HTMLElement[] | SVGElement | SVGElement[] | NodeList | string | null
type WaapiTargets = MaybeRef<WaapiElementTargets> | MaybeRef<WaapiElementTargets>[]
export function normalizeWaapiAnimeTarget(target: WaapiTargets): DOMTargetsParam | null {
  const resolved = toValue(target)

  if (!resolved) return null

  if (isVueInstance(resolved)) {
    return resolved.$el as HTMLElement | SVGElement
  }

  if (Array.isArray(resolved)) {
    const targets = (resolved as WaapiElementTargets[])
      .map(t => normalizeWaapiAnimeTarget(t as WaapiTargets))
      .filter((t): t is DOMTargetsParam => t !== null)
      .flat()
    return targets.length ? targets : null
  }

  return resolved
}

type AnimeTargets = TargetsParam | MaybeElementRef | MaybeElementRef[]
export function normalizeAnimeTarget(target: AnimeTargets): TargetsParam {
  const resolved = toValue(target)

  if (!resolved) return []

  if (isVueInstance(resolved)) {
    return resolved.$el as HTMLElement | SVGElement
  }

  if (Array.isArray(resolved)) {
    const targets = resolved
      .map(t => normalizeAnimeTarget(t))
      .filter(t => t !== null && (Array.isArray(t) ? t.length > 0 : true))
      .flat()

    return targets
  }

  return resolved
}

type AnimeLayoutTargets = DOMTargetSelector | MaybeElementRef<HTMLElement | VueInstance> | null | undefined
export function normalizeLayoutTarget(target: AnimeLayoutTargets): DOMTargetSelector | null {
  const resolved = toValue(target)

  if (!resolved) return null

  if (isVueInstance(resolved)) {
    return resolved.$el as HTMLElement | SVGElement
  }

  return resolved
}

type SplitTargets = HTMLElement | string
type SplitTextTargets = SplitTargets | MaybeElementRef<HTMLElement> | null | undefined | MaybeElementRef<VueInstance>
export function normalizeSplitTextTarget(target: SplitTextTargets): SplitTargets | null {
  const resolved = toValue(target)

  if (!resolved) return null

  if (isVueInstance(resolved)) {
    return resolved.$el as HTMLElement
  }

  return resolved
}
