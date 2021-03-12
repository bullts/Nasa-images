import React, { useState, useEffect } from "react";
import "./NasaImage.css";



/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (props) => {
    const [nasaImageUrl, setNasaImageUrl] = useState();


    useEffect(() => {
        setNasaImageUrl(props.imageUrl)
    }, [props.imageUrl]);

    return (
        <div>
            { typeof nasaImageUrl === 'string' ? (
                <img
                alt="from nasa satelite"
                src={nasaImageUrl}
                className="nasa-image__img"
                style={{ padding: '20px' }}
            />
            ) : (
                " "
            )}
        </div>
    )
}