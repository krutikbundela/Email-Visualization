import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { loadPreferences, setPreferences } from "../redux/preferenceSlice";
import Loader from "../components/Loader";

const Share = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const ageGroup = searchParams.get("ageGroup");
    const gender = searchParams.get("gender");

    if (startDate && endDate && ageGroup && gender) {
      dispatch(setPreferences({ startDate, endDate, ageGroup, gender }));
      dispatch(loadPreferences());
      navigate("/");
    }
  }, [location.search, dispatch, navigate]);
  return (
    <>
      <Loader />
    </>
  );
};

export default Share;
