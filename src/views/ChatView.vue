<template>
  <main>
    <div class="chatRoom">
      <div class="chatRoomTitle">
        <div>
          <span class="pi_05em">公共聊天室1</span>
        </div>
        <div class="TitleBtnBody">
          <span id="SelectRoomBtn" class="TitleBtn pi_05em a default-hoverBg">房间</span>
        </div>
      </div>
      <div class="chatBody">
        <div class="chatInputGroup">
          <div class="chatInputTextareaDiv">
            <textarea name="" id="chatInputTextarea" rows="1"></textarea>
          </div>
          <button id="sendBtn" class="btnColor1">发送</button>
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
import RxaserMessage from './components/Message/Message'

import { onMounted } from 'vue';
var px = "px"
onMounted(function () {
  var chatInputTextarea = document.getElementById("chatInputTextarea")
  chatInputTextarea.addEventListener("input", function () {
    this.style.height = "0px"
    this.offsetHeight
    this.style.height = this.scrollHeight + px
  })

  var SelectRoomBtn = document.getElementById("SelectRoomBtn")
  var chatSelectCloseBtn = document.getElementById("chatSelectCloseBtn")
  var chatSelectDiv = document.getElementById("chatSelect")
  var chatSelectBgDiv = document.getElementById('chatSelectBg')
  chatSelectBgDiv.onclick = function () {
    if (chatSelectBgDiv.classList.contains('no-show')) {
      chatSelectDivOpenClose(true)
    } else {
      chatSelectDivOpenClose(false)
    }
  }
  SelectRoomBtn.onclick = function () {
    chatSelectDivOpenClose(true)
  }
  chatSelectCloseBtn.onclick = function () {
    chatSelectDivOpenClose(false)
  }
  function chatSelectDivOpenClose(value) {
    //true显示chatSelectDiv
    //false隐藏chatSelectDiv
    switch (value) {
      case true:
        chatSelectDiv.style.setProperty('--chatSelect_left', '0%');
        chatSelectBgDiv.classList.remove('no-show')
        break;
      case false:
        chatSelectDiv.style.setProperty('--chatSelect_left', '100%');
        chatSelectBgDiv.classList.add('no-show')
        break;
      default:
        break;
    }
  }

  var sendBtn = document.getElementById("sendBtn")
  sendBtn.onclick = function () {
    Msg1()
  }
})

const Msg1 = () => {
  RxaserMessage({
    type: "警告",
    message: "开发中，敬请期待",
    duration: 2000
  })
}

function 添加按键监听() {

}
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

.chatInputGroup>button {
  flex: 1;
  height: initial;
  word-break: keep-all;
  min-width: 50px;
}

.chatRoomTitle {
  padding: 0 1em;
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
  transition: transform .2s;
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
  padding: .3rem 0;
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

#chatSelectCloseBtn:active{
  background-color: rgba(255, 0, 0, 0.3);
}


.chatSelectOption {
  padding: .2rem .3rem;
  font-size: 14px;
  border-top: 1px solid;
  transition: padding-left .1s;
}

.chatSelectOption:hover {
  padding-left: .4rem;
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