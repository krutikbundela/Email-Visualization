import { Box, Grid2 as Grid } from "@mui/material";
import "./emails.css";
import EmailListCard from "../components/emails/EmailListCard";
import FilterNav from "../components/emails/FilterNav";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmailBody, fetchEmails, setPage } from "../redux/emailSlice";
import { useEffect } from "react";
import EmailBody from "../components/emails/EmailBody";
import Pagination from "@mui/material/Pagination";
import Loader from "../components/Loader";

const Emails = () => {

     const dispatch = useDispatch();

     const {
       emails,
       selectedEmailId,
       filters,
       reads = [], favorites = [],
       isLoading,
       currentPage,
       totalPages,
     } = useSelector((state) => state.emails);

     const { read, unread, favorite } = filters;

     useEffect(() => {
       if (currentPage) {
         dispatch(fetchEmails(currentPage));
       }
       if (selectedEmailId) {
         dispatch(fetchEmailBody(selectedEmailId));
       }
     }, [dispatch, currentPage, selectedEmailId]);

     const handlePageChange = (event, value) => {
       dispatch(setPage(value));
     };

     const filteredEmails = Array.isArray(emails) // Check if emails is an array
       ? emails.filter((email) => {
           if (filters.unread) {
             return !reads.includes(email.id);
           } else if (filters.read) {
             return reads.includes(email.id);
           } else if (filters.favorite) {
             return favorites.includes(email.id);
           }
           return true;
         })
       : []; 
  return (
    <>
      <Box>
        <FilterNav />
        {isLoading === true && filteredEmails.length <= 0 ? (
          <Loader />
        ) : (
          <Grid container spacing={0}>
            <Grid size={selectedEmailId === "" ? 12 : 4}>
              <section
                className={`email-list  ${
                  selectedEmailId === "" ? "" : "scroll-effect"
                } `}
              >
                {filteredEmails.map((email) => (
                  <EmailListCard key={email.id} email={email} />
                ))}
                {read === false && unread === false && favorite === false && (
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                  />
                )}
              </section>
            </Grid>
            {selectedEmailId !== "" && (
              <Grid size={8}>
                <section className="email">
                  <EmailBody />
                </section>
              </Grid>
            )}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default Emails;
