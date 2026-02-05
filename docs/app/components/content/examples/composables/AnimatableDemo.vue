<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core'
import { round } from '#nanime/utils'

import ExampleWrapper from '~/components/shared/ExampleWrapper.vue'

const counter = reactive({ x: 0 })
const animator = useAnimatable(counter, {
  x: 100,
  duration: 10000,
  modifier: round(0),
  ease: 'outElastic',
})

useIntervalFn(() => {
  animator.x?.(counter.x + 1)
}, 1000)
</script>

<template>
  <ExampleWrapper class="text-center font-mono">
    <p>
      Counter: {{ JSON.stringify(counter) }}
    </p>
  </ExampleWrapper>
</template>
