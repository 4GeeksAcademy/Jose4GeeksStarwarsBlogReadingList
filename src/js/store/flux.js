// flux.js
const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            demo: [
                // Your existing demo data remains here
            ],
            people: [], // New state to store people data from SWAPI
            favorites: [] // New state to store favorites
        },
        actions: {
            // Your existing actions remain here

            setPeople: people => {
                // Update the store with people data from SWAPI
                setStore({ people });
            },

            addToFavorites: item => {
                // Add item to favorites
                const store = getStore();
                setStore({ favorites: [...store.favorites, item] });
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
