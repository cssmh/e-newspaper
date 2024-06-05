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

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/add-article',
        element: <AddArticle></AddArticle>,
      },
      {
        path: '/all-article',
        element: <AllArticlePage></AllArticlePage>,
      },
      {
        path: '/article/:id',
        element: <ArticleDetails></ArticleDetails>,
        loader: ({ params }) => getArticle(params.id),
      },
      {
        path: '/update-article/:id',
        element: <UpdateArticle></UpdateArticle>,
        loader: ({ params }) => getArticle(params.id),
      },
      {
        path: '/my-article',
        element: <MyArticle></MyArticle>,
      },
      {
        path: '/subcription',
        element: <Subcription></Subcription>,
      },
    ],
  },
  {
    path: '/signup',
    element: <SignUp></SignUp>,
  },
  {
    path: '/login',
    element: <Login></Login>,
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoutes>
        <DashboardLayout></DashboardLayout>
      </PrivateRoutes>
    ),
    children: [
      {
        path: '/dashboard',
        element: (
          <PrivateRoutes>
            <Dashboard></Dashboard>
          </PrivateRoutes>
        ),
      },
      {
        path: 'users',
        element: (
          <PrivateRoutes>
            <Users></Users>
          </PrivateRoutes>
        ),
      },
      {
        path: 'allarticle',
        element: (
          <PrivateRoutes>
            <AllArticles></AllArticles>
          </PrivateRoutes>
        ),
      },
      {
        path: 'add-publisher',
        element: (
          <PrivateRoutes>
            <AdminRoutes>
              <AddPublisher></AddPublisher>
            </AdminRoutes>
          </PrivateRoutes>
        ),
      },
    ],
  },
])

export default router
