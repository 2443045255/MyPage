<template>
  <div class="chatUser" ref="chatUser">
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
</template>
<script setup>
import { ref, onMounted } from "vue";

const props = defineProps(["UserMsg"]);
const chatUser = ref(null);

onMounted(function () {
  // chatUserTxt.value.innerText = "wasd\n你好世界";
  const MyUserName = "123";
  if (MyUserName == props.UserMsg.userName) {
    chatUser.value.classList.add("right");
  }
});
</script>
<style>
.chatUser {
  display: flex;
  align-items: start;
}

.chatUserTitle {
  margin: 0 5px;
  width: fit-content;
  display: flex;
}
.chatUserID {
  margin-right: 5px;
}

.chatUserID,
.chatUserName {
  color: green;
  font-size: 12px;
}

.chatUserID {
  color: red;
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
  font-size: 13px;
  line-height: 1.5;

  overflow-wrap: break-word;
  white-space: pre-wrap;

  font-family: "MonaspaceNeon_Regular", var(--font);

  margin-bottom: 5px;
  border: 1px solid #333;

  position: relative;
}

.right {
  flex-direction: row-reverse;
}

.right .chatUserTxt,
.right .chatUserTitle {
  margin: 0;
  margin-right: 5px;
}

.right .chatUserTxt {
  border-top-left-radius: 4px;
  border-top-right-radius: 0;
}

.right .chatUserTitle {
  flex-direction: row-reverse;
}

.right .chatUserID {
  margin: 0;
  margin-left: 5px;
}
</style>