import React, { useState } from 'react';

const DiseaseContext = React.createContext({});

const DiseaseProvider = ({children}) => {
    const [disease, setDisease] = useState('covid19');
    const value = {
        disease,
        setDisease
    };

    return (
        <DiseaseContext.Provider value={value}>
            {children}
        </DiseaseContext.Provider>
    )
};

export {
    DiseaseProvider,
    DiseaseContext
};

export default DiseaseContext;