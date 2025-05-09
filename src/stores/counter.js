import { ref } from 'vue'
import { defineStore } from 'pinia'
import RxaserMessage from "../views/components/Message/Message";

export const useStore = defineStore('counter', () => {
  // state = ref()
  const schemeSelect = ref('light')// 当前主题
  // actions
  // 切换主题
  function schemeSelectClick() {
    schemeSelect.value == 'light' ? schemeSelect.value = 'dark' : schemeSelect.value = 'light'
    return schemeSelect.value
  }

  //弹窗提示
  function Msg1(type, message, duration = 2000) {
    RxaserMessage({
      type: type,
      message: message,
      duration: duration,
    });
  };

  // 请求服务器
  function GetServer(_url, callBack) {
    fetch(_url)
      .then(response => response.json())
      .then(data => callBack(data))
      .catch(error => console.error('Error:', error));
  }

  // 随机大写和数字字符串
  function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }

  // 保存获取[UserID,UserName,UserHandPhoto]
  const RxaserUser = ref({
    UserID: "",
    UserName: "",
    UserHandPhoto: ""
  })
  function getRxaserUser() {
    if (localStorage.getItem("RxaserUser")) {
      RxaserUser.value = JSON.parse(localStorage.getItem("RxaserUser"))
    } else {
      RxaserUser.value.UserID = generateRandomString(16)
      RxaserUser.value.UserName = RxaserUser.value.UserID.slice(0, 8)
      localStorage.setItem("RxaserUser", JSON.stringify(RxaserUser.value))
    }
    return RxaserUser.value
  }
  // 修改[RxaserUser]
  function setRxaserUser(name,url) {
    if(!name || !url){
      return false
    }
    RxaserUser.value.UserName = name
    RxaserUser.value.UserHandPhoto = url
    localStorage.setItem("RxaserUser", JSON.stringify(RxaserUser.value))
    return true
  }

  const RxaserNewHandPtoto = ref("")
  function getRxaserNewHandPtoto(url){
    if(!url && url != RxaserUser.value.UserHandPhoto){

    }
  }

  // 获取聊天记录
  function getUserMsgHistory(_RoomName, _length, callBack) {
    let url = `http://localhost:802/api/UserMsgHistory?RoomName=${_RoomName}&Len=${_length}`
    GetServer(url, (data) => {
      callBack(data)
    })
  }

  // 处理修改SetUserHandPhoto显隐
  const SetUserHandPhotoIsShow = ref(false)
  function SetUserHandPhotoSetIsShow() {
    SetUserHandPhotoIsShow.value = !SetUserHandPhotoIsShow.value
  }

  return {
    schemeSelect,
    SetUserHandPhotoIsShow,

    schemeSelectClick,
    Msg1,
    GetServer,
    generateRandomString,
    getRxaserUser,
    setRxaserUser,
    getRxaserNewHandPtoto,
    getUserMsgHistory,
    SetUserHandPhotoSetIsShow,
  }
})