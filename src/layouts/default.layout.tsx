import { Collapse, Divider } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { FunctionComponent, useState } from 'react';

import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import BuildIcon from '@material-ui/icons/Build';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CreateIcon from '@material-ui/icons/Create';
import CssBaseline from '@material-ui/core/CssBaseline';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import Drawer from '@material-ui/core/Drawer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import Link from 'next/link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/dist/client/router';
import useTokenData from '../custom-hooks/token.data';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  listNest: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const DefaultLayout: FunctionComponent = ({ children }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openNested, setNested] = useState(false);

  const handleClick = () => {
    setNested(!openNested);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const user = useTokenData();

  const router = useRouter();
  const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/">
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Footy Tipping {new Date().getFullYear()} 🏉
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        onClose={handleDrawerClose}
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
            <Link href="/">
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>

            {!user && (
              <Link href="/login">
                <ListItem button>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Login" />
                </ListItem>
              </Link>
            )}
            {!user && (
              <Link href="/registration">
                <ListItem button>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Register" />
                </ListItem>
              </Link>
            )}
            {user && (
              <ListItem button onClick={logout}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            )}

              {user && (
                <Link href="/tips/enter-tips">
                  <ListItem button>
                    <ListItemIcon>
                      <CreateIcon />
                    </ListItemIcon>
                    <ListItemText primary="Enter tips" />
                  </ListItem>
                </Link>
              )}

              {user && (
                <Link href="/tips/view-tips">
                  <ListItem button>
                    <ListItemIcon>
                      <VisibilityIcon />
                    </ListItemIcon>
                    <ListItemText primary="View tips" />
                  </ListItem>
                </Link>
              )}
       {user && user.role === 'admin' && (<div>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <BuildIcon />
        </ListItemIcon>
        <ListItemText primary="Admin" />
        {openNested ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openNested} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
                <Link href="/tips/tip-results">
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <DoneAllIcon />
                    </ListItemIcon>
                    <ListItemText primary="Enter results" />
                  </ListItem>
                </Link>
              <Link href="/admin/round">
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Round" />
                </ListItem>
              </Link>
              <Link href="/admin/locations">
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Locations" />
                </ListItem>
              </Link>
              <Link href="/admin/team-name">
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Teams" />
                </ListItem>
              </Link>
              <Link href="/admin/users">
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Users" />
                </ListItem>
              </Link>
        </List>
      </Collapse>
      </div>)}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {children}
      </main>
    </div>
  );
};

export default DefaultLayout;
