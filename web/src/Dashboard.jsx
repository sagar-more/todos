import React from "react";
import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import TodoContainer from "./TodoContainer";
import AddTodo from "./AddTodo";

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

const Dashboard = () => {
    const userData = useSelector(state => state.user);
    const userLoggedIn = userData !== undefined;

    const classes = useStyles();

    return (
        <>
            {/* {
                !userLoggedIn && <Redirect to={{ pathname: "/" }} />
            } */}
            <AppBar className={classes.root}>
                <Toolbar>
                    <IconButton className={classes.menuButton} edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        To Do App
                    </Typography>
                    <Button color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
            {/* Trick start to move content below the header */}
            <Toolbar /> 
            {/* Trick end to move content below the header */}
            <TodoContainer />
            <AddTodo />
        </>
    );
}

export default Dashboard;
