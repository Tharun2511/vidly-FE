import React, { Component } from "react";
import { deleteMovie, getMovies } from "../services/movieService";
import Pagination from "./common/pagination";
import { Paginate } from "../utilities/paginate";
import ListGroup from "./common/listgroup";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTable";
import _, { get } from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./searchBox";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    allMovies: [],
    allGenres: [],
    currPage: 1,
    pageSize: 4,
    sortColumn: { attribute: "title", order: "asc" },
    selectedGenre: { name: "AllGenre", _id: "" },
    searchQuery: "",
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const allGenres = [{ name: "AllGenres", _id: "" }, ...data];

    const { data: allMovies } = await getMovies();
    this.setState({ allMovies, allGenres });
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.allMovies;
    const allMovies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ allMovies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) console.log("x");
      toast.error("This movie has already been deleted.");

      this.setState({ allMovies: originalMovies });
    }
  };

  handleLike = (movie) => {
    const allMovies = [...this.state.allMovies];
    const index = allMovies.indexOf(movie);
    allMovies[index] = { ...allMovies[index] };
    allMovies[index].liked = !allMovies[index].liked;
    this.setState({ allMovies });
  };

  handlePageChange = (page) => {
    this.setState({ currPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      selectedGenre: { name: "AllGenre", _id: "" },
      currPage: 1,
    });
  };

  getPagedData = () => {
    const {
      allMovies,
      currPage,
      pageSize,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    let filtered = allMovies;

    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(
      filtered,
      [sortColumn.attribute],
      [sortColumn.order]
    );

    return {
      count: sorted.length,
      moviesInThePage: Paginate(sorted, currPage, pageSize),
    };
  };
  render() {
    const {
      allMovies,
      allGenres,
      currPage,
      pageSize,
      selectedGenre,
      searchQuery,
      sortColumn,
    } = this.state;

    const { count, moviesInThePage } = this.getPagedData();
    const { user } = this.props;

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            <ListGroup
              ItemsList={allGenres}
              selectedItem={selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            {user && 
              <Link
                to="/movies/new"
                className="btn btn-primary "
                style={{ marginBottom: 20 }}
              >
                New Movie
              </Link>
            }
            <h6>
              Showing {moviesInThePage.length} of {count} in the DataBase
            </h6>

            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <MoviesTable
              moviesInThePage={moviesInThePage}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />

            <Pagination
              itemCount={count}
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
