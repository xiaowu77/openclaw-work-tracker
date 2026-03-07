<template>
  <div class="chat-page">
    <h1>💬 任务沟通</h1>
    <p class="subtitle">记录团队任务布置与沟通</p>

    <div class="chat-container">
      <div class="chat-messages" ref="messagesContainer">
        <div 
          v-for="msg in store.chatMessages" 
          :key="msg.id" 
          class="message"
          :class="[msg.type, { 'is-me': msg.sender === currentUser }]"
        >
          <div class="message-avatar">{{ msg.avatar }}</div>
          <div class="message-body">
            <div class="message-header">
              <span class="sender-name">{{ msg.sender }}</span>
              <span class="message-time">{{ msg.time }}</span>
            </div>
            <div class="message-content" :class="msg.type">
              <span v-if="msg.type === 'task'" class="type-badge task">📋 任务</span>
              <span v-else-if="msg.type === 'status'" class="type-badge status">📢 状态</span>
              <span v-else-if="msg.type === 'reply'" class="type-badge reply">💬 回复</span>
              {{ msg.content }}
            </div>
          </div>
        </div>
      </div>

      <div class="chat-input-area">
        <div class="sender-select">
          <label>发送者：</label>
          <select v-model="currentUser">
            <option value="尼克">🦀 尼克</option>
            <option value="小七">🤖 小七</option>
            <option value="柠檬">🍋 柠檬</option>
            <option value="白桃">🍑 白桃</option>
            <option value="煤球">⚫ 煤球</option>
          </select>
        </div>
        <div class="type-select">
          <label>类型：</label>
          <select v-model="currentType">
            <option value="task">📋 任务</option>
            <option value="reply">💬 回复</option>
            <option value="status">📢 状态</option>
          </select>
        </div>
        <div class="input-row">
          <textarea 
            v-model="newMessage" 
            placeholder="输入消息... (Ctrl+Enter 发送)"
            @keydown.ctrl.enter="sendMessage"
            @keydown.meta.enter="sendMessage"
            rows="2"
          ></textarea>
          <button @click="sendMessage" :disabled="!newMessage.trim()">发送</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'
import { useWorkStore } from '../stores/work'

const store = useWorkStore()
const messagesContainer = ref(null)
const newMessage = ref('')
const currentUser = ref('尼克')
const currentType = ref('task')

const avatarMap = {
  '尼克': '🦀',
  '小七': '🤖',
  '柠檬': '🍋',
  '白桃': '🍑',
  '煤球': '⚫',
}

function sendMessage() {
  if (!newMessage.value.trim()) return
  
  store.addChatMessage({
    sender: currentUser.value,
    avatar: avatarMap[currentUser.value],
    content: newMessage.value.trim(),
    type: currentType.value,
  })
  
  newMessage.value = ''
  nextTick(() => {
    scrollToBottom()
  })
}

function scrollToBottom() {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

onMounted(() => {
  scrollToBottom()
})
</script>

<style scoped>
.chat-page {
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 140px);
}

h1 {
  font-size: 24px;
  color: #1f2937;
  margin-bottom: 4px;
}

.subtitle {
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 16px;
}

.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  overflow: hidden;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message {
  display: flex;
  gap: 12px;
  max-width: 80%;
}

.message.is-me {
  flex-direction: row-reverse;
  margin-left: auto;
}

.message-avatar {
  font-size: 28px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  border-radius: 10px;
  flex-shrink: 0;
}

.message-body {
  flex: 1;
}

.message.is-me .message-body {
  text-align: right;
}

.message-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.message.is-me .message-header {
  flex-direction: row-reverse;
}

.sender-name {
  font-weight: 600;
  font-size: 13px;
  color: #1f2937;
}

.message-time {
  font-size: 11px;
  color: #9ca3af;
}

.message-content {
  background: #f3f4f6;
  padding: 10px 14px;
  border-radius: 12px;
  border-top-left-radius: 4px;
  font-size: 14px;
  line-height: 1.5;
  color: #374151;
  display: inline-block;
  text-align: left;
}

.message.is-me .message-content {
  border-top-left-radius: 12px;
  border-top-right-radius: 4px;
}

.message-content.task {
  background: #eff6ff;
  border: 1px solid #bfdbfe;
}

.message-content.status {
  background: #fef3c7;
  border: 1px solid #fcd34d;
}

.message-content.reply {
  background: #f3f4f6;
}

.type-badge {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 4px;
  margin-right: 4px;
  font-weight: 500;
}

.type-badge.task {
  background: #dbeafe;
  color: #2563eb;
}

.type-badge.status {
  background: #fde68a;
  color: #b45309;
}

.type-badge.reply {
  background: #e5e7eb;
  color: #6b7280;
}

.chat-input-area {
  padding: 16px;
  border-top: 1px solid #f3f4f6;
  background: #fafafa;
}

.sender-select, .type-select {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
  margin-right: 16px;
}

.sender-select label, .type-select label {
  font-size: 13px;
  color: #6b7280;
}

.sender-select select, .type-select select {
  padding: 4px 8px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 13px;
  background: white;
}

.input-row {
  display: flex;
  gap: 10px;
}

textarea {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
  font-family: inherit;
  resize: none;
  outline: none;
  transition: border-color 0.2s;
}

textarea:focus {
  border-color: #3b82f6;
}

button {
  padding: 10px 24px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  align-self: flex-end;
}

button:hover:not(:disabled) {
  background: #2563eb;
}

button:disabled {
  background: #d1d5db;
  cursor: not-allowed;
}
</style>
