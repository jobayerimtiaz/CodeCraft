import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/student/Home";
import Instructor from "../pages/Instructor/Instructor";
import Dashboard from "../pages/Instructor/Dashboard";
import AddCourse from "../pages/Instructor/AddCourse";
import MyEnrollments from "../pages/student/MyEnrollments";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <h2>Error routes</h2>,
    element: <Home></Home>,
    children: [
      {
        path: "my-enrollments",
        element: <MyEnrollments></MyEnrollments>,
      },
    ],
  },
  {
    path: "/instructor",
    element: <Instructor></Instructor>,
    children: [
      {
        path: "dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "add-course",
        element: <AddCourse></AddCourse>,
      },
    ],
  },
]);

export default router;
