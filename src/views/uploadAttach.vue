<template>
  <div class="upload_attach">
    <van-nav-bar
      title="添加附件"
      left-arrow
      fixed
      @click-left="onClickLeft"
      class="header"
    />
    <van-notice-bar
      color="#34aed6"
      background="#e9f7fb"
      wrapable
      class="notice"
    >
      部分文件需要打印并手写签名，请从此处
      <span class="line">下载</span>。
    </van-notice-bar>
    <div class="content">
      <van-collapse v-model="activeNames" class="collapse">
        <van-collapse-item name="1">
          <template #title>
            <div><i class="blue">*</i>发票</div>
          </template>
        </van-collapse-item>
        <van-collapse-item name="2">
          <template #title>
            <div><i class="blue">*</i>其他保险公司报销凭证</div>
          </template>
          <van-uploader
            v-model="fileList"
            :max-count="10"
            :after-read="onRead"
            :accept="'image/*'"
          />
        </van-collapse-item>
      </van-collapse>
    </div>

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
  </div>
</template>

<script>
import { uploadToken } from "@/api/api";
export default {
  name: "uploadAttach",
  data() {
    return {
      activeNames: ["2"],
      fileList: [],
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onRead(file) {
      console.log(file);
      let data = {
        type: "axa_claim",
        filename: file.file.name,
      };
      uploadToken(data).then((res) => {
        console.log(res);
      });
    },
    nextClick() {
      this.$router.push("afterSubmit");
    },
  },
};
</script>

<style lang="scss">
.upload_attach {
  .notice {
    margin: 18px 18px 0 18px;
    border-radius: 10px;
    font-weight: normal;
    line-height: 44px;
    .line {
      display: inline-block;
      font-weight: bold;
      line-height: 40px;
      border-bottom: 2px solid #26b4dd;
    }
  }
  .collapse {
    margin-top: 20px;
    .blue {
      font-size: 14px;
      font-weight: bold;
      color: #34aed6;
      margin-right: 4px;
    }
    .van-collapse-item__title::after {
      border: none;
    }
  }
  .van-collapse-item__content {
    padding: 10px 20px;
    .van-uploader__preview {
      margin: 0 5px 5px 0;
      &:nth-child(4) {
        margin: 0 0 5px 0;
      }
    }
  }
}
</style>