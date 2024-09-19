<template>
  <div class="headerBg" v-show="headerBg" @click="headerOpenClose(true)"></div>
  <header @click="更新侧边栏宽度()">
    <h2 class="logo no-a a">Rxaser page</h2>
    <div class="wrapper">
      <nav>
        <RouterLink to="/" replace="">
          <span class="routerLickTxt">主页</span>
        </RouterLink>
        <RouterLink to="/public" replace="">
          <span class="routerLickTxt">发布</span>
        </RouterLink>
        <RouterLink to="/chat" replace="">
          <span class="routerLickTxt">聊天</span>
        </RouterLink>
        <RouterLink to="/about" replace="">
          <span class="routerLickTxt">关于</span>
        </RouterLink>
      </nav>
    </div>
    <div class="headerChildDiv schemeSelect a default-hoverBg" @click="schemeSelect()">
      <div class="schemeSelectTitle">主题选择</div>
      <div class="schemeSelectBody">
        <p>亮</p>
        <div class="schemeSelectBodyRange" style="--width: 36px;">
          <span class="schemeSelectBodyRangeBody"></span>
        </div>
        <p>暗</p>
      </div>
    </div>
    <div class="headerChildDiv closeheader a default-hoverBg" @click="headerOpenClose(true)">
      <span>关闭菜单</span>
    </div>
  </header>

  <section :style="{ paddingLeft: header_width }">
    <div class="sectionHeader" :style="{ marginLeft: header_width }">
      <div class="headerOpenBtn a" @click="headerOpenClose(true)">
        <span>三</span>
      </div>
    </div>

    <!-- <section> -->
    <!-- <RouterView /> -->

    <router-view v-slot="{ Component }">
      <transition name="RouterView" mode="out-in">
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
      </transition>
    </router-view>
  </section>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'


const header_width = ref("0px")
var headerElement
var headerIsClose = false

onMounted(() => {
  headerElement = document.querySelector("header")

  更新侧边栏宽度()
  window.addEventListener("resize", () => {
    更新侧边栏宽度()
    屏幕小于900()

  })
  屏幕小于900()
  RouterLinkClick()
  schemelister()

})

function 更新侧边栏宽度() {
  if (document.documentElement.scrollWidth <= 900) { return }
  if (headerIsClose) {
    header_width.value = 0
  } else if (header_width.value != headerElement.scrollWidth + 'px') {
    header_width.value = headerElement.scrollWidth + 'px'
  }
}

function RouterLink动画完成() {
  var navClickAnimation_all = document.querySelectorAll(".navClickAnimation")
  navClickAnimation_all.forEach(e => {
    e.addEventListener("animationend", function () {
      e.remove()
    });
  })
}

let 防抖1 = null
function RouterLinkClick() {
  var navA_all = document.querySelectorAll("nav a")
  navA_all.forEach((e, num) => {
    e.addEventListener("mousedown", () => {
      var navClickAnimation = document.createElement("span")
      navClickAnimation.className = "navClickAnimation"
      navA_all[num].appendChild(navClickAnimation)
      RouterLink动画完成()
      clearTimeout(防抖1)
      防抖1 = setTimeout(() => {
        headerOpenClose()
      }, 300);
    })
  })
}

import { useCounterStore } from '@/stores/counter'
const store = useCounterStore()

function schemeSelect(value = 'none') {
  var schemeSelect = store.schemeSelectClick()
  var schemeSelectBodyRange = document.querySelector(".schemeSelectBodyRangeBody")
  function schemeToLight() {
    schemeSelectBodyRange.style.setProperty('--schemeSelect', '0%');
    document.documentElement.className = 'light'
  }
  function schemeToDark() {
    schemeSelectBodyRange.style.setProperty('--schemeSelect', '50%');
    document.documentElement.className = 'dark'
  }
  if (value == 'light') {
    schemeToLight()
    return

  } else if (value == 'dark') {
    schemeToDark()
    return
  }

  if (schemeSelect == 'light') {
    schemeToLight()
  } else if (schemeSelect == 'dark') {
    schemeToDark()
  }

}

