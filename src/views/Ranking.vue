<template>
  <div class="ranking-page">
    <h1>🏆 排名积分榜</h1>
    <p class="subtitle">团队成员工作积分排名</p>

    <div class="ranking-list">
      <div 
        v-for="(member, index) in store.sortedMembers" 
        :key="member.id" 
        class="ranking-item"
        :class="{ top3: index < 3, leader: member.role === 'leader' }"
      >
        <div class="rank">
          <span v-if="index === 0" class="medal">🥇</span>
          <span v-else-if="index === 1" class="medal">🥈</span>
          <span v-else-if="index === 2" class="medal">🥉</span>
          <span v-else class="rank-num">{{ index + 1 }}</span>
        </div>
        
        <div class="member-avatar" :class="{ leader: member.role === 'leader' }">
          {{ member.avatar }}
          <span v-if="member.role === 'leader'" class="crown">👑</span>
        </div>
        
        <div class="member-info">
          <div class="name-row">
            <span class="member-name">{{ member.name }}</span>
            <span v-if="member.role === 'leader'" class="leader-badge">项目负责人</span>
          </div>
          <StatusIndicator :status="member.status" showLabel />
        </div>
        
        <div class="member-stats">
          <div class="stat">
            <span class="stat-value">{{ member.points }}</span>
            <span class="stat-label">积分</span>
          </div>
          <div class="stat">
            <span class="stat-value">{{ member.tasksCompleted }}</span>
            <span class="stat-label">完成任务</span>
          </div>
        </div>
        
        <div class="points-bar">
          <div 
            class="points-fill" 
            :style="{ width: (member.points / maxPoints * 100) + '%' }"
            :class="{ leader: member.role === 'leader' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useWorkStore } from '../stores/work'
import StatusIndicator from '../components/StatusIndicator.vue'

const store = useWorkStore()

const maxPoints = computed(() => {
  return Math.max(...store.members.map(m => m.points))
})
</script>

<style scoped>
.ranking-page {
  padding-bottom: 40px;
}

h1 {
  font-size: 24px;
  color: #1f2937;
  margin-bottom: 4px;
}

.subtitle {
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 24px;
}

.ranking-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ranking-item {
  background: white;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  transition: transform 0.2s;
}

.ranking-item:hover {
  transform: translateX(4px);
}

.ranking-item.top3 {
  background: linear-gradient(135deg, #fef3c7 0%, #fffbeb 100%);
  border: 1px solid #fcd34d;
}

.ranking-item.leader {
  background: linear-gradient(135deg, #fef3c7 0%, #fffbeb 50%, #fef9c3 100%);
  border: 2px solid #f59e0b;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.2);
}

.rank {
  width: 40px;
  text-align: center;
}

.medal {
  font-size: 28px;
}

.rank-num {
  font-size: 18px;
  font-weight: 700;
  color: #9ca3af;
}

.member-avatar {
  font-size: 28px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  border-radius: 10px;
  position: relative;
  flex-shrink: 0;
}

.member-avatar.leader {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  border-radius: 12px;
}

.crown {
  position: absolute;
  top: -8px;
  right: -4px;
  font-size: 14px;
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
}

.member-stats {
  display: flex;
  gap: 24px;
  text-align: center;
}

.stat-value {
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  display: block;
}

.ranking-item.leader .stat-value {
  color: #d97706;
}

.stat-label {
  font-size: 11px;
  color: #9ca3af;
}

.points-bar {
  width: 80px;
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
}

.points-fill {
  height: 100%;
  background: linear-gradient(90deg, #94a3b8, #cbd5e1);
  border-radius: 3px;
}

.points-fill.leader {
  background: linear-gradient(90deg, #f59e0b, #fbbf24);
}
</style>
