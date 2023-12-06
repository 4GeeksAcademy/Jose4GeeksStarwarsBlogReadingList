import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const Favorites = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container">
            <h1>Favorites</h1>
            <ul className="list-group">
                {store.favorites.map(item => (
                    <li key={item.uid} className="list-group-item d-flex justify-content-between">
                        <div>
                            <Link to={`/details/${item.category}/${item.uid}`} className="dropdown-link">
                                {item.properties && item.properties.name}
                            </Link>
                            <button
                                className="btn btn-danger"
                                onClick={() => actions.removeFromFavorites(item)}>
                                Remove
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <br />
            <Link to="/">
                <button className="btn btn-primary">Back to Home</button>
            </Link>
        </div>
    );
};

export default Favorites;
