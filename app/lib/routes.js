Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

Router.route('/', {
  name: 'TechList',
  controller: 'TechListController',
  action: 'action',
  where: 'client'
});