// flux.js
const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      demo: [
        // Your existing demo data remains here
      ],
      people: [], // New state to store people data from SWAPI
      planets: [], // New state to store planets data from SWAPI
      favorites: [] // New state to store favorites
    },
    actions: {
      // Your existing actions remain here

      setPeople: people => {
        // Update the store with people data from SWAPI
        console.log("Setting people data:", people); // Log the people data
        setStore({ people });
      },

      setPlanets: planets => {
        // Update the store with planets data from SWAPI
        console.log("Setting planets data:", planets); // Log the planets data
        setStore({ planets });
      },

      addToFavorites: item => {
        // Add item to favorites if not already present
        const store = getStore();
        const isDuplicate = store.favorites.some(fav => fav.uid === item.uid);

        if (!isDuplicate) {
          setStore({ favorites: [...store.favorites, item] });
          console.log(`Added to favorites: ${item.name}`);
        }
      },

      removeFromFavorites: item => {
        // Remove item from favorites
        const store = getStore();
        const updatedFavorites = store.favorites.filter(fav => fav.uid !== item.uid);
        setStore({ favorites: updatedFavorites });
      }
    }
  };
};

export default getState;
