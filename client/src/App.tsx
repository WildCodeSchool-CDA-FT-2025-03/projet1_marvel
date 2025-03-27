import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Home';
import Layout from './components/layout/Layout';
import CataloguePage from './pages/Catalogue';
import FavoritePage from './pages/Favorite';
import ItemPage from './pages/Item';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/catalogue',
        element: <CataloguePage />,
      },
      {
        path: '/favorite',
        element: <FavoritePage />,
      },
      {
        path: '/item/:id',
        element: <ItemPage />,
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
