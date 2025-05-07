<template>
  <main>
    <div class="chatRoom">
      <div class="chatRoomTitle">
        <div>
          <span class="pi_05em">公共聊天室1</span>
        </div>
        <div class="TitleBtnBody">
          <span class="TitleBtn pi_05em a default-hoverBg">在线用户</span>
          <span id="SelectRoomBtn" class="TitleBtn pi_05em a default-hoverBg">房间</span>
        </div>
      </div>
      <div class="chatBody">
        <div class="chatTxt" ref="chatTxt">
          <ChatUser v-for="(item, index) in UserMsgObj[room]" :key="index" :UserMsgArray="item" />
        </div>
        <div class="chatInputGroup" ref="chatInputGroup">
          <div class="chatInputTextareaDiv">
            <textarea name="" id="chatInputTextarea" rows="1" @change="getUserTxt"></textarea>
          </div>
          <button id="sendBtn" class="btnColor1" @click="sendMsg()">发送</button>
        </div>
      </div>
    </div>
    <div id="chatSelectBg" class="chatSelectBg no-show"></div>
    <div id="chatSelect" class="chatSelect">
      <div class="chatSelectBody">
        <div class="chatSelectSetting">
          <div id="chatSelectCloseBtn" class="a color1-hoverBg">
            <span>X</span>
          </div>
          <div class="a color1-hoverBg">创建房间</div>
          <div class="a color1-hoverBg">删除房间</div>
        </div>
        <div class="chatSelectOption a color1-hoverBg chatSelectOptionActive">
          <p>公共聊天室1</p>
          <p class="info infoColor">未读消息</p>
        </div>
        <div class="chatSelectOption a color1-hoverBg">
          <p>公共聊天室2</p>
          <p class="info infoColor">未读消息</p>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { io } from "socket.io-client";
// 使用仓库
import { useStore } from "@/stores/counter";
const store = useStore();
const { getUserMsgHistory, getRxaserUser } = useStore();

import RxaserMessage from "./components/Message/Message";
import ChatUser from "./ChatView_components/ChatUser.vue";

var px = "px";

//定义标签的对应ref
const chatTxt = ref(null);
const chatInputGroup = ref(null);

//处理同步输入框和聊天文本框的底部高度
function chatTxt_pb() {
  chatTxt.value.style.paddingBottom =
    chatInputGroup.value.offsetHeight + 5 + px;
}

// 初始化聊天记录
const room = ref("room_1");
const UserMsgObj = ref({});
UserMsgObj.value[room] = [];

// 获取聊天记录
getUserMsgHistory(room.value, 2)
  .then((result) => {
    UserMsgObj.value[room.value] = result;
    console.log(UserMsgObj.value[room.value]);

  })
  .catch((error) => {
    console.error("发生错误：", error);
  });

// 获取预发送文本
const UserTxt = ref("")
function getUserTxt(e) {
  UserTxt.value = e.target.value
}

onMounted(function () {
  chatTxt_pb();

  //处理输入框的高度
  var chatInputTextarea = document.getElementById("chatInputTextarea");
  chatInputTextarea.addEventListener("input", function () {
    this.style.height = "0px";
    this.offsetHeight;
    this.style.height = this.scrollHeight + px;
    chatTxt_pb();
  });

  //处理聊天室选择界面的关闭
  var SelectRoomBtn = document.getElementById("SelectRoomBtn");
  var chatSelectCloseBtn = document.getElementById("chatSelectCloseBtn");
  var chatSelectDiv = document.getElementById("chatSelect");
  var chatSelectBgDiv = document.getElementById("chatSelectBg");
  chatSelectBgDiv.onclick = function () {
    if (chatSelectBgDiv.classList.contains("no-show")) {
      chatSelectDivOpenClose(true);
    } else {
      chatSelectDivOpenClose(false);
    }
  };
  SelectRoomBtn.onclick = function () {
    chatSelectDivOpenClose(true);
  };
  chatSelectCloseBtn.onclick = function () {
    chatSelectDivOpenClose(false);
  };
  function chatSelectDivOpenClose(value) {
    //true显示chatSelectDiv
    //false隐藏chatSelectDiv
    switch (value) {
      case true:
        chatSelectDiv.style.setProperty("--chatSelect_left", "0%");
        chatSelectBgDiv.classList.remove("no-show");
        break;
      case false:
        chatSelectDiv.style.setProperty("--chatSelect_left", "100%");
        chatSelectBgDiv.classList.add("no-show");
        break;
      default:
        break;
    }
  }

});
//处理连接服务器
var isConnect = false;
//socket连接
const socket = io("ws://localhost:802");

socket.on("connect_error", () => {
  isConnect = false;
  console.log("连接错误，重新连接");
  socket.connect();
});

