<script setup lang="ts">
import MyHeader from "@/components/MyHeader.vue"
import UxMap from "@/components/UxMap.vue"
</script>

<template>
  <!-- 顶部标题栏，固定在顶部 -->
  <div class="fixed top-0 left-0 right-0 z-50">
    <MyHeader />
  </div>
  <!-- 内容区 -->
  <div class="pt-20">
    <UxMap />
  </div>
</template>
