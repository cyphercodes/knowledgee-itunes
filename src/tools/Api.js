class Api {

    static url = 'https://itunes.apple.com';

    static searchArtists(term) {
        return fetch(this.url + '/search?term=' + term + '&entity=musicArtist');
    }

    static lookupAlbums(artistId) {
        return fetch(this.url + '/lookup?id=' + artistId + '&entity=album');
    }

}

export default Api;