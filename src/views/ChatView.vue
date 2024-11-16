<template>
    <main>
        <div class="chatRoom">
            <div class="chatRoomTitle">
                <div><span>公共聊天室1</span></div>
                <div class="TitleBtnBody">
                    <span id="SelectRoomBtn" class="TitleBtn a default-hoverBg">房间</span>
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
        <div id="chatSelect" class="chatSelect">
            <div class="chatSelectBody">
                <div class="chatSelectOption a color1-hoverBg chatSelectOptionActive">
                    <p>公共聊天室1</p>
                    <p class="info infoColor">未读消息</p>
                </div>
                <div class="chatSelectOption a color1-hoverBg">
                    <p>公共聊天室2</p>
                    <p class="info infoColor">未读消息</p>
                </div>
                <div id="chatSelectCloseBtn" class="chatSelectOption a color1-hoverBg">
                    <span>关闭</span>
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
        this.style.height = this.scrollHeight + 2 + px
    })

    var SelectRoomBtn = document.getElementById("SelectRoomBtn")
    var chatSelectCloseBtn = document.getElementById("chatSelectCloseBtn")
    var chatSelectDiv = document.getElementById("chatSelect")
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
                break;
            case false:
                chatSelectDiv.style.setProperty('--chatSelect_left', '100%');
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
        message: "你好世界"
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
    line-height: 1.2rem;
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
    padding: 0 .5em;
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
}

.chatSelectBody {
    width: 100%;
    height: 100%;
    border-left: 1px solid;
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

#chatSelectCloseBtn {
    padding: .5em 0;
    text-align: center;
    color: red;
}

#chatSelectCloseBtn:hover {
    padding: .5em 0;
    background-color: rgba(255, 0, 0, 0.2);
}

.info {
    font-size: 11px;
    font-weight: bold;
}
</style>