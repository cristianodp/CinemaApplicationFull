import React from "react";
import PropTypes from "prop-types";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SettingsIcon from "@material-ui/icons/Settings";
import ListIcon from "@material-ui/icons/List";
import { Link } from "react-router-dom";


const styles = theme => ({
  menuItem: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& $primary, & $icon": {
        color: theme.palette.common.white
      }
    }
  },
  toolbar: {
    borderBottomStyle: "solid",
    borderBottomWidth: "0.1px",
    borderBottomColor: "#9E9E9E"
  },
  primary: {},
  icon: {}
});

function Menu(props) {
  const { classes } = props;

  return (
    <MenuList>
      <Link to="/">
        <MenuItem className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <ListIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.primary }}
            inset
            primary="Movies"
          />
        </MenuItem>
      </Link>
      <Link to="/admin">
        <MenuItem className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.primary }}
            inset
            primary="Admin"
          />
        </MenuItem>
      </Link>
    </MenuList>
  );
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Menu);
