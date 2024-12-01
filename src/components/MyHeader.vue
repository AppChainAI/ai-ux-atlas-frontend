<script setup lang="ts">
import IconTooling from '@/components/icons/IconTooling.vue';
import { useUxMapStore } from '@/stores/uxmap';

const uxmapStore = useUxMapStore();

</script>

<template>
  <div class="flex justify-between items-center bg-base-200 p-4">
    <!-- 标题 -->
    <div class="text-2xl font-bold">
      用户体验地图AI生成器
    </div>
    <!-- 按钮 -->
    <div class="btn btn-primary" @click="uxmapStore.generateUxMap">
      <!-- 图标 -->
      <span class="loading loading-spinner loading-sm" v-if="uxmapStore.isGenerating"></span>
      <IconTooling v-else />
      生成体验地图
    </div>
  </div>
</template>
