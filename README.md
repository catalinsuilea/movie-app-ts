# About app

Movie Pilot App

The Movie Info App allows users to explore a vast collection of movies, providing detailed information about each film. Users can search for movies, sort them based on rating and genre, and even add movies to their favorites list. The app is designed to be mobile-responsive, ensuring a seamless user experience on various devices.

# Features
Movie Search: Easily search for movies and access comprehensive information about them.
Sorting: Sort movies by rating, genre, and other criteria to find the perfect film.
User Authentication: Users can register and log in to personalize their experience and add movies to their favorites.
Favorites: Users can maintain a list of their favorite movies.
Movie Details: Dive deeper into any movie by accessing its detailed information.
Mobile Responsiveness: The app is optimized for mobile devices, providing a smooth experience on smartphones and tablets.

# Data Sources
Movie Data: Movie information is sourced from The Movie Database, accessed via endpoints provided by the database.
User Authentication: Firebase Authentication is used for user registration and login.
Favorites Management: Firebase is used as a database to handle users' favorite movies.

# Technical Implementation
Frontend Framework: The app is built using React with TypeScript, ensuring type safety throughout the codebase.
Contexts: Contexts, such as AuthenticationContext and useFavouritesContext, are created to manage user authentication and favorites. Also, useDeviceTypeContext was created to handle the responsiveness of the app.
Responsiveness: The app is designed to be responsive and adaptable to various screen sizes.

# User Journey
Initial Arrival: Users land on the app's homepage.
User Authentication: Users have the option to log in to their account to access additional features like adding movies to their favorites. After creating an account or logging in, they are redirected to the homepage, where their username appears near the welcome message above the search bar.
Favourites Page: Logged-in users can visit the "Your Favorites" page by clicking the "Your Account" link from the top right corner.
Mobile Navigation: On mobile devices, users can access the "Favorites" page by clicking the hamburger menu and selecting "Your Favorites."


# Coming soon

This app will keep be updating. The next features to come are: 
Search suggestions when typing on the search bar, view trailers, new endpoints from The movie database to show more movies, for example: most viewed, most watched this month etc.
Actors/actress details page
TV Shows page
Reviews

# Contributors
Catalin Șuilea - developer

# Acknowledgments

Thanks to The Movie Database for providing movie data.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
