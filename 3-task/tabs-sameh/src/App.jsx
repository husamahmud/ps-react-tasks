import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import HtmlPage from './pages/HtmlPage';
import CssPage from './pages/CssPage';
import JsPage from './pages/JsPage';
import Error from './pages/Error';
import LayOut from './pages/LayOut';

function App() {
  const router = createBrowserRouter([
    {
      element: <LayOut />,
      errorElement: <Error />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/html',
          element: <HtmlPage />,
        },
        {
          path: '/css',
          element: <CssPage />,
        },
        {
          path: '/js',
          element: <JsPage />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
