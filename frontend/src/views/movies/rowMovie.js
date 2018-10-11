import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import SchedulesMovie from "./schedulerMovie";
import { URL_DOMAIN } from "../../env";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
    margin: 4
  },
  typography: {
    useNextVariants: true,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
});

function RowMovie(props) {
  const { classes, film, onSelected } = props;

  return (
    <Paper className={classes.root}>
      <Grid container spacing={16}>
        <Grid item xs={2}>
          {
            <img
              className={classes.img}
              alt="complex"
              src={`${URL_DOMAIN}/film/poster?name=${film.name}`}
            />
          }
        </Grid>
        <Grid item xs={10} sm container>
          <Grid item xs container direction="column" spacing={16}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1">
                {film.name}
              </Typography>

              <SchedulesMovie
                schedules={film.schedules}
                onSelected={onSelected}
              />
            </Grid>
          </Grid>
          <Grid item />
        </Grid>
      </Grid>
    </Paper>
  );
}

RowMovie.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RowMovie);
