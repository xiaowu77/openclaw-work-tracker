<template>
  <div class="tasks-page">
    <h1>📋 任务列表</h1>
    
    <div class="filter-bar">
      <button 
        v-for="filter in filters" 
        :key="filter.value"
        :class="['filter-btn', { active: currentFilter === filter.value }]"
        @click="currentFilter = filter.value"
      >
        {{ filter.label }} ({{ getFilterCount(filter.value) }})
      </button>
    </div>

    <div class="tasks-grid">
      <TaskCard v-for="task in filteredTasks" :key="task.id" :task="task" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useWorkStore } from '../stores/work'
import TaskCard from '../components/TaskCard.vue'

const store = useWorkStore()
const currentFilter = ref('all')

const filters = [
  { label: '全部', value: 'all' },
  { label: '待处理', value: 'pending' },
  { label: '进行中', value: 'doing' },
  { label: '已完成', value: 'done' },
]

const filteredTasks = computed(() => {
  if (currentFilter.value === 'all') return store.tasks
  return store.tasks.filter(t => t.status === currentFilter.value)
})

function getFilterCount(status) {
  if (status === 'all') return store.tasks.length
  return store.tasks.filter(t => t.status === status).length
}
</script>

<style scoped>
.tasks-page {
  padding-bottom: 40px;
}

h1 {
  font-size: 24px;
  color: #1f2937;
  margin-bottom: 20px;
}

.filter-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 8px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  color: #6b7280;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}

.filter-btn.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.tasks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}
</style>
