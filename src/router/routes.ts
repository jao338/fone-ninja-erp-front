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
          requiresAuth: true,
          breadCrumbLink: true,
          breadCrumbIcon: 'home',
          breadCrumbLabel: 'home',
        },
        component: () => import('pages/Index/IndexPage.vue')
      },
      {
        path: 'products',
        meta: {
          requiresAuth: true,
          breadCrumbLink: true,
          breadCrumbIcon: 'product',
          breadCrumbLabel: 'produto',
        },
        redirect: { name: 'product-index' },
        component: () => import('pages/Product/ProductLayout.vue'),
        children: [
          {
            path: '',
            name: 'product',
            meta: {
              breadCrumbLink: true,
              breadCrumbIcon: 'product',
              breadCrumbLabel: 'produto',
            },
            component: () => import('pages/Product/ProductPage.vue')
          },
          {
            path: 'add',
            name: 'product-add',
            meta: {
              breadCrumbLink: false,
              breadCrumbIcon: 'add',
              breadCrumbLabel: 'adicionar',
            },
            component: () => import('pages/Product/ProductForm.vue')
          },
          {
            path: 'edit/:uuid_product',
            name: 'product-edit',
            meta: {
              breadCrumbLink: false,
              breadCrumbIcon: 'edit',
              breadCrumbLabel: 'editar',
            },
            component: () => import('pages/Product/ProductForm.vue')
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
