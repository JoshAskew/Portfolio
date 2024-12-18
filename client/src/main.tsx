import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from "../src/components/ui/provider.tsx";
import App from './App.tsx';
import LandingPage from './pages/Landing.tsx';
import ErrorPage from './pages/ErrorPage.tsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />
      },
     
    ]
  }
])

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(

    <Provider>
      <RouterProvider router={router} />
    </Provider>

  );
}
