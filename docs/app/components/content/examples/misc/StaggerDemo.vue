<script setup lang="ts">
import { stagger } from '#nanime/utils'
import ExampleWrapper from '../../../shared/ExampleWrapper.vue'

const items = useTemplateRef('items')

useAnimate(items, {
  opacity: [0, 1],
  scale: [0.5, 1],
  delay: stagger(100, { grid: [9, 1], from: 'center' }),
  duration: 800,
  ease: 'outElastic(1, .5)',
  loop: true,
  alternate: true,
})
</script>

<template>
  <ExampleWrapper>
    <div class="flex gap-2.5">
      <div
        v-for="i in 9"
        :key="i"
        ref="items"
        class="simple-box opacity-0 w-8"
      />
    </div>
  </ExampleWrapper>
</template>
