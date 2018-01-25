import React, {Component} from 'react';

class Artist extends Component {

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
