import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home/Home";
import Navbar from "../components/Navbar/Navbar";
import AddNotes from "../pages/addnotes/AddNotes";
import AllNotes from "../pages/allnotes/AllNotes";
import  Signup  from "../pages/signup/Signup";
import  Login  from "../pages/login/Login";
import PrivateRoute from "./privateRoute/PrivateRoute";
import PublicRoute from "./publicRoute/PublicRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Navbar />
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: "/addnote",
    element: (
      <PrivateRoute>
        <Navbar />
        <AddNotes />
      </PrivateRoute>
    ),
  },
  {
    path: "/allnotes",
    element: (
      <PrivateRoute>
        <Navbar />
        <AllNotes />
      </PrivateRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <Navbar />
        <Signup />
      </PublicRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Navbar />
        <Login />
      </PublicRoute>
    ),
  },
]);


export default function Routing(params) {
  return <RouterProvider router={router} />;
}
