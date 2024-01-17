export const sidebarLinks: any = [
  {
    route: '/dashboard',
    label: 'Dashboard',
    children: null,
  },
  {
    route: '/data-exploration',
    label: 'Data Exploration',
    children: [
      {
        route: '/make-model-model-year',
        label: 'Make-Model-Model-Year',
      },
      {
        route: '/dealer',
        label: 'Dealer',
      },
      {
        route: '/claims',
        label: 'Claims',
      },
    ],
  },
  {
    route: '/safety-analytics-360',
    label: 'Safety Analytics 360°',
    children: null,
  },
  {
    route: '/competative-analysis',
    label: 'Competative Analysis',
    children: null,
  },
  {
    route: '/insights',
    label: 'Insights',
    children: [
      {
        route: '/safety-violation-predtions',
        label: 'Safety Violation Predictions',
      },
      {
        route: '/recommendations',
        label: 'Recommendations',
      },
    ],
  },
  {
    route: '/configuration',
    label: 'Configuration',
    children: [
      {
        route: '/data-source',
        label: 'Data Source',
      },
      {
        route: '/connections',
        label: 'Connections',
      },
      {
        route: '/user-management',
        label: 'User Management',
      },
      {
        route: '/make',
        label: 'Make',
      },
    ],
  },
  {
    route: '/mannual-data-upload',
    label: 'Mannual Data Upload',
    children: null,
  },
  {
    route: '/custom-fields',
    label: 'Custom Fields',
    children: null,
  },
];
