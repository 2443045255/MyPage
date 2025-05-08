<template>
  <Transition name="user-info">
    <div class="user-info">
      <div class="user-info-body">
        <h4 class="t-center">聊天个人信息</h4>
        <label class="user-info-label" for="">
          <span class="pi_05em">头像:</span>
          <div class="user-info-set">
            <div class="user-info-setHandPhoto">
              <img src="/assets/userHandPhoto/vue.svg" alt="" />
            </div>
          </div>
        </label>
        <label class="user-info-label" for="">
          <span class="pi_05em">昵称:</span>
          <div class="user-info-set">
            <input
              type="text"
              name=""
              @input="setUserInfo_name"
              v-bind:value="getRxaserUser().UserName"
            />
          </div>
        </label>
        <div class="user-info-btn-group">
          <button class="user-info-ackbtn warn-btn" @click="userInfoSet">
            确认修改
          </button>
          <button
            class="user-info-ackbtn default-btn"
            @click="userInfoSetIsShow(), userInfoSetCalcel()"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  </Transition>
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
    ...mapState(useStore, ["Msg1", "getRxaserUser", "setRxaserUserName"]),
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
.user-info-enter-active,
.user-info-leave-active {
  transition: opacity 0.2s ease;
}

.user-info-enter-from,
.user-info-leave-to {
  opacity: 0;
}

.user-info {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
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
.user-info-setHandPhoto > img {
  border: 1px solid;
  border-radius: 50%;
  overflow: hidden;
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

.user-info-ackbtn {
  padding: 0.3em 0.8em;
}
</style>