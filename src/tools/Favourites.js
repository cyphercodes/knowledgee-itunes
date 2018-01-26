class Favourites {
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

    static get() {
        var favs = JSON.parse(localStorage.getItem('favourites'));
        if (!favs) {
            favs = [];
        }
        return favs;
    }

    static set(favourites) {
        localStorage.setItem('favourites', JSON.stringify(favourites));
    }

    static clear() {
        this.set([]);
    }

    static has(album) {
        return (this.get().filter(fav => {
            return (fav.collectionId === album.collectionId);
        }).length > 0);
    }

    static remove(album) {
        this.set(this.get().filter(fav => {
            return (fav.collectionId !== album.collectionId);
        }));
    }

    static toggle(album) {
        if (this.has(album)) {
            this.remove(album);
        } else {
            this.add(album);
        }
    }
}

export default Favourites;