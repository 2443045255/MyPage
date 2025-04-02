<template>
  <div class="chatUser">
    <div class="chatUserName">测试ID</div>
    <div class="chatUserHead_and_Txt">
      <div class="chatUserHead">
        <img src="/assets/ChatUserHead/vue.svg" alt="" />
      </div>
      <div class="chatUserTxt"></div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";

onMounted(function () {
  document.querySelector(".chatUserTxt").innerText = "wasd\n你好世界";
});
</script>
<style>
.chatUser {
  display: flex;
  flex-direction: column;
}

.chatUserName {
  color: green;
  font-size: 12px;
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
.chatUserTxt {
  margin-left: 5px;
  background-color: rgb(143, 244, 255);
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 14px;

  overflow-wrap: break-word;
  white-space: pre-wrap;
}
</style>