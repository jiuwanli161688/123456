<template>
  <div class="container">
    <div class="title">欢迎来到工会驿站</div>
    <div class="sub-title">在生活中带来一丝温暖和凉意</div>
    <div class="steps">
      <template v-for="(item, index) in stepsList">
        <div class="steps-item" :class="activeSteps === index ? 'active-steps-item' : ''">
          <span>{{ index + 1 }}</span>
          <span>
            <span>{{ item }}</span>
          </span>
        </div>
        <div v-if="index < stepsList.length - 1" class="steps-line"></div>
      </template>
    </div>
    <div class="formContainer">
      <div class="formContainer_title">用户信息注册</div>
      <div class="formContainer_subTitle"><span>工作驿站：</span><span>{{ itemData.portName }}</span></div>
      <div class="formContainer_row">
        <van-form ref="ruleFormRef" :model="ruleForm" label-width="65px">
          <div class="form-item">
            <span class="icon">*</span>
            <van-field v-model="ruleForm.name" label="访客姓名:" placeholder="请输入访客姓名" :rules="rules.name" />
          </div>
          <div class="line"></div>
          <div class="form-item">
            <span class="icon">*</span>
            <van-field v-model="ruleForm.telephone" type="telephone" label="手机号码:" placeholder="请输入手机号码"
              :rules="rules.telephone" />
          </div>
          <div class="line"></div>
          <div class="form-item">
            <span class="icon">*</span>
            <van-field v-model="ruleForm.visitorType" is-link readonly name="picker" label="访客类型:" placeholder="请选择访客类型"
              @click="handleVisitorType(true)" :rules="rules.visitorType" />
          </div>
          <div class="line"></div>
          <div class="form-item">
            <span class="icon">*</span>
            <van-field v-model="ruleForm.validityType" is-link readonly name="datePicker" label="有效时间:"
              placeholder="请选择有效时间" @click="handleValidityType(true)" :rules="rules.validityType" />
          </div>
          <div class="line"></div>
          <div class="form-item">
            <span class="icon">*</span>
            <van-field name="uploader" label="照片录入:" placeholder="请录入照片" :rules="rules.files">
              <template #input>
                <van-uploader v-model="ruleForm.files" :max-count="1" :after-read="afterRead" preview-size="80px"
                  :preview-image="true">
                  <div class="upload-btn">
                    <img src="@/images/zplr.png" />
                  </div>
                </van-uploader>
              </template>
            </van-field>
          </div>
          <!-- <div class="line"></div> -->
          <!-- <div class="form-item">
            <span class="icon">*</span>
          </div>
          <div class="form-item">
            <van-field name="uploader" :style="{ marginLeft: '-50px' }" label="" placeholder="请录入照片"
              :rules="rules.files">
              <template #input>
                <van-uploader v-model="ruleForm.files" :max-count="1" :after-read="afterRead" preview-size="80px"
                  :preview-image="true" />
              </template>
            </van-field>
          </div> -->
        </van-form>
      </div>
      <div class="formContainer_submit">
        <van-button type="primary" size="small" @click="submitForm">信息提交</van-button>
      </div>
    </div>
    <div class="help">
      <span @click="handleHelp">注册帮助</span>
    </div>
    <van-popup v-model:show="typeShowPicker" destroy-on-close position="bottom">
      <van-picker :columns="columnsType" :model-value="[ruleForm.visitorType]" @confirm="onTypeConfirm"
        @cancel="handleVisitorType(false)" />
    </van-popup>
    <van-popup v-model:show="dateShowPicker" destroy-on-close position="bottom">
      <van-picker :columns="columnsDate" :model-value="[ruleForm.visitorType]" @confirm="onDateConfirm"
        @cancel="handleValidityType(false)" />
    </van-popup>
    <div v-if="toast.show" class="toast-diy">
      <div class="toast-main">
        <img v-if="toast.icon === '1'" class="toast-icon" src="@/images/czcg.png" />
        <img v-else class="toast-icon" src="@/images/cz.png" />
        <div class="text">{{ toast.text }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { getTenantIdApi, getPersonListApi, uploadImgApi, createPersonListApi } from "@/api/login";
import { useRouter, useRoute } from 'vue-router';
import Cookies from 'js-cookie';
import moment from "moment";

const router = useRouter();
const route = useRoute();
const ruleFormRef = ref();
const activeSteps = ref(0);
const stepsList = ref(['工作驿站', '基本信息', '信息提交']);
const columnsType = ref([
  { text: '外卖员', value: '1' },
  { text: '快递员', value: '2' },
  { text: '环卫工人', value: '3' },
  { text: '巡防人员', value: '4' },
  { text: '交警', value: '5' },
  { text: '其他劳动者', value: '8' }
]);
const columnsDate = ref([
  { text: '临时', value: '1' },
  { text: '永久', value: '2' },
]);
const typeShowPicker = ref(false);
const dateShowPicker = ref(false);
// form表单数据
const ruleForm = reactive({
  name: "",
  telephone: "",
  visitorType: "",
  validityType: "",
  files: [],
  fileUrl: ''
});

// url传进来的参数
const itemData = reactive({
  portId: '',
  portName: '',
  teantName: '',
  tenantId: ''
});

const toast = reactive({
  show: false,
  text: '',
  icon: ''
});
// 自定义文件校验器
const fileValidator = (val, rule) => {
  if (!val || !Array.isArray(val) || val.length === 0) {
    return Promise.reject('请上传照片');
  }
  // 检查文件数量
  if (val.length > 1) {
    return Promise.reject('最多只能上传一张照片');
  }
  return Promise.resolve();
};

const rules = reactive({
  name: [{ required: true, message: '请输入访客姓名', trigger: 'blur' }],
  telephone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
  visitorType: [{ required: true, message: '请选择访客类型', trigger: 'change' }],
  validityType: [{ required: true, message: '请选择有效时间', trigger: 'change' }],
  files: [{ required: true, message: '请上传照片', trigger: 'change' }, {
    validator: fileValidator,
    trigger: 'change'
  }],
});

// 访客类型确认
const onTypeConfirm = ({ selectedValues, selectedOptions }) => {
  ruleForm.visitorType = selectedOptions[0]?.text || '';
  typeShowPicker.value = false;
};

// 日期确认
const onDateConfirm = ({ selectedValues, selectedOptions }) => {
  ruleForm.validityType = selectedOptions[0]?.text || '';
  dateShowPicker.value = false;
};

// 获取租户id
const getTenantIdApiFun = async (params) => {
  try {
    const data = await getTenantIdApi(params);
    Cookies.set('tenantId', data);
  } catch (error) {
    console.error(error);
  }
}

// 图片上传
const afterRead = async ({ file }) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const data = await uploadImgApi(formData);
    ruleForm.fileUrl = data
  } catch (error) {
    console.error(error);
  }
}

