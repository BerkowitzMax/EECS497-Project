<template>
<div v-if="start" class="loading">
    <div class="loader"></div>
</div>
</template>
<script>
export default {
  props: ["start"]
}
</script>
<style scoped>
.loading {
    position: fixed;
    top: 0; right: 0;
    bottom: 0; left: 0;
    z-index: 999;
    background: #f8f9fa;
}
.loader {
    left: 50%;
    margin-left: -4em;
    font-size: 10px;
    border: .8em solid rgba(218, 219, 223, 1);
    border-left: .8em solid rgb(76, 127, 185);
    animation: spin 1.1s infinite linear;
}
.loader, .loader:after {
    border-radius: 50%;
    width: 8em;
    height: 8em;
    display: block;
    position: absolute;
    top: 50%;
    margin-top: -4.05em;
}

@keyframes spin {
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
