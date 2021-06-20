<template>
  <div class="personal_info">
    <van-nav-bar
      title="个人信息"
      left-arrow
      fixed
      @click-left="onClickLeft"
      class="header"
    />
    <van-notice-bar
      color="#34aed6"
      background="#e9f7fb"
      wrapable
      text="被保人"
      class="notice"
    />
    <div class="content">
      <van-field
        v-model.trim="nameVal"
        label="被保人姓名"
        input-align="right"
        placeholder="请输入被保人姓名"
      />
      <van-field
        v-model.trim="birthVal"
        label="出生日期"
        input-align="right"
        right-icon="arrow"
        placeholder="请选择"
        @click-right-icon="birthPicker = true"
      />
      <van-field
        v-model.trim="phoneVal"
        label="手机号码"
        input-align="right"
        type="digit"
        placeholder="请输入手机号码"
      />
      <van-field
        v-model.trim="mailVal"
        label="邮箱"
        input-align="right"
        placeholder="请输入邮箱地址"
      />
    </div>
    <van-collapse v-model="activeNames" class="collapse">
      <van-collapse-item title="投保人" name="1">
        <van-cell title="姓名" value="CareVoice" />
        <van-cell title="电话号码" value="13867778756" />
      </van-collapse-item>
    </van-collapse>
    <div class="btns">
      <van-button round class="save">保存</van-button>
      <van-button
        round
        class="next"
        color="linear-gradient(to right, #40b9dc, #3497e8)"
        @click="nextClick"
        >下一步</van-button
      >
    </div>
    <div class="pop_up">
      <van-popup v-model="birthPicker" position="bottom">
        <van-datetime-picker
          v-model="birthDate"
          type="date"
          :formatter="formatter"
          title="选择年月日"
          @cancel="birthPicker = false"
          @confirm="confirmClick"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import { fetchToken } from "@/api/api";
export default {
  name: "personalInfo",
  data() {
    return {
      nameVal: "", // 被保人姓名
      birthVal: "", // 出生日期
      phoneVal: "", // 手机号码
      mailVal: "", // 邮箱
      birthPicker: false, // 出生日期弹窗
      birthDate: "",
      activeNames: ["1"],
    };
  },
  created() {
    this.getToken();
  },
  methods: {
    onClickLeft() {},
    confirmClick(val) {
      let date = new Date(val);
      let month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      this.birthVal = date.getFullYear() + "-" + month + "-" + day;
      this.birthPicker = false;
    },
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      } else if (type === "day") {
        return `${val}日`;
      }
      return val;
    },
    nextClick() {
      this.$router.push("uploadAttach");
    },
    //模拟登录 获取token
    getToken() {
      let data = {
        phone: "86-15678989787",
        sms_token: "110515",
      };
      fetchToken(data).then((res) => {
        this.$cookies.set('token', res.private_token);
      });
    },
  },
};
</script>

<style lang="scss">
.personal_info {
  padding-top: 15px;
  .van-nav-bar .van-icon {
    color: #323233;
  }
  .content {
    .van-field {
      height: 55px;
      line-height: 55px;
      padding: 10px 16px;
    }
    .van-field__label {
      line-height: 35px;
    }
    .van-field__body {
      height: 35px;
      line-height: 35px;
    }
    .van-field__right-icon {
      padding: 0 8px 0 4px;
    }
  }
  .collapse {
    margin-top: 30px;
    .van-cell__title {
      color: #34aed6;
      font-weight: bold;
    }
    .van-collapse-item__title {
      background: #e9f7fb;
    }
    .van-collapse-item__content {
      padding: 0;
      .van-cell__title {
        color: #303152;
        font-weight: normal;
      }
    }
  }
}
</style>