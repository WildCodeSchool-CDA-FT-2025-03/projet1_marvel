import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div className="text-4xl font-bold">Hello wild world !</div>,
  },
]);

const App = () =>  <RouterProvider router={router} />

export default App;