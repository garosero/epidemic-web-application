import React, {useEffect, useState} from 'react';
import { VectorMap } from '@south-paw/react-vector-maps';
import axios from 'axios';

const LocalCountry = ({children}) => {
    let baseUrl = '../SVGCountries/';

    const SVGCountry = children;
    const world= await import(baseUrl+SVGCountry)
                        .then(console.log(baseUrl+SVGCountry))
                        .catch(err=>console.log("No image"));




    return (
        <>
            <div className="Map">
                <VectorMap {...world} />
            </div>
        </>
    );
}

export default LocalCountry;