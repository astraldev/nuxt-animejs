<script setup lang="ts">
import { stagger } from '#nanime/utils'
import ExampleWrapper from '~/components/shared/ExampleWrapper.vue'

useWaapiAnimate('.square', {
  y: {
    to: [0, -15, 0],
    ease: 'out(4)',
    duration: 1000,
  },
  rotate: { from: -180, to: 0, ease: 'out(3)' },
  scale: { to: [0.65, 1, 0.65], ease: 'inOut(3)' },
  duration: 500,
  delay: stagger(75),
  loop: true,
})
</script>

<template>
  <ExampleWrapper>
    <div class="flex gap-2.5">
      <div
        v-for="i in 6"
        :key="i"
        class="simple-box square w-8"
      />
    </div>
  </ExampleWrapper>
</template>
