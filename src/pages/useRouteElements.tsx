import RegisterLayout from '../layouts/RegisterLayout'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Login from './Login'
import ProductList from './ProductList'
import Register from './Register'
import LoginLayout from 'src/layouts/LoginLayout'
import MainLayout from 'src/layouts/MainLayout'
import { Suspense, useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import path from 'src/constants/path'
import ProductDetail from './ProductDetail/ProductDetail'
import Cart from './Cart'
import Profile from './User/pages/Profile'
import ChangePassword from './User/pages/ChangePassword'
import HistoryPurchase from './User/pages/HistoryPurchase'
import UserLayout from './User/layouts/UserLayout'
import CartLayout from 'src/layouts/CartLayout'

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
          path: path.user,
          element: <MainLayout />,
          children: [
            {
              path: '',
              element: <UserLayout />,
              children: [
                {
                  path: path.profile,
                  element: (
                    <Suspense>
                      <Profile />
                    </Suspense>
                  )
                },
                {
                  path: path.changePassword,
                  element: (
                    <Suspense>
                      <ChangePassword />
                    </Suspense>
                  )
                },
                {
                  path: path.historyPurchase,
                  element: (
                    <Suspense>
                      <HistoryPurchase />
                    </Suspense>
                  )
                }
              ]
            }
          ]
        },
        {
          path: '/cart',
          element: (
            <CartLayout>
              <Suspense>
                <Cart />
              </Suspense>
            </CartLayout>
          )
        }
      ]
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
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
