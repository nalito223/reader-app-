import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
// @ts-ignore
import MenuIcon from '@mui/icons-material/Menu';
// @ts-ignore
import SearchIcon from '@mui/icons-material/Search';
import Drawer from "./Drawer"
// import { SettingsInputAntennaTwoTone } from '@mui/icons-material';
import { Link } from "react-router-dom"
import { useState } from "react"
// import { SettingsInputAntennaTwoTone } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";


// let status = true

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

// interface SearchAppBarProps {
//   drawerOpenToggle: () => void;
// }

// const drawerOpenToggle = () => {
//   status = !status
//   console.log("drawerOpen", status)
// } 

export default function SearchAppBar(props: any): JSX.Element {

  const [status, setStatus] = useState(false);
  const navigate = useNavigate()

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setSearchInput(event.target.value);
    if (event.target.value !== "") {
      navigate("/");
    }
  };
  return (
    <>
      <Box
        // sx={{ flexGrow: 1 }}
        sx={{
          // backgroundColor: "red",
          flexGrow: 1
        }}
      >
        <AppBar position="static" className="navbar"
          sx={{
            backgroundColor: "RGB(0, 31, 63)",
          }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              // sx={{ mr: 2 }}
              onClick={() => setStatus(true)}
            // onClick={() => drawerOpenToggle()}

            >
              {/* <MenuIcon /> */}
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: 'none', sm: 'block' },
                fontFamily: "'Lora', serif",
                textTransform: "uppercase",
                letterSpacing: "1px"
              }}

            >
              <Link to="/">
                <b>NYT Reader</b>
              </Link>

            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search???"
                inputProps={{ 'aria-label': 'search' }}
                value={props.searchInput}
                onChange={handleSearchInput}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
      {/* <Drawer status={status} setStatus={setStatus}/> */}
    </>
  );
}

