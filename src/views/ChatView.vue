<template>
    <main>
        <div class="chatRoom">
            <div class="chatRoomTitle">公共聊天室1</div>
            <div class="chatBody">
                <div class="chatInputGroup">
                    <textarea name="" id=""></textarea>
                    <button>发送</button>
                </div>
            </div>
        </div>
        <div class="chatSelect">
            <div class="chatSelectBody">
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
<style scoped>
main {
    padding: 0;
    display: flex;
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

.chatInputGroup{
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
}

.chatRoomTitle {
    text-align: center;
    border-bottom: 1px solid #ccc;
}

.chatSelect {
    width: 16%;
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

.info {
    font-size: 11px;
    font-weight: bold;
}
</style>