import React, { useState } from 'react';
import { Layout } from 'antd';
import SearchLocationInput from './inputBox/SearchLocationInput';
import PreviewMap from './previewMap/PreviewMap'
import NasaImage from './nasaImage/NasaImage'
import * as API from "./utils/Fetch"
import "./Main.css";



const { Header, Content, Footer } = Layout;


/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default () => {
    const [locationData, setLocationData] = useState([]);
    const [NasaData, setNASAData] = useState([]);

    const callbackCoordinates = (lat, lon) => {
        fetchDataNasa(lat, lon)
        setLocationData(lat + "+" + lon);
    }

    const fetchDataNasa = async (lat, lon) => {
        setNASAData(await API.fetchNASA(lat, lon))
        const dataNasa = await API.fetchNASA(lat, lon)
        setNASAData(dataNasa.url)
    }


    return (
        <Layout className="main__layout">
            <Header>
                <SearchLocationInput coordinates={callbackCoordinates} style={{ height: "100px" }} />
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div className="main__layout__content">
                    <NasaImage imageUrl={NasaData} className="main__layout__content__nasa-image"/>
                    <PreviewMap locationCoordinates={locationData} className="main__layout__content__preview-map"/>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Nasa-images</Footer>
        </Layout>
    );
};