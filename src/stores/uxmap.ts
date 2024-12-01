import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUxMapStore = defineStore('uxmap', () => {
  // stage 类型
  type Stage = {
    stage_name: string;
    user_behavior: string;
    touchpoints: string[];
    emotion: string;
    needs: string[];
    opportunities: string[];
    suggestions: string[];
  }

  const stages = ref<Stage[]>([])

  function initStages() {
    stages.value = [{
      stage_name: '多阶段体验',
      user_behavior: '用户行为',
      touchpoints: ['接触'],
      emotion: '用户感受',
      needs: ['用户需求'],
      opportunities: ['机会点'],
      suggestions: ['改进建议'],
    }]
  }

  function addStage(stage: Stage) {
    stages.value.push(stage)
  }

  function clearStages() {
    stages.value = []
  }

  return { stages, addStage, initStages, clearStages }
})
