<template>
  <div class="after_submit">
    <van-nav-bar
      title="预览"
      left-arrow
      fixed
      @click-left="onClickLeft"
      class="header"
    />
    <div class="content">
      <van-cell-group title="个人信息和保单信息">
        <van-cell title="姓名" :value="info.person_insured.name" />
        <van-cell title="出生日期" :value="info.person_insured.birthday" />
        <van-cell title="手机号码" :value="info.person_insured.phone" />
        <van-cell title="ID/护照号码" :value="info.person_insured.id_number" />
      </van-cell-group>
      <van-cell-group title="理赔信息">
        <van-cell title="出生日期" :value="info.person_insured.birthday"/>
        <van-cell title="理赔类型" :value="info.claim_type" />
        <van-cell title="医院名称" value="Ruijin hospital" />
        <van-cell title="医疗费用" value="3000RMB" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { insuranceInfo } from "@/api/api";
export default {
  name: "afterSubmit",
  data() {
    return {
      info: {},
    };
  },
  created(){
    this.getDetail()
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    getDetail() {
      insuranceInfo().then((res) => {
        this.info = res;
      });
    },
  },
};
</script>

<style lang="scss">
.after_submit {
  .van-cell-group__title {
    color: #203152;
    font-weight: bold;
    font-size: 14px;
  }
  .van-cell-group {
    margin: 0 15px;
    background-color: #fff;
    .van-cell {
      padding: 8px 16px;
      color: #c0c0c0;
      &::after {
        border: none;
      }
    }
    .van-cell__title {
      flex: 1;
    }
    .van-cell__value {
      flex: 2;
    }
  }
}
</style>