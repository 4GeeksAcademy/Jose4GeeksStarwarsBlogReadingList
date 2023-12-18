import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";
import { Context } from "../store/appContext";

const placeholderImageUrl = "https://via.placeholder.com/150";

const Home = () => {
  const { store, actions } = useContext(Context);
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([]);

  const fetchDetails = async (url, category, uid) => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.message === "ok") {
        actions.setDetails(data.result.properties, category, uid);
      } else {
        console.error(`Error fetching details from ${url}: ${data.message}`);
      }
    } catch (error) {
      console.error(`Error fetching details from ${url}`, error);
    }
  };

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch("https://www.swapi.tech/api/people");
        const data = await response.json();
        setCharacters(data.results);
        data.results.forEach((character) => {
          fetchDetails(character.url, "people", character.uid);
        });
      } catch (error) {
        console.error("Error fetching characters from SWAPI", error);
      }
    };

    const fetchPlanets = async () => {
      try {
        const response = await fetch("https://www.swapi.tech/api/planets");
        const data = await response.json();
        setPlanets(data.results);
        data.results.forEach((planet) => {
          fetchDetails(planet.url, "planets", planet.uid);
        });
      } catch (error) {
        console.error("Error fetching planets from SWAPI", error);
      }
    };

    fetchCharacters();
    fetchPlanets();
  }, []);

  const getDetails = (uid, category) => {
    const details = store.details && store.details[category] && store.details[category][uid];
    return details || {};
  };

  const addToFavorites = (item) => {
    actions.addToFavorites(item);
  };

  return (
    <div className="container">
      <h2 className="title">Characters</h2>
      <div className="card-container">
        {characters.map((character) => {
          const characterDetails = getDetails(character.uid, "people");

          return (
            <Card key={character.uid} className="card">
              <img className="card-img-top" src={placeholderImageUrl} alt="Placeholder" />
              <Card.Body className="card-body">
                <Card.Title>{character.name}</Card.Title>
                {Object.keys(characterDetails).length > 0 && (
                  <>
                    <Card.Text>
                      <strong>Gender:</strong> {characterDetails.gender || "Unknown"}
                    </Card.Text>
                    <Card.Text>
                      <strong>Eye Color:</strong> {characterDetails.eye_color || "Unknown"}
                    </Card.Text>
                    <Card.Text>
                      <strong>Hair Color:</strong> {characterDetails.hair_color || "Unknown"}
                    </Card.Text>
                  </>
                )}
                <div className="card-buttons">
                  <Link to={`/details/people/${character.uid}`} className="btn btn-primary learn-more-btn">
                    Learn More!
                  </Link>
                  <button className="btn btn-warning btnHeart" onClick={() => addToFavorites(character)}>
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>
      <h2 className="title">Planets</h2>
      <div className="card-container">
        {planets.map((planet) => {
          const planetDetails = getDetails(planet.uid, "planets");

          return (
            <Card key={planet.uid} className="card">
              <img className="card-img-top " src={placeholderImageUrl} alt="Placeholder" />
              <Card.Body className="card-body">
                <Card.Title>{planet.name}</Card.Title>
                {Object.keys(planetDetails).length > 0 && (
                  <>
                    <Card.Text>
                      <strong>Population:</strong> {planetDetails.population || "Unknown"}
                    </Card.Text>
                    <Card.Text>
                      <strong>Climate:</strong> {planetDetails.climate || "Unknown"}
                    </Card.Text>
                    <Card.Text>
                      <strong>Terrain:</strong> {planetDetails.terrain || "Unknown"}
                    </Card.Text>
                  </>
                )}
                <div className="card-buttons">
                  <Link to={`/details/planets/${planet.uid}`} className="btn btn-primary learn-more-btn">
                    Learn More!
                  </Link>
                  <button className="btn btn-warning btnHeart" onClick={() => addToFavorites(planet)}>
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