// 查询人员信息
const getPersonListApiFun = async () => {
  try {
    const params = {
      name: ruleForm.name,
      telephone: ruleForm.telephone,
      pageSize: 100,
      pageNo: 1,
    };
    const { list } = await getPersonListApi(params);
    if (list.length) {
      const isExpired = moment().isAfter(moment(expireTime));
      if (isExpired) {
        console.log('用户信息已过期');
        createPersonListApiFun();
      } else {
        toast.show = true;
        toast.text = '用户信息在有效期！';
        toast.icon = '0';
        const timer = setTimeout(() => {
          toast.show = false;
        }, 2000);
        router.push('/prompt', { query: { validDays: list[0].validDays } })
      }
    } else {
      console.log('用户不存在');
      createPersonListApiFun();
    }
    console.log('查询人员信息', list);
  } catch (error) {
    console.error(error);
  }
}

// 信息提交
const createPersonListApiFun = async () => {
  try {
    const params = {
      portId: itemData.portId || "",
      facePhoto: ruleForm.fileUrl || "",
      name: ruleForm.name,
      telephone: ruleForm.telephone,
      visitorType: columnsType.value.find(item => item.text === ruleForm.visitorType).value || '',
      validityType: columnsDate.value.find(item => item.text === ruleForm.validityType).value || '',
    };
    const data = await createPersonListApi(params);
    toast.show = true;
    toast.text = '用户信息注册成功！';
    toast.icon = '1';
    const timer = setTimeout(() => {
      toast.show = false;
    }, 2000);
    // router.push('/prompt', { query: { validDays: list[0].validDays } })
    console.log('信息提交', data);
  } catch (error) {
    console.error(error);
  }
}
// 提交
const submitForm = async () => {
  if (!ruleFormRef.value) return;
  try {
    await ruleFormRef.value.validate();
    getPersonListApiFun();
  } catch (error) {
    console.log('表单验证失败', error);
  }
};

