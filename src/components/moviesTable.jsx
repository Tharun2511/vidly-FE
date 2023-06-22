import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";
import auth from "../services/authService";

class MoviesTable extends Component {
  columns = [
    {
      attribute: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}> {movie.title}</Link>
      ),
    },
    { attribute: "genre.name", label: "Genre" },
    { attribute: "numberInStock", label: "Stock" },
    { attribute: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
  ];

  deleteColumn = {
    key: "delete",
    content: (movie) => (
      <button
        className="btn btn-danger btn-sm"
        onClick={() => this.props.onDelete(movie)}
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn);
    }
  }
  render() {
    return (
      <Table
        columns={this.columns}
        sortColumn={this.props.sortColumn}
        onSort={this.props.onSort}
        data={this.props.moviesInThePage}
      />
    );
  }
}

export default MoviesTable;
