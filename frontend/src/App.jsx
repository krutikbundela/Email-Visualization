import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/protectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, clearErrors } from "./redux/userSlice";
import { useEffect, useState } from "react";
import Share from "./pages/Share";
import Emails from "./pages/Emails";
import Loader from "./components/Loader";
import Profile from "./pages/Profile";
import { Alert, Box } from "@mui/material";

function App() {
  const dispatch = useDispatch();
  const { user, isUserLoading, isUserError } = useSelector(
    (state) => state.user
  );

  const [isUserFetched, setIsUserFetched] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [exitAlert, setExitAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    dispatch(loadUser())
      .then(() => {
        setIsUserFetched(true);
      })
      .catch((err) => {
        console.log("dispatch ~ err:", err);
      });
  }, [dispatch]);

  useEffect(() => {
    if (isUserError) {
      setErrorMsg(isUserError);
      setAlertVisible(true);
      setExitAlert(false);
      const timer = setTimeout(() => {
        setExitAlert(true);
        setTimeout(() => {
          setAlertVisible(false);
          dispatch(clearErrors());
        }, 300);
      }, 5000);

      return () => clearTimeout(timer);
    } 
  }, [isUserError, dispatch]);

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
      {alertVisible && (
        <Box
          className={`alert-container ${
            exitAlert ? "alert-container-exit" : ""
          }`}
          sx={{
            position: "fixed",
            bottom: "20px",
            left: "20px",
            zIndex: 5,
            width: { sm: "80%", xs: "80%", md: "30%", xl: "30%" },
          }}
        >
          {errorMsg && (
            <Alert
              variant="filled"
              sx={{ fontSize: "16px", letterSpacing: "1px" }}
              severity="error"
            >
              {errorMsg}
            </Alert>
          )}
        </Box>
      )}
    </>
  );
}

export default App;
