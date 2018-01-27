import React, {Component} from 'react';
import Album from './components/Album';
import './App.css';
import Artist from "./components/Artist";
import Favourites from "./tools/Favourites";
import Api from "./tools/Api";

// Timeout holder used for the reference to the timeout when user starts typing in the search textbox to determine when the user finishes typing
// @TODO: Figure out if there's a better place to place this other than as a global variable
var timeoutHolder = null;

class App extends Component {

    constructor() {
        super();
        // Initial state
        this.state = {
            results: [],
            loading: false,
            albums: [],
            favourites: [],
            gotAlbums: false,
            gotArtists: false,
            gotFavourites: false,
        }
    }

    /*
    onSubmit method captures the submit event on the search form
     */
    onSubmit(e) {
        this.doSearch(this.refs.search.value);
        e.preventDefault();
    }

    /*
    onChange method captures the change event on the search form
     */
    onChange(e) {

        // Start loading as soon as user starts typing
        this.setState({
            loading: true
        });

        // Code to detect when user stops typing and fire the actual search when that happens
        clearTimeout(timeoutHolder);
        timeoutHolder = setTimeout(() => {
            this.doSearch(this.refs.search.value);
        }, 500);
    }

    /*
    Method responsible for the actual search
     */
    doSearch(value) {
        this.setState({
            albums: [],
            results: [],
        })
        Api.searchArtists(value).then(res => {
                res.json().then(data => {
                    this.setState({
                        results: data.results,
                        gotArtists: true,
                        gotAlbums: false,
                        gotFavourites: false,
                        albums: [],
                        favourites: []
                    });
                });
            }
        ).finally(() => {
            this.setState({
                loading: false
            });
        });
    }

    /*
    Handle click event on an artist from the search results
     */
    clickArtist(id) {
        this.getAlbums(id);
    }

    /*
    Get all albums with specific artist ID
     */
    getAlbums(id) {
        this.setState({
            loading: true
        })
        Api.lookupAlbums(id).then(res => {
                res.json().then(data => {
                    this.setState({
                        albums: data.results,
                        gotAlbums: true,
                        gotArtists: false,
                        gotFavourites: false,
                        results: [],
                        favourites: []
                    });
                });
            }
        ).finally(() => {
            this.setState({
                loading: false
            });
        });
    }

    /*
    Handle 'click' event on the 'My Favourites' button
     */
    clickFavourites() {
        this.getFavourites();
    }

    /*
    method to grab the favourites according to selected artist name and set the state properly
     */
    getFavourites(id = 'all') {
        this.setState({
            favourites: Favourites.getWithArtistId(id),
            gotAlbums: false,
            gotArtists: true,
            gotFavourites: true,
            albums: [],
            results: []
        })
    }

    /*
    Handle 'change' event on filter select input
     */
    onFilterChange() {
        this.getFavourites(this.refs.filter.value);
    }

    render() {
        let resultItems = [];
        let albums = [];
        let favourites = [];
        if (!this.state.loading) { // get data only in case the state is not loading (if the state is loading, it means a get request is already in progress)
            albums = this.state.albums.filter(album => {
                return album.wrapperType === 'collection';

            }).map(album => {
                return (
                    <Album key={album.collectionId} album={album}/>
                )
            });
            if (albums.length < 1 && this.state.gotArtists) {
                resultItems = this.state.results.map(result => {
                    return (
                        <Artist click={this.clickArtist.bind(this)} key={result.artistId} artist={result}/>
                    )
                });
            }

            if (albums.length < 1 && resultItems.length < 1 && this.state.gotFavourites) {
                favourites = this.state.favourites.map((fav) => {
                    return (
                        <Album key={fav.collectionId} album={fav}/>
                    )
                });
            }

        }
        let loading = this.state.loading ? 'spinner active' : 'spinner'; // hide or display loader depending on the state variable

        // handle different classes
        let resultsClass = resultItems.length > 0 ? '' : 'hidden';
        let albumsClass = albums.length > 0 ? '' : 'hidden';
        let favouritesClass = favourites.length > 0 ? '' : 'hidden';
        let noResultsFoundClass = this.state.loading || (!this.state.gotAlbums && !this.state.gotArtists && !this.state.gotFavourites) || resultItems.length > 0 || albums.length > 0 || favourites.length > 0 ? 'row hidden' : 'row';

        // handle text to display in case no results were found for a particular get operation
        let noResultsText = 'No results found &#9785;';
        if (this.state.gotAlbums) {
            noResultsText = 'No albums found &#9785; click search to go back to search results...';
        } else if (this.state.gotFavourites) {
            noResultsText = 'No favourites found &#9785; search an artist & click the heart to add some...'
        }

        return (
            <div className="container">
                <form className="search-form padding-top" onSubmit={this.onSubmit.bind(this)}
                      onChange={this.onChange.bind(this)}>
                    <div className="row">
                        <div className="col-12 center">
                            <input className="responsive-block" ref="search" type="search"
                                   placeholder="Please enter your search term..."/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 center">
                            <input className="btn blue" type="submit" value="Search"/>
                            <button type="button" className="btn red margin-top-5"
                                    onClick={this.clickFavourites.bind(this)}>My
                                Favourites
                            </button>
                        </div>
                    </div>
                </form>
                <div className={loading}>
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className={resultsClass}>
                            <h4 className="center">
                                Search Results
                                {(this.state.results.length > 0) ? ' (' + this.state.results.length + ' artists)' : ''}
                            </h4>
                            <ul className="list clickable">
                                {resultItems}
                            </ul>
                        </div>
                        <div className={albumsClass}>
                            <h4 className="center">
                                Albums
                                {(this.state.albums.length > 0) ? ' by ' + this.state.albums[0].artistName + ' (' + this.state.albums.length + ' albums)' : ''}
                            </h4>
                            <ul className="list">
                                {albums}
                            </ul>
                        </div>
                        <div className={favouritesClass}>
                            <h4 className="center">
                                My Favourites
                                {(this.state.favourites.length > 0) ? ' (' + this.state.favourites.length + ' albums)' : ''}
                            </h4>


                            <div className="filter">
                                <label>Filter by Artist: &nbsp;
                                    <select onChange={this.onFilterChange.bind(this)} ref="filter">
                                        <option value='all'>All</option>
                                        {Favourites.getArtists().map((artist, index) => {
                                            return (
                                                <option value={artist.id} key={index}>{artist.name}</option>
                                            )
                                        })}
                                    </select>
                                </label>
                            </div>
                            <ul className="list">
                                {favourites}
                            </ul>
                        </div>
                        <div className={noResultsFoundClass}>
                            <p className="center" dangerouslySetInnerHTML={{__html: noResultsText}}></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
