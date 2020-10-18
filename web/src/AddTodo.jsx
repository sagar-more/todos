import React, { useState } from "react";
import { AppBar, Button, Container, Dialog, Fab, Grid, IconButton, makeStyles, Slide, TextField, Toolbar, Typography } from "@material-ui/core";
import { Add, Close } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    fab: {
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    header: {
        flexGrow: 1,
    },
    container: {
        marginTop: theme.spacing(3),
    },
    marginBottom: {
        marginBottom: theme.spacing(2),
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function AddTodo() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({ title: "", description: "" });
    const [showHelper, setShowHelper] = useState(false);

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const onTitleBlur = () => {
        setShowHelper(values.title.trim() ===  "");
    };

    return (
        <>
            <Fab
                aria-label="Add"
                className={classes.fab}
                color="primary"
                onClick={() => setOpen(true)}
            >
                <Add />
            </Fab>
            <Dialog
                fullScreen
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <AppBar>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={() => setOpen(false)} aria-label="close">
                            <Close />
                        </IconButton>
                        <Typography variant="h6" className={classes.header}>
                            Add new todo
                        </Typography>
                        <Button color="inherit">Save</Button>
                    </Toolbar>
                </AppBar>
                <Toolbar />
                <Container className={classes.container}>
                    <Grid container item xs={12} spacing={2} direction="column">
                        <TextField
                            required
                            id="title"
                            label="Title"
                            variant="outlined"
                            fullWidth
                            onChange={handleChange('title')}
                            value={values.title}
                            helperText={showHelper ? "Title cannot be empty" : ""}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            className={classes.marginBottom}
                            onBlur={onTitleBlur}
                        />
                        <TextField
                            id="description"
                            label="description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            onChange={handleChange('description')}
                            value={values.description}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            className={classes.marginBottom}
                        />
                    </Grid>
                </Container>
            </Dialog>
        </>
    );
}

export default AddTodo;
