<template>
  <div class="container">
    <div class="row">
      <div class="col-top">
        <div class="title">
          <div class="title-text">信息注册指南</div>
        </div>
        <div class="logo">
          <img src="../../images/xh.png" alt="">
        </div>
      </div>
      <div class="col-bottom">
        <div v-for="(item, index) in source" :key="index">{{ index + 1 }}、{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";

const source = ref(['姓名应与本人身份证姓名保持一致，避免使用无效姓名和敏感词及代表词。', '手机号码需使用本人实名认证的手机号，切勿随意填写，均有记录可查。', '访客类型合理选择自己的工作类型。', '有效时间有管理员进行设置，无需填写。', '照片录入需要注意：1.露出额头、耳朵，人脸正面，不戴帽子，避免录入失败，2.面部光线均匀，无逆光，无美颜处理，3.建议背景无人，周围无多人聚集。', '问题反馈客服电话：13937140612。', '客服工作时问：周一至周五 9:00-18:00。'])

onMounted(() => { });
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  background-image: url("../../images/bg.png");
  background-size: cover; // 让背景图片覆盖整个容器
  background-repeat: no-repeat; // 防止图片重复
  background-position: center; // 让图片居中显示
  padding: 20px;

  .row {
    .col-top {
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // 添加阴影效果
      background-color: rgba(45, 114, 242, 0.8);
      display: flex;

      .title {
        background-color: #fff;
        padding: 10px 15px;
        border-radius: 10px;

        .title-text {
          color: #2D72F2;
          padding: 5px 10px;
          background:
            url('../../images/top-left.png') left top no-repeat,
            url('../../images/top-right.png') right top no-repeat,
            url('../../images/bottom-left.png') left bottom no-repeat,
            url('../../images/bottom-right.png') right bottom no-repeat;
          background-size: 6px 6px;
        }
      }

      .logo {
        margin-left: 30px;

        >img {
          width: 20px;
        }
      }
    }

    .col-bottom {
      font-size: 14px;
      color: #999;
      margin: 0 10px;
      padding: 20px;
      border: 1px solid #ddd; // 添加边框
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // 添加阴影效果
      background-color: #fff; // 添加背景色使阴影更明显
    }
  }
}
</style>