<template>
  <div class="ranking-page">
    <h1>🏆 排名积分榜</h1>
    <p class="subtitle">团队成员工作积分排名</p>

    <div class="ranking-list">
      <div 
        v-for="(member, index) in store.sortedMembers" 
        :key="member.id" 
        class="ranking-item"
        :class="{ top3: index < 3 }"
      >
        <div class="rank">
          <span v-if="index === 0" class="medal">🥇</span>
          <span v-else-if="index === 1" class="medal">🥈</span>
          <span v-else-if="index === 2" class="medal">🥉</span>
          <span v-else class="rank-num">{{ index + 1 }}</span>
        </div>
        
        <div class="member-avatar">{{ member.avatar }}</div>
        
        <div class="member-info">
          <span class="member-name">{{ member.name }}</span>
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
}

.member-info {
  flex: 1;
}

.member-name {
  display: block;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
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
  background: linear-gradient(90deg, #f59e0b, #fbbf24);
  border-radius: 3px;
}
</style>
