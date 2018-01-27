import React, {Component} from 'react';

/*
The react component for rendering an Artist
 */
class Artist extends Component {

    /*
    Handle the click event on an artist
    It sends it back to the main App component by using the click property on the <Artist> element
     */
    onClick(id) {
        this.props.click(id);
    }


    render() {
        var artist = this.props.artist;
        return (
            <li dir="auto"
                onClick={this.onClick.bind(this, artist.artistId)}>{artist.artistName}</li>
        )
    }
}

export default Artist;
