<script setup lang="ts">
import { ref } from 'vue';
import IconTooling from '@/components/icons/IconTooling.vue';
import { useUxMapStore } from '@/stores/uxmap';

const uxmapStore = useUxMapStore();
const isLoading = ref(false)

// 生成体验地图
async function generateUxMap() {
  // 如果正在生成，则不进行操作
  if (isLoading.value) return
  // 生成体验地图
  try {
    isLoading.value = true
    // 创建 WebSocket 连接
    const ws = new WebSocket('ws://localhost:8000/ws/generate-map');
    
    ws.onopen = () => {
      console.log('WebSocket 连接已建立');
      // 初始化阶段
      uxmapStore.initStages()
      // 发送请求获取数据
      ws.send(JSON.stringify({ type: 'generate_uxmap' }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // 返回的数据格式为 { type: string, item: {}, current_stage: string, total_stages: number }
      if (data.type === 'stage_complete' && data.item) {
        uxmapStore.addStage({
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
      isLoading.value = false
    };

    ws.onclose = () => {
      console.log('WebSocket 连接已关闭');
      isLoading.value = false
    };
  } catch (error) {
    isLoading.value = false
    console.error('生成体验地图失败:', error);
    alert('生成体验地图失败，请稍后重试');
  }
}
</script>

<template>
  <div class="flex justify-between items-center bg-base-200 p-4">
    <!-- 标题 -->
    <div class="text-2xl font-bold">
      用户体验地图AI生成器
    </div>
    <!-- 按钮 -->
    <div class="btn btn-primary" @click="generateUxMap">
      <!-- 图标 -->
      <span class="loading loading-spinner loading-sm" v-if="isLoading"></span>
      <IconTooling v-else />
      生成体验地图
    </div>
  </div>
</template>
