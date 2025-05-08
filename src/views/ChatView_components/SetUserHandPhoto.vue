<template>
  <div class="setUserHandPhoto absoluteMax">
    <div class="setUserHandPhoto-body">
      <h3 class="t-center">修改头像</h3>
      <div class="handPhoto">
        <p class="handPhoto-group-title t-center">系统头像</p>
        <div class="handPhoto-group">
          <div class="handPhoto-item" v-for="(item, index) in handPhotoArray" :key="index">
            <img class="a" :src="item" alt="">
          </div>
        </div>
      </div>
      <div class="btn-group mt_20px">
        <button class="warn-btn">
          确认
        </button>
        <button class="default-btn" @click="SetUserHandPhotoSetIsShow">
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
  name: "SetUserHandPhoto",
  data() {
    return {
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
      "SetUserHandPhotoSetIsShow",
    ]),
  },
};
</script>

<style scoped>
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

.handPhoto-group-title{
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
  border: 1px solid transparent;
  border-radius: 50%;
  overflow: hidden;
}

.handPhoto-item>img:hover {
  border-color: brown;
}

.btn-group {
  display: flex;
  justify-content: space-evenly;
}
</style>