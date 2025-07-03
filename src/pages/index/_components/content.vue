<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'

interface Props {
  randomColors: any[]
}
const props = withDefaults(defineProps<Props>(), {})
const emits = defineEmits<{
  (event: 'del', value: number): void
}>()
const innerAudioContext = uni.createInnerAudioContext()

const animationStyle = ref<{ [key: number]: string }>({})
const currentIndex = ref(0) // 当前选中的标签索引
const randomIndex = ref()
let timer: any = null

// 在组件挂载时生成9个随机颜色
function refreshFun() {
  // for (let i = 0; i < 9; i++) {
  //   randomColors.value.push(generateRandomColor())
  // }
}

function random() {
  currentIndex.value = 0
  randomIndex.value = null
  let loopCount = 0
  const maxLoops = 3 // 循环次数

  timer = setInterval(() => {
    innerAudioContext.src = 'https://cdn.pixabay.com/audio/2024/09/16/audio_cde73a8d45.mp3'
    nextTick(() => {
      innerAudioContext.play()
    })
    // 更新动画样式
    animationStyle.value = {}
    animationStyle.value[currentIndex.value] = 'animate'

    // 移动到下一个标签
    currentIndex.value = (currentIndex.value + 1) % props.randomColors.length

    // 检查是否完成指定次数的循环
    if (currentIndex.value === 0) {
      loopCount++
      if (loopCount >= maxLoops) {
        innerAudioContext.stop()
        innerAudioContext.destroy()
        clearInterval(timer!)
        // 随机选择一个标签停止
        randomIndex.value = Math.floor(Math.random() * props.randomColors.length)
        console.log('randomIndex======>', randomIndex.value)
        animationStyle.value = {}
        animationStyle.value[randomIndex.value] = 'animate'
      }
    }
  }, 100) // 每0.5秒切换一次标签
}

function del(_val) {
  emits('del', _val)
}

refreshFun()

defineExpose({
  random
})
</script>

<template>
  <div class="content">
    <div
      v-for="(it, i) in randomColors"
      :key="i"
      class="content_item"
      :style="{
        backgroundColor: it.color,
        transform: animationStyle[i] === 'animate' ? 'scale(1.3)' : 'scale(1)',
        boxShadow: animationStyle[i] === 'animate' ? '0 0 15px rgba(255, 255, 255, 0.8)' : 'none'
      }"
    >
      {{ it.name }}
      <span class="content_item-icon" @click="del(i)">
        <wd-icon name="close" size="12px"></wd-icon>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  padding: 15rpx;
  box-sizing: border-box;
  border-radius: 10rpx;
  border-color: #fff;
  display: flex;
  gap: 30rpx;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  border: 2rpx solid #eee;
  &_item {
    padding: 55rpx;
    box-sizing: border-box;
    border: 1rpx solid #eee;
    color: #fff;
    transition: transform 0.5s ease, box-shadow 0.5s ease; /* 添加过渡效果 */
    border-radius: 30rpx;
    &-icon {
      position: absolute;
      top: 10rpx;
      right: 10rpx;
    }
  }
}
</style>