function schemelister() {
  var mqList = window.matchMedia('(prefers-color-scheme: dark)');
  mqList.matches ? schemeSelect("dark") : null
  mqList.addEventListener('change', (event) => {
    if (event.matches) {
      schemeSelect("dark")
    } else {
      schemeSelect("light")
    }
  });
}

function headerOpenClose(value) {
  if (header900) {
    headerToOpen()
  } else if (value) {
    headerToClose()
  }
}

function headerToClose() {
  headerElement.classList.toggle("headerClose")
  headerIsClose = !headerIsClose
  更新侧边栏宽度()
}

const headerBg = ref(false)

function headerToOpen(value = true) {
  if (!value) {//大于900
    headerElement.classList.remove("headerOpen")
    headerIsClose = false
    headerBg.value = false
  } else {//小于900
    headerElement.classList.toggle("headerOpen")
    headerIsClose = !headerIsClose
    headerBg.value = !headerBg.value
  }
}

let header900 = false
function 屏幕小于900() {
  if (document.documentElement.scrollWidth <= 900 && !header900) {
    header_width.value = '0px'
    header900 = true
    headerIsClose ? headerToClose() : null
  } else if (document.documentElement.scrollWidth > 900 && header900) {
    headerToOpen(false)
    header900 = false
  }
}



</script>

<style scoped>
header {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 220px;
  text-align: center;
  z-index: 5;
  border: 0;
  border-right: 1px rgb(182, 182, 182) solid;
  background-color: var(--defaultBgColor);
  transition: transform .3s;
}

.headerBg {
  position: fixed;
  top: 0;
  z-index: 4;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(131, 131, 131, 0.5);
}

.logo {
  font-size: 25px;
  font-weight: bold;
  border-bottom: 1px solid
}


nav {
  padding: 0 10px;
}

nav a.router-link-exact-active {
  background-color: var(--navA_activeColor);
}

nav a.router-link-exact-active:hover {
  background-color: var(--navA_activeColor);
}

nav a {
  color: var(--navA_txtColor);
  padding: .3rem 0;
  border-radius: 6px;
  margin: 5px 0;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}


nav a:hover {
  background-color: var(--navA_hoverColor);
}

.routerLickTxt {
  z-index: 1;
}

.headerChildDiv {
  margin: 0 10px;
  padding: 5px;
  border-radius: 6px;
}

.schemeSelect {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.schemeSelectTitle {
  color: rgb(0, 169, 169);
}

.schemeSelectBody {
  display: flex;
  align-items: center;
}

.schemeSelectBodyRange {
  margin: 0px 10px;
  border: 1px solid;
  border-radius: 25px;
  width: var(--width);
  height: calc(var(--width) / 2);
  display: flex;
  align-items: center;
}

.schemeSelectBodyRangeBody {
  transition: left .3s;
  height: calc(calc(var(--width) / 2) - 6px);
  width: calc(calc(var(--width) / 2) - 6px);
  background-color: rgb(48, 150, 48);
  border-radius: 50%;
  display: block;
  --schemeSelect: 0%;
  margin: 3px;
  left: var(--schemeSelect);
  position: relative;
}

.closeheader * {
  color: rgba(255, 90, 90, 0.7);
}

section {
  flex: 1;
  overflow-x: hidden;
  transition: .3s;
  position: relative;
}

.sectionHeader {
  padding: 5px;
  box-shadow: 0px 0px 20px var(--defaultBoxShadowColor);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: var(--defaultBgColor);
  z-index: 4;
  transition: margin 0.3s;
}

.headerOpenBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  --wh: 30px;
  width: var(--wh);
  height: var(--wh);
  border-radius: 6px;
  background: rgb(0, 187, 93);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  opacity: 0.5;
  z-index: 4;
}

.RouterView-enter-active,
.RouterView-leave-active {
  transition: 0.3s ease-in-out;
}

.RouterView-enter-from {
  transform: translateX(10%);
}

.RouterView-leave-to {
  opacity: 0;
  transform: translateX(-10%);
}

@media (max-width:900px) {
  header {
    transform: translateX(-100%);
  }
}
</style>
