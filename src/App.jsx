import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AppLayout from "./layouts/app-layout";
import ProtectedRoute from "./components/protected-route";
import { ThemeProvider } from "./components/theme-provider";

import LandingPage from "./pages/HomePageComponents/landing";
import Onboarding from "./pages/onboarding";
import PostJob from "./pages/post-job";
import JobListing from "./pages/jobListing";
import MyJobs from "./pages/my-jobs";
import SavedJobs from "./pages/saved-jobs";
import JobPage from "./pages/job";
import Contact from "./pages/contact";
import TermAndCondition from "./pages/TermAndCondition";

import "./App.css";
import Main from "./pages/Main";
import AdminGate from "./pages/Adminpanel/AdminGate";
// import AdminHomepage from "./pages/Adminpanel/AdminHomepage";
import Alljobs from "./pages/Adminpanel/Alljobs";
import AdminAppLayout from "./pages/Adminpanel/AdminAppLayout";
import AllUsers from "./pages/Adminpanel/AllUsers";

import { Navigate } from "react-router-dom";
import EditJob from "./components/EditJob";
import AdminJobEdit from "./pages/Adminpanel/AdminJobEdit";

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
          // <ProtectedRoute>
            <JobListing />
          // </ProtectedRoute>
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