import React, {Component} from 'react';
import Favorites from "../tools/Favorites";

class Album extends Component {

    constructor() {
        super();
        this.state = {
            favorite: false
        }
    }

    trackCount(count) {
        if (count === 1) {
            return count + ' track';
        }
        return count + ' tracks';
    }

    favorite(id) {
        var isFavorite = false;
        if (Favorites.has(id)) {
            Favorites.remove(id);
        } else {
            Favorites.add(id);
            isFavorite = true;
        }
        this.setState({
            favorite: isFavorite
        });
    }

    render() {
        var album = this.props.album;
        var rd = new Date(Date.parse(album.releaseDate));
        var date = rd.toLocaleDateString('en-us', {month: "long", year: "numeric"});
        var isFavorite = this.state.favorite;
        var favoriteClass = isFavorite ? 'heart active' : 'heart';
        return (
            <li className="image-item" dir="auto">
                <div className="row">
                    <div className="col-2">
                        <img alt="" src={album.artworkUrl100}/>
                    </div>
                    <div className="col-9">
                        <h4>
                            {album.collectionName}
                            <small>
                                {album.copyright}
                            </small>
                        </h4>
                        <p className="released">Released in {album.country} on {date}</p>
                        <p>{album.primaryGenreName} | {this.trackCount(album.trackCount)} | {album.collectionPrice} {album.currency}</p>
                    </div>
                    <div className="col-1">
                        <svg className={favoriteClass} viewBox="0 0 32 29.6"
                             onClick={this.favorite.bind(this, album.collectionId)}>
                            <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
	c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
                        </svg>
                    </div>

                </div>
            </li>
        )
    }
}

export default Album;
