import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage.tsx'
import { Home } from './pages/Home.tsx'
import { Beach } from './pages/Beach.tsx'
import { Grassland } from './pages/Grassland.tsx'
import { Party } from './pages/Party.tsx'
import { Pokecenter } from './pages/Pokecenter.tsx'
import { Cave } from './pages/Cave.tsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      }, 
      {
        path: '/cave',
        element: <Cave />
      },
      {
        path: '/beach',
        element: <Beach />
      },
      {
        path: '/grass',
        element: <Grassland />
      },
      {
        path: '/party',
        element: <Party />
      },
      {
        path: '/pokecenter',
        element: <Pokecenter />
      }
    ]
  }
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
