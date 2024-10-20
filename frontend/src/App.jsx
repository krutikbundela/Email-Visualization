import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/protectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/userSlice";
import { useEffect, useState } from "react";
import Share from "./pages/Share";
import Emails from "./pages/Emails";
import Loader from "./components/Loader";
import Profile from "./pages/Profile";

function App() {
  const dispatch = useDispatch();
  const { user, isUserLoading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [isUserFetched, setIsUserFetched] = useState(false);

  useEffect(() => {
    dispatch(loadUser()).finally(() => {
      setIsUserFetched(true);
    });
  }, [dispatch]);

  if (isUserLoading || !isUserFetched) {
    return <Loader />;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Sidebar />,
      children: [
        {
          element: <ProtectedRoute />,
          children: [
            { path: "", element: <Dashboard /> },
            { path: "/share", element: <Share /> },
            { path: "/profile", element: <Profile /> },
          ],
        },
        {
          path: "/signin",
          element: <SignIn />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/emails",
          element: <Emails />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
