import React from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import TodoCard from "./TodoCard";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
    },
}));

const todos = [
    { id: "1", title: "TITLE", description: "BODY", completed: false },
    { id: "2", title: "TITLE", description: "BODY", completed: true },
    { id: "3", title: "TITLE", description: "BODY", completed: true },
    { id: "4", title: "TITLE", description: "BODY", completed: true },
    { id: "5", title: "TITLE", description: "BODY", completed: true },
]

function TodoContainer() {
    const classes = useStyles();
    return (
        <Container className={classes.root}>
            <Grid container spacing={3}>
                {
                    todos.map(todo => (<TodoCard key={todo.id} todo={todo} />))
                }
            </Grid>
        </Container>
    );
}

export default TodoContainer;
