<script setup lang="ts">
defineProps<{
  stage: {
    stage_name: string;
    user_behavior: string;
    touchpoints: string[];
    emotion: string;
    needs: string[];
    opportunities: string[];
    suggestions: string[];
  };
}>();

// 数组转换为字符串
function getArrayString(arr: string[]) {
  return arr.join(', ')
}
</script>

<template>
  <div class="flex flex-col gap-4 p-4 max-w-60">
    <div class="bg-secondary text-secondary-content p-2 rounded-md shadow h-10 overflow-hidden">
      <div class="text-ellipsis overflow-hidden whitespace-nowrap">
        {{ stage.stage_name }}
      </div>
    </div>
    <div class="bg-base-100 p-2 rounded-md shadow h-20 overflow-hidden text-ellipsis">
      {{ stage.user_behavior }}
    </div>
    <div class="bg-base-100 p-2 rounded-md shadow h-20 overflow-hidden text-ellipsis">
      {{ getArrayString(stage.touchpoints) }}
    </div>
    <div class="bg-base-100 p-2 rounded-md shadow h-20 overflow-hidden text-ellipsis">
      {{ stage.emotion }}
    </div>
    <div class="bg-base-100 p-2 rounded-md shadow h-28 overflow-hidden text-ellipsis">
      {{ getArrayString(stage.needs) }}
    </div>
    <div class="bg-base-100 p-2 rounded-md shadow h-28 overflow-hidden text-ellipsis">
      {{ getArrayString(stage.opportunities) }}
    </div>
    <div class="bg-base-100 p-2 rounded-md shadow h-28 overflow-hidden text-ellipsis">
      {{ getArrayString(stage.suggestions) }}
    </div>
  </div>
</template>
