import { ref } from 'vue'
import { defineStore } from 'pinia'
import RxaserMessage from "../views/components/Message/Message";

export const useStore = defineStore('counter', () => {

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
      .catch(error => console.log('Error:', error));
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


  const RxaserUser = ref({
    UserID: "",
    UserName: "",
    UserHandPhoto: ""
  })
  // 保存[RxaserUser]
  function saveRxaserUser() {
    localStorage.setItem("RxaserUser", JSON.stringify(RxaserUser.value))
    let query = `UserID=${RxaserUser.value.UserID}&UserName=${RxaserUser.value.UserName}&UserHandPhoto=${RxaserUser.value.UserHandPhoto}`
    GetServer("http://127.0.0.1:802/api/saveUserInfo?" + query)
    return true
  }

  // 保存获取[UserID,UserName,UserHandPhoto]
  function getRxaserUser() {
    if (localStorage.getItem("RxaserUser")) {
      RxaserUser.value = JSON.parse(localStorage.getItem("RxaserUser"))
      if (!RxaserUser.value.UserHandPhoto) {
        RxaserUser.value.UserHandPhoto = "assets/userHandPhoto/YuanShen_1.png"
        saveRxaserUser()
      }
    } else {
      RxaserUser.value.UserID = generateRandomString(16)
      RxaserUser.value.UserName = RxaserUser.value.UserID.slice(0, 8)
      RxaserUser.value.UserHandPhoto = "assets/userHandPhoto/YuanShen_1.png"
      saveRxaserUser()
    }
    return RxaserUser.value
  }

  // 修改[UserName,UserHandPhoto]
  function setRxaserUserName(name) {
    if (RxaserUser.value.UserName != name) {
      RxaserUser.value.UserName = name
      saveRxaserUser()
    }
  }
  function setRxaserUserHandPhoto(url) {
    if (RxaserUser.value.UserHandPhoto != url) {
      RxaserUser.value.UserHandPhoto = url
      saveRxaserUser()
    }
  }

  // 所有用户ID的信息
  const allUserInfoArr = ref()
  function getAllUserInfoArr() {
    GetServer("http://127.0.0.1:802/api/getAllUserInfoArr", (data) => {
      setAllUserInfoArr(data)
    })
  }
  function setAllUserInfoArr(obj) {
    if (!obj) return
    if (allUserInfoArr.value == obj) return
    allUserInfoArr.value = obj
    // console.log(allUserInfoArr.value);
  }

  // 获取聊天记录
  function getUserMsgHistory(_RoomName, _length, callBack) {
    let query = `RoomName=${_RoomName}&Len=${_length}`
    let url = `http://localhost:802/api/UserMsgHistory?${query}`
    GetServer(url, (data) => {
      callBack(data)
    })
  }

  return {
    schemeSelect,
    allUserInfoArr,

    setAllUserInfoArr,
    schemeSelectClick,
    Msg1,
    GetServer,
    generateRandomString,
    getRxaserUser,
    setRxaserUserName,
    setRxaserUserHandPhoto,
    getAllUserInfoArr,
    getUserMsgHistory,
  }
})