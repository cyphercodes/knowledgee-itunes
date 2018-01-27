/*
Class that handles favourites in a localStorage item and contains all the needed operations on them
Favourites are stored in localStorage and will be retrieved as an array with all their information

To add an item to Favourites, you can simply do:
Favourites.add(album);

To get an array of all the favourite albums, do:
var albums = Favourites.get();
 */
class Favourites {

    /*
    Add an album to our list of favourites
     */
    static add(album) {
        var favourites = this.get();
        if (!favourites || favourites.length < 1) {
            favourites = [];
        }
        if (!this.has(album)) {
            favourites.push(album);
        }
        this.set(favourites);
    }

    /*
    Get an array of all the albums in our list of favourites
     */
    static get() {
        var favs = JSON.parse(localStorage.getItem('favourites'));
        if (!favs) {
            favs = [];
        }
        return favs;
    }

    /*
    This set is used as a shorthand to all localStorage set operations for our favourites
     */
    static set(favourites) {
        localStorage.setItem('favourites', JSON.stringify(favourites));
    }

    /*
    Empties our favourites
     */
    static clear() {
        this.set([]);
    }

    /*
    Checks if a specific album exists as a favourite
     */
    static has(album) {
        return (this.get().filter(fav => {
            return (fav.collectionId === album.collectionId);
        }).length > 0);
    }

    /*
    Removes a specific album rom our favourites
     */
    static remove(album) {
        this.set(this.get().filter(fav => {
            return (fav.collectionId !== album.collectionId);
        }));
    }

    /*
    A shorthand to quickly toggle between adding and removing an album from favourites depending on if it already exists or not
     */
    static toggle(album) {
        if (this.has(album)) {
            this.remove(album);
        } else {
            this.add(album);
        }
    }

    /*
    Get a list of unique artists which at least one of their albums is in the favourites list
    This is used for the 'Filter by Artist' select field in the 'My Favourites' section
     */
    static getArtists() {
        return this.get().map(fav => {
            return fav.artistName
        }).filter((elem, index, self) => {
            return index === self.indexOf(elem);
        });
    }

    /*
    Get the list of favourite albums that are by one specific artist specified by the artist's name
    This is used to actually filter out the favourite albums by artist in the 'My Favourites' section
     */
    static getWithArtistName(name = 'all') {
        if (name === 'all') {
            return this.get();
        }
        return this.get().filter(fav => {
            return fav.artistName === name;
        })
    }
}

export default Favourites;