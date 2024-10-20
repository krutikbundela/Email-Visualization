import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/emailSlice";

const FilterNav = () => {
  const dispatch = useDispatch();

  const {filters} = useSelector((state) => state.emails);

  const {read , unread , favorite} = filters;

  const handleFilters = (filter) =>{
   switch (filter) {
     case "unread":
       dispatch(
         setFilter({
           unread: !unread, 
           read: false,
           favorite: false,
         })
       );
       break;
     case "read":
       dispatch(
         setFilter({
           unread: false,
           read: !read,
           favorite: false,
         })
       );
       break;
     case "favorite":
       dispatch(
         setFilter({
           unread: false,
           read: false,
           favorite: !favorite,
         })
       );
       break;
     default:
       break;
   }
  }

  return (
    <>
      <nav className="align-left">
        <p>Filter By:</p>
        <p
          className={`filter-links ${unread ? "active" : ""}`}
          onClick={() => handleFilters("unread")}
        >
          Unread
        </p>
        <p
          className={`filter-links ${read ? "active" : ""}`}
          onClick={() => handleFilters("read")}
        >
          Read
        </p>
        <p
          className={`filter-links ${favorite ? "active" : ""}`}
          onClick={() => handleFilters("favorite")}
        >
          Favorites
        </p>
      </nav>
    </>
  );
};

export default FilterNav;
