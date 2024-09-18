import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const schemeSelect = ref('light')
  function schemeSelectClick(){
    schemeSelect.value == 'light' ? schemeSelect.value = 'dark' : schemeSelect.value = 'light'
    
    return schemeSelect.value
  }

  return { schemeSelect, schemeSelectClick }
})
