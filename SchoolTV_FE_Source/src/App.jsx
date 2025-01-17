import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import WatchHome from './pages/WatchHome';
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
      path: "/watchHome",
      element: (
        <>
          <Header /> {/* Include the Header component */}
          <WatchHome />   {/* Include the Home component */}
          <Footer /> {/* Include the Footer component */}
        </>
      ),
    },
  ]);
  

  return <RouterProvider router={router} />;
}

export default App;
