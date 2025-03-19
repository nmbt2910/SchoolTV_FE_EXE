import { React, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/BusinessHome/Home";
import WatchHome from "./pages/WatchHome/WatchHome";
import LiveList from "./pages/LiveList/LiveList";
import ChannelList from "./pages/ChannelList/ChannelList";
import WatchLive from "./pages/WatchLive/WatchLive";
import AllFeaturedVideo from "./pages/featuredVideo/AllFeaturedVideo";
import PlayFeaturedVideo from "./pages/featuredVideo/PlayFeaturedVideo";
import UserProfile from "./pages/UserProfile/UserProfile";
import PageLayout from "./components/layout/PageLayout";
import SchoolChannelStudio from "./pages/school-channel/SchoolChannelStudio";
import StudioVideo from "./components/schooltv-studio/functions/up-video/StudioVideo";
import StudioLiveStream from "./components/schooltv-studio/functions/live-stream/StudioLiveStream";
import UpComingList from "./pages/upcomingList/upcomingList";
import UpComingDetail from "./pages/upcomingDetail/upcomingDetail";
import ForgottenPassword from "./pages/forgottenPassword/forgottenPassword";
import StatisticsPage from "./pages/StatisticsPage/StatisticsPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import "@fortawesome/fontawesome-free/css/all.min.css";
import CommunityPost from "./pages/CommunityPost/CommunityPost";
import SchoolLogin from "./pages/SchoolLogin/SchoolLogin";
import SchoolRegister from "./pages/SchoolRegister/SchoolRegister";
import StudioPost from "./components/schooltv-studio/functions/post/StudioPost";

const ScrollToTopWrapper = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: (
        <ThemeProvider>
          <ScrollToTopWrapper />
          <Login />
        </ThemeProvider>
      ),
    },
    {
      path: "/register",
      element: (
        <ThemeProvider>
          <ScrollToTopWrapper />
          <Register />
        </ThemeProvider>
      ),
    },
    {
      path: "/school-register",
      element: (
        <ThemeProvider>
          <ScrollToTopWrapper />
          <SchoolRegister />
        </ThemeProvider>
      ),
    },
    {
      path: "/school-login",
      element: (
        <ThemeProvider>
          <ScrollToTopWrapper />
          <SchoolLogin />
        </ThemeProvider>
      ),
    },
    {
      path: "/forgottenPassword",
      element: (
        <ThemeProvider>
          <ScrollToTopWrapper />
          <ForgottenPassword />
        </ThemeProvider>
      ),
    },
    {
      path: "school-studio",
      element: (
        <ThemeProvider>
          <ScrollToTopWrapper />
          <SchoolChannelStudio />
        </ThemeProvider>
      ),
      children: [
        {
          index: true, // ✅ Route mặc định khi vào /school-studio
          element: <StatisticsPage />,
        },
        {
          path: "statistics",
          element: <StatisticsPage />,
        },
        {
          path: "post",
          element: <StudioPost />,
        },
        {
          path: "video",
          element: <StudioVideo />,
        },
        {
          path: "live-stream",
          element: <StudioLiveStream />,
        },
      ],
    },
    {
      path: "",
      element: (
        <ThemeProvider>
          <ScrollToTopWrapper />
          <PageLayout />
        </ThemeProvider>
      ),
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
        {
          path: "/businessHome",
          element: <Home />,
        },
        {
          path: "/userProfile",
          element: <UserProfile />,
        },
        {
          path: "/upcomingList",
          element: <UpComingList />,
        },
        {
          path: "/upcomingDetail",
          element: <UpComingDetail />,
        },
        {
          path: "/communityPost",
          element: <CommunityPost />,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
