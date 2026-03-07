<template>
  <div class="code-review-page">
    <h1>👀 代码审核</h1>
    <p class="subtitle">待审核的 Pull Request</p>

    <div class="review-list">
      <div 
        v-for="review in store.codeReviews" 
        :key="review.id" 
        class="review-card"
        :class="review.status"
      >
        <div class="review-header">
          <span class="repo-name">📦 {{ review.repo }}</span>
          <span class="review-status" :class="review.status">
            {{ statusText(review.status) }}
          </span>
        </div>
        <h3 class="review-title">{{ review.title }}</h3>
        <div class="review-meta">
          <span class="author">👤 {{ review.author }}</span>
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
import { useWorkStore } from '../stores/work'

const store = useWorkStore()

function statusText(status) {
  const map = {
    pending: '待审核',
    approved: '已通过',
    rejected: '已驳回',
  }
  return map[status] || '未知'
}
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
  margin-bottom: 24px;
}

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
  opacity: 0.8;
}

.review-card.rejected {
  border-left-color: #ef4444;
  opacity: 0.8;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.repo-name {
  font-size: 13px;
  color: #6b7280;
}

.review-status {
  font-size: 12px;
  padding: 2px 10px;
  border-radius: 12px;
  font-weight: 500;
}

.review-status.pending {
  background: #fef3c7;
  color: #d97706;
}

.review-status.approved {
  background: #d1fae5;
  color: #059669;
}

.review-status.rejected {
  background: #fef2f2;
  color: #dc2626;
}

.review-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 8px 0;
}

.review-meta {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 12px;
}

.review-actions {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 6px 16px;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
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
