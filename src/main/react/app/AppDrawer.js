import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import DashboardIcon from '@material-ui/icons/Dashboard';
import DonationIcon from '@material-ui/icons/Money';
import MemberIcon from '@material-ui/icons/Face';
import UserIcon from '@material-ui/icons/People';
import ProfileIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/SettingsSharp';
import MailIcon from '@material-ui/icons/Mail';
import SepaIcon from '@material-ui/icons/CompareArrows';


import AuthorityUtil from "../utils/AuthorityUtil";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
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
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
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
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
});

class AppDrawer extends React.Component {

  render() {
    const {classes, theme} = this.props;

    return (

      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(classes.drawerPaper, !this.props.open && classes.drawerPaperClose),
        }}
        open={this.props.open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={this.props.handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
          </IconButton>
        </div>

        <Divider/>

        <List>

          <AuthorityUtil has="MemberAuthority.READ">
            <div>
              <ListItem button component="a" href="#/members">
                <ListItemIcon>
                  <MemberIcon/>
                </ListItemIcon>
                <ListItemText primary="Member"/>
              </ListItem>
            </div>
          </AuthorityUtil>

        </List>

        <Divider/>

        <List>

          <AuthorityUtil has="UserAuthority.READ">
            <div>
              <ListItem button component="a" href="#/users">
                <ListItemIcon>
                  <UserIcon/>
                </ListItemIcon>
                <ListItemText primary="Users"/>
              </ListItem>
            </div>
          </AuthorityUtil>

          <div>
            <ListItem button component="a" href="#/profile">
              <ListItemIcon>
                <ProfileIcon/>
              </ListItemIcon>
              <ListItemText primary="Profile"/>
            </ListItem>
          </div>

          <div>
            <ListItem button component="a" href="#/settings">
              <ListItemIcon>
                <SettingsIcon/>
              </ListItemIcon>
              <ListItemText primary="Settings"/>
            </ListItem>
          </div>
        </List>

      </Drawer>


    );
  }
}

AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppDrawer);
