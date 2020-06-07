import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import './styles.css';

 const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Header(props) {
    // constructor() {
    //     super();
    // }
    const { isAuthenticated, firstName, lastName, onLogout } = props;



    const callLogout = (event) => {
        event.preventDefault();
        onLogout(props.history);
    }

    const classes = useStyles();

    const onAuthenticated = (
        <div className="displayFlex">
            <Typography variant="h6" className={classes.title}>
                Welcome, {firstName}{' '}{lastName}
            </Typography>
            <a onClick={callLogout}>
                <Button color="inherit">Logout</Button>
            </a>
        </div>
    );

    const onUnAuthenticated = (
        <div>
            <Link to="/login">
                <Button style={{ color: 'white' }}>Login</Button>
            </Link>
            <Link to="/signup">
                <Button style={{ color: 'white' }}>Sign Up</Button>
            </Link>
        </div>
    )

    const defaultList = (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Altimetrik - User Authentication
            </Typography>
                    {isAuthenticated ? onAuthenticated : onUnAuthenticated}
                </Toolbar>
            </AppBar>
        </div>
    )

    return (
        <div>
            {defaultList}
        </div>
    )

}

export default withRouter(Header);