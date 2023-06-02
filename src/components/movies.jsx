import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { Paginate } from "../utilities/paginate";
import ListGroup from "./common/listgroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import NavBar from "./navBar";
import { Link } from "react-router-dom";

class Movies extends Component {
  state = {
    allMovies: [],
    allGenres: [],
    currPage: 1,
    pageSize: 4,
    sortColumn: { attribute: "title", order: "asc" },
    selectedGenre: { name: "AllGenre", _id: "" },
  };

  componentDidMount() {
    const allGenres = [{ name: "AllGenres", _id: "" }, ...getGenres()];
    this.setState({ allMovies: getMovies(), allGenres });
  }

  handleDelete = (id) => {
    const updatedMovies = this.state.allMovies.filter((m) => m._id !== id);
    this.setState({ allMovies: updatedMovies });
  };

  handleLike = (movie) => {
    return <Like />;
  };

  handlePageChange = (page) => {
    this.setState({ currPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () =>{
    const {
        allMovies,
        currPage,
        pageSize,
        selectedGenre,
        sortColumn,
      } = this.state;
  
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(
      filtered,
      [sortColumn.attribute],
      [sortColumn.order]
    );

    return {count:sorted.length, moviesInThePage:Paginate(sorted, currPage, pageSize)};
  }
  render() {
    const {
      allMovies,
      allGenres,
      currPage,
      pageSize,
      selectedGenre,
      sortColumn,
    } = this.state;

    if (allMovies.length === 0) return <h5>No Movies in the DataBase</h5>;

    const{count, moviesInThePage} =  this.getPagedData();


    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            <ListGroup
              genresList={allGenres}
              selectedGenre={selectedGenre}
              onGenreSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <div className="new-movie m-3">
              <Link to='/movies/new'>
              <button className="btn btn-primary">New Movie</button></Link>
            </div>
            <h6>
              Showing {moviesInThePage.length} of {count} in the
              DataBase
            </h6>

            <MoviesTable
              moviesInThePage={moviesInThePage}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />

            <Pagination
              movieCount={count}
              pageSize={pageSize}
              currPage={currPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
