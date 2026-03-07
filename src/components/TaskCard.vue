<template>
  <div class="task-card" :class="task.status">
    <div class="task-header">
      <span class="priority" :class="task.priority">{{ task.priority }}</span>
      <span class="status-badge" :class="task.status">{{ statusText }}</span>
    </div>
    <h3 class="task-title">{{ task.title }}</h3>
    <div class="task-meta">
      <span class="assignee">
        <span class="assignee-avatar">{{ getAvatar(task.assignee) }}</span>
        {{ task.assignee }}
        <span v-if="isLeader(task.assignee)" class="mini-badge">负责人</span>
      </span>
    </div>
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: task.progress + '%' }"></div>
    </div>
    <span class="progress-text">{{ task.progress }}%</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useWorkStore } from '../stores/work'

const props = defineProps({
  task: { type: Object, required: true },
})

const store = useWorkStore()

const statusText = computed(() => {
  const map = { pending: '待处理', doing: '进行中', done: '已完成' }
  return map[props.task.status] || '未知'
})

function getAvatar(name) {
  return store.getMemberAvatar(name)
}

function isLeader(name) {
  const member = store.members.find(m => m.name === name)
  return member && member.role === 'leader'
}
</script>

<style scoped>
.task-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border-left: 4px solid #e5e7eb;
  transition: transform 0.2s, box-shadow 0.2s;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.task-card.doing {
  border-left-color: #3b82f6;
}

.task-card.done {
  border-left-color: #10b981;
  opacity: 0.7;
}

.task-card.pending {
  border-left-color: #f59e0b;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.priority {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
}

.priority.P0 { background: #fef2f2; color: #dc2626; }
.priority.P1 { background: #fef3c7; color: #d97706; }
.priority.P2 { background: #eff6ff; color: #2563eb; }
.priority.P3 { background: #f3f4f6; color: #6b7280; }

.status-badge {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 4px;
}

.status-badge.pending { background: #fef3c7; color: #d97706; }
.status-badge.doing { background: #dbeafe; color: #2563eb; }
.status-badge.done { background: #d1fae5; color: #059669; }

.task-title {
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
  margin: 8px 0;
  line-height: 1.4;
}

.task-meta {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 12px;
}

.assignee {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.assignee-avatar {
  font-size: 16px;
}

.mini-badge {
  font-size: 9px;
  padding: 1px 5px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  border-radius: 6px;
  font-weight: 600;
}

.progress-bar {
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.task-card.done .progress-fill {
  background: linear-gradient(90deg, #10b981, #34d399);
}

.progress-text {
  font-size: 11px;
  color: #9ca3af;
  display: block;
  text-align: right;
  margin-top: 4px;
}
</style>
