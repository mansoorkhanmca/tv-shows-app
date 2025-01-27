import React from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';

import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import MovieCard from './components/MovieCard.tsx';
import Grid from '@mui/material/Grid';
import axios from "axios";
import './App.css';

const pages = ['TV Shows', 'Movies', 'Web Series'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const BACK_END_API_URL = "http://localhost:8080";
const REQ_URL =  BACK_END_API_URL+ "/api/v1/getTvShows";
const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const reload = () =>{
    window.location.reload(); 
  }

  const [tvShowList, setTvShowList] = React.useState<Array<any>>([]);
  React.useEffect(() => {

      axios({
        url: REQ_URL,
        method: "GET",
  
      }).then((res) => {
        
        setTvShowList(res.data)
      }).catch((err) => {
        console.error(err)
      });
    

  }, []);

  const [selectedShow, setSelectedShow] = React.useState<any>({});

  const [open, setOpen] = React.useState(false);


  const handleClick = (name: string) => {
    const selectedShow = tvShowList.filter(show => show.name == name);
    setSelectedShow(selectedShow[0])
    setOpen(true)
  };

  const handleClose = () => setOpen(false);

  return (
    <Container maxWidth="xl" sx={{ p: '0px !important' }} style={{ backgroundColor: 'lightblue' }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              TV Maze
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              TV Maze
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Mansoor" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>


      <div style={{ paddingLeft: '5vw', paddingBottom: '50px', backgroundColor: 'lightblue' }}>
        <Grid container spacing={2} style={{ marginTop: 50 }} justifyContent="space-around" alignItems="center">

          {tvShowList.map((item: any, index: number) => {
            return (
              <Grid item xs={3} key={index.toString()}>

                <MovieCard tvShow={tvShowList[index]} handleExpandClick={handleClick}></MovieCard>

              </Grid>
            )
          })}
      
        
        
        </Grid>
        <Button style={{display:'flex',margin:'0 auto',marginTop:'50px' }} variant="contained" onClick={reload} sx={{ mt: 2 }}>Load More...</Button>
      </div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Show Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <table>
              <tbody>
                <tr>
                  <th>
                    <img src={selectedShow?.imageThumbnail} />
                  </th>
                  <th>
                    {selectedShow?.summary?.replace('<p>', '')?.replace('</p>', '')}
                  </th>
                </tr>
                <tr>
                  <td>
                    Language: {selectedShow?.language}
                  </td>
                  <td>
                    Status: {selectedShow?.status}
                  </td>
                </tr>
                <tr>
                  <td>
                    Runtime: {selectedShow?.runtime} Minutes

                  </td>
                  <td>
                    Genre: {selectedShow?.genres?.replace('[', '')?.replace(']', '')}
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>


          </Typography>
          <Button style={{ float: 'right' }} variant="contained" onClick={handleClose} sx={{ mt: 2 }}>Close</Button>
        </Box>
      </Modal>
      
    </Container>
  );
}

export default App;
