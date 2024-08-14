import { useMainStore } from './stores/MainStore';
import { createRouter, createWebHistory, RouteRecordRaw, RouterScrollBehavior } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'HomeView',
        component: () => import('./views/HomeView.vue'),
        meta: { requiresAuth: false, title: 'navigation.home.title', visible: true },
    },
    {
        path: '/example',
        name: 'ExampleView',
        component: () => import('./views/PageView.vue'),
        meta: {
            requiresAuth: false,
            title: 'navigation.example.title',
            visible: true,
        },
        children: [
            {
                path: '/example',
                redirect: '/example/list',
                meta: { visible: false },
            },
            {
                path: '/example/list',
                name: 'ExampleView',
                component: () => import('./views/example/ExampleView.vue'),
                meta: {
                    requiresAuth: false,
                    title: 'navigation.example.children.example',
                    visible: true,
                },
            },
        ],
    },
    {
        path: '/table',
        name: 'TableView',
        component: () => import('./views/PageView.vue'),
        meta: {
            requiresAuth: false,
            title: 'navigation.table.title',
            visible: true,
        },
        children: [
            {
                path: '/table',
                redirect: '/table/local',
                meta: { visible: false },
            },
            {
                path: '/table/local',
                name: 'TableLocalView',
                component: () => import('./views/TableView.vue'),
                meta: {
                    requiresAuth: false,
                    title: 'navigation.table.children.local',
                    visible: true,
                },
            },
            {
                path: '/table/async',
                name: 'TableAsyncView',
                component: () => import('./views/TableAsync.vue'),
                meta: {
                    requiresAuth: false,
                    title: 'navigation.table.children.async',
                    visible: true,
                },
            },
        ],
    },
    {
        path: '/login',
        name: 'LoginView',
        component: () => import('./views/session/LoginView.vue'),
        meta: { session: false, title: 'navigation.login.title' },
        props: (route) => ({ code: route.query.code, callback: route.query.callback }),
    },
    {
        path: '/logout',
        name: 'LogoutView',
        component: () => import('./views/session/LogoutView.vue'),
        meta: { session: true, title: 'navigation.logout.title', analyticsIgnore: true },
    },
    {
        path: '/callback',
        name: 'CallbackView',
        component: () => import('./views/session/CallbackView.vue'),
        meta: { title: 'navigation.callback', visible: false, analyticsIgnore: true },
        props: (route) => ({ code: route.query.code }),
    },
    {
        path: '/:pathMatch(.*)',
        name: 'NotFoundView',
        component: () => import('./views/errors/NotFound.vue'),
        meta: { requiresAuth: false, title: 'navigation.home.title', visible: false },
    },
];

const scrollBehavior: RouterScrollBehavior = (to) => {
    if (to.hash) {
        return { selector: to.hash };
    }
    return { left: 0, top: 0 };
};

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes,
    scrollBehavior,
});
router.beforeEach((to, from, next) => {
    const store = useMainStore();
    store.breadcrumb = '';
    next();
});
export { router };
