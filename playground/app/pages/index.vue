<template>
  <div class="p-8 max-w-4xl mx-auto space-y-8 my-auto">
    <div class="space-y-4">
      <h2 class="text-3xl font-bold text-white">
        Playground
      </h2>
      <p class="text-gray-400">
        Available demos
      </p>
    </div>

    <nav class="grid gap-4 sm:grid-cols-2">
      <PDemoCard
        to="/composables/use-animate"
        title="useAnimate Demo"
        description="animate() examples"
      />

      <PDemoCard
        to="/transitions/slide-transition"
        title="Slide Transition"
        description="Interactive demos for slide transition"
      />

      <PDemoCard
        to="/composables/use-animatable"
        title="useAnimatable Demo"
        description="useAnimatable examples"
      />

      <PDemoCard
        to="/composables/use-split-text"
        title="useSplitText Demo"
        description="Text split examples"
      />

      <PDemoCard
        to="/composables/use-waapi-animate"
        title="useWaapiAnimate Demo"
        description="Native Web Animations API"
      />
    </nav>
  </div>
</template>

<script setup lang="ts">
</script>
