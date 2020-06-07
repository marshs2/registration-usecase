import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import './styles.css';

function Dashboard (props) {
    const {firstName} = props;

    return (
        <div>
            <Typography variant="h2">
                Congratulations!!
            </Typography>
            <Typography variant="h5">Start using your Dashboard now..</Typography>
        </div>
    )
}

export default Dashboard;