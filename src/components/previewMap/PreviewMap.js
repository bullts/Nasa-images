import React, { useState, useEffect } from "react";
import "./PreviewMap.css";


/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (props) => {
    const [previewLocation, setPreviewLocation] = useState();

    useEffect(() => {
        setPreviewLocation(props.locationCoordinates)
    }, [props.locationCoordinates]);


    return (
        <div>
            { typeof previewLocation === 'string' ? (
                <iframe
                    title="Preview Map"
                    className="preview-map__iframe"
                    loading="lazy"
                    src={`http://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_API_KEY}&q=${previewLocation}&zoom=11.5`}>
                </iframe>
            ) : (
                " "
            )}
        </div>
    )
}
