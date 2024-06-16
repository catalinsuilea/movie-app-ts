import { Route, Routes } from "react-router-dom";
import "./App.css";
import MovieDetails from "../MovieDetails/MovieDetails";
import WelcomePage from "../WelcomePage/WelcomePage";
import { ChakraProvider } from "@chakra-ui/react";
import { myNewTheme } from "../../../styles/theme";
import SearchMovie from "../SearchMovie/SearchMovie";
import SignUp from "../SignUp/signup";
import { SignInFormComponent } from "../SignUp/SignInFormComponent";
import { AuthProvider } from "../../contexts/AuthenticationContext";
import { DeviceTypeProvider } from "../../contexts/useDeviceTypeContext";
import Header from "../Header/Header";
import { Footer } from "./Footer";
import { FavouritesPage } from "../Favourites/Favourites";
import { FavouritesContextProvider } from "../../contexts/useFavouritesContext";
import { PrivateRoute } from "../ProtectedRoute";
import { PersonDetails } from "../MovieDetails/PersonDetails";
import { EpisodeDetails } from "../TVShowDetails/EpisodeDetails";
import { MediaPage } from "../Header/Pages/MediaPage";
import AccountPage from "../account/AccountPage";
import { ResetPasswordEmailForm } from "../ResetPassword/ResetPasswordEmailForm";
import { ResetPasswordForm } from "../ResetPassword/ResetPasswordForm";
import { SuccessPage } from "../account/SuccessPage";
import { CancelPage } from "../account/CancelPaymentPage";

function App() {
  return (
    <ChakraProvider theme={myNewTheme}>
      <DeviceTypeProvider>
        <AuthProvider>
          <FavouritesContextProvider>
            <div className="app-container">
              <Header />
              <main className="main-content">
                <Routes>
                  <Route path="/movie-app-ts" element={<WelcomePage />}>
                    <Route
                      path="/movie-app-ts/search/:searchValue"
                      element={<SearchMovie />}
                    ></Route>
                    <Route
                      path="/movie-app-ts/search/:searchValue"
                      element={<SearchMovie />}
                    ></Route>
                  </Route>

                  <Route
                    path="/movie-app-ts/:mediaType"
                    element={<MediaPage />}
                  />

                  <Route
                    path="/:mediaType/:name/:id"
                    element={<MovieDetails />}
                  ></Route>
                  <Route
                    path="/person/:personName/:id"
                    element={<PersonDetails />}
                  ></Route>
                  <Route
                    path="/tv/:seriesName/:seriesSeason/:seriesEpisode/:id"
                    element={<EpisodeDetails />}
                  ></Route>
                  <Route
                    path="/signIn"
                    element={<SignInFormComponent />}
                  ></Route>
                  <Route path="/signUp" element={<SignUp />}></Route>
                  <Route
                    path="/favourites"
                    element={
                      <PrivateRoute>
                        <FavouritesPage />
                      </PrivateRoute>
                    }
                  ></Route>
                  <Route
                    path="/user-account/:userId"
                    element={
                      <PrivateRoute>
                        <AccountPage />
                      </PrivateRoute>
                    }
                  ></Route>
                  <Route
                    path="/checkout/success/:premiumToken"
                    element={
                      <PrivateRoute>
                        <SuccessPage />
                      </PrivateRoute>
                    }
                  ></Route>
                  <Route
                    path="/checkout/cancel"
                    element={<CancelPage />}
                  ></Route>
                  <Route
                    path="/reset-password/sendMail"
                    element={<ResetPasswordEmailForm />}
                  ></Route>
                  <Route
                    path="/reset/:token"
                    element={<ResetPasswordForm />}
                  ></Route>
                  <Route
                    path="/reset/auth/:userId"
                    element={<ResetPasswordForm />}
                  ></Route>
                </Routes>
              </main>
              <Footer />
            </div>
          </FavouritesContextProvider>
        </AuthProvider>
      </DeviceTypeProvider>
    </ChakraProvider>
  );
}

export default App;
