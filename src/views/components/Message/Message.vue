<template>
    <transition>
        <div v-show="visible" :id="id" class="Message" :class="type">
            <span>{{ type }}</span>
            <span>:</span>
            <span>{{ message }}</span>
        </div>
    </transition>
</template>
<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
    id: String,
    message: String,
    type: {
        type: String,
        default: '提示'
    },
    duration: {
        type: Number,
        default: 3000
    }
});


const visible = ref(false);
onMounted(() => {
    visible.value = true
    setTimeout(() => {
        visible.value = false;
    }, props.duration - 300);
})

</script>
<style scoped>
.Message {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    padding: .4em 1em;
    top: 16px;
    background-color: rgb(204, 255, 202);
    border-radius: 6px;
    z-index: 100;
    transition: top .4s;
}

.v-enter-active,
.v-leave-active {
    transition: 0.3s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    transform: translate(-50%, -100%);
}
</style>