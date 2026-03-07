<template>
  <div class="code-review-page">
    <h1>👀 代码审核</h1>
    <p class="subtitle">查看每位成员的代码贡献</p>

    <!-- 贡献统计 -->
    <div class="contribution-stats">
      <div v-for="member in store.members" :key="member.id" class="contribution-item">
        <span class="contrib-avatar">{{ member.avatar }}</span>
        <span class="contrib-name">{{ member.name }}</span>
        <span class="contrib-count">{{ getContributionCount(member.name) }} 个 PR</span>
        <div class="contrib-bar">
          <div 
            class="contrib-fill" 
            :style="{ width: (getContributionCount(member.name) / maxContributions * 100) + '%' }"
            :class="{ leader: member.role === 'leader' }"
          ></div>
        </div>
      </div>
    </div>

    <!-- PR 列表 -->
    <div class="review-list">
      <div 
        v-for="review in store.codeReviews" 
        :key="review.id" 
        class="review-card"
        :class="[review.status, { 'leader-pr': isLeader(review.author) }]"
      >
        <div class="review-header">
          <div class="review-author">
            <span class="author-avatar">{{ review.authorAvatar }}</span>
            <span class="author-name">{{ review.author }}</span>
            <span v-if="isLeader(review.author)" class="leader-tag">👑 负责人</span>
          </div>
          <div class="review-meta-right">
            <span class="repo-name">📦 {{ review.repo }}</span>
            <span class="review-status" :class="review.status">
              {{ statusText(review.status) }}
            </span>
          </div>
        </div>
        
        <h3 class="review-title">{{ review.title }}</h3>
        <p class="review-desc">{{ review.description }}</p>
        
        <div class="review-stats">
          <span class="stat files">📄 {{ review.files }} 文件</span>
          <span class="stat additions">+{{ review.additions }}</span>
          <span class="stat deletions">-{{ review.deletions }}</span>
          <span class="stat date">🗓 {{ review.createdAt }}</span>
        </div>
        
        <div class="review-actions" v-if="review.status === 'pending'">
          <button class="btn approve">✅ 通过</button>
          <button class="btn reject">❌ 驳回</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useWorkStore } from '../stores/work'

const store = useWorkStore()

function statusText(status) {
  const map = { pending: '待审核', approved: '已通过', rejected: '已驳回' }
  return map[status] || '未知'
}

function isLeader(name) {
  const member = store.members.find(m => m.name === name)
  return member && member.role === 'leader'
}

function getContributionCount(name) {
  return store.codeReviews.filter(r => r.author === name).length
}

const maxContributions = computed(() => {
  return Math.max(...store.members.map(m => getContributionCount(m.name)), 1)
})
</script>

<style scoped>
.code-review-page {
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
  margin-bottom: 20px;
}

/* 贡献统计 */
.contribution-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 12px;
  margin-bottom: 28px;
  padding: 16px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}

.contribution-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.contrib-avatar {
  font-size: 20px;
}

.contrib-name {
  font-weight: 600;
  font-size: 13px;
  color: #1f2937;
  min-width: 40px;
}

.contrib-count {
  font-size: 11px;
  color: #9ca3af;
  min-width: 50px;
}

.contrib-bar {
  flex: 1;
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
}

.contrib-fill {
  height: 100%;
  background: #94a3b8;
  border-radius: 3px;
}

.contrib-fill.leader {
  background: linear-gradient(90deg, #f59e0b, #fbbf24);
}

/* PR 列表 */
.review-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.review-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  border-left: 4px solid #e5e7eb;
}

.review-card.pending {
  border-left-color: #f59e0b;
}

.review-card.approved {
  border-left-color: #10b981;
}

.review-card.rejected {
  border-left-color: #ef4444;
}

.review-card.leader-pr {
  background: linear-gradient(135deg, #fefce8 0%, #fffbeb 100%);
  border-left-width: 5px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  flex-wrap: wrap;
  gap: 8px;
}

.review-author {
  display: flex;
  align-items: center;
  gap: 8px;
}

.author-avatar {
  font-size: 20px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  border-radius: 8px;
}

.author-name {
  font-weight: 600;
  font-size: 14px;
  color: #1f2937;
}

.leader-tag {
  font-size: 10px;
  padding: 2px 8px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  border-radius: 10px;
  font-weight: 600;
}

.review-meta-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.repo-name {
  font-size: 12px;
  color: #6b7280;
}

.review-status {
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 12px;
  font-weight: 500;
}

.review-status.pending { background: #fef3c7; color: #d97706; }
.review-status.approved { background: #d1fae5; color: #059669; }
.review-status.rejected { background: #fef2f2; color: #dc2626; }

.review-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 8px 0;
  font-family: 'Monaco', 'Consolas', monospace;
}

.review-desc {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 12px;
  line-height: 1.5;
}

.review-stats {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.stat {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 6px;
}

.stat.files { background: #f3f4f6; color: #6b7280; }
.stat.additions { background: #d1fae5; color: #059669; font-weight: 600; }
.stat.deletions { background: #fef2f2; color: #dc2626; font-weight: 600; }
.stat.date { background: #eff6ff; color: #2563eb; }

.review-actions {
  display: flex;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid #f3f4f6;
}

.btn {
  padding: 8px 20px;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}

.btn.approve {
  background: #d1fae5;
  color: #059669;
}

.btn.approve:hover {
  background: #10b981;
  color: white;
}

.btn.reject {
  background: #fef2f2;
  color: #dc2626;
}

.btn.reject:hover {
  background: #ef4444;
  color: white;
}
</style>
