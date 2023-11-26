import * as React from 'react';
import { styled, alpha, makeStyles } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { MapTo } from "@adobe/aem-react-editable-components";
// import { Link } from 'react-router-dom/cjs/react-router-dom';
import Link from '@mui/material/Link';
import { useSelector,useDispatch } from 'react-redux';
import { loadUser } from '../../actions/auth';
import { AuthoringUtils } from '@adobe/aem-spa-page-model-manager';

require("./Header.css")


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
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
    [theme.breakpoints.up('md')]: {
      width: '80ch',
    },
  },
}));
const  Header = (props) => {

  // React.useEffect(()=>{
  //   !AuthoringUtils.isInEditor() && dispatch(loadUser())
  // },[])
  const dispatch = useDispatch();

  const store = useSelector((state)=>({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
    user: state.auth.user
  }));

  // console.log("props.headerLinks: ",props.headerLinks)
  // console.log("props.headerSettingLinks: ",props.headerSettingLinks)
  // console.log("props: ",props)

  let headerLinksPreAuth = props.headerLinks && props.headerLinks.filter((link)=>!link.showAfterAuth);
  let headerLinksPostAuth = props.headerLinks && props.headerLinks.filter((link)=>link.showAfterAuth);
  let headerSettingLinksPreAuth = props.headerSettingLinks && props.headerSettingLinks.filter((link)=>!link.showAfterAuth);
  let headerSettingLinksPostAuth = props.headerSettingLinks &&  props.headerSettingLinks.filter((link)=>link.showAfterAuth);

  // console.log("headerLinksPreAuth: ",headerLinksPreAuth)
  // console.log("headerLinksPostAuth: ",headerLinksPostAuth)
  // console.log("headerSettingLinksPreAuth: ",headerSettingLinksPreAuth)
  // console.log("headerSettingLinksPostAuth: ",headerSettingLinksPostAuth)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {store.isAuthenticated && headerSettingLinksPostAuth && headerSettingLinksPostAuth.map((link,index)=> {
        return <MenuItem key={index} onClick={handleMenuClose}><Link  href={link.link}>{link.text}</Link></MenuItem>
      })}
      {!store.isAuthenticated && headerSettingLinksPreAuth && headerSettingLinksPreAuth.map((link,index)=> {
        return <MenuItem key={index} onClick={handleMenuClose}><Link  href={link.link}>{link.text}</Link></MenuItem>
      })}
     
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
     {store.isAuthenticated && headerLinksPostAuth && headerLinksPostAuth.map((link,index)=> {
        return <MenuItem key={index} onClick={handleMenuClose}><Link  href={link.link}>{link.text}</Link></MenuItem>
      })}
      {!store.isAuthenticated && headerLinksPreAuth && headerLinksPreAuth.map((link,index)=> {
        return <MenuItem key={index} onClick={handleMenuClose}><Link  href={link.link}>{link.text}</Link></MenuItem>
      })}
      {store.isAuthenticated && headerSettingLinksPostAuth && headerSettingLinksPostAuth.map((link,index)=> {
        return <MenuItem key={index} onClick={handleMenuClose}><Link  href={link.link}>{link.text}</Link></MenuItem>
      })}
      {!store.isAuthenticated && headerSettingLinksPreAuth && headerSettingLinksPreAuth.map((link,index)=> {
        return <MenuItem key={index} onClick={handleMenuClose}><Link  href={link.link}>{link.text}</Link></MenuItem>
      })}

      {/* <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem> */}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            {props.brandName}
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          {store.isAuthenticated && headerLinksPostAuth && headerLinksPostAuth.map((link,index)=> {
            return <MenuItem key={index} onClick={handleMenuClose}><Link  href={link.link}><Typography className='header-links'>{link.text}</Typography></Link></MenuItem>
          })}
          {!store.isAuthenticated && headerLinksPreAuth && headerLinksPreAuth.map((link,index)=> {
            return <MenuItem key={index} onClick={handleMenuClose}><Link  href={link.link}><Typography className='header-links'>{link.text}</Typography></Link></MenuItem>
          })}
          {/* <Link  href="/content/seekerstore/in/en/login.html"><p>Login</p></Link>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            {store.isAuthenticated && <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
              <Typography>&nbsp;{store?.user?.name}</Typography>
            </IconButton>}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

MapTo("seekerstore/components/header")(Header);
export default Header;