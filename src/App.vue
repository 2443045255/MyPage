<template>
  <div class="headerBg" v-show="headerBg" @click="headerOpenClose(true)"></div>
  <header @click="更新侧边栏宽度()">
    <h2 class="logo no-a a">Rxaser page</h2>
    <div class="header-body">
      <p class="headerInfo">导航</p>
      <div class="wrapper">
        <nav>
          <!-- <RouterLink to="/" replace>
            <span class="routerLickTxt">主页</span>
          </RouterLink>
          <RouterLink to="/public" replace>
            <span class="routerLickTxt">发布</span>
          </RouterLink> -->
          <RouterLink to="/" replace>
            <span class="routerLickTxt">聊天</span>
          </RouterLink>
          <RouterLink to="/about" replace>
            <span class="routerLickTxt">关于</span>
          </RouterLink>
        </nav>
      </div>

      <p class="headerInfo">功能</p>

      <div class="headerChildDiv a default-hoverBg schemeSelect" @click="schemeSelect(true)">
        <div class="schemeSelectTitle">主题选择</div>
        <div class="schemeSelectBody">
          <p>亮</p>
          <ToggleBtn :status="schemeSelect_val" />
          <p>暗</p>
        </div>
      </div>

      <div class="headerChildDiv a default-hoverBg closeheader" @click="headerOpenClose(true)">
        <span>关闭菜单</span>
      </div>

      <div class="versionInfo" style="font-size: 12px; text-align: left">
        <p>版本:<span>1.0.0</span></p>
      </div>
    </div>
  </header>

  <section :style="{ marginLeft: header_width + px }">
    <div class="sectionBtnGroup">
      <div class="headerOpenBtn default-hoverBg a" @click="headerOpenClose(true)">
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
import ToggleBtn from "@/vueModule/ToggleBtn.vue";

// import { RouterLink, RouterView } from "vue-router";
import { ref, onMounted } from "vue";
// 使用仓库
import { useStore } from "@/stores/counter";
const store = useStore();

const header_width = ref("0px");
var px = "px";
var headerEM;
var headerIsClose = false;
var sectionEM;
onMounted(() => {
  headerEM = document.querySelector("header");
  sectionEM = document.querySelector("section");
  更新侧边栏宽度();
  sectionEM.addEventListener("scroll", () => { });
  window.addEventListener("resize", () => {
    更新侧边栏宽度();
    屏幕小于900();
  });
  屏幕小于900();
  RouterLinkClick();
  schemelister();

  setTimeout(() => {
    document.documentElement.style.setProperty(
      "--font",
      `"HarmonyOS_Sans_SC_Regular"`
    );
  }, 500);
});

function 更新侧边栏宽度() {
  if (document.documentElement.scrollWidth <= 900) {
    return;
  }
  if (headerIsClose) {
    header_width.value = 0;
  } else if (header_width.value != headerEM.scrollWidth) {
    header_width.value = headerEM.scrollWidth;
  }
}

function RouterLink动画完成() {
  var navClickAnimation_all = document.querySelectorAll(".navClickAnimation");
  navClickAnimation_all.forEach((e) => {
    e.addEventListener("animationend", function () {
      e.remove();
    });
  });
}

function RouterLinkClick() {
  var navA_all = document.querySelectorAll("nav a");
  navA_all.forEach((e, num) => {
    let 防抖1 = null;
    e.addEventListener("mousedown", () => {
      var navClickAnimation = document.createElement("span");
      navClickAnimation.className = "navClickAnimation";
      navA_all[num].appendChild(navClickAnimation);
      RouterLink动画完成();
      clearTimeout(防抖1);
      防抖1 = setTimeout(() => {
        headerOpenClose();
      }, 300);
    });
  });
}

// 仓库
const schemeSelect_val = ref(true);
function schemeSelect(value = false) {
  var schemeSelect = store.schemeSelectClick();
  function schemeToLight() {
    document.documentElement.className = "light";
  }
  function schemeToDark() {
    document.documentElement.className = "dark";
  }
  if (value) {
    if (schemeSelect_val.value) {
      schemeToDark();
    } else {
      schemeToLight();
    }
  } else if (schemeSelect == "light") {
    schemeToLight();
  } else if (schemeSelect == "dark") {
    schemeToDark();
  }
  schemeSelect_val.value = !schemeSelect_val.value;
}

