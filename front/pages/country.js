import React from 'react';
import CountryMap from '../components/CountryMap';
import DiseaseProvider from '../context/DiseaseContext';
//import CountryChart from '../components/CountryChart';

const country = () => {
    return (
        <>
            <CountryMap />
        </>
    );
}

export default country;