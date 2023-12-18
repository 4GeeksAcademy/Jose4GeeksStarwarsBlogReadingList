// appContext.js
import React, { useState, useEffect } from "react";
import getState from "./flux";

export const Context = React.createContext(null);

const injectContext = (PassedComponent) => {
  const StoreWrapper = (props) => {
    const [state, setState] = useState(
      getState({
        getStore: () => state.store,
        getActions: () => state.actions,
        setStore: (updatedStore) =>
          setState({
            store: Object.assign(state.store, updatedStore),
            actions: { ...state.actions },
          }),
      })
    );

    const setDetails = (details, category) => {
      setState((prevState) => {
        const updatedDetails = {
          ...prevState.store.details,
          [category]: details,
        };

        return {
          store: {
            ...prevState.store,
            details: updatedDetails,
          },
          actions: { ...prevState.actions },
        };
      });
    };

    const removeFromFavorites = (item) => {
      const updatedFavorites = state.store.favorites.filter((fav) => fav.uid !== item.uid);
      setState({ store: { ...state.store, favorites: updatedFavorites }, actions: { ...state.actions, setDetails } });
    };

    const addToFavorites = (item) => {
      const isDuplicate = state.store.favorites.some((fav) => fav.uid === item.uid);

      if (!isDuplicate) {
        const updatedFavorites = [...state.store.favorites, item];
        setState({ store: { ...state.store, favorites: updatedFavorites }, actions: { ...state.actions, setDetails } });

        // Display a notification or log the name of the added favorite
        console.log(`Added to favorites: ${item.properties && item.properties.name}`);
      }
    };

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch("https://www.swapi.tech/api/people");
          const data = await response.json();
          console.log("Data from SWAPI:", data); // Log the data
          state.actions.setPeople(data.results);
        } catch (error) {
          console.error("Error fetching data from SWAPI", error);
        }
      };

      fetchData();
    }, []);

    return (
      <Context.Provider value={{ ...state, actions: { ...state.actions, removeFromFavorites, addToFavorites, setDetails } }}>
        <PassedComponent {...props} />
      </Context.Provider>
    );
  };

  return StoreWrapper;
};

export default injectContext;
