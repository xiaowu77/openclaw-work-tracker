import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// GitHub Pages 基础路径
const BASE_URL = import.meta.env.BASE_URL || '/'

export const useWorkStore = defineStore('work', () => {
  // 成员状态（初始值，会被真实状态覆盖）
  const members = ref([
    { id: 1, name: '小七', avatar: '🤖', status: 'offline', points: 85, tasksCompleted: 12, role: 'member', roleTitle: '后端开发', currentTask: '' },
    { id: 2, name: '柠檬', avatar: '🍋', status: 'offline', points: 72, tasksCompleted: 9, role: 'member', roleTitle: '后端开发', currentTask: '' },
    { id: 3, name: '尼克', avatar: '🦀', status: 'online', points: 95, tasksCompleted: 15, role: 'leader', roleTitle: '项目负责人', currentTask: '项目管理' },
    { id: 4, name: '白桃', avatar: '🍑', status: 'busy', points: 0, tasksCompleted: 0, role: 'member', roleTitle: 'UI 设计师', currentTask: '网站 UI 评估' },
    { id: 5, name: '煤球', avatar: '⚫', status: 'busy', points: 0, tasksCompleted: 0, role: 'member', roleTitle: 'CI/CD 工程师', currentTask: 'CI/CD 配置检查' },
  ])

  // 最后更新时间
  const lastStatusUpdate = ref('')

  // 从 status.json 获取真实状态
  async function fetchRealStatus() {
    try {
      const res = await fetch(`${BASE_URL}status.json?t=${Date.now()}`)
      if (!res.ok) return
      const data = await res.json()
      
      if (data.members) {
        data.members.forEach(realMember => {
          const member = members.value.find(m => m.id === realMember.id)
          if (member) {
            member.status = realMember.status
            member.currentTask = realMember.currentTask || ''
          }
        })
      }
      if (data.updatedAtLocal) {
        lastStatusUpdate.value = data.updatedAtLocal
      }
    } catch (e) {
      console.log('无法获取实时状态，使用默认状态')
    }
  }

  // 任务列表
  const tasks = ref([
    { id: 1, title: '开发工作网站', status: 'doing', priority: 'P1', assignee: '尼克', assigneeId: 3, progress: 60 },
    { id: 2, title: '优化 AI 视频生成流程', status: 'pending', priority: 'P1', assignee: '小七', assigneeId: 1, progress: 0 },
    { id: 3, title: '整理项目文档', status: 'done', priority: 'P2', assignee: '柠檬', assigneeId: 2, progress: 100 },
    { id: 4, title: '部署 OpenClaw Docker 环境', status: 'done', priority: 'P1', assignee: '小七', assigneeId: 1, progress: 100 },
    { id: 5, title: '设计变现方案', status: 'pending', priority: 'P0', assignee: '尼克', assigneeId: 3, progress: 0 },
    { id: 6, title: '调研视频生成工具', status: 'doing', priority: 'P2', assignee: '柠檬', assigneeId: 2, progress: 40 },
  ])

  // 聊天记录
  const chatMessages = ref([
    { id: 1, sender: '尼克', avatar: '🦀', content: '小七、柠檬，新任务：开发工作网站，使用 Vue 3 技术栈。', time: '2026-03-04 23:55', type: 'task' },
    { id: 2, sender: '小七', avatar: '🤖', content: '收到！我来负责前端组件开发。', time: '2026-03-04 23:56', type: 'reply' },
    { id: 3, sender: '柠檬', avatar: '🍋', content: '明白，我来处理后端 API 部分。', time: '2026-03-04 23:57', type: 'reply' },
    { id: 4, sender: '尼克', avatar: '🦀', content: '好的，完成后在 GitHub 提交 PR，我来审核。', time: '2026-03-04 23:58', type: 'task' },
    { id: 5, sender: '尼克', avatar: '🦀', content: '✅ 项目已推送至 GitHub：https://github.com/xiaowu77/openclaw-work-tracker', time: '2026-03-07 15:05', type: 'status' },
    { id: 6, sender: '尼克', avatar: '🦀', content: '🎉 欢迎新成员！白桃（🍑 UI 设计师）和煤球（⚫ CI/CD 工程师）已加入团队！', time: '2026-03-07 19:14', type: 'status' },
    { id: 7, sender: '白桃', avatar: '🍑', content: '大家好！我来负责网站的 UI/UX 设计优化，让界面更好看！', time: '2026-03-07 19:15', type: 'reply' },
    { id: 8, sender: '煤球', avatar: '⚫', content: '嗨！我来搞定 CI/CD 流水线，让部署更快更稳！', time: '2026-03-07 19:15', type: 'reply' },
    { id: 9, sender: '白桃', avatar: '🍑', content: '📋 UI 评估完成！总体评分 7/10。建议：1) 添加 CSS 变量管理色彩 2) 移动端需要汉堡菜单 3) 添加深色模式 4) 骨架屏加载状态 5) 数据可视化升级为图表。', time: '2026-03-07 19:20', type: 'status' },
    { id: 10, sender: '煤球', avatar: '⚫', content: '📋 CI/CD 评估完成！总体评分 6/10。建议：1) 添加 actions/cache 优化构建 2) 添加部署成功/失败飞书通知 3) 添加 Lighthouse 性能检测 4) PR 预览环境 5) 添加 ESLint/Prettier 代码检查。', time: '2026-03-07 19:20', type: 'status' },
  ])

  // 代码审核
  const codeReviews = ref([
    { 
      id: 1, 
      title: 'feat: 初始化 Vue 3 工作台项目', 
      author: '尼克', 
      authorId: 3,
      authorAvatar: '🦀',
      status: 'approved', 
      repo: 'openclaw-work-tracker',
      description: '搭建 Vue 3 + Vite 项目，实现首页、任务、排名、审核页面',
      files: 22,
      additions: 2776,
      deletions: 0,
      createdAt: '2026-03-07',
    },
    { 
      id: 2, 
      title: 'feat: 添加任务沟通聊天框', 
      author: '尼克', 
      authorId: 3,
      authorAvatar: '🦀',
      status: 'approved', 
      repo: 'openclaw-work-tracker',
      description: '新增沟通页面，支持消息发送、类型选择、实时显示',
      files: 4,
      additions: 345,
      deletions: 0,
      createdAt: '2026-03-07',
    },
    { 
      id: 3, 
      title: 'fix: 修复任务检查脚本超时问题', 
      author: '小七', 
      authorId: 1,
      authorAvatar: '🤖',
      status: 'approved', 
      repo: 'openclaw-config',
      description: '增加超时时间，优化错误处理逻辑',
      files: 2,
      additions: 45,
      deletions: 12,
      createdAt: '2026-03-05',
    },
    { 
      id: 4, 
      title: 'feat: 添加 launchd 定时任务配置', 
      author: '柠檬', 
      authorId: 2,
      authorAvatar: '🍋',
      status: 'pending', 
      repo: 'openclaw-config',
      description: '配置每5分钟自动检查任务的 launchd plist 文件',
      files: 3,
      additions: 89,
      deletions: 0,
      createdAt: '2026-03-05',
    },
    { 
      id: 5, 
      title: 'refactor: 重构子代理通信模块', 
      author: '小七', 
      authorId: 1,
      authorAvatar: '🤖',
      status: 'pending', 
      repo: 'openclaw-config',
      description: '优化子代理间消息传递，减少延迟',
      files: 5,
      additions: 156,
      deletions: 78,
      createdAt: '2026-03-06',
    },
    { 
      id: 6, 
      title: 'feat: 网站 UI 设计评估报告', 
      author: '白桃', 
      authorId: 4,
      authorAvatar: '🍑',
      status: 'pending', 
      repo: 'openclaw-work-tracker',
      description: '提交 UI/UX 设计改进建议和视觉优化方案',
      files: 1,
      additions: 200,
      deletions: 0,
      createdAt: '2026-03-07',
    },
    { 
      id: 7, 
      title: 'feat: 优化 GitHub Actions 构建流程', 
      author: '煤球', 
      authorId: 5,
      authorAvatar: '⚫',
      status: 'pending', 
      repo: 'openclaw-work-tracker',
      description: '添加构建缓存、优化部署步骤、添加构建通知',
      files: 2,
      additions: 65,
      deletions: 10,
      createdAt: '2026-03-07',
    },
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

  function getMemberById(id) {
    return members.value.find(m => m.id === id)
  }

  function getMemberAvatar(name) {
    const member = members.value.find(m => m.name === name)
    return member ? member.avatar : '👤'
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
    lastStatusUpdate,
    sortedMembers,
    taskStats,
    onlineCount,
    updateMemberStatus,
    updateTaskStatus,
    addPoints,
    addChatMessage,
    getMemberById,
    getMemberAvatar,
    fetchRealStatus,
  }
})
