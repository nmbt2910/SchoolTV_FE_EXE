import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AllFeaturedVideo from './pages/featuredVideo/AllFeaturedVideo';
import PlayFeaturedVideo from './pages/featuredVideo/PlayFeaturedVideo';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header /> {/* Include the Header component */}
          <Home />   {/* Include the Home component */}
          <Footer /> {/* Include the Footer component */}
        </>
      ),
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

export default App;
