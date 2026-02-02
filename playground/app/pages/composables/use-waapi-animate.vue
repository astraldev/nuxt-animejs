<template>
  <div class="p-8 space-y-12 text-white [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-4 [&_h2]:font-mono">
    <!-- Section 1: Basic WAAPI Animation -->
    <section>
      <h2>1. Basic WAAPI Animation</h2>
      <p class="text-gray-400 mb-4">
        WAAPI uses native Web Animations API for better performance
      </p>
      <PWrapper>
        <PItem ref="box1" />
      </PWrapper>
    </section>

    <!-- Section 2: CSS Variables -->
    <section>
      <h2>2. CSS Variables - Custom Properties</h2>
      <p class="text-gray-400 mb-4">
        WAAPI can animate CSS custom properties (CSS variables)
      </p>
      <PWrapper>
        <div
          ref="cssVarBox"
          class="size-20 rounded-lg"
          :style="{ backgroundColor: 'var(--box-color, #3B82F6)' }"
        />
      </PWrapper>
    </section>

    <!-- Section 3: Persist Mode -->
    <section>
      <h2>3. Persist - Prevent Auto-Cancel</h2>
      <p class="text-gray-400 mb-4">
        Keeps animations active after completion (prevents auto-cancel and memory release)
      </p>

      <PButton
        class="mb-4"
        @click="alternateAnimations"
      >
        Try to Alternate Both Animations
      </PButton>

      <PWrapper extra-class="flex gap-8">
        <div class="flex flex-col items-center gap-2">
          <div
            ref="boxNoPersist"
            class="size-20 bg-rose-500 rounded-lg"
          />
          <span class="text-sm text-gray-400">persist: false</span>
          <span class="text-xs text-gray-500">(won't respond after completion)</span>
        </div>

        <div class="flex flex-col items-center gap-2">
          <div
            ref="boxWithPersist"
            class="size-20 bg-emerald-500 rounded-lg"
          />
          <span class="text-sm text-gray-400">persist: true</span>
          <span class="text-xs text-gray-500">(stays active)</span>
        </div>
      </PWrapper>
    </section>
  </div>
</template>

<script setup lang="ts">
// --- Section 1: Basic WAAPI Animation ---
const box1 = useTemplateRef('box1')
useWaapiAnimate(box1, {
  x: 250,
  y: 50,
  rotate: '45deg',
  alternate: true,
  loop: true,
  duration: 2000,
  ease: 'ease-in-out',
})

// --- Section 2: CSS Variables ---
const cssVarBox = useTemplateRef('cssVarBox')
useWaapiAnimate(cssVarBox, {
  '--box-color': ['#3B82F6', '#EC4899', '#10B981', '#F59E0B', '#3B82F6'],
  'scale': [1, 1.2, 1],
  'borderRadius': ['0.5rem', '50%', '0.5rem'],
  'duration': 3000,
  'loop': true,
  'ease': 'ease-in-out',
})

// --- Section 3: Persist ---
const boxNoPersist = useTemplateRef('boxNoPersist')
const boxWithPersist = useTemplateRef('boxWithPersist')

const animationNoPersist = useWaapiAnimate(boxNoPersist, {
  x: '17rem',
  duration: 1500,
  ease: 'out-expo',
  persist: false, // Default - animation will be cancelled after completion
})

const animationWithPersist = useWaapiAnimate(boxWithPersist, {
  x: '17rem',
  duration: 1500,
  ease: 'out-expo',
  persist: true, // Keeps animation active after completion
})

const alternateAnimations = () => {
  // After completion, only the persisted animation will respond
  animationNoPersist.alternate().resume()
  animationWithPersist.alternate().resume()
}
</script>
