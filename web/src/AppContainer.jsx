import React from "react";
import { Container, CssBaseline, makeStyles } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Login from "./Login";
import Dashboard from "./Dashboard";
import Register from "./Register";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100vh",
        height: "auto",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: "url(/bg.jpg)",
        backgroundPosition: "center",
    },
}));

const AppContainer = () => {
    const styles = useStyles();
   

    return (<>
        <CssBaseline />
        <Container maxWidth="xl" className={styles.root}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={() => <Login />} />
                    <Route path="/home" component={() => <Dashboard />} />
                    <Route path="/register" component={() => <Register />} />
                </Switch>
            </BrowserRouter>
        </Container>
    </>);
};

export default AppContainer;
