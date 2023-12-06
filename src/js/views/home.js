import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../store/appContext";

const Home = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container">
            <h1>Star Wars Characters</h1>
            <ul className="list-group">
                {store.people.map(person => (
                    <li key={person.uid} className="list-group-item d-flex justify-content-between">
                        <Link to={`/details/people/${person.uid}`}>
                            <span>{person.properties && person.properties.name}</span>
                        </Link>
                        <button
                            className="btn btn-success"
                            onClick={() => actions.addToFavorites(person)}>
                            <FontAwesomeIcon icon={faHeart} />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
