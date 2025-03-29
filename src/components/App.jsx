import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../pages/AppLayout";
import HomePage from "../pages/Homepage";
import Login from "../pages/Login";
import Pricing from "../pages/Pricing";
import Product from "../pages/Product";
import PageNotFound from "../pages/PageNotFound";
import CityList from "./CityList/CityList";
import CountryList from "./CountryList/CountryList";
import City from "./City/City";
import Form from "./Form/Form";
import { CitiesProvider } from "../contexts/CitiesContext";
import { AuthProvider } from "../contexts/FakeAuthContext";
import ProtectedRoute from "../pages/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
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
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
