<script lang="ts" setup>
import { ref } from 'vue'

interface Emits {
  (ebent: 'submit', val: string): void
}
const emits = defineEmits<Emits>()

const showModal = ref<boolean>(false)
const name = ref<string>('')
function handleClose() {}

function show() {
  showModal.value = true
}

function submit() {
  console.log('name.value======>', name.value)
  if (name.value.length === 0) {
    uni.showToast({
      title: '请先添加内容',
      icon: 'none'
    })
    return
  }
  emits('submit', name.value)
  showModal.value = !showModal.value
  name.value = ''
}

function handleChange(_val) {
  console.log('_val======>', _val)
}
defineExpose({
  show
})
</script>

<script lang="ts">
export default {}
</script>

<template>
  <wd-popup v-model="showModal" custom-style="border-radius:32rpx;width: 80%" @close="handleClose">
    <div class="popup-content">
      <!-- <wd-input v-model="name" :maxlength="5" show-word-limit @change="handleChange" /> -->
      <wd-input
        v-model="name"
        custom-class="input-sty"
        type="text"
        placeholder="请输入内容，限制5位"
        show-word-limit
        :maxlength="5"
      />
      <wd-button @click="submit">确定</wd-button>
    </div>
  </wd-popup>
</template>

<style lang="scss" scoped>
.popup-content {
  padding: 50rpx;
  display: flex;
  flex-direction: column;
  gap: 30rpx;
}
:deep() {
  .input-sty {
    width: 100%;
    height: 80rpx;
    border-radius: 20rpx;
    border: #ccc 1px solid;
  }
}
</style>
