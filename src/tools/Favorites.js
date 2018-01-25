class Favorites {
    static add(id) {
        var favorites = this.get();
        if (!favorites || favorites.length < 1) {
            favorites = [];
        }
        favorites.push(id);
        this.set(favorites);
    }

    static get() {
        return JSON.parse(localStorage.getItem('favorites'));
    }

    static set(favorites) {
        favorites = favorites.filter(function (value, index, self) {
            return self.indexOf(value) === index;
        });
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    static clear() {
        this.set([]);
    }

    static has(id) {
        var favorites = this.get();
        return favorites.includes(id);
    }

    static remove(id) {
        var favorites = this.get();
        var index = favorites.indexOf(id);
        favorites.splice(index, 1);
        this.set(favorites);
    }
}

export default Favorites;