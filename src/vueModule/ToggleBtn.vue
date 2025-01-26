<template>
  <div class="ToggleBtn a" :style="[{ '--width': props.width }]" @click="ToggleBtn_Click()">
    <div ref="ToggleBtnCircle" class="ToggleBtnCircle ToggleBtnCircle_left" :class="[
      { ToggleBtnCircle_left: props.status && !props.enableClick },
      { ToggleBtnCircle_right: !props.status && !props.enableClick },
    ]"></div>
  </div>
</template>
<script setup>
import { ref } from "vue";

// const props = defineProps(["width", "status"]);
const props = defineProps({
  width: {
    type: String,
    default: "38px",
  },
  status: {
    type: Boolean,
    default: true,
  },
  enableClick: {
    type: Boolean,
    default: false
  }
});

const ToggleBtnCircle = ref(null);

var ToggleBtn_status = true;
function ToggleBtn_Click() {
  if (!props.enableClick) return
  if (ToggleBtn_status) {
    ToggleBtnCircle.value.classList.remove("ToggleBtnCircle_left");
    ToggleBtnCircle.value.classList.add("ToggleBtnCircle_right");
  } else {
    ToggleBtnCircle.value.classList.add("ToggleBtnCircle_left");
    ToggleBtnCircle.value.classList.remove("ToggleBtnCircle_right");
  }
  ToggleBtn_status = !ToggleBtn_status;
}
</script>
<style scoped>
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
}

.ToggleBtnCircle_right {
  left: 100%;
  transform: translateX(-100%);
}
</style>