import { Paper, Box
, InputBase
, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
const SearchInput = ({ onChange }) => {
    return (
      <Paper>
        <Box sx={{ display: "flex", paddingX: 2, paddingY: 1 }}>
          <InputBase
            sx={{ flexGrow: 1 }}
            placeholder="Search by name, username"
            onChange={(e) => onChange(e.target.value)}
          />
          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton  type="submit">
              <SearchIcon sx={{color:  theme => theme.palette.primary.main}} />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    );
  };

  export default SearchInput