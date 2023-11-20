import React, { useState } from 'react';
import NewsList from './components/NewList';
import SearchBar from './components/SearchBar';

const App = () => {
    return (
        <div className="App">
            <h1>News Dashboard</h1>
            <NewsList />
        </div>
    );
};

export default App;
