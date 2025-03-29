import {
  createContext,
  useState,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";

const BASE_URL = "http://localhost:5003";
const CitiesContext = createContext();

const initState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };

    case "rejected":
      return { ...state, error: action.payload, isLoading: false };

    default:
      throw new Error("Unknown action type!");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initState
  );

  const stableDispatch = useCallback(dispatch, []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      stableDispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`, {
          signal: controller.signal,
        });
        const data = await res.json();
        stableDispatch({ type: "cities/loaded", payload: data });
      } catch (e) {
        if (e.name !== "AbortError") {
          stableDispatch({
            type: "rejected",
            payload: "There was an error loading data:(",
          });
        }
      }
    }

    fetchData();

    return () => controller.abort();
  }, [stableDispatch]);

  const getCity = useCallback(
    async (id) => {
      if (currentCity?.id === Number(id)) return;
      stableDispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        stableDispatch({ type: "city/loaded", payload: data });
      } catch (e) {
        stableDispatch({
          type: "rejected",
          payload: "There was an error loading city data :(",
        });
      }
    },
    [currentCity, stableDispatch]
  );

  const createCity = useCallback(
    async (newCity) => {
      stableDispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCity),
        });
        const data = await res.json();
        stableDispatch({ type: "city/created", payload: data });
      } catch (e) {
        stableDispatch({
          type: "rejected",
          payload: "There was an error creating city :(",
        });
      }
    },
    [stableDispatch]
  );

  const deleteCity = useCallback(
    async (id) => {
      stableDispatch({ type: "loading" });
      try {
        await fetch(`${BASE_URL}/cities/${id}`, {
          method: "DELETE",
        });
        stableDispatch({ type: "city/deleted", payload: id });
      } catch (e) {
        stableDispatch({
          type: "rejected",
          payload: "There was an error deleting city :(",
        });
      }
    },
    [stableDispatch]
  );

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside of the CitiesProvider!");
  return context;
}

export { CitiesProvider, useCities };
