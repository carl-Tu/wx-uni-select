<script setup lang="ts">
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { picImg, errHttpImg, errHttp404Img, errHttp500Img } from '@/static'

type ResultType = 'NONE' | 'EMPTY' | 'ERROR' | 'ERROR_404' | 'ERROR_500'

interface Props {
  mode?: ResultType
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'NONE'
})

const result = computed(() => {
  const results: Record<ResultType, { src?: string; tip?: string }> = {
    EMPTY: {
      src: picImg,
      tip: '暂无相关内容'
    },
    ERROR: {
      src: errHttpImg,
      tip: '网络错误，请检查网络连接是否正常'
    },
    ERROR_404: {
      src: errHttp404Img,
      tip: '抱歉，系统错误'
    },
    ERROR_500: {
      src: errHttp500Img,
      tip: '抱歉，系统错误'
    },
    NONE: {}
  }

  return results[props.mode]
})
</script>

<template>
  <view class="none">
    <image v-if="mode === 'EMPTY'" mode="scaleToFill" :src="picImg" />
    <image v-if="mode === 'ERROR'" mode="scaleToFill" :src="errHttpImg" />
    <image v-if="mode === 'ERROR_404'" mode="scaleToFill" :src="errHttp404Img" />
    <image v-if="mode === 'ERROR_500'" mode="scaleToFill" :src="errHttp500Img" />

    <view v-if="mode === 'EMPTY'" class="noneWork">暂无相关内容</view>
    <view v-if="mode === 'ERROR'" class="noneWork">网络错误，请检查网络连接是否正常</view>
    <view v-if="mode === 'ERROR_500' || mode === 'ERROR_404'" class="noneWork">抱歉，系统错误</view>

    <view v-if="['EMPTY', 'ERROR', 'ERROR_500', 'ERROR_404'].includes(mode)" class="rowView">
      <view>
        <text class="textColor">应用归属单位</text>
        <text class="textColor1">省**厅</text>
      </view>
      <view>
        <text class="textColor">应用管理员</text>
        <text class="textColor1">***</text>
      </view>
      <view>
        <text class="textColor">联系方式</text>
        <text class="textColor1">159****6666</text>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.none {
  text-align: center;
  margin-top: 100rpx;
}
.none image {
  width: 354rpx;
  height: 354rpx;
}
.none .noneWork {
  font-size: 30rpx;
  font-weight: 400;
  color: #c7c7cb;
  margin-top: 20rpx;
}
</style>
