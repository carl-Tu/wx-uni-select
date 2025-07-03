<script lang="ts" setup>
import { ref } from 'vue'

const showModal = ref<boolean>(false)

function show() {
  showModal.value = true
}

defineExpose({
  show
})
</script>

<template>
  <wd-popup v-model="showModal" custom-style="border-radius:32rpx;width: 80%;height: 200rpx;padding:50rpx">
    <div class="text">1.请先添加标签</div>
    <div class="text">2.点击随机，将随机选中一个标签</div>
  </wd-popup>
</template>

<style lang="scss" scoped>
.text {
  font-size: 40rpx;
  margin-bottom: 10rpx;
}
</style>
