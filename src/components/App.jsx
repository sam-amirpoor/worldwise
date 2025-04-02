import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { CitiesProvider } from "../contexts/CitiesContext";
import { AuthProvider } from "../contexts/FakeAuthContext";
import ProtectedRoute from "../pages/ProtectedRoute";

// import AppLayout from "../pages/AppLayout";
// import HomePage from "../pages/Homepage";
// import Login from "../pages/Login";
// import Pricing from "../pages/Pricing";
// import Product from "../pages/Product";
// import PageNotFound from "../pages/PageNotFound";

const AppLayout = lazy(() => import("../pages/AppLayout"));
const HomePage = lazy(() => import("../pages/HomePage"));
const Login = lazy(() => import("../pages/Login"));
const Pricing = lazy(() => import("../pages/Pricing"));
const Product = lazy(() => import("../pages/Product"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));

import CityList from "./CityList/CityList";
import CountryList from "./CountryList/CountryList";
import City from "./City/City";
import Form from "./Form/Form";
import SpinnerFullPage from "./SpinnerFullPage/SpinnerFullPage";

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route
                path="/"
                element={<HomePage />}
              />
              <Route
                path="login"
                element={<Login />}
              />
              <Route
                path="pricing"
                element={<Pricing />}
              />
              <Route
                path="product"
                element={<Product />}
              />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route
                  index
                  element={
                    <Navigate
                      replace
                      to="cities"
                    />
                  }
                />
                <Route
                  path="cities"
                  element={<CityList />}
                />
                <Route
                  path="cities/:id"
                  element={<City />}
                />
                <Route
                  path="countries"
                  element={<CountryList />}
                />
                <Route
                  path="form"
                  element={<Form />}
                />
              </Route>
              <Route
                path="*"
                element={<PageNotFound />}
              />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
