<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
page {
  background: #f7f7f7;
  box-sizing: border-box;
}
.headText {
  font-weight: 900;
}
.box {
  overflow: hidden;
}
.box .item {
  position: relative;
  width: 33.333%;
  margin: 50rpx 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  float: left;
}
.box .item image {
  width: 120rpx;
  height: 120rpx;
}
.box .item .text {
  margin-top: 10rpx;
}
.box .item .nums_icon {
  position: absolute;
  width: 35rpx;
  height: 35rpx;
  border-radius: 50%;
  background: red;
  color: #fff;
  line-height: 35rpx;
  text-align: center;
  font-size: 22rpx;
  top: 0;
  right: 22%;
}
</style>
