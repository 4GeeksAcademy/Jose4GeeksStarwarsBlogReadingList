import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const placeholderImageUrl = "https://via.placeholder.com/600x400";

const Details = () => {
    const { category, id } = useParams();
    const { store } = useContext(Context);
    const [details, setDetails] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://www.swapi.tech/api/${category}/${id}`);
                const data = await response.json();
                console.log("Details data from SWAPI:", data);
                setDetails(data.result.properties);
            } catch (error) {
                console.error("Error fetching details from SWAPI", error);
            }
        };

        fetchData();
    }, [category, id]);

    if (!details) {
        return <h1>Loading details...</h1>;
    }

    // Define a mapping between API property names and display names
    const displayNameMapping = {
        height: "Height",
        mass: "Mass",
        hair_color: "Hair Color",
        skin_color: "Skin Color",
        eye_color: "Eye Color",
        birth_year: "Birth Year",
        gender: "Gender",
        name: "Name",
        climate: "Climate",
        population: "Population",
        orbital_period: "Orbital Period",
        rotation_period: "Rotation Period",
        diameter: "Diameter",
    };

    // Filter out unwanted properties
    const filteredDetails = Object.fromEntries(
        Object.entries(details).filter(([key]) => key in displayNameMapping)
    );

    return (
        <div>
            <div className="container-fluid DetailsPage">
                <img className="placeholder-image" src={placeholderImageUrl} alt="Placeholder" />
                <div className="InfoText">
                    <h1>{details.name}</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum magna turpis, sollicitudin eget commodo id, posuere vitae quam. Praesent scelerisque, massa et blandit volutpat, libero nisl viverra urna, id pharetra tellus mi gravida justo. Sed non nibh sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi non vulputate tellus. Nullam at velit non nunc maximus sagittis eget eu tortor. Sed non nibh a mauris consectetur elementum.</p>
                </div>
            </div>
            <ul className="horizontal-list">
                {Object.entries(filteredDetails).map(([key, value]) => (
                    <li key={key}>
                        <strong>{displayNameMapping[key]}:</strong> {value}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Details;
