<template>
  <div class="chatUser">
    <div class="chatUserID">{{ UserMsg.userID }}</div>
    <div class="chatUserName">{{ UserMsg.userName }}</div>
    <div class="chatUserHead_and_Txt">
      <div class="chatUserHead">
        <img src="/assets/ChatUserHead/vue.svg" alt="" />
      </div>
      <div class="chatUserTxtArr">
        <div class="chatUserTxt" v-for="(item, index) in UserMsg.userMsg" :key="index">{{ item }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";

const props = defineProps(["UserMsg"])

onMounted(function () {
  // chatUserTxt.value.innerText = "wasd\n你好世界";
});
</script>
<style>
.chatUser {
  display: flex;
  flex-direction: column;
}

.chatUserID,
.chatUserName {
  color: green;
  font-size: 12px;
}

.chatUserID {
  color: red;
}

.chatUserHead_and_Txt {
  display: flex;
  align-items: start;
}

.chatUserHead {
  --wh: 30px;
  width: var(--wh);
  height: var(--wh);
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #ccc;
}

.chatUserHead img {
  object-fit: cover;
  display: block;
  width: 100%;
  height: 100%;
}

.chatUserTxtArr {
  display: flex;
  flex-direction: column;
}

.chatUserTxt {
  margin-left: 5px;
  background-color: rgb(143, 244, 255);
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.4;

  overflow-wrap: break-word;
  white-space: pre-wrap;

  font-family: "MonaspaceNeon_Regular";

  margin-bottom: 5px;
  position: relative;
}

.chatUserTxt::before {
  content: "";
  position: absolute;
  top: 3px;
  left: -5px;
  width: 0px;
  height: 0px;
  background-color: transparent;
  border-right: 5px solid rgb(143, 244, 255);
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
}
</style>