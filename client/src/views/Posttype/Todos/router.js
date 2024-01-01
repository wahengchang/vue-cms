import {API_PATH_SLUG} from './const'
import CmsLayout from '../../../layouts/CmsLayout.vue'

export const router = [
    {
      path: `/${API_PATH_SLUG}/create`,
      name: `${API_PATH_SLUG}Create`,
      meta: {auth: 'requiredLogin', layout: CmsLayout},
      component: () => import('./CreateView.vue')
    },
    {
      path: `/${API_PATH_SLUG}/:id`,
      name: `${API_PATH_SLUG}Detail`,
      meta: {auth: 'requiredLogin', layout: CmsLayout},
      component: () => import('./DetailView.vue')
    },
    {
      path: `/${API_PATH_SLUG}`,
      name: `${API_PATH_SLUG}List`,
      meta: {auth: 'requiredLogin', layout: CmsLayout},
      component: () => import('./ListView.vue')
    },
  ]