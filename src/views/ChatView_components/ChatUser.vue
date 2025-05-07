<template>
  <div
    class="chatUser"
    ref="chatUser"
    :class="[{ right: UserMsgArray.userID == getRxaserUser().UserID }]"
  >
    <div class="chatUserHead">
      <img src="/assets/ChatUserHead/vue.svg" alt="" />
    </div>
    <div class="chatUserTxtArr">
      <div class="chatUserTitle">
        <div class="chatUserID">{{ UserMsgArray.userID }}</div>
        <div class="chatUserName">{{ UserMsgArray.userName }}</div>
      </div>
      <div
        class="chatUserTxt"
        v-for="(item, index) in UserMsgArray.userMsg_Time"
        :key="index"
      >
        {{ item[0] }}
        <div class="chatUserTxtTime">
          <p class="year">{{ UserYear(item[1]) }}</p>
          <p class="time">{{ UserTime(item[1]) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";

import { useStore } from "@/stores/counter";
const { getRxaserUser } = useStore();

const props = defineProps(["UserMsgArray"]);
const chatUser = ref(null);

function UserYear(timeArr) {
  return `${timeArr[0]}年${timeArr[1]}月${timeArr[2]}日`;
}
function UserTime(timeArr) {
  return `${timeArr[3]}:${timeArr[4]}`;
}
onMounted(function () {
  // chatUserTxt.value.innerText = "wasd\n你好世界";
  console.log();
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
  position: relative;
}

.chatUserTxt {
  width: fit-content;
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

.chatUserTxtTime {
  position: absolute;
  content: "";
  left: 100%;
  padding-left: 5px;
  top: 0px;
  width: max-content;
  font-size: 10px;

  display: none;
}

.chatUserTxt:hover > .chatUserTxtTime {
  display: block;
}

.right {
  flex-direction: row-reverse;
}

.right .chatUserTxt,
.right .chatUserTitle {
  margin-left: 0px;
  margin-right: 5px;
}

.right .chatUserTxtArr {
  align-items: end;
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

.right .chatUserTxtTime {
  left: initial;
  right: 100%;
  padding: 0;
  padding-right: 5px;
}
</style>