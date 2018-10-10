import React, { Fragment, Component } from "react";

import ListMovies from "./listMovies";
import Header from "../../common/template/header";
import ProgressView from "../../common/template/processView";
import Purchase from "../purchase";
const { URL_DOMAIN } = require("../../env");

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      searchValue: null,
      loading: true,
      sessionSelected: null,
      openUploadDialog: false
    };
    this._getList = this._getList.bind(this);
    this._handlerSearch = this._handlerSearch.bind(this);
    this._handlerShowUploadDialog = this._handlerShowUploadDialog.bind(this);
  }

  _getList = searchValue => {
    console.log("searchValue list ", searchValue);
    const url = `${URL_DOMAIN}/filmsAndSessions${
      searchValue ? `?name=${searchValue}` : ""
    }`;
    const _this = this;

    fetch(url)
      .then(response => {
        if (response.status !== 200) {
          console.error("no data found");
          return;
        }

        response.json().then(function(data) {
          _this.setState({
            list: data,
            loading: false
          });
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  _handlerSearch = change => {
    var searchValue = change.target.value;
    this._getList(searchValue);
  };

  _handlerSelected = item => {
    this.setState({
      sessionSelected: item
    });
  };

  _handlerShowUploadDialog = show => {
    this.setState({ openUploadDialog: show });
    if (!show) {
      this._getList(null);
    }
  };

  componentDidMount() {
    this._getList(null);
  }

  render() {
    const { list, loading, sessionSelected, openUploadDialog } = this.state;

    return (
      <Fragment>
        <Header
          title="Movies"
          openUploadDialog={openUploadDialog}
          handlerShowUploadDialog={this._handlerShowUploadDialog}
          enableSearch={sessionSelected === null}
          handlerSearch={this._handlerSearch}
        />

        {loading ? (
          <ProgressView label={"Aguarde..."} />
        ) : sessionSelected ? (
          <Purchase
            session={sessionSelected}
            onFinish={() => {
              this._handlerSelected(null);
            }}
          />
        ) : (
          <ListMovies list={list} onSelected={this._handlerSelected} />
        )}
      </Fragment>
    );
  }
}

export default Movies;
