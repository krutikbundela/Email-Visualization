import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmailBody,
  fetchEmails,
  toggleFavorite,
} from "../../redux/emailSlice";

const EmailBody = () => {
  const { favorites, selectedEmailId, emailBody } =
    useSelector((state) => state.emails);
  const cleanBody = emailBody.body?.replace(/<\/?div>/g, "").trim() || "";

  const emailContent = useSelector((state) =>
    state.emails.emails.find((e) => e.id === selectedEmailId)
  );
  const dispatch = useDispatch();

  const handleFavorite = () => {
    dispatch(toggleFavorite(selectedEmailId));
  };

  useEffect(() => {
    dispatch(fetchEmails());
  }, [dispatch]);

  useEffect(() => {
    if (selectedEmailId) {
      dispatch(fetchEmailBody(selectedEmailId));
    }
  }, [selectedEmailId, dispatch]);
  return (
    <>
      <article>
        <header>
          <Box sx={{ display: "flex", height: "100%" }}>
            <Box
              className="align-center"
              sx={{
                borderRadius: "50%",
                width: "45px",
                height: "45px",
                backgroundColor: "#e54065",
              }}
            >
              <Typography variant="body1" color="white">
                {emailContent.from.name[0]}
              </Typography>
            </Box>

            <Box
              sx={{
                ml: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",
                alignContent: "flex-start",
                height: "100%",
              }}
            >
              <p className="subject">{emailContent.subject}</p>
              <p className="date-time">
                {" "}
                {new Date(emailContent.date).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
            </Box>
          </Box>

          <button className="favorite-button" onClick={() => handleFavorite()}>
            {favorites.includes(selectedEmailId)
              ? "Remove from Favorites"
              : "Mark as Favorite"}
          </button>
        </header>

        <section
          className="email-body"
          dangerouslySetInnerHTML={{ __html: cleanBody }}
        ></section>
      </article>
    </>
  );
};

export default EmailBody;
