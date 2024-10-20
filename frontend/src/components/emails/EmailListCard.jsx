import { Box, Typography } from "@mui/material";
import {
  clearSelectedEmail,
  markAsRead,
  selectEmail,
} from "../../redux/emailSlice";
import { useDispatch, useSelector } from "react-redux";

const EmailListCard = ({ email }) => {
  const { id, from, date, subject, short_description } = email;
  const dispatch = useDispatch();

  const { selectedEmailId, reads = [], favorites = [] } = useSelector(
    (state) => state.emails
  );

  const isRead = reads.includes(id);

  const handleOpenEmail = (id) => {
    if (selectedEmailId === id) {
      dispatch(clearSelectedEmail());
    } else {
      dispatch(selectEmail(id));
    }
  };

  return (
    <>
      <Box
        className={`email-list-card ${
          selectedEmailId === id ? "selected-border" : ""
        } ${isRead ? "read-bgcolor" : ""}`}
        sx={{
          mt: 3,
          cursor: "pointer",
        }}
        onClick={() => {
          handleOpenEmail(id);
          if (!reads.includes(id)) {
            dispatch(markAsRead(id));
          }
        }}
      >
        <Box
          sx={{
            height: "100%",
            mr: 2,
            ml:2,
          }}
        >
          <Box
            className="align-center"
            sx={{
              borderRadius: "50%",
              width: "45px",
              height: "45px",
              backgroundColor: "#e54065",
              //   mr: 5,
            }}
          >
            <Typography variant="body1" sx={{color:"white"}}>{from.name[0]}</Typography>
          </Box>
        </Box>

        <Box className="email-list-card-content">
          <Box
            sx={{
              display: "flex",
              mt: 1,
              flexWrap: "wrap",
            }}
          >
            <span className="text-gray">From:</span>
            <p className="text-gray-bold">
              {from.name} <span>{`<${from.email}>`}</span>
            </p>
          </Box>
          <Box sx={{ display: "flex", mt: 1 }}>
            <span className="text-gray">Subject:</span>
            <p className="text-gray-bold">{subject}</p>
          </Box>

          <p
            style={{
              marginTop: "10px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "100%",
            }}
          >
            {short_description}
          </p>
          <Box sx={{ display: "flex", mt: 1 }}>
            <p className="text-gray">
              {" "}
              {new Date(date).toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
            {favorites.includes(id) && <p className="favorite">Favorite</p>}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default EmailListCard;
