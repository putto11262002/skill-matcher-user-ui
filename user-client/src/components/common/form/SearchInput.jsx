import { Paper, Box
, InputBase
, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from "react";
const SearchInput = ({ onChange }) => {
  const [value, setValue] = useState('');
    return (
      <Paper>
        <Box sx={{ display: "flex", paddingX: 2, paddingY: 1 }}>
          <InputBase
          value={value}
            sx={{ flexGrow: 1 }}
            placeholder="Search by name, username"
            onChange={(e) => {
              setValue(e.target.value);
              onChange(e.target.value)
            }}
          />
          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            
             {value.length > 0 ? <IconButton onClick={() => setValue('')}><ClearIcon/></IconButton> : <IconButton> <SearchIcon sx={{color:  theme => theme.palette.primary.main}} /></IconButton>}
            
          </Box>
        </Box>
      </Paper>
    );
  };

  export default SearchInput