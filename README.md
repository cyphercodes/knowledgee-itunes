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

### Directory Structure

The main component for the app is `App.js` which is located in the root of `src`.

Then we have two main directories, `components` and `tools`.

In `tools` you can find all the javascript classes that help us clean our code and simplify code usability. 

In `components`, you can find all the additional React components for the project