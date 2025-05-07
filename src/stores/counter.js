import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('counter', () => {
  // state = ref()
  const schemeSelect = ref('light')// 当前主题


  // actions
  // 切换主题
  function schemeSelectClick() {
    schemeSelect.value == 'light' ? schemeSelect.value = 'dark' : schemeSelect.value = 'light'

    return schemeSelect.value
  }

  function GetServer(_url) {
    return new Promise((resolve) => {
      fetch(_url)
        .then(response => response.json())
        .then(data => {
          resolve(data)
        })
        .catch(error => console.error('Error:', error));
    })
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

  // 保存获取[UserID,UserName]
  const RxaserUser = ref({
    UserID: "",
    UserName: ""
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


  // 获取聊天记录
  function getUserMsgHistory(_RoomName, _length) {
    return new Promise((resolve) => {
      GetServer(`http://localhost:802/api/UserMsgHistory?RoomName=${_RoomName}&Len=${_length}`)
        .then((result) => {
          resolve(result)
        })
        .catch((error) => {
          console.error("发生错误：", error);
        });
    });
  }


  return {
    schemeSelect,

    schemeSelectClick,
    GetServer,
    generateRandomString,
    getRxaserUser,
    getUserMsgHistory,
  }
})