import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import AppLayout from "./layouts/app-layout";
import "./App.css";
import Main from "./pages/Main";

import ProtectedRoute from "./components/protected-route";
import Onboarding from "./pages/onboarding";
import PostJob from "./pages/post-job";
import JobListing from "./pages/jobListing";
import MyJobs from "./pages/my-jobs";
import SavedJobs from "./pages/saved-jobs";
import JobPage from "./pages/job";
import Contact from "./pages/contact";
import TermAndCondition from "./pages/TermAndCondition";

import AdminGate from "./pages/Adminpanel/AdminGate";
import Alljobs from "./pages/Adminpanel/Alljobs";
import AdminAppLayout from "./pages/Adminpanel/AdminAppLayout";
import AllUsers from "./pages/Adminpanel/AllUsers";
import { Navigate } from "react-router-dom";
import EditJob from "./components/EditJob";
// import AdminJobEdit from "./pages/Adminpanel/AdminJobEdit";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/onboarding",
        element: (
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        ),
      },
      {
        path: "/jobs",
        element: (
            <JobListing />
        ),
      },
      {
        path: "/post-job",
        element: (
          <ProtectedRoute>
            <PostJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <ProtectedRoute>
            <MyJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/saved-jobs",
        element: (
          <ProtectedRoute>
            <SavedJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/job/:id",
        element: (
          <ProtectedRoute>
            <JobPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contact",
        element: (
            <Contact/>
        ),
      },
      {
        path: "/terms-conditions",
        element: (
            <TermAndCondition/>
        ),
      },
       {
        path: "/edit-job/:id",
        element: (
            <EditJob/>
        ),
      },
      // {
      //   path: "/admin-edit-job/:id",
      //   element: <AdminJobEdit/>,
      // },
      {
        path: "/admin-portal",
        element: (
            <AdminGate>
              {/* <AdminAppLayout/> */}
              <Navigate to="/adminportal-all-jobs" replace />
            </AdminGate>
        ),
      },
    ],
  },

  {
    element: <><AdminGate><AdminAppLayout/></AdminGate></>,
    children: [
      {
        path: "/adminportal-all-jobs",
        element: (
              <Alljobs/>
        ),
      },
      {
        path: "/adminportal-all-users",
        element: (
              <AllUsers/>
        ),
      }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;









