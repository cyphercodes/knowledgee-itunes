/*
Class responsible for all operations to the iTunes API
 */
class Api {

    static url = 'https://itunes.apple.com';

    /*
    Send a request to the API to search for artists that match a specific search term
     */
    static searchArtists(term) {
        return fetch(this.url + '/search?term=' + term + '&entity=musicArtist');
    }


    /*
    Send a request to the API to lookup albums for a specific artist by Artist ID
     */
    static lookupAlbums(artistId) {
        return fetch(this.url + '/lookup?id=' + artistId + '&entity=album');
    }

}

export default Api;