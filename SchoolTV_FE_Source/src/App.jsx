import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllFeaturedVideo from "./pages/featuredVideo/AllFeaturedVideo";
import PlayFeaturedVideo from "./pages/featuredVideo/PlayFeaturedVideo";
import PageLayout from "./components/layout/PageLayout";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Login from './pages/login/login';
import Register from './pages/register/register';
import SchoolChannelStudio from "./pages/school-channel/SchoolChannelStudio";


function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <PageLayout />,
      children: [
        {
          path: "featured-video",
          element: <AllFeaturedVideo />,
        },

        {
          path: "play-featured-video",
          element: <PlayFeaturedVideo />,
        },
      ],
    },
    {
      path: "/login", 
      element: (
        <>
          <Login />
        </>
      ),
    },
    {
      path: "/register", 
      element: (
        <>
          <Register />
        </>
      ),
    },

    {
      path: "school-studio",
      element: <SchoolChannelStudio />,
      // children: [
      //   {
      //     path: "post",
      //     path: <SchoolChannelStudio />
      //   }
      // ]
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
