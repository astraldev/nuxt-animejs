<script setup lang="ts">
import { round } from '#nanime/utils'
import ExampleWrapper from '~/components/shared/ExampleWrapper.vue'

const vector2D = shallowReactive({ x: 0, y: 0 })

useAnimate(vector2D, {
  x: 100,
  y: 150,
  duration: 10000,
  modifier: round(0),
  ease: 'outElastic',
  alternate: true,
  loop: true,
})
</script>

<template>
  <ExampleWrapper class="text-center font-mono">
    <p>
      {{ JSON.stringify(vector2D) }}
    </p>
  </ExampleWrapper>
</template>
