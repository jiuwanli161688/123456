<template>
  <div class="container">
    <div class="title">工会驿站</div>
    <div class="subtitle">-温馨汇聚 爱心传递-</div>
    <div class="content">
      <div class="content_title">温馨提示</div>
      <div class="content_box">
        <div class="content_top">您的申请已通过，请</div>
        <div class="content_center">前往刷脸机进行刷脸进人!</div>
        <div class="content_foot">有效时间: 2025.08.14 12:34:45 - 2025.09.05 12:34:45</div>
      </div>
    </div>
    <div class="button">
      <van-button type="primary" @click="handleExit">退出</van-button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();

const handleExit = () => {
  router.go(-1);
};
onMounted(() => { });
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  background-image: url("../../images/bj.png");
  background-size: cover; // 让背景图片覆盖整个容器
  background-repeat: no-repeat; // 防止图片重复
  background-position: center; // 让图片居中显示
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;

  .title {
    padding: 10px 20px;
    font-size: 50px;
    background-color: #2F6DF0;
    border-radius: 10px;
    color: #fff;
    margin-top: 60px;
  }

  .subtitle {
    font-size: 30px;
    color: #2F6DF0;
    margin: 20px 0 40px;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 700;
    font-size: 20px;

    &_title {
      padding: 5px 10px;
      background-color: #2F6DF0;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    &_box {
      background-color: #2F6DF0;
      border-radius: 10px;
      padding: 20px 10px 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .content_center{
        margin: 10px 0 30px;
      }
      .content_foot{
        font-size: 11px;
      }
    }
  }

  .button{
    margin-top: 50px;
    
    .van-button{
      padding: 0 50px;
      border-radius: 10px;
      font-size: 20px;
    }
  }
}
</style>