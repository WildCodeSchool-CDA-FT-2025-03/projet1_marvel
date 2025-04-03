import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Home';
import Layout from './components/layout/Layout';
import CataloguePage from './pages/Catalogue';
import FavoritePage from './pages/Favorite';
import ItemPage from './pages/Item';
import CreateItemPage from './pages/CreateMedia';
import NotFound from './pages/NotFound';

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
      {
        path: '/create/:type',
        element: <CreateItemPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
