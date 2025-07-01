<script setup lang="ts">
import { onLoad, onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'

const queryValue = ref('')
</script>

<template>
  <wd-notice-bar text="仅供娱乐，不知去向何处，做什么，吃什么，加入想法，随机吧" prefix="warn-bold" />
  <div class="box">
    <wd-input v-model="queryValue" type="text" placeholder="查询标签" />
    <wd-button>新增</wd-button>
  </div>
</template>

<style lang="scss" scoped>
page {
  padding: 30rpx;
}
.box {
  padding: 20rpx;
}
</style>
