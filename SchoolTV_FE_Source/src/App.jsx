import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AllFeaturedVideo from './pages/featuredVideo/AllFeaturedVideo';
import PlayFeaturedVideo from './pages/featuredVideo/PlayFeaturedVideo';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Trang chủ</div>,
    },

    {
      path: "featured-video",
      element: <AllFeaturedVideo />,
    },

    {
      path: "play-featured-video",
      element: <PlayFeaturedVideo />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App
