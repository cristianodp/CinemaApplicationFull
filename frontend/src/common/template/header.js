import React, { Component, Fragment } from "react";

import PrimarySearchAppBar from "./primarySearchAppBar";

import UploadFilmsDialog from "../../views/admin/UploadFilmsDialog";

class Header extends Component {
  render() {
    const {
      title,
      openUploadDialog,
      handlerShowUploadDialog,
      handlerSearch,
      enableSearch
    } = this.props;
    return (
      <Fragment>
        <PrimarySearchAppBar
          title={title}
          enableSearch={enableSearch}
          handlerUploadFilms={handlerShowUploadDialog}
          handlerSearch={handlerSearch}
        />
        <UploadFilmsDialog
          open={openUploadDialog}
          handlerShowDialog={handlerShowUploadDialog}
        />
      </Fragment>
    );
  }
}

export default Header;
