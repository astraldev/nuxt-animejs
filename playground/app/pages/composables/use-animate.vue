<template>
  <div class="p-8 space-y-12 text-white [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-4 [&_h2]:font-mono">
    <!-- Section 1: Basic Loop -->
    <section>
      <h2>1. Basic Infinite Loop</h2>
      <div class="p-4 border border-dashed border-gray-700 rounded-lg">
        <div
          ref="box1"
          class="size-10 bg-green-500 rounded-lg shadow-lg"
        />
      </div>
    </section>

    <!-- Section 2: Grid Stagger -->
    <section>
      <h2>2. Grid Stagger</h2>
      <div class="p-4 border border-dashed border-gray-700 rounded-lg grid grid-cols-5 w-fit gap-2">
        <div
          v-for="i in 30"
          :key="i"
          ref="staggerBox"
          class="size-5 bg-indigo-500 rounded-md shadow-sm"
        />
      </div>
    </section>

    <!-- Section 3: Interactive Controls -->
    <section>
      <h2>3. Interactive: Swap Target & Animation</h2>

      <div class="flex gap-4 mb-6">
        <div class="flex gap-2 p-1 bg-gray-800/50 rounded-lg">
          <button
            class="px-3 py-1 rounded text-sm transition-colors"
            :class="animType === 'move' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'"
            @click="animType = 'move'"
          >
            Move
          </button>
          <button
            class="px-3 py-1 rounded text-sm transition-colors"
            :class="animType === 'spin' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'"
            @click="animType = 'spin'"
          >
            Spin
          </button>
          <button
            class="px-3 py-1 rounded text-sm transition-colors"
            :class="animType === 'scale' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'"
            @click="animType = 'scale'"
          >
            Scale
          </button>
        </div>

        <button
          class="px-3 py-1 rounded text-sm bg-gray-700 hover:bg-gray-600 text-white transition-colors"
          @click="targetId = targetId === 'A' ? 'B' : 'A'"
        >
          Swap Target (Current: {{ targetId }})
        </button>
      </div>

      <div class="relative h-40 p-4 border border-dashed border-gray-700 rounded-lg overflow-hidden">
        <div
          ref="targetA"
          class="absolute top-1/2 left-4 -translate-y-1/2 size-20 bg-rose-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl"
        >
          A
        </div>

        <div
          ref="targetB"
          class="absolute top-1/2 left-32 -translate-y-1/2 size-20 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-2xl"
        >
          B
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { AnimationParams } from 'animejs'

// --- Section 1 ---
const box1 = useTemplateRef('box1')
useWaapiAnimate(box1, {
  x: 250,
  y: 50,
  rotate: '45deg',
  alternate: true,
  loop: true,
  duration: 2000,
  ease: 'out',
})

// --- Section 2 ---
const staggerBox = useTemplateRef('staggerBox')
// useAnimate(staggerBox, {
//   y: [0, -20],
//   x: [0, 20],
//   scale: [1, 0.8],
//   opacity: [1, 0.5],
//   delay: stagger(100, { grid: [5, 6], from: 'center' }),
//   alternate: true,
//   loop: true,
//   ease: 'easeInOutSine',
// })

// --- Section 3 ---
const targetA = useTemplateRef('targetA')
const targetB = useTemplateRef('targetB')
const targetId = ref<'A' | 'B'>('A')
const animType = ref<'move' | 'spin' | 'scale'>('move')

// Dynamic target
const activeTarget = computed(() => targetId.value === 'A' ? targetA.value : targetB.value)

// Dynamic options
const activeOptions = computed((): AnimationParams => {
  switch (animType.value) {
    case 'move':
      return {
        translateX: 200,
        rotate: 0,
        scale: 1,
        borderRadius: targetId.value === 'A' ? ['0%', '50%'] : ['50%', '0%'], // Morph shape
        duration: 800,
        ease: 'inOutExpo',
        loop: false,
        alternate: false,
      } satisfies AnimationParams
    case 'spin':
      return {
        translateX: 0,
        rotate: 360,
        scale: 1,
        duration: 1500,
        ease: 'inOutExpo',
        loop: true, // Loop this one
        alternate: false,
      } satisfies AnimationParams
    case 'scale':
      return {
        translateX: 0,
        rotate: 0,
        scale: [1, 1.5],
        duration: 600,
        alternate: true,
        loop: true,
        ease: 'inOutExpo',
      } satisfies AnimationParams
  }

  return {} as AnimationParams
})

useAnimate(activeTarget, activeOptions)
</script>
