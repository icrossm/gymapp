import { withNavigationWatcher } from './contexts/navigation';
import { HomePage, TasksPage, ProfilePage, CustomerPage, ServicesPage, TrainersPage, ProductsPage, CustomerExpensePage, CustomerPaymentPage, GroupsPage, CustomerDebitPage, CustomerTrackPage, CustomerRatingPage, AppointmentsPage, AppByTrainersPage, AppByGroupPage, AppAnalysisPage } from './pages';

const routes = [
  {
    path: '/tasks',
    component: TasksPage
  },
  {
    path: '/profile',
    component: ProfilePage
  },
  {
    path: '/home',
    component: HomePage
  },
  {
    path: '/customer',
    component: CustomerPage
  }, 
  {
    path: '/services',
    component: ServicesPage
  }, 
  {
    path: '/trainers',
    component: TrainersPage
  }, 
  {
    path: '/products',
    component: ProductsPage
  }, 
  {
    path: '/customer-expense',
    component: CustomerExpensePage
  }, 
  {
    path: '/customer-payment',
    component: CustomerPaymentPage
  }, 
  {
    path: '/groups',
    component: GroupsPage
  }, 
  {
    path: '/customer-debit',
    component: CustomerDebitPage
  }, 
  {
    path: '/customer-track',
    component: CustomerTrackPage
  }, 
  {
    path: '/customer-rating',
    component: CustomerRatingPage
  }, 
  {
    path: '/appointments',
    component: AppointmentsPage
  }, 
  {
    path: '/app-by-trainers',
    component: AppByTrainersPage
  }, 
  {
    path: '/app-by-group',
    component: AppByGroupPage
  }, 
  {
    path: '/app-analysis',
    component: AppAnalysisPage
  }
];

export default routes.map(route => {
  return {
    ...route,
    component: withNavigationWatcher(route.component)
  };
});
