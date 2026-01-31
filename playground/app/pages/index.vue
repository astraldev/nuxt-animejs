<template>
  <div
    ref="wrapper"
    class="p-4 w-sm rounded-lg border border-dashed gap-y-1 border-gray-800 grid place-items-center bg-gray-200/5"
  >
    <div
      v-for="i in 8"
      :key="i"
      ref="square"
      class="square size-7 bg-white/50 rounded-md"
    />
  </div>
</template>

<script setup lang="ts">
import { stagger } from 'animejs'

useAnimate(useTemplateRef('square'), {
  x: 320,
  rotate: { from: -180 },
  duration: 1250,
  delay: stagger(65, { from: 'center' }),
  ease: 'inOutQuint',
  loop: true,
  alternate: true,
})
</script>
