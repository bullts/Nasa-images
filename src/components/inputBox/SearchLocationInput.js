import React, { useState, useEffect, useRef } from "react";
import * as API from "../utils/Fetch"
import "./SearchLocationInput.css";




/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (props) => {
    const [query, setQuery] = useState("");
    const autoCompleteRef = useRef(null);

    const fetchDataNominatim = async (query) => {
        const nominatimCoordinates = await API.fetchNominatim(query)
        props.coordinates(nominatimCoordinates.lat,nominatimCoordinates.lon);
    }

    let autoComplete;
    const loadScript = (url, callback) => {
        let script = document.createElement("script");
        script.type = "text/javascript";

        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = () => callback();
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    };

    function handleScriptLoad(updateQuery, autoCompleteRef) {
        autoComplete = new window.google.maps.places.Autocomplete(
            autoCompleteRef.current,
        );
        autoComplete.setFields(["name", "formatted_address"]);
        autoComplete.addListener("place_changed", () =>
            handlePlaceSelect(updateQuery)
        );
    }

    async function handlePlaceSelect(updateQuery) {
        const addressObject = autoComplete.getPlace();
        const query = addressObject.formatted_address;
        updateQuery(query);
        console.log(addressObject);
        console.log(query);
        fetchDataNominatim(query)
    }

    useEffect(() => {
        loadScript(
            `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places&amp;language=en`,
            () => handleScriptLoad(setQuery, autoCompleteRef)
        );
    }, []);

    return (
        <div className="search-location-input" >
            <input
                ref={autoCompleteRef}
                onChange={event => setQuery(event.target.value)}
                placeholder="Enter a place"
                value={query}
                className="search-location-input__input"
                
            />
        </div>
    );
}