function schemelister() {
  var mqList = window.matchMedia("(prefers-color-scheme: dark)");
  mqList.matches ? schemeSelect("dark") : null;
  mqList.addEventListener("change", (event) => {
    if (event.matches) {
      schemeSelect(true);
    } else {
      schemeSelect(true);
    }
  });
}

function headerOpenClose(value) {
  if (header900) {
    headerToOpen();
  } else if (value) {
    headerToClose();
  }
}

function headerToClose() {
  headerEM.classList.toggle("headerClose");
  headerIsClose = !headerIsClose;
  更新侧边栏宽度();
}

const headerBg = ref(false);

function headerToOpen(value = true) {
  if (!value) {
    //大于900
    headerEM.classList.remove("headerOpen");
    headerIsClose = false;
    headerBg.value = false;
  } else {
    //小于900
    headerEM.classList.toggle("headerOpen");
    headerIsClose = !headerIsClose;
    headerBg.value = !headerBg.value;
  }
}

let header900 = false;
function 屏幕小于900() {
  if (document.documentElement.scrollWidth <= 900 && !header900) {
    header_width.value = 0;
    header900 = true;
    headerIsClose ? headerToClose() : null;
  } else if (document.documentElement.scrollWidth > 900 && header900) {
    headerToOpen(false);
    header900 = false;
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
  transition: transform 0.3s;
  display: flex;
  flex-direction: column;
  flex-flow: column;
}

.header-body {
  flex: 1;
  overflow: auto;
}

.headerBg {
  position: fixed;
  top: 0;
  z-index: 4;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(127, 127, 127, 0.2);
  backdrop-filter: blur(2px);
}

header>a {
  display: block;
}

.headerInfo {
  text-align: left;
  font-size: 14px;
  color: var(--infoColor);
  margin: 3px 0;
  user-select: none;
  -webkit-user-select: none;
}

.headerInfo::after {
  content: ":";
  font-size: 1.2rem;
  line-height: 0;
  padding: 0 1px;
}

.logo {
  font-size: 25px;
  font-weight: bold;
  font-family: "MonaspaceRadon_Regular" !important;
  border-bottom: 1px solid;
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
  padding: 0.3rem 0;
  border-radius: 6px;
  margin: 5px 0;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  -webkit-user-select: none;
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

.ToggleBtn {
  margin: 0px 10px;
  border: 1px solid;
  border-radius: 25px;
  width: var(--width);
  height: calc(var(--width) / 2);
  padding: 0 3px;
  display: flex;
  align-items: center;
}

.ToggleBtnCircle {
  transition: left 0.3s, transform 0.3s;
  height: calc(calc(var(--width) / 2) - 6px);
  width: calc(calc(var(--width) / 2) - 6px);
  background-color: rgb(48, 150, 48);
  border-radius: 50%;
  display: block;
  position: relative;
}

.ToggleBtnCircle_left {
  left: 0;
  right: auto;
}

.ToggleBtnCircle_right {
  left: 100%;
  transform: translateX(-100%);
  right: auto;
}

.closeheader * {
  color: rgb(255, 0, 0);
}

section {
  flex: 1;
  overflow-x: hidden;
  transition: 0.3s;
  position: relative;
}

.sectionBtnGroup {
  padding: 10px;
  position: fixed;
  bottom: 2rem;
  left: 0;
  z-index: 3;
}

.headerOpenBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  --wh: 35px;
  width: var(--wh);
  height: var(--wh);
  border-radius: 6px;
  z-index: 4;
  transition: 0.3s;
  background: var(--defaultBtnTanColor);
  color: var(--defaultColor-1);
}

.RouterView-enter-active,
.RouterView-leave-active {
  transition: 0.3s ease-in-out;
}

.RouterView-enter-from {
  opacity: 0.1;
}

.RouterView-leave-to {
  opacity: 0.1;
  /* transform: translateX(-10%); */
}

@media (max-width: 900px) {
  header {
    transform: translateX(-100%);
    border: 0;
  }
}
</style>
