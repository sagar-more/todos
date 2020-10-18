import React from "react";
import { Card, CardActions, CardContent, Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import { DeleteOutlineOutlined, DoneAllOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    todoCompleted: {
        textDecoration: "line-through",
    },
    check: {
        color: theme.palette.success.dark,
    },
    delete: {
        color: theme.palette.error.dark
    },
}));

function TodoCard({ todo }) {
    const classes = useStyles();
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card variant="outlined">
                <CardContent className={todo.completed ? classes.todoCompleted : ""}>
                    <Typography variant="h6">
                        {todo.title}
                    </Typography>
                    <Typography variant="body1" component="p" color="textSecondary">
                        {todo.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton aria-label="Done" component="span" className={classes.check} title="Mark todo completed">
                        <DoneAllOutlined />
                    </IconButton>
                    <IconButton aria-label="Delete" component="span" className={classes.delete} title="Delete todo">
                        <DeleteOutlineOutlined />
                    </IconButton>
                </CardActions>
            </Card >
        </Grid>
    );
}

export default TodoCard;
