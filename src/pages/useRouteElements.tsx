import RegisterLayout from '../layouts/RegisterLayout'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Login from './Login'
import ProductList from './ProductList'
import Register from './Register'
import LoginLayout from 'src/layouts/LoginLayout'
import MainLayout from 'src/layouts/MainLayout'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import path from 'src/constants/path'

function ProtectedRoute() {
  const {isAuthenticated} = useContext(AppContext); 
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
function RejectedRoute() {
  const {isAuthenticated} = useContext(AppContext); 
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/profile',
          element: (
            <MainLayout>
              <ProductList />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <LoginLayout>
              <Login />
            </LoginLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    }
  ])
  return routeElements
}
