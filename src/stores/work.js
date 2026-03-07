import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useWorkStore = defineStore('work', () => {
  // 成员状态
  const members = ref([
    { id: 1, name: '小七', avatar: '🤖', status: 'online', points: 85, tasksCompleted: 12 },
    { id: 2, name: '柠檬', avatar: '🍋', status: 'busy', points: 72, tasksCompleted: 9 },
    { id: 3, name: '尼克', avatar: '🦀', status: 'online', points: 95, tasksCompleted: 15 },
  ])

  // 任务列表
  const tasks = ref([
    { id: 1, title: '开发工作网站', status: 'doing', priority: 'P1', assignee: '尼克', progress: 60 },
    { id: 2, title: '优化 AI 视频生成流程', status: 'pending', priority: 'P1', assignee: '小七', progress: 0 },
    { id: 3, title: '整理项目文档', status: 'done', priority: 'P2', assignee: '柠檬', progress: 100 },
    { id: 4, title: '部署 OpenClaw Docker 环境', status: 'done', priority: 'P1', assignee: '小七', progress: 100 },
    { id: 5, title: '设计变现方案', status: 'pending', priority: 'P0', assignee: '尼克', progress: 0 },
    { id: 6, title: '调研视频生成工具', status: 'doing', priority: 'P2', assignee: '柠檬', progress: 40 },
  ])

  // 聊天记录
  const chatMessages = ref([
    { id: 1, sender: '尼克', avatar: '🦀', content: '小七、柠檬，新任务：开发工作网站，使用 Vue 3 技术栈。', time: '2026-03-04 23:55', type: 'task' },
    { id: 2, sender: '小七', avatar: '🤖', content: '收到！我来负责前端组件开发。', time: '2026-03-04 23:56', type: 'reply' },
    { id: 3, sender: '柠檬', avatar: '🍋', content: '明白，我来处理后端 API 部分。', time: '2026-03-04 23:57', type: 'reply' },
    { id: 4, sender: '尼克', avatar: '🦀', content: '好的，完成后在 GitHub 提交 PR，我来审核。', time: '2026-03-04 23:58', type: 'task' },
    { id: 5, sender: '尼克', avatar: '🦀', content: '✅ 项目已推送至 GitHub：https://github.com/xiaowu77/openclaw-work-tracker', time: '2026-03-07 15:05', type: 'status' },
  ])

  // 代码审核
  const codeReviews = ref([
    { id: 1, title: 'feat: 初始化 Vue 项目', author: '尼克', status: 'pending', repo: 'openclaw-work-tracker' },
    { id: 2, title: 'fix: 修复任务检查脚本', author: '小七', status: 'approved', repo: 'openclaw-config' },
    { id: 3, title: 'feat: 添加定时任务', author: '柠檬', status: 'pending', repo: 'openclaw-config' },
  ])

  // 计算属性
  const sortedMembers = computed(() => {
    return [...members.value].sort((a, b) => b.points - a.points)
  })

  const taskStats = computed(() => {
    const total = tasks.value.length
    const done = tasks.value.filter(t => t.status === 'done').length
    const doing = tasks.value.filter(t => t.status === 'doing').length
    const pending = tasks.value.filter(t => t.status === 'pending').length
    return { total, done, doing, pending }
  })

  const onlineCount = computed(() => {
    return members.value.filter(m => m.status === 'online').length
  })

  // 动作
  function updateMemberStatus(id, status) {
    const member = members.value.find(m => m.id === id)
    if (member) member.status = status
  }

  function updateTaskStatus(id, status) {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      task.status = status
      task.progress = status === 'done' ? 100 : task.progress
    }
  }

  function addPoints(memberId, points) {
    const member = members.value.find(m => m.id === memberId)
    if (member) member.points += points
  }

  function addChatMessage(message) {
    const newId = Math.max(...chatMessages.value.map(m => m.id), 0) + 1
    const now = new Date()
    const time = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`
    chatMessages.value.push({
      id: newId,
      time,
      ...message,
    })
  }

  return {
    members,
    tasks,
    codeReviews,
    chatMessages,
    sortedMembers,
    taskStats,
    onlineCount,
    updateMemberStatus,
    updateTaskStatus,
    addPoints,
    addChatMessage,
  }
})
