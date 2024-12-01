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
  const isGenerating = ref(false)

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

  // 生成体验地图
  async function generateUxMap() {
    // 如果正在生成，则不进行操作
    if (isGenerating.value) return
    // 生成体验地图
    try {
      isGenerating.value = true
      // 创建 WebSocket 连接
      const ws = new WebSocket('ws://localhost:8000/ws/generate-map');

      ws.onopen = () => {
        console.log('WebSocket 连接已建立');
        // 初始化阶段
        initStages()
        // 发送请求获取数据
        ws.send(JSON.stringify({ type: 'generate_uxmap' }));
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        // 返回的数据格式为 { type: string, item: {}, current_stage: string, total_stages: number }
        if (data.type === 'stage_complete' && data.item) {
          addStage({
            stage_name: data.item.stage_name,
            user_behavior: data.item.user_behavior,
            touchpoints: data.item.touchpoints,
            emotion: data.item.emotion,
            needs: data.item.needs,
            opportunities: data.item.opportunities,
            suggestions: data.item.suggestions,
          });
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket 错误:', error);
        alert('连接服务器失败，请稍后重试');
        isGenerating.value = false
      };

      ws.onclose = () => {
        console.log('WebSocket 连接已关闭');
        isGenerating.value = false
      };
    } catch (error) {
      isGenerating.value = false
      console.error('生成体验地图失败:', error);
      alert('生成体验地图失败，请稍后重试');
    }
  }

  return { stages, addStage, initStages, clearStages, isGenerating, generateUxMap }
})
