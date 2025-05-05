<template>
  <div class="chatUser">
    <div class="chatUserHead_and_Txt">
      <div class="chatUserHead">
        <img src="/assets/ChatUserHead/vue.svg" alt="" />
      </div>
      <div class="chatUserTxtArr">
        <div class="chatUserTitle">
          <div class="chatUserID">{{ UserMsg.userID }}</div>
          <div class="chatUserName">{{ UserMsg.userName }}</div>
        </div>
        <div
          class="chatUserTxt"
          v-for="(item, index) in UserMsg.userMsg"
          :key="index"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";

const props = defineProps(["UserMsg"]);

onMounted(function () {
  // chatUserTxt.value.innerText = "wasd\n你好世界";
});
</script>
<style>
.chatUser {
  display: flex;
  flex-direction: column;
}

.chatUserTitle {
  margin-left: 5px;
  width: fit-content;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 5px;
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
  --wh: 2.2em;
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
  padding: 4px 8px;
  border-radius: 4px;
  border-top-left-radius: 0;
  font-size: 14px;
  line-height: 1.5;

  overflow-wrap: break-word;
  white-space: pre-wrap;

  font-family: "MonaspaceNeon_Regular";

  margin-bottom: 5px;
  border: 1px solid #333;

  position: relative;
}
.chatUserTxt::before {
  content: "";
  position: absolute;
  left: -1px;
  top: -1px;
  width: 20px;
  height: 20px;
  display: block;
  border: 1px solid #a5a5a5b6;
  border-right: 0;
  border-bottom: 0;
  pointer-events: none;
}
</style>