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

  // 获取聊天记录
  function getUserMsgHistory(_RoomName, _length) {
    return new Promise((resolve) => {
      GetServer(`http://localhost:802/api/UserMsgHistory?RoomName=${_RoomName}&Len=${_length}`)
        .then((result) => {
          resolve(result)
        })



      // setTimeout(() => {
      //   data = [
      //     {
      //       userID: "111",
      //       userName: "111",
      //       userMsg: [["111_1", [2024, 10, 1, 8, 1]]],
      //     },
      //     {
      //       userID: "222",
      //       userName: "222",
      //       userMsg: [
      //         ["222_1", [2024, 10, 2, 8, 2]],
      //         ["222_2", [2024, 10, 2, 8, 3]],
      //       ],
      //     },
      //   ]
      // }, 1000);
    });
  }


  return {
    schemeSelect,
    schemeSelectClick,
    GetServer,
    getUserMsgHistory,
  }
})