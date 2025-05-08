<template>
  <div class="user-info absoluteMax">
    <div class="user-info-body">
      <h3 class="t-center">个人信息</h3>
      <label class="user-info-label" for="">
        <span class="pi_05em">头像:</span>
        <div class="user-info-set">
          <div class="user-info-setHandPhoto a" @click="SetUserHandPhotoSetIsShow">
            <img src="/assets/userHandPhoto/vue.svg" alt="" />
          </div>
        </div>
      </label>
      <label class="user-info-label" for="">
        <span class="pi_05em">昵称:</span>
        <div class="user-info-set">
          <input type="text" name="" @input="setUserInfo_name" v-bind:value="getRxaserUser().UserName" />
        </div>
      </label>
      <div class="user-info-btn-group">
        <button class="user-info-ackbtn warn-btn" @click="userInfoSet">
          确认修改
        </button>
        <button class="user-info-ackbtn default-btn" @click="userInfoSetIsShow(), userInfoSetCalcel()">
          取消
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useStore } from "@/stores/counter";

export default {
  name: "SetUserInfo",
  props: ["userInfoSetIsShow"],
  data() {
    return {
      userInfoUserName: "",
    };
  },
  computed: {
    ...mapState(useStore, [
      "Msg1",
      "getRxaserUser",
      "setRxaserUserName",
      "SetUserHandPhotoSetIsShow",
    ]),
  },
  methods: {
    // 接收个人信息修改值
    setUserInfo_name(e) {
      this.userInfoUserName = e.target.value;
    },
    // 处理取消个人信息修改
    userInfoSetCalcel() {
      this.userInfoUserName = this.getRxaserUser().UserName;
    },
    // 处理确认个人信息修改
    userInfoSet() {
      if (!this.userInfoUserName) {
        this.Msg1("警告", "昵称不能为空");
        return;
      }
      this.setRxaserUserName(this.userInfoUserName);
    },
  },
};
</script>

<style scoped>
.user-info {
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.user-info-body {
  background-color: var(--defaultBgColor);
  padding: 20px;
  border-radius: 6px;
  position: relative;
}

.user-info-label {
  display: flex;
  align-items: center;
  padding: 10px 0;
}

.user-info-set {
  flex: 1;
  display: flex;
  justify-content: center;
}

.user-info-setHandPhoto {
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.user-info-setHandPhoto>img {
  border: 1px solid;
  border-radius: 50%;
  overflow: hidden;
}

.user-info-setHandPhoto>img:hover {
  border-color: red;
}

.user-info-setHandPhoto-body {
  position: absolute;
  width: fit-content;
  height: fit-content;
  left: calc(100% + 20px);
  background-color: var(--defaultBgColor);
  display: flex;
  flex-direction: column;
}

.user-info-btn-group {
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
}
</style>