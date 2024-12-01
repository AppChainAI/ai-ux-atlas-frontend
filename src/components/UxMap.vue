<script setup lang="ts">
import { ref, onMounted } from 'vue';
import StageItem from '@/components/StageItem.vue';
import { useUxMapStore } from '@/stores/uxmap';

const uxmapStore = useUxMapStore();

onMounted(() => {
})

function startGenerate() {
  uxmapStore.generateUxMap()
}
</script>

<template>
  <div class="w-full" v-if="uxmapStore.stages.length > 0">
    <div class="flex min-w-full w-fit gap-2 p-4">
      <StageItem v-for="stage in uxmapStore.stages" :key="stage.stage_name" :stage="stage" />
    </div>
  </div>
  <div class="hero" v-if="uxmapStore.isGenerating === false">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-4xl font-bold">用户体验地图AI生成器</h1>
        <p class="py-6">
          请输入您的需求，我们将为您生成用户体验地图。
        </p>
        <button class="btn btn-primary" @click="startGenerate">开始生成</button>
      </div>
    </div>
  </div>
</template>
