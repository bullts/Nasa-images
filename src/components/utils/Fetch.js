
export const fetchNominatim = async (name) => {
    try {
        const data = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${name}&format=json&accept-language=en&limit=1`
        );
        const loc = await data.json();
        return loc[0];
    } catch (err) {
        console.log(err)
    }
};

export const fetchNASA = async (lat, lon) => {
    try {
        const data = await fetch(
            `https://api.nasa.gov/planetary/earth/assets?lat=${lat}&lon=${lon}&dim=0.2&api_key=${process.env.REACT_APP_NASA_API_KEY}
            `
        );
        const loc = await data.json();
        return loc;
    } catch (err) {
        console.log(err)
    }
};