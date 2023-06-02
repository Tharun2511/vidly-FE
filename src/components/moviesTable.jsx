import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";

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
      content: (movie) => <Like onClick={() => this.props.onLike(movie)} />,
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => this.props.onDelete(movie._id)}
        >
          Delete
        </button>
      ),
    },
  ];

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
