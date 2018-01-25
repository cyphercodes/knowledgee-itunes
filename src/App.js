import React, {Component} from 'react';
import Album from './components/Album';
import './App.css';
import Artist from "./components/Artist";
import Favorites from "./tools/Favorites";

var timeoutHolder = null;

class App extends Component {

    constructor() {
        super();
        this.state = {
            results: [],
            loading: false,
            albums: [],
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
        fetch('https://itunes.apple.com/search?term=' + value + '&entity=musicArtist').then(res => {
                res.json().then(data => {
                    this.setState({
                        results: data.results
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
        console.log(id);
        this.getAlbums(id);
    }

    getAlbums(id) {
        this.setState({
            loading: true
        })
        fetch('https://itunes.apple.com/lookup?id=' + id + '&entity=album').then(res => {
                res.json().then(data => {
                    this.setState({
                        albums: data.results
                    });
                });
            }
        ).finally(() => {
            this.setState({
                loading: false
            });
        });
    }

    render() {
        let resultItems = [];
        let albums = [];
        if (!this.state.loading) {
            albums = this.state.albums.filter(album => {
                return album.wrapperType === 'collection';

            }).map(album => {
                return (
                    <Album key={album.collectionId} album={album}/>
                )
            });
            console.log(this.state.albums);
            if (albums.length
                < 1) {
                resultItems = this.state.results.map(result => {
                    return (
                        <Artist click={this.clickArtist.bind(this)} key={result.artistId} artist={result}/>
                    )
                });
            }
        }
        let loading = this.state.loading ? 'spinner active' : 'spinner';

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
                            <button type="button" className="btn red">My Favorites</button>
                        </div>
                    </div>
                </form>
                <div className={loading}>
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <ul className="list clickable">
                            {resultItems}
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <ul className="list">
                            {albums}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
