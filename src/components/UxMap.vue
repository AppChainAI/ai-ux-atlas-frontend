<script setup lang="ts">
import { ref, onMounted } from 'vue';
import StageItem from '@/components/StageItem.vue';
import { useUxMapStore } from '@/stores/uxmap';

const uxmapStore = useUxMapStore();

onMounted(() => {
  uxmapStore.initStages()
  // 阶段一
  uxmapStore.addStage({
    stage_name: '阶段一',
    user_behavior: '行为行为行为行为行为行为行为行为行为行为行为行为行为行为行为行为行为行行为行为行为行为行为行',
    touchpoints: ['接触点1', '接触点2'],
    emotion: '用户感受',
    needs: ['需求1', '需求2'],
    opportunities: ['机会点1', '机会点2', '机会点3', '机会点4'],
    suggestions: ['改进建议1', '改进建议2', '改进建议3'],
  })
  // 阶段二
  uxmapStore.addStage({
    stage_name: '阶段二',
    user_behavior: '描述',
    touchpoints: ['接触点1', '接触点2'],
    emotion: '用户感受',
    needs: ['需求1', '需求2'],
    opportunities: ['机会点1', '机会点2'],
    suggestions: ['改进建议1', '改进建议2', '改进建议3', '改进建议3', '改进建议3', '改进建议3', '改进建议3', '改进建议3', '改进建议3'],
  })
})
</script>

<template>
  <div class="flex p-4">
    <StageItem v-for="stage in uxmapStore.stages" :key="stage.stage_name" :stage="stage" />
  </div>
</template>
