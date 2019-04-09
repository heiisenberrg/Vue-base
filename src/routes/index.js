/* ============
 * Routes File
 * ============
 *
 * The routes and redirects are defined in this file.
 */

export default [
  /** Home
  {
    path: '/home',
    name: 'home.index',
    component: () => import('@/views/Home/Index.vue'),

    // If the user needs to be authenticated to view this page
    meta: {
      auth: true,
      breadcrumb: [
        { name: 'Home', link: '/' }
      ]
    }
  }, * */
  // Account
  {
    path: '/account',
    name: 'account.index',
    component: () => import('@/views/Account/Index.vue'),

    // If the user needs to be authenticated to view this page.
    meta: {
      auth: true
    }
  },

  // Login
  {
    path: '/login',
    name: 'login.index',
    component: () => import('@/views/Login/Index.vue'),

    // If the user needs to be a guest to view this page.
    meta: {
      guest: true
    }
  },

  // Register
  {
    path: '/register',
    name: 'register.index',
    component: () => import('@/views/Register/Index.vue'),

    // If the user needs to be a guest to view this page.
    meta: {
      guest: true
    }
  },

  // Careplan
  {
    path: '/careplan',
    name: 'careplan.index',
    component: () =>
      import('@/views/CarePlan/Index.vue'),
    meta: {
      auth: true,
      breadcrumb: [{
        name: 'Care Plan',
        link: 'careplan.index'
      }]
    }
  },
  // Create Careplan
  {
    path: '/careplan/create',
    name: 'careplan.create',
    component: () =>
      import('@/views/CarePlan/Create/Index.vue'),
    meta: {
      auth: true,
      breadcrumb: [{
        name: 'Care Plan',
        link: 'careplan.index'
      },
      {
        name: 'Create'
      }
      ]
    }
  },
  // Edit Careplan
  {
    path: '/careplan/edit/:id',
    name: 'careplan.edit',
    component: () =>
      import('@/views/CarePlan/Edit/Index.vue'),
    meta: {
      auth: true,
      breadcrumb: [{
        name: 'Care Plan',
        link: 'careplan.index'
      },
      {
        name: 'Edit'
      }
      ]
    }
  },
  // View Careplan
  {
    path: '/careplan/view/:id',
    name: 'careplan.view',
    component: () =>
      import('@/views/CarePlan/View/Index.vue'),
    meta: {
      auth: true,
      breadcrumb: [{
        name: 'Care Plan',
        link: 'careplan.index'
      },
      {
        name: 'View'
      }
      ]
    }
  },
  // View Careplan template
  {
    path: '/careplan/view/template/:id',
    name: 'careplan.viewTemplate',
    component: () =>
      import('@/views/CarePlan/Clone/Index.vue'),
    meta: {
      auth: true,
      breadcrumb: [{
        name: 'Care Plan',
        link: 'careplan.index'
      },
      {
        name: 'View'
      }
      ]
    }
  },

  // Patient List
  {
    path: '/patientList',
    name: 'patientList.index',
    component: () =>
      import('@/views/PatientList/Index.vue'),
    meta: {
      auth: true,
      breadcrumb: [{
        name: 'Patients list',
        link: 'patient.index'
      }]
    }
  },

  {
    path: '/patientList/view/:id',
    name: 'patientList.view',
    component: () =>
      import('@/views/PatientList/View/Index.vue'),
    meta: {
      auth: true,
      breadcrumb: [{
        name: 'Patients list',
        link: 'patient.index'
      },
      {
        name: 'View'
      }
      ]
    }
  },
  // Patient Progress
  {
    path: '/patientProgress',
    name: 'patientProgress.index',
    component: () =>
      import('@/views/PatientProgress/Index.vue'),
    meta: {
      auth: true,
      breadcrumb: [{
        name: 'Patient Progress',
        link: 'patientProgress.index'
      }]
    }
  },

  // Users List
  {
    path: '/users',
    name: 'user.index',
    component: () =>
      import('@/views/User/Index.vue'),
    meta: {
      auth: true,
      breadcrumb: [{
        name: 'Users',
        link: 'user.index'
      }]
    }
  },

  // Profile
  {
    path: '/profile',
    name: 'profile.index',
    component: () =>
        import('@/views/Profile/Index.vue'),
    meta: {
      auth: true,
      breadcrumb: [
        { name: 'Profile', link: 'profile.index' }
      ]
    }
  },

  // Patient
  {
    path: '/patient',
    name: 'patient.index',
    component: () =>
        import('@/views/Patient/Index.vue'),
    meta: {
      auth: true,
      breadcrumb: [
        { name: 'Patients', link: 'patient.index' }
      ]
    }
  },

  // User Create
  {
    path: '/userCreate',
    name: 'user.create',
    component: () =>
      import('@/views/User/Create/Index.vue'),
    meta: {
      auth: true,
      breadcrumb: [{
        name: 'Create user',
        link: 'user.create'
      }]
    }
  },

  // Patient Create
  {
    path: '/patientCreate',
    name: 'patient.create',
    component: () =>
      import('@/views/Patient/Create/Index.vue'),
    meta: {
      auth: true,
      breadcrumb: [{
        name: 'Create patient',
        link: 'patient.create'
      }]
    }
  },

  // Rootpage
  {
    path: '/',
    redirect: '/careplan'
  },
  // Default Page
  {
    path: '/*',
    redirect: '/careplan'
  }
];
