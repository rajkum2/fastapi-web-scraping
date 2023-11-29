import React, { createContext, useState, useContext } from 'react';

const GeneratedContentContext = createContext();

export const useGeneratedContent = () => useContext(GeneratedContentContext);

export const GeneratedContentProvider = ({ children }) => {
    const [generatedContent, setGeneratedContent] = useState('');

    return (
        <GeneratedContentContext.Provider value={{ generatedContent, setGeneratedContent }}>
            {children}
        </GeneratedContentContext.Provider>
    );
};
