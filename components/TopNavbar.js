import { useSession, signIn, signOut } from "next-auth/react"

import Link from "./Link";
import LoginButton from "./LoginButton";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import SearchIcon from '@mui/icons-material/Search';

function ResponsiveAppBar() {
  const { data: session } = useSession()

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
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
            </IconButton>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'end', marginRight: 1 }}>
              <Link href={"/search"}>
                <SearchIcon />
              </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            { session ?
            <>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Avatar" src={session.user.image} />
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
              {!session.user.username ? 
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link href={"/account/choose-username"}>
                    <Typography textAlign="center">Choose Username</Typography>
                  </Link>
                </MenuItem>
                :
                <MenuItem
                  sx={{"&:hover": {backgroundColor: 'transparent', cursor: 'default' }}}
                >
                    <Typography textAlign="center">Signed in: {session.user.username}</Typography>
                </MenuItem>
              }
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link href={"/users/" + session.user.username}>
                    <Typography textAlign="center">Profile</Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link href={"/account/invites"}>
                    <Typography textAlign="center">Team Invites</Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link href={"/account/teams"}>
                    <Typography textAlign="center">Teams</Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={() => signOut()}>
                    <Typography textAlign="center">Sign Out</Typography>
                </MenuItem>
              </Menu>
            </>
            :
            <Button variant="contained" onClick={() => signIn('discord')}>Sign In</Button>
          }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;