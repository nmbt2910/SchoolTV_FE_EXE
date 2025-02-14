import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllFeaturedVideo from "./pages/featuredVideo/AllFeaturedVideo";
import PlayFeaturedVideo from "./pages/featuredVideo/PlayFeaturedVideo";
import PageLayout from "./components/layout/PageLayout";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Login from './pages/login/login';
import Register from './pages/register/register';
import SchoolChannelStudio from "./pages/school-channel/SchoolChannelStudio";
import StudioPost from "./components/schooltv-studio/functions/StudioPost";
import StudioVideo from "./components/schooltv-studio/functions/StudioVideo";
import StudioLiveStream from "./components/schooltv-studio/functions/StudioLiveStream";
import WatchHome from "./pages/WatchHome";
import LiveList from "./pages/LiveList";
import ChannelList from "./pages/ChannelList";
import WatchLive from "./pages/WatchLive";


function App() {
  const router = createBrowserRouter([
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
      children: [
        {
          path: "post",
          element: <StudioPost />
        },

        {
          path: "video",
          element: <StudioVideo />
        },

        {
          path: "live-stream",
          element: <StudioLiveStream />
        }
      ]
    },

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

        {
          path: "/watchLive",
          element: <WatchLive />,
        },

        {
          path: "/",
          element: <WatchHome />,
        },
        {
          path: "/watchHome",
          element: <WatchHome />,
        },
        {
          path: "/liveList",
          element: <LiveList />,
        },
        {
          path: "/channelList",
          element: <ChannelList />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
