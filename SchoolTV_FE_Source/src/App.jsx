import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import WatchHome from "./pages/WatchHome";
import LiveList from "./pages/LiveList";
import ChannelList from "./pages/ChannelList";
import WatchLive from "./pages/WatchLive";
import AllFeaturedVideo from "./pages/featuredVideo/AllFeaturedVideo";
import PlayFeaturedVideo from "./pages/featuredVideo/PlayFeaturedVideo";
import PageLayout from "./components/layout/PageLayout";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import "@fortawesome/fontawesome-free/css/all.min.css";
import UpComingList from "./pages/upcomingList/upcomingList";
import UpComingDetail from "./pages/upcomingDetail/upcomingDetail";
import PricingPage from "./pages/pricing/pricing";
import Checkout from "./pages/payment/payment";

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
      path: "",
      element: <PageLayout />,
      children: [
        {
          path: "upcomingDetail",
          element: <UpComingDetail />,
        },
        {
          path: "pricing",
          element: <PricingPage />,
        },
        {
          path: "checkout",
          element: <Checkout />,
        },
        {
          path: "upcomingList",
          element: <UpComingList />,
        },
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
