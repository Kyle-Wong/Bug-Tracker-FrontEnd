import React, { Component } from "react";
import ModalButton from "../modalButton";
import "../../css/searchBar.css";
class BugSearchBar extends Component {
  state = {
    search: "",
    tag: ""
  };
  render() {
    const { onSearch } = this.props;
    let { includeResolved, onCheck } = this.props;

    if (!includeResolved) includeResolved = false;
    return (
      <div className="topnav border border-dark">
        <div className="bug-button">
          <ModalButton target="modal" className="btn btn-outline-primary">
            Add new bug
          </ModalButton>
        </div>
        <div className="row  mx-auto search-form">
          <input
            type="text"
            className="col"
            placeholder="Search..."
            value={this.state.search}
            onChange={this.updateSearchForm.bind(this)}
          />
          <input
            type="submit"
            value="Search"
            onClick={() => {
              onSearch(this.state.search);
            }}
          />
        </div>

        <div className="text-center">
          <span
            className="fake-link noselect"
            data-toggle="collapse"
            data-target="#advancedsearch"
          >
            {" "}
            Advanced Search
          </span>
        </div>
        <div id="advancedsearch" className="collapse advanced-search row">
          <div className="col">
            <label htmlFor="tags">Tag Filter:</label>
            <br />
            <input
              list="tags"
              name="tags"
              autoComplete="off"
              value={this.state.tag}
              onChange={this.updateTagForm.bind(this)}
            />

            {this.tagList()}

            <input type="submit" value="Add" onClick={this.addTag.bind(this)} />
          </div>
          <div className="form-check col">
            <div className="checkbox-line">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                onChange={onCheck}
                checked={includeResolved}
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Include resolved bugs
              </label>
            </div>{" "}
          </div>
        </div>
      </div>
    );
  }
  updateTagForm(e) {
    this.setState({ tag: e.target.value });
  }
  updateSearchForm(e) {
    this.setState({ search: e.target.value });
  }
  addTag() {
    const { tag, search } = this.state;
    if (!tag) return;
    let newSearch = search + ` tag:"${tag}"`;
    this.setState({ search: newSearch, tag: "" });
  }
  tagList() {
    let { uniqueTags } = this.props;
    if (!uniqueTags || uniqueTags.length === 0)
      return (
        <datalist id="tags">
          <option value="" />
        </datalist>
      );
    return (
      <datalist id="tags">
        {uniqueTags.map(e => {
          return <option key={e} value={e} />;
        })}
      </datalist>
    );
  }
}

export default BugSearchBar;
