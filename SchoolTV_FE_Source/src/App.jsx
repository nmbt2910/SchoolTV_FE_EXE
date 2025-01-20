import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllFeaturedVideo from "./pages/featuredVideo/AllFeaturedVideo";
import PlayFeaturedVideo from "./pages/featuredVideo/PlayFeaturedVideo";
import Layout from "./components/layout/PageLayout";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
