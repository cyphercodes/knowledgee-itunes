# Knowledge E iTunes Project
This project allows you to search the iTunes API by artist name to get a list of albums for a specific artist.

Then, it allows you to add the albums you like to a list of favourites.

Finally, it allows you to view & manage your favourites with the option of filtering your favourites by artist.

This project is built using React and pure (framework-less) CSS

## Implementation Decisions

### Framework & Tools:

It was decided to use pure React without added tools or libraries to get a better view on the core power of React.

For example, a single page application was done manually and react-router was not used.

Also, data and states were handled purely by react in a very basic way without introducing tools such as Redux or Flux.

This will help understand React better and appreciate the power & benefits of the add-on tools when we use them later in more advanced projects.

### Directory Structure & Code Explanation

The main component for the app is `App.js` which is located in the root of `src`.

Then we have two main directories, `components` and `tools`.

In `tools` you can find all the javascript classes that help us clean our code and simplify code usability. 

In `components`, you can find all the additional React components for the project

#### `tools/API.js`

This class handles the HTTP requests made to the iTunes API.

The methods inside are static for easier usability and they return a promise for better control of the responses.

It was decided to use the `fetch` JavaScript function for the API calls since all our requests are GET methods and they are very simple and straightforward.

#### `tools/Favourites.js`

This class handles the storage of favourite albums.

The way it does it is by using localStorage to make them persistent (across refreshes & even closing/opening of the app).

Since localStorage only allows the storage of strings, and to shortcut the import and use of a tool like SQlite, we have added methods to encode the data into a JSON string on the SET operation and decode it back to an actual JavaScript object on the GET operation.

This class has methods for easily adding and deleting favourite albums to our localStorage. In those methods, there's even logic to make sure no entry is repeated in our storage.

In addition, it has methods for other operations like filtering the favourite albums by artist name and getting an array of unique artist names to be used in the select filter in the `My Favourites` tab.


#### `components/Artist.js`

This Raact component is responsible for rendering the HTML for a single Artist.

It simply creates an HTML list item element that contains the artist's name and allows that element to be click-able with proper handling of the clicks and sending those click events to the main `App.js` component for proper handling and navigation.

#### `components/Album.js`

This React component is responsible for rendering the HTML for a single Album. 

It formats and displays the data in a nice structure that can be nicely styled with CSS.

#### `App.js`

This is the main React component for our app.

It contains the main logic and rendering of the whole application.

#### `index.css`

This CSS stylesheet contains a mini developed framework to take care of the responsiveness of our application and main styles that would be commonly used.

It has a simple bootstrap-like grid system with rows and 12 total columns in each row.

#### `App.css`

This CSS stylesheet contains all of the class-specific styles for our application.

## How to run the code

First, you have to make sure that you have NodeJS installed.

Then, simply clone the repository in your local environment and run:

```
npm install
npm run
```

You should get a webpack mini-server running that you can navigate to in your browser. 

The URL will be displayed in your command prompt window.

## How to use the application

Simply type in the artist name in the search box you find and just as soon as you finish typing, the results from the iTunes API should automatically show up below.

Click on the artist you require, and a list of the artist's albums will show up with some basic information.

To add an album to your favourites, simply click on the heart next to that album.

To view you favourites, click on the `My Favourites` button under the search box.

To remove an album from your favourites, click on the red heart next to it. The album will still appear in your favourites but with a white heart until the next favourites refresh. This gives you the benefit of keeping the album in sight to quickly re-favourite it in case you removed it by mistake.

To filter your favourites by a specific artist, select an artist from the `Filter by Artist` drop-down at the top right of you favourites list.

In addition, a blue `Search` button is available to quickly navigate back to your most recent search results.
 
