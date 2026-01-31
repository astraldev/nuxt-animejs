import { computed, shallowRef, toValue, watchEffect, type MaybeRefOrGetter } from '#imports'
import { createLayout, type AutoLayoutParams } from 'animejs/layout'
import { normalizeLayoutTarget } from '../utils/normalize-targets'
import { extractNonFunctionProperties } from '../utils/extract-props'
import { useMounted } from '@vueuse/core'

export function useAnimeLayout(
  target: Parameters<typeof normalizeLayoutTarget>[0],
  options?: MaybeRefOrGetter<AutoLayoutParams>,
) {
  const mounted = useMounted()
  const layout = shallowRef<ReturnType<typeof createLayout> | null>(null)

  watchEffect(() => {
    if (!mounted.value) return
    const targets = normalizeLayoutTarget(target)
    const newLayout = createLayout(targets, toValue(options) || {})
    layout.value = newLayout
  })

  return {
    properties: computed(() => layout.value ? extractNonFunctionProperties(layout.value) : undefined),
    record: () => layout.value?.record(),
    animate: () => layout.value?.animate(),
    revert: () => layout.value?.revert(),
  }
}
