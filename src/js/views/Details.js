import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";

const Details = () => {
    const { store } = useContext(Context);
    const { category, id } = useParams();
    const entity = store[category].find(item => item.uid === id);

    return (
        <div className="container">
            <h1>Details for {entity.properties.name}</h1>
            <div>
                <strong>Height:</strong> {entity.properties.height}
            </div>
            <div>
                <strong>Mass:</strong> {entity.properties.mass}
            </div>
            <Link to="/">
                <button className="btn btn-primary">Back to Home</button>
            </Link>
        </div>
    );
};

export default Details;
