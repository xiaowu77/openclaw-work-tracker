<template>
  <div class="status-indicator" :class="status" :title="statusText">
    <span class="dot"></span>
    <span v-if="showLabel" class="label">{{ statusText }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: { type: String, default: 'offline' },
  showLabel: { type: Boolean, default: false },
})

const statusText = computed(() => {
  const map = { online: '在线', offline: '离线', busy: '忙碌' }
  return map[props.status] || '离线'
})
</script>

<style scoped>
.status-indicator {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.online .dot {
  background: #10b981;
  box-shadow: 0 0 6px #10b98188;
  animation: pulse-green 2s infinite;
}

.busy .dot {
  background: #f59e0b;
  box-shadow: 0 0 6px #f59e0b88;
  animation: pulse-yellow 2s infinite;
}

.offline .dot {
  background: #ef4444;
}

.label {
  font-size: 12px;
  color: #6b7280;
}

@keyframes pulse-green {
  0%, 100% { box-shadow: 0 0 6px #10b98188; }
  50% { box-shadow: 0 0 12px #10b981aa; }
}

@keyframes pulse-yellow {
  0%, 100% { box-shadow: 0 0 6px #f59e0b88; }
  50% { box-shadow: 0 0 12px #f59e0baa; }
}
</style>
