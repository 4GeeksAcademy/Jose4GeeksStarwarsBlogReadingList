import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../store/appContext";
import { Dropdown, Badge } from "react-bootstrap";
import starWarsImage from '../../img/star-wars.png';


const Navbar = () => {
  const { store, actions } = useContext(Context);

  const addToFavorites = (item) => {
    actions.addToFavorites(item);
  };

  const removeFromFavorites = (item) => {
    actions.removeFromFavorites(item);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
      <div className="container-fluid">
        <Link to="/">
          <img src={starWarsImage} className="StarWarsImage"></img>
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
                      {item.name || item.properties?.name}
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