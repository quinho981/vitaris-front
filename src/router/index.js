import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';
import authGuard from './middleware/authGuard';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/transcription',
                    name: 'transcription',
                    component: () => import('@/views/transcription/index.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/templates',
                    name: 'templates',
                    component: () => import('@/views/templates/index.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/upload',
                    name: 'upload',
                    component: () => import('@/views/transcription/upload.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/uikit/formlayout',
                    name: 'formlayout',
                    component: () => import('@/views/uikit/FormLayout.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/uikit/input',
                    name: 'input',
                    component: () => import('@/views/uikit/InputDoc.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/uikit/button',
                    name: 'button',
                    component: () => import('@/views/uikit/ButtonDoc.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/uikit/table',
                    name: 'table',
                    component: () => import('@/views/uikit/TableDoc.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/uikit/list',
                    name: 'list',
                    component: () => import('@/views/uikit/ListDoc.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/uikit/tree',
                    name: 'tree',
                    component: () => import('@/views/uikit/TreeDoc.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/uikit/panel',
                    name: 'panel',
                    component: () => import('@/views/uikit/PanelsDoc.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/uikit/overlay',
                    name: 'overlay',
                    component: () => import('@/views/uikit/OverlayDoc.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/uikit/media',
                    name: 'media',
                    component: () => import('@/views/uikit/MediaDoc.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/uikit/message',
                    name: 'message',
                    component: () => import('@/views/uikit/MessagesDoc.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/uikit/file',
                    name: 'file',
                    component: () => import('@/views/uikit/FileDoc.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/uikit/menu',
                    name: 'menu',
                    component: () => import('@/views/uikit/MenuDoc.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/uikit/charts',
                    name: 'charts',
                    component: () => import('@/views/uikit/ChartDoc.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/uikit/misc',
                    name: 'misc',
                    component: () => import('@/views/uikit/MiscDoc.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/uikit/timeline',
                    name: 'timeline',
                    component: () => import('@/views/uikit/TimelineDoc.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/pages/empty',
                    name: 'empty',
                    component: () => import('@/views/pages/Empty.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/pages/crud',
                    name: 'crud',
                    component: () => import('@/views/pages/Crud.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/documentation',
                    name: 'documentation',
                    component: () => import('@/views/pages/Documentation.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/transcripts/list',
                    name: 'transcriptsList',
                    component: () => import('@/views/transcripts/List.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/transcripts/history',
                    name: 'transcriptsHistory',
                    component: () => import('@/views/transcripts/History.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/transcripts/:id',
                    name: 'transcriptsShow',
                    component: () => import('@/views/transcripts/[id].vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/specific',
                    name: 'specificTranscription',
                    component: () => import('@/views/transcription/specific.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: '/testehome',
                    name: 'testehome',
                    component: () => import('@/views/Home.vue'),
                    meta: { requiresAuth: true }
                },
            ]
        },
        {
            path: '/landing',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue')
        },
        {
            path: '/teste',
            name: 'teste',
            component: () => import('@/views/pages/auth/teste.vue')
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },
        {
            path: '/auth',
            children: [
                {
                    path: '/auth/login',
                    name: 'login',
                    component: () => import('@/views/pages/auth/Login.vue')
                },
                {
                    path: '/auth/register',
                    name: 'register',
                    component: () => import('@/views/pages/auth/Register.vue')
                },
            ]
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        }
    ]
});

router.beforeEach(authGuard);

export default router;
