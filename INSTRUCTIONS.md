# Weekend Movies Saga

## Adding a "Details View" to a Movie App

For this weekend challenge you'll be expanding on a movie management application! We're already able to see the movies that exist in our database.

We'll need to be able to see a detailed view for each individual movie, including all genres associated with that movie. This is a very common pattern, to go from a list to showing more information about a single item.

## Database Setup

1. Create a database named `saga_movies_weekend`.
2. Run the queries from `database.sql` on the `saga_movies_weekend` database.

## Get Everything Up and Running

1. `npm install`.
2. `npm run test` to verify that the Cypress tests run.
    - One test (`✓ E2E: Loads Movies Correctly`) should pass, while three other tests should fail.
    - Be sure to let us know immediately if this doesn't work.
3. `npm run server` to run the server on port 5001.
4. `npm run client` to run the React app on port 5173.

## Notes

### Table Relationships

- One genre can be applied to many different movies.
- One movie can have multiple genres.

This 👆 is a **many-to-many relationship**! Junction table time! 😎

We've given you the database, complete with a `movies_genres` junction table.
 
### Movie Poster Images

We've added some movie posters to the `public/images` folder, and the database is set up to use them. If you want to use your own posters, you'll need to add the files there and modify the `database.sql` file.

## Feature List

Be sure to start by **taking inventory of the existing code**. It's more common to be tasked with adding to or modifying an existing web application than it is to build one from scratch. Making your way into a codebase, getting your bearings, and working to form a clear picture of what's already in place is an **incredibly crucial** skill.

It is also worth noting that some of the pre-existing code will only be necessary for the "Add Movie Page" stretch goal. Specifically, **for base mode, you will not need** to utilize:
- The `POST /api/movies` route.
- The `GET /api/genres` route.
- The `genres` reducer.

### Home/List Page

- [x] This view displays all of the movies in the movie database. 

- [ ] When a movie poster (`<img>` element) is clicked, a user should be brought to the details page.

- [x] Each of the "movie items" on this page each must have a `data-testid="movieItem"` attribute.

- [ ] Each of the movie items' posters (`<img>` elements) on this page must have a `data-testid="toDetails"` attribute.


### Details Page

- [ ] This view should show all details **including ALL the genres** for the selected movie, as well as the title, description, and poster image. Use Sagas and Redux to handle these requests and data. 

- [ ] The details page must have a `data-testid="movieDetails"` attribute.

- [ ] The details page must have a "back to movie list" button, which should bring the user back to the Home/List Page.

- [ ] The "back to movie list" button must have a `data-testid="toList"` attribute.

Hint: You can make a `GET` request for a specific movie! Remember `req.params` and `:id`?

## General Considerations

As one of your last projects, it's possible you will be sharing this with employers, so be sure to follow best practices and make it look good!

- [ ] Invest some time in styling it up.
    - [ ] Research cards for your movie posters on the list page.
    - [ ] Research grid for your movie posters on the Movie List page.
- [ ] Commit your code frequently! You should have at 15+ commits on a project of this size. Use branches to help break down your features.
- [ ] Comment your code.
- [ ] Update the `README` to include a description of the project in your own words.

---

## Stretch Goals

### 1. Add Movie Page

This should show:

- an input field (for the movie title)
- an input field (for the movie poster image URL)
- a textarea (for the movie description)
- a dropdown (to choose a **single** genres)
    - being able to select **multiple** genres would be neat, but only attempt that if you get this stretch goal working with choosing a single genre

The add movie page should have these buttons:

- `Cancel` button, which should bring the user to the Home/List Page.
- `Save` button, which should save these inputs in the database and bring the user back to the Home/List Page (which now includes the new movie).

**Note: Some stuff for this stretch goal already exists!**

- Look at the `POST /api/movies` route. It's been made already! It will perform two queries: one to store the movie information and another to store its associated genre in the junction table.
- You'll want to use the genres that are in the database, along with the `genres` reducer, to populate your dropdown.

### 2. Refresh-able Details Page w/ `useParams`

Allow the app to still work when the details page gets refreshed.

- The React Router route for the details page would be something like `/#/details/1` for the movie with an id of `1`. Research the `useParams` hook for React Router. (Be sure to look for **version 5**, or **v5**.)

### 3. Edit Page

On the details page, add an edit button that brings the user to the edit page.

This new page should show:

- an input field (for changing the movie title), for the selected movie
- a textarea (for changing the movie description)

The edit page should have these buttons:

- `Cancel` button, which should bring the user to the Details Page.
- `Save` button, which should update the title and description in the database and bring the user back to the Details Page.

### Other Ideas

- [ ] Display the current values in the input (title) and textarea (description) on the Edit Page
- [ ] Move sagas and reducers out of your `store.js` and into separate files (ideally in `src/redux/reducers/` and `src/redux/sagas/` folders).
- [ ] Allow the user to add a genre to a movie.
- [ ] Allow the user to remove a genre from a movie.
- [ ] Only display the top 10 movies, and allow the user to search for movie titles with a search bar on the home page (you can do this on the client side or the server side, server side is a bigger stretch, but good practice).
