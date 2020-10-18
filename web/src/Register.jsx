import React, { useEffect, useState } from "react";
import {
    Avatar,
    Button,
    Grid,
    IconButton,
    InputAdornment,
    makeStyles,
    Popover,
    Slide,
    Snackbar,
    TextField,
    Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { AccountCircle, Visibility, VisibilityOff, Info, Close } from "@material-ui/icons";
import { register } from "../api";
import { messages } from "../utils/messages";
import { CLEAR_ERROR } from "../actions";
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
    popOver: {
        padding: theme.spacing(1),
    }
}));

const Register = () => {
    const { error, user } = useSelector(state => state);
    const [openPopOptions, setOpenPopOptions] = useState({
        open: false,
        anchorEl: null,
    });
    const styles = useStyles();
    const [values, setValues] = useState({
        userEmail: "",
        password: "",
        confirmPassword: "",
        showPassword: false,
        inValidEmailID: false,
        passwordMismatch: false,
    });
    const [isButtonDisable, setIsButtonDisable] = useState(true);
    const dispatch = useDispatch();

    const clearError = () => dispatch({ type: CLEAR_ERROR, payload: undefined });

    const checkPassWord = () => {
        const { password, confirmPassword } = values;
        return password.trim().length > 0 && confirmPassword.trim().length > 0
            ? password === confirmPassword
            : false;
    };

    const isEmailValid = () => {
        const { userEmail } = values;
        const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegEx.test(userEmail);
    };

    const checkEmailInput = () => {
        setValues({ ...values, inValidEmailID: !isEmailValid() });
    };

    const checkConfirmPassword = () => {
        setValues({ ...values, passwordMismatch: !checkPassWord() });
    };

    useEffect(() => {
        const isEmailIDPresent = isEmailValid();
        const doPasswordMatch = checkPassWord();

        setIsButtonDisable(!(isEmailIDPresent && doPasswordMatch));
    }, [values]);

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleRegister = () => {
        clearError();
        register(dispatch, { userEmail: values.userEmail, password: values.password });
    };

    const setPopOver = (event) => {
        const options = { ...openPopOptions };
        if (event.type === "click") {
            options.open = !options.open;
            options.anchorEl = event.currentTarget;
        }
        setOpenPopOptions(options);
    };

    return (
        <>
            {
                user && <Redirect to={{ pathname:"/home" }} />
            }
            <Snackbar
                autoHideDuration={6000}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={!!error}
                TransitionComponent={(props) => <Slide {...props} direction="up" />}
                message={error}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={clearError}
                    >
                        <Close fontSize="small" />
                    </IconButton>
                }
            />
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
                        error={values.inValidEmailID}
                        helperText={values.inValidEmailID ? messages.invalidEmailID : ""}
                        autoFocus={true}
                        onBlur={checkEmailInput}
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
                                <IconButton
                                    aria-label="info password requirement"
                                    onClick={setPopOver}
                                >
                                    <Info color="primary" />
                                    <Popover
                                        open={openPopOptions.open}
                                        anchorEl={openPopOptions.anchorEl}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                    >
                                        <Typography className={styles.popOver}>
                                            {messages.passwordRequirement}

                                        </Typography>
                                    </Popover>
                                </IconButton>
                            </InputAdornment>,
                        }}
                    />
                    <TextField
                        required
                        id="ConfirmPassword"
                        label="Confirm Password"
                        variant="outlined"
                        fullWidth
                        className={styles.marginBottom}
                        type={'password'}
                        value={values.confirmPassword}
                        onChange={handleChange('confirmPassword')}
                        error={values.passwordMismatch}
                        helperText={values.passwordMismatch ? messages.passwordMismatch : ""}
                        onBlur={checkConfirmPassword}
                    />
                    <Button
                        fullWidth
                        color="secondary"
                        variant="contained"
                        disabled={isButtonDisable}
                        onClick={handleRegister}
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

export default Register;
