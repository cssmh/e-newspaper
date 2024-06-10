import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import Home from '../pages/Main/Home'
import SignUp from '../pages/Main/SignUp'
import Login from '../pages/Main/Login'
import AddArticle from '../pages/Main/AddArticle'
import PrivateRoutes from './PrivateRoutes'
import DashboardLayout from '../layout/DashboardLayout'
import Dashboard from '../pages/Dashboard/Dashboard'
import AdminRoutes from './AdminRoutes'
import Users from '../pages/Dashboard/Users'
import AddPublisher from '../pages/Dashboard/AddPublisher'
import AllArticles from '../pages/Dashboard/AllArticles'
import AllArticlePage from '../pages/Main/AllArticlePage'
import MyArticle from '../pages/Main/MyArticle'
import ArticleDetails from '../pages/Main/ArticleDetails'
import { getArticle } from '../api/Article'
import UpdateArticle from '../pages/Main/UpdateArticle'
import Subcription from '../pages/Main/Subcription'
import PremiumArticle from '../pages/Main/PremiumArticle'
import MyProfile from '../pages/Main/MyProfile'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/add-article',
        element: <AddArticle />,
      },
      {
        path: '/all-article',
        element: <AllArticlePage />,
      },
      {
        path: '/article/:id',
        element: <ArticleDetails />,
        loader: ({ params }) => getArticle(params.id),
      },
      {
        path: '/update-article/:id',
        element: <UpdateArticle />,
        loader: ({ params }) => getArticle(params.id),
      },
      {
        path: '/my-article',
        element: <MyArticle />,
      },
      {
        path: '/my-profile',
        element: <MyProfile />,
      },
      {
        path: '/premium-article',
        element: <PremiumArticle />,
      },
      {
        path: '/subcription',
        element: <Subcription />,
      },
    ],
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        path: '/dashboard',
        element: (
          <PrivateRoutes>
            <Dashboard />
          </PrivateRoutes>
        ),
      },
      {
        path: '/dashboard/users',
        element: (
          <PrivateRoutes>
            <Users />
          </PrivateRoutes>
        ),
      },
      {
        path: '/dashboard/allarticle',
        element: (
          <PrivateRoutes>
            <AllArticles />
          </PrivateRoutes>
        ),
      },
      {
        path: '/dashboard/add-publisher',
        element: (
          <PrivateRoutes>
            <AdminRoutes>
              <AddPublisher />
            </AdminRoutes>
          </PrivateRoutes>
        ),
      },
    ],
  },
])

export default router
