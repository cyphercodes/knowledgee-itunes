import React, {Component} from 'react';
import Album from './components/Album';
import './App.css';
import Artist from "./components/Artist";
import Favourites from "./tools/Favourites";
import Api from "./tools/Api";

var timeoutHolder = null;

class App extends Component {

    constructor() {
        super();
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

    onSubmit(e) {
        this.doSearch(this.refs.search.value);
        e.preventDefault();
    }

    onChange(e) {
        this.setState({
            loading: true
        });
        clearTimeout(timeoutHolder);
        timeoutHolder = setTimeout(() => {
            this.doSearch(this.refs.search.value);
        }, 500);
    }

    doSearch(value) {
        this.setState({
            albums: [],
            results: [],
        })
        Api.searchArtists(value).then(res => {
                console.log(res);
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

    clickArtist(id) {
        this.getAlbums(id);
    }

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

    clickFavourites() {
        this.getFavourites();
    }

    getFavourites(artistName = 'all') {
        this.setState({
            favourites: Favourites.getWithArtistName(artistName),
            gotAlbums: false,
            gotArtists: true,
            gotFavourites: true,
            albums: [],
            results: []
        })
    }

    onFilterChange() {
        this.getFavourites(this.refs.filter.value);
    }

    render() {
        let resultItems = [];
        let albums = [];
        let favourites = [];
        if (!this.state.loading) {
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
        let loading = this.state.loading ? 'spinner active' : 'spinner';
        let resultsClass = resultItems.length > 0 ? '' : 'hidden';
        let albumsClass = albums.length > 0 ? '' : 'hidden';
        let favouritesClass = favourites.length > 0 ? '' : 'hidden';
        let noResultsFoundClass = this.state.loading || (!this.state.gotAlbums && !this.state.gotArtists && !this.state.gotFavourites) || resultItems.length > 0 || albums.length > 0 || favourites.length > 0 ? 'row hidden' : 'row';
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
                            <button type="button" className="btn red" onClick={this.clickFavourites.bind(this)}>My
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
                                                <option value={artist} key={index}>{artist}</option>
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
