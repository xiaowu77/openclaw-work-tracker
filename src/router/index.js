import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Tasks from '../views/Tasks.vue'
import Ranking from '../views/Ranking.vue'
import CodeReview from '../views/CodeReview.vue'
import Chat from '../views/Chat.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/tasks', name: 'Tasks', component: Tasks },
  { path: '/ranking', name: 'Ranking', component: Ranking },
  { path: '/code-review', name: 'CodeReview', component: CodeReview },
  { path: '/chat', name: 'Chat', component: Chat },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
