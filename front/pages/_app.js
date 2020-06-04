import React from 'react';
import Head from 'next/head'
import PropTypes from 'prop-types';
import AppLayout from '../components/AppLayout';
import {DiseaseProvider} from '../context/DiseaseContext';

const Epidemic = ({Component}) => {
   return (
    <DiseaseProvider>
        <Head>
            <title>epidemic</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css" />
        </Head>
        <AppLayout>
            <Component />
        </AppLayout>
    </DiseaseProvider>
   );
};

// Epidemic.prototypes = {
//     Component : PropTypes.elementType,
// }

export default Epidemic;
