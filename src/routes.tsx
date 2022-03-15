import { useRoutes } from 'react-router-dom';
import { AppPage, DashboardPage } from './pages';

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardPage />
    },
    {
      path: '/',
      element: <AppPage />
    }
  ]);
}