// 访客类型点击
const handleVisitorType = (val) => {
  typeShowPicker.value = val;
};

// 有效时间点击
const handleValidityType = (val) => {
  dateShowPicker.value = val;
};

// base64解码
const decodeBase64 = (str) => {
  try {
    // 先进行 URL 解码
    const urlDecoded = decodeURIComponent(str);
    // 使用 TextDecoder 解码 base64
    const binaryString = atob(urlDecoded);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  } catch (e) {
    console.error('Base64 解码失败:', e);
    return '';
  }
};

// 跳转注册帮助
const handleHelp = () => {
  router.push('/help')
};

onMounted(() => {
  // router.push('/prompt', { query: { validDays: 12 } })

  itemData.portId = route.query.portId || '';
  itemData.teantName = route.query.teantName || '';
  itemData.tenantId = route.query.tenantId || '';
  const portName = route.query.portName;
  if (portName) {
    try {
      const base64Decoded = decodeBase64(portName);
      itemData.portName = base64Decoded;
      getTenantIdApiFun({ name: base64Decoded });
    } catch (error) {
      console.error('解码失败:', error);
    }
  }
});
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  background-image: url("../../images/zcbj.png");
  background-size: cover; // 让背景图片覆盖整个容器
  background-repeat: no-repeat; // 防止图片重复
  background-position: center; // 让图片居中显示
  padding: 40px 20px;

  .title {
    font-size: 30px;
  }

  .sub-title {
    font-size: 20px;
    text-align: right;
    margin: 10px 0 20px;
  }

  .steps {
    display: flex;
    justify-content: space-between;
    margin: 30px 0;
    padding: 0 24px;

    .steps-item {
      font-size: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;

      >span:nth-child(1) {
        width: 15px;
        height: 15px;
        line-height: 15px;
        text-align: center;
        background-color: #fff;
        border-radius: 50%;
        margin-bottom: 10px;
      }

      >span:nth-child(2) {
        position: relative;

        >span {
          position: absolute;
          left: -24px;
          white-space: nowrap;
        }
      }
    }

    .active-steps-item {
      >span:nth-child(1) {
        background-color: #0583f9;
        color: #fff;
      }
    }

    .steps-line {
      flex: 1;
      height: 1px;
      background-color: #fff;
      margin-top: 7px;
    }
  }

  .formContainer {
    background-color: #fff;
    border-radius: 20px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .formContainer_title {
      margin-bottom: 20px;
    }

    .formContainer_subTitle {
      width: 100%;
      font-size: 14px;
      padding-bottom: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid #eee;
      display: flex;
      align-items: center;

      >span:nth-child(1) {
        width: 100px;
      }
    }

    .formContainer_row {
      background-color: #F6F5F5;
      border-radius: 10px;
      padding: 10px 0;

      .van-cell {
        background-color: transparent;
      }
    }

    .formContainer_submit {
      margin-top: 20px;

      .van-button {
        padding: 0 20px;
        border-radius: 20px;
      }
    }
  }

  .help {
    margin-top: 10px;
    color: #fff;
    text-align: center;

    span {
      cursor: pointer;
      font-size: 12px;
    }
  }

  .toast-diy {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999999999999;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background: rgba(255, 255, 255, 0);
  }

  .toast-main {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 0 10px;
    background: #c6c6c6;
    border-radius: 10px;
  }

  .toast-icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  .form-item {
    display: flex;
    align-items: center;
    padding-left: 10px;
  }

  .icon {
    color: red;
    margin-right: -15px;
  }

  .line {
    height: 1px;
    background: #eee;
    margin: 0 10px;
  }
}
</style>