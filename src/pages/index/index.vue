<script setup lang="ts">
import { onLoad, onShow } from '@dcloudio/uni-app'
import { nextTick, ref } from 'vue'
import Content from './_components/content.vue'
import Add from './_components/add.vue'
import Tip from './_components/tip.vue'

const innerAudioContext = uni.createInnerAudioContext()

const queryValue = ref<string>('')
const contentRef = ref()
const addRef = ref()
const randomColors = ref<any[]>([])
const tipRef = ref()

function random() {
  if (randomColors.value.length === 0) {
    uni.showToast({
      title: '请先添加内容',
      icon: 'none'
    })
    return
  }
  contentRef.value.random()
}

// 生成随机颜色的函数
const generateRandomColor = () => {
  // 生成随机的RGB颜色
  let r = 0
  let g = 0
  let b = 0
  do {
    r = Math.floor(Math.random() * 256)
    g = Math.floor(Math.random() * 256)
    b = Math.floor(Math.random() * 256)
  } while (r === 255 && g === 255 && b === 255) // 排除白色
  return `rgb(${r}, ${g}, ${b})`
}

function add() {
  addRef.value.show()
}

function submit(_val: string) {
  randomColors.value.push({
    color: generateRandomColor(),
    name: _val
  })
  console.log('_val======>', _val)
}

function del(_val) {
  randomColors.value.splice(_val, 1)
}

function clear() {
  randomColors.value = []
}

function music() {
  innerAudioContext.src = 'https://cdn.pixabay.com/audio/2024/09/16/audio_cde73a8d45.mp3'
  nextTick(() => {
    innerAudioContext.play()
  })
}

function musicTop() {
  console.log('innerAudioContext======>', innerAudioContext)
  innerAudioContext.stop()
  innerAudioContext.destroy()
}

onShow(() => {
  nextTick(() => {
    tipRef.value.show()
  })
})
</script>

<template>
  <Add ref="addRef" @submit="submit" />
  <wd-notice-bar text="仅供娱乐，不知去向何处，做什么，吃什么，加入想法，随机吧" prefix="warn-bold" />
  <div class="box">
    <Content ref="contentRef" :random-colors="randomColors" @del="del" />

    <wd-button custom-class="button-test" @click="random">随机</wd-button>
    <wd-button custom-class="button-test" @click="add">新增</wd-button>
    <wd-button custom-class="button-test" @click="clear">清空</wd-button>
    <!-- <wd-button custom-class="button-test" @click="music">播放</wd-button>
    <wd-button custom-class="button-test" @click="musicTop">暂停</wd-button> -->
  </div>
  <Tip ref="tipRef" />
</template>

<style lang="scss" scoped>
page {
  padding: 30rpx;
}
.box {
  padding: 20rpx;
  display: flex;
  flex-wrap: wrap;
  gap: 50rpx;
}
:deep() {
  .button-test {
    width: 100%;
  }
}
</style>
