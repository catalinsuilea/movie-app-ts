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
JWT-based authentication (register, login, logout)
- Browse movies, actors, TV series from TheMovieDB API
- User reviews and ratings
- Payment integration for premium features
- Change password & reset password with email notifications
- User profile page with editable details
- Multiple sort & filter options
  
 ## 🛠 **Tech Stack**
- Frontend: React, React Router, Context API, CSS/SCSS
- Backend: Node.js, Express.js
- Database: MongoDB
- External API: TheMovieDB
- Auth: JWT (access & refresh tokens)
- Emails: Nodemailer
- Payments: Stripe / PayPal (mock or live)
- Cloud: Google Kubernetes Engine (GKE)
- CI/CD: GitHub Actions

## ⚙ **Architecture**
- React frontend → communicates with Node.js backend (REST API)
- Backend handles business logic, payments, emails, user management
- MongoDB stores users, reviews, favourites, payments
- TheMovieDB API provides live movie & actor data
- Dockerized services, deployed on GKE

## 📦 Project structure
- `/backend`: Node.js + Express.js backend, JWT auth, payments, emails
- `/src`: React frontend (TS), pages, components, context
- `/k8s`: Kubernetes manifests (deployments, services)
- `/public`: static assets and icons
- `docker-compose.yml`: local development setup

# Contributors
Catalin Șuilea - developer

# Acknowledgments

Thanks to The Movie Database for providing movie data.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

## 🧪 **How to run locally**
1. Clone the repo

git clone https://github.com/yourusername/movie-app-ts.git
cd movie-app-ts

cd frontend
npm install
cd ../backend
npm install

Add .env files for backend (Mongo URI, JWT secrets, TMDB API key, email creds, payment keys)

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
