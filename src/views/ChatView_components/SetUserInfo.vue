<template>
  <div class="user-info absoluteMax">
    <div class="user-info-body">
      <h3 class="t-center">个人信息</h3>
      <label class="user-info-label" for="">
        <span class="pi_05em">头像:</span>
        <div class="user-info-set">
          <div class="user-info-setHandPhoto a" @click="setUserHandPhotoSetIsShow()">
            <img :src="userInfo.handPtoto" alt="" />
          </div>
        </div>
      </label>
      <label class="user-info-label" for="">
        <span class="pi_05em">昵称:</span>
        <div class="user-info-set">
          <input type="text" name="" @input="setUserInfo_name" v-bind:value="getRxaserUser().UserName" />
        </div>
      </label>
      <div class="btn-group mt_20px">
        <button class="warn-btn" @click="userInfoSet">
          确认修改
        </button>
        <button class="default-btn" @click="userInfoSetCalcel()">
          取消
        </button>
      </div>
    </div>

    <Transition name="setUserHandPhoto">
      <div class="setUserHandPhoto absoluteMax" v-if="UserHandPhotoIsShow">
        <div class="setUserHandPhoto-body">
          <h3 class="t-center">修改头像</h3>
          <div class="handPhoto">
            <p class="handPhoto-group-title t-center">系统头像</p>
            <div class="handPhoto-group">
              <div class="handPhoto-item" v-for="(item, index) in handPhotoArray" :key="index">
                <img class="a" :src="item" alt="" @click="getUserInfoPtoto(index)"
                  :class="[{ active: userInfo.HandPhotoSelect == index }]">
              </div>
            </div>
          </div>
          <div class="btn-group mt_20px">
            <button class="warn-btn" @click="setUserInfoPtoto()">
              确认
            </button>
            <button class="default-btn" @click="setUserInfoPtotoCancel()">
              取消
            </button>
          </div>
        </div>
      </div>

    </Transition>

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
      userInfo: {
        name: "",
        handPtoto: "",
        HandPhotoSelect: 0
      },
      UserHandPhotoIsShow: false,
      handPhotoArray: [
        "assets/userHandPhoto/YuanShen_1.png",
        "assets/userHandPhoto/YuanShen_2.png",
        "assets/userHandPhoto/YuanShen_3.png",
        "assets/userHandPhoto/YuanShen_4.png",
        "assets/userHandPhoto/YuanShen_5.png",
        "assets/userHandPhoto/YuanShen_6.png",
        "assets/userHandPhoto/YuanShen_7.png",
        "assets/userHandPhoto/YuanShen_8.png",
        "assets/userHandPhoto/YuanShen_9.png",
        "assets/userHandPhoto/YuanShen_10.png",
        "assets/userHandPhoto/YuanShen_11.png",
        "assets/userHandPhoto/YuanShen_12.png",
        "assets/userHandPhoto/YuanShen_13.png",
      ]
    };
  },
  computed: {
    ...mapState(useStore, [
      "Msg1",
      "getRxaserUser",
      "setRxaserUserName",
      "setRxaserUserHandPhoto",
      "getAllUserInfoArr",
    ]),
  },
  methods: {
    // 赋予初始信息值
    createUserInfo() {
      this.userInfo.name = this.getRxaserUser().UserName;
      this.userInfo.handPtoto = this.getRxaserUser().UserHandPhoto
      this.handPhotoArray.forEach((item, index) => {
        if (item == this.userInfo.handPtoto) {
          this.userInfo.HandPhotoSelect = index
          return
        }
      })
    },
    // 接收个人信息修改值
    setUserInfo_name(e) {
      this.userInfo.name = e.target.value;
    },
    // 处理取消个人信息修改
    userInfoSetCalcel() {
      this.userInfo.name = this.getRxaserUser().UserName;
      this.userInfo.handPtoto = this.getRxaserUser().UserHandPhoto
      this.userInfoSetIsShow()
    },
    // 处理修改SetUserHandPhoto显隐
    setUserHandPhotoSetIsShow() {
      this.UserHandPhotoIsShow = !this.UserHandPhotoIsShow
    },
    // 接收头像修改值
    getUserInfoPtoto(index) {
      if (this.userInfo.HandPhotoSelect != index) {
        this.userInfo.HandPhotoSelect = index
      }
    },
    // 确认头像修改值
    setUserInfoPtoto() {
      this.userInfo.handPtoto = this.handPhotoArray[this.userInfo.HandPhotoSelect]
      this.setUserHandPhotoSetIsShow()
    },
    // 取消头像修改
    setUserInfoPtotoCancel() {
      this.userInfo.handPtoto = this.getRxaserUser().UserHandPhoto
      this.setUserHandPhotoSetIsShow()
    },
    // 处理确认个人信息修改
    userInfoSet() {
      if (!this.userInfo.name) {
        this.Msg1("警告", "昵称不能为空");
        return;
      }
      this.setRxaserUserName(this.userInfo.name)
      this.setRxaserUserHandPhoto(this.userInfo.handPtoto);
      this.userInfoSetIsShow()
    },
  },
  mounted() {
    this.createUserInfo()
  }
};
</script>

<style scoped>
.setUserHandPhoto-enter-active,
.setUserHandPhoto-leave-active {
  transition: opacity 0.2s;
}

.setUserHandPhoto-enter-from,
.setUserHandPhoto-leave-to {
  opacity: 0;
}


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
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.user-info-setHandPhoto>img {
  border: 1px solid transparent;
  border-radius: 50%;
  overflow: hidden;
}

.user-info-setHandPhoto>img:hover {
  border-color: inherit;
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

.btn-group {
  display: flex;
  justify-content: space-evenly;
}

.setUserHandPhoto {
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.setUserHandPhoto-body {
  background-color: var(--defaultBgColor);
  padding: 20px;
}

.handPhoto-group-title {
  padding: 10px 0;
}

.handPhoto-group {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
}

.handPhoto-item {
  height: 20vw;
  width: 20vw;
  max-height: 100px;
  max-width: 100px;
}

.handPhoto-item>img {
  border: 2px solid transparent;
  border-radius: 50%;
  overflow: hidden;
}

.handPhoto-item>img:hover,
.handPhoto-item>img.active {
  border-color: rgb(48, 211, 26);
}
</style>