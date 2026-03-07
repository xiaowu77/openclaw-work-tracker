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

  return {
    members,
    tasks,
    codeReviews,
    sortedMembers,
    taskStats,
    onlineCount,
    updateMemberStatus,
    updateTaskStatus,
    addPoints,
  }
})
