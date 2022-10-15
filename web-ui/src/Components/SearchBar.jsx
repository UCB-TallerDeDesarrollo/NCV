
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

function SearchBar({setSearchQuery}){
    return (
        <form>
        <TextField
            id="search-bar"
            className="text"
            onInput={(e) => {
            setSearchQuery(e.target.value);
            }}
            label="Enter a city name"
            variant="outlined"
            placeholder="Search..."
            size="small"
        />
        <IconButton type="submit" aria-label="search">
            <SearchIcon style={{ fill: "blue" }} />
        </IconButton>
        </form>
    );

    }

export default SearchBar