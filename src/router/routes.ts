import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      breadCrumbLink: true,
      breadCrumbIcon: 'home',
      breadCrumbLabel: 'paginaInicial'
    },
    redirect: {
      name: 'login',
    },
    children: [
      {
        path: '',
        name: 'home',
        meta: {
          // requiresAuth: true,
          breadCrumbLink: true,
          breadCrumbIcon: 'home',
          breadCrumbLabel: 'home',
        },
        component: () => import('pages/Index/IndexPage.vue')
      },
      {
        path: 'exemplo',
        meta: {
          // requiresAuth: true,
          breadCrumbLink: true,
          breadCrumbIcon: 'example',
          breadCrumbLabel: 'exemplo',
        },
        redirect: { name: 'example-index' },
        component: () => import('pages/Example/ExampleLayout.vue'),
        children: [
          {
            path: '',
            name: 'exemplo',
            meta: {
              breadCrumbLink: true,
              breadCrumbIcon: 'example',
              breadCrumbLabel: 'exemplo',
            },
            component: () => import('pages/Example/ExamplePage.vue')
          },
          {
            path: 'adicionar',
            name: 'exemplo-adicionar',
            meta: {
              breadCrumbLink: false,
              breadCrumbIcon: 'add',
              breadCrumbLabel: 'adicionar',
            },
            component: () => import('pages/Example/ExampleForm.vue')
          },
          {
            path: 'editar/:uuid_exemplo',
            name: 'exemplo-editar',
            meta: {
              breadCrumbLink: false,
              breadCrumbIcon: 'edit',
              breadCrumbLabel: 'editar',
            },
            component: () => import('pages/Example/ExampleForm.vue')
          },
        ]
      },
      {
        path: 'componentes',
        meta: {
          // requiresAuth: true,
          breadCrumbLink: true,
          breadCrumbIcon: 'settings',
          breadCrumbLabel: 'componentes',
        },
        redirect: { name: 'componentes' },
        component: () => import('pages/Components/ComponentsLayout.vue'),
        children: [
          {
            path: '',
            name: 'componentes',
            meta: {
              breadCrumbLink: true,
              breadCrumbIcon: 'settings',
              breadCrumbLabel: 'componentes',
            },
            component: () => import('pages/Components/ComponentsPage.vue')
          },
        ]
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/Login/LoginPage.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/NotFound/NotFoundPage.vue'),
  },
];

export default routes;
