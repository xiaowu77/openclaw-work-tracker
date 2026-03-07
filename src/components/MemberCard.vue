<template>
  <div class="member-card" :class="{ leader: member.role === 'leader' }">
    <div class="member-avatar" :class="{ leader: member.role === 'leader' }">
      {{ member.avatar }}
      <span v-if="member.role === 'leader'" class="crown">👑</span>
    </div>
    <div class="member-info">
      <div class="name-row">
        <span class="member-name">{{ member.name }}</span>
        <span v-if="member.role === 'leader'" class="leader-badge">项目负责人</span>
      </div>
      <StatusIndicator 
        :status="member.status" 
        :clickable="editable" 
        showLabel 
        @change="val => emit('statusChange', member.id, val)"
      />
    </div>
    <div class="member-stats">
      <div class="stat">
        <span class="stat-value">{{ member.points }}</span>
        <span class="stat-label">积分</span>
      </div>
      <div class="stat">
        <span class="stat-value">{{ member.tasksCompleted }}</span>
        <span class="stat-label">任务</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import StatusIndicator from './StatusIndicator.vue'

const props = defineProps({
  member: { type: Object, required: true },
  editable: { type: Boolean, default: false },
})

const emit = defineEmits(['statusChange'])
</script>

<style scoped>
.member-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  transition: transform 0.2s, box-shadow 0.2s;
}

.member-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.member-card.leader {
  background: linear-gradient(135deg, #fef3c7 0%, #fffbeb 50%, #fef9c3 100%);
  border: 2px solid #f59e0b;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.2);
}

.member-avatar {
  font-size: 28px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  border-radius: 12px;
  position: relative;
  flex-shrink: 0;
}

.member-avatar.leader {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  border-radius: 14px;
  font-size: 30px;
}

.crown {
  position: absolute;
  top: -10px;
  right: -6px;
  font-size: 16px;
}

.member-info {
  flex: 1;
  min-width: 0;
}

.name-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  flex-wrap: wrap;
}

.member-name {
  font-weight: 600;
  color: #1f2937;
  font-size: 15px;
}

.leader-badge {
  font-size: 10px;
  padding: 2px 8px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  border-radius: 10px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.member-stats {
  display: flex;
  gap: 16px;
  text-align: center;
}

.stat-value {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  display: block;
}

.stat-label {
  font-size: 11px;
  color: #9ca3af;
}

.member-card.leader .stat-value {
  color: #d97706;
}
</style>
