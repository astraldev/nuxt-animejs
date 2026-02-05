<template>
  <div class="p-4 rounded-lg flex flex-col gap-4 border border-primary/20 bg-primary/5">
    <slot />
  </div>
</template>

<style>
@reference "~/assets/css/main.css";

.simple-box {
  @apply rounded-md h-8 bg-primary grid place-items-center font-semibold;
}

.spot {
  @apply py-1 w-12 px-1.5 z-10 grid place-items-center;
  @apply border border-dashed border-primary/35 rounded font-bold font-mono;

  background-image: repeating-linear-gradient(
    45deg,
    color-mix(in hsl, var(--color-primary), transparent 80%) 0,
    color-mix(in hsl, var(--color-primary), transparent 80%) 1px,
    transparent 1px,
    transparent 6px
  );
}
</style>
