import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    borderStyle: "solid",
    borderWidth: "1px",
    padding: "4px",
    margin: "4px"
  }
});

function schedulesMovie(props) {
  const { classes, schedules, onSelected } = props;
  return (
    <Grid item xs sm container>
      {schedules.map(it => (
        <Grid key={it.seq} item xs style={{ textAlign: "center" }}>
          <Typography variant="subheading">{it.dayOfTheWeek}</Typography>

          {it.sessions.map(sess => (
            <Button
              key={sess.id}
              onClick={() => {
                onSelected(sess);
              }}
              className={classes.button}
            >
              {sess.time}
            </Button>
          ))}
        </Grid>
      ))}
    </Grid>
  );
}

schedulesMovie.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(schedulesMovie);
