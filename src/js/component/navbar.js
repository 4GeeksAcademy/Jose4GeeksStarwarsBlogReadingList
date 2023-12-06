// navbar.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../store/appContext";
import { Dropdown, Badge } from "react-bootstrap";

const Navbar = () => {
    const { store, actions } = useContext(Context);

    const removeFromFavorites = (item) => {
        actions.removeFromFavorites(item);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
            <div className="container-fluid">
                <Link to="/">
                    <span className="navbar-brand">React Boilerplate</span>
                </Link>

                <div className="navbar-collapse">
                    <div className="navbar-nav ms-auto">
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-favorites">
                                Favorites <Badge bg="secondary">{store.favorites.length}</Badge>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {store.favorites.map((item, index) => (
                                    <Dropdown.Item key={`${item.uid}-${index}`}>
                                        <div className="dropdown-link">
                                            {item.properties && item.properties.name}
                                        </div>
                                        <button className="btn btn-danger" onClick={() => removeFromFavorites(item)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
