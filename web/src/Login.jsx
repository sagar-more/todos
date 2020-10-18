import React, { useEffect, useState } from "react";
import {
    Avatar,
    Button,
    Grid,
    IconButton,
    InputAdornment,
    makeStyles,
    TextField,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { AccountCircle, Visibility, VisibilityOff } from "@material-ui/icons";
import { login } from "../api";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        height: `100%`
    },
    marginBottom: {
        marginBottom: theme.spacing(2),
    },
    largeAvatar: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        "& > .MuiSvgIcon-root": {
            width: theme.spacing(5),
            height: theme.spacing(5),
        },
    },
    leftAlign: {
        textAlign: "end",
    },
}));

const Login = () => {
    const { error, user } = useSelector(state => state);
    const styles = useStyles();
    const [values, setValues] = useState({
        userEmail: "",
        password: "",
        showPassword: false,
    });
    const [isButtonDisable, setIsButtonDisable] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const { userEmail, password } = values;
        setIsButtonDisable(!(userEmail.trim().length && password.trim().length));
    }, [values]);

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleLogin = () => {
        login(dispatch, { userEmail: values.userEmail, password: values.password });
    };

    return (
        <>
            {
                user && <Redirect to={{ pathname: "/home" }} />
            }
            <Grid
                container
                spacing={2}
                justify="center"
                direction="column"
                alignItems="center"
                className={styles.root}
            >
                <Grid item sm={8} md={6} lg={4} xl={4}>
                    <Grid container justify="center" className={styles.marginBottom}>
                        <Avatar className={styles.largeAvatar}>
                            <AccountCircle />
                        </Avatar>
                    </Grid>
                    <TextField
                        required
                        id="userEmail"
                        label="Email ID"
                        variant="outlined"
                        fullWidth
                        className={styles.marginBottom}
                        onChange={handleChange('userEmail')}
                        value={values.userEmail}
                        error={!!error}
                        helperText={error ? error : ""}
                    />
                    <TextField
                        required
                        id="Password"
                        label="Password"
                        autoComplete="current-password"
                        variant="outlined"
                        fullWidth
                        className={styles.marginBottom}
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>,
                        }}
                        error={!!error}
                        helperText={error ? error : ""}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={isButtonDisable}
                        onClick={handleLogin}
                        className={styles.marginBottom}
                    >
                        Login
                    </Button>
                    <Button
                        fullWidth
                        color="secondary"
                        variant="contained"
                        href="/register"
                        className={styles.marginBottom}
                    >
                        Register !
                    </Button>
                </Grid>
            </Grid>
            <div className={styles.leftAlign}>Photo by <a href="https://unsplash.com/@laurensauderstudio?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Lauren Sauder</a> on <a href="https://unsplash.com/s/photos/todo?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></div>
        </>
    );
}

export default Login;
