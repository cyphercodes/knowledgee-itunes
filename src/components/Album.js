import React, {Component} from 'react';
import Favourites from "../tools/Favourites";

class Album extends Component {

    trackCount(count) {
        if (count === 1) {
            return count + ' track';
        }
        return count + ' tracks';
    }

    favourite(album) {
        Favourites.toggle(album);
        this.forceUpdate();
    }

    render() {
        var album = this.props.album;
        var rd = new Date(Date.parse(album.releaseDate));
        var date = rd.toLocaleDateString('en-us', {month: "long", year: "numeric"});
        var isFavourite = Favourites.has(album);
        var favouriteClass = isFavourite ? 'heart active' : 'heart';
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
                        <svg className={favouriteClass} viewBox="0 0 32 29.6"
                             onClick={this.favourite.bind(this, album)}>
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