socket.on("connect", () => {
  socket.emit("连接", getRxaserUser())
  console.log(socket.id);
  isConnect = true;
});

socket.on("disconnect", () => {
  isConnect = false;
  console.log(socket.connected); // false
});

socket.on("msg", (data) => {
  if (UserMsgObj.value[room.value][UserMsgObj.value[room.value].length - 1].userID == data.userID) {
    UserMsgObj.value[room.value][UserMsgObj.value[room.value].length - 1].userMsg_Time.push(JSON.parse(data.userMsg_Time))
  } else {
    UserMsgObj.value[room.value].push({ ...data })
    UserMsgObj.value[room.value][UserMsgObj.value[room.value].length - 1].userMsg_Time = [JSON.parse(data.userMsg_Time)]
  }
});


function getTime() {
  var now = new Date()
  return [now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes()]
}

// 处理发送
function sendMsg() {
  if (!isConnect) {
    Msg1("警告", "未连接服务器")
    return
  }
  if (!UserTxt.value) {
    Msg1("警告", "信息为空")
    return
  }
  if (isConnect) {
    socket.emit("msg", {
      userID: getRxaserUser().UserID,
      userName: getRxaserUser().UserName,
      userMsg_Time: JSON.stringify([UserTxt.value, getTime()])
    })
    Msg1("成功", "发送")
  }
}

//弹窗提示
const Msg1 = (type, message, duration = 2000) => {
  RxaserMessage({
    type: type,
    message: message,
    duration: duration,
  });
};

function 添加按键监听() { }
</script>
<style scoped>
main {
  padding: 0;
  display: flex;
  position: relative;
}

.chatRoom {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.chatBody {
  flex: 1;
  position: relative;
}

.chatTxt {
  height: 100%;
  padding: 5px 7.5px;
}

.chatInputGroup {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 5px;
  display: flex;
  align-items: stretch;
  box-shadow: 0px -10px 5px rgba(80, 80, 80, 0.1);
}

.chatInputGroup>.chatInputTextareaDiv,
.chatInputGroup>button {
  border-radius: 4px;
}

.chatInputGroup>.chatInputTextareaDiv {
  width: 89%;
  margin-right: 1%;
  padding: 4px;
  display: flex;
  border: 1px solid;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 108px;
}

.chatInputTextareaDiv>textarea {
  width: 100%;
  height: 21px;
  font-size: 16px;

}

.chatInputTextareaDiv::-webkit-scrollbar {
  width: 8px;
}

/* 定义滚动条轨道 */
.chatInputTextareaDiv::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 2px;
}

/* 定义滚动条滑块 */
.chatInputTextareaDiv::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

/* 当鼠标悬浮在滑块上时 */
.chatInputTextareaDiv::-webkit-scrollbar-thumb:hover {
  background: #555;
}


.chatInputGroup>button {
  flex: 1;
  height: initial;
  word-break: keep-all;
  min-width: 50px;
}

.chatRoomTitle {
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.TitleBtnBody {
  display: flex;
}

.TitleBtn {
  border-radius: 4px;
  display: block;
}

.chatSelect {
  width: 15em;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  transition: transform 0.2s;
  background-color: var(--defaultBgColor);
  transform: translateX(var(--chatSelect_left));
  --chatSelect_left: 100%;
  z-index: 2;
}

.chatSelectBg {
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(127, 127, 127, 0.2);
  backdrop-filter: blur(2px);
  z-index: 1;
}

.chatSelectBody {
  width: 100%;
  height: 100%;
  border-left: 1px solid;
}

.chatSelectSetting {
  display: grid;
  grid-template-columns: 1fr 2fr 2fr;
}

.chatSelectSetting>div {
  padding: 0.3rem 0;
  color: rgb(203, 36, 147);
  display: flex;
  align-items: center;
  justify-content: center;
}

#chatSelectCloseBtn {
  color: red;
}

#chatSelectCloseBtn:hover {
  background-color: rgba(255, 0, 0, 0.2);
}

#chatSelectCloseBtn:active {
  background-color: rgba(255, 0, 0, 0.3);
}

.chatSelectOption {
  padding: 0.2rem 0.3rem;
  font-size: 14px;
  border-top: 1px solid;
  transition: padding-left 0.1s;
}

.chatSelectOption:hover {
  padding-left: 0.4rem;
}

.chatSelectOption:last-child {
  border-bottom: 1px solid;
}

.chatSelectOptionActive {
  border-left: 2px solid;
}

.chatSelectOptionActive>p:first-child {
  color: rgb(0, 163, 114);
}

.info {
  font-size: 11px;
  font-weight: bold;
}
</style>