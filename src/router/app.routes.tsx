import { AdminPage } from "@/admin/pages/AdminPage";
import { AdminLayout } from "@/admin/pages/layouts/AdminLayout";
import { HeroesLayout } from "@/heroes/layouts/HeroesLayout";
import { HeroPage } from "@/heroes/pages/hero/HeroPage";
import { HomePage } from "@/heroes/pages/home/HomePage";
import { lazy } from "react";
import { createHashRouter, Navigate } from "react-router";

const SearchPage = lazy(() => import('@/heroes/pages/search/SearchPage'))

// export const appRouter = createBrowserRouter([
export const appRouter = createHashRouter([
  {
    path: '/',
    element: <HeroesLayout />,
    children: [
      {
        path: '',
        element: <HomePage />
      },
      {
        path: 'heroes/:slugId',
        element: <HeroPage />
      },
      {
        path: 'search',
        element: <SearchPage />
      },
      {
        path: '*',
        element: <Navigate to="/" />
      }
    ]
  },
  {
    path: 'admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminPage />,
      }
    ]
  },
])