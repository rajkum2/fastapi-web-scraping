import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GeneratedContentProvider } from './contexts/GeneratedContentContext'; // Import the context provider
import { fetchNews } from './services/NewService'; // Update the import path
import Sidebar from './components/Sidebar';
import NewsList from './components/NewsList';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure you've installed React Bootstrap
import { Container, Row, Col } from 'react-bootstrap';
import './App.css'; // Ensure the path is correct
import Header from './components/Header'; // Import the Header component
import GeneratePage from './components/GeneratePage'; // Adjust the path as necessary

const App = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchNews(); // Update the function based on actual export
      setNewsItems(data);
      setFilteredItems(data);
    };

    loadData();
  }, []);

  const handleSearch = () => {
    const filtered = newsItems.filter(item =>
      item.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleClearSearch = () => {
    setFilteredItems(newsItems);
    setSearchTerm('');
  };

  return (
    <GeneratedContentProvider> {/* Wrap your components with the context provider */}
      <Router>
        <Header /> {/* Include the Header at the top */}
        <Container fluid>
        <Row>
            <Col md={4}>
              <Sidebar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onSearch={handleSearch}
                onClear={handleClearSearch}
              />
            </Col>
            <Col md={8}>
              <Routes> {/* Define your routes within the Routes component */}
                <Route path="/" element={<NewsList
                                            newsItems={filteredItems}
                                            setNewsItems={setNewsItems}
                                            filteredItems={filteredItems}
                                            setFilteredItems={setFilteredItems}
                                            searchTerm={searchTerm}
                                            setSearchTerm={setSearchTerm}
                                          />} />
                <Route path="/generate" element={<GeneratePage />} />
                {/* Add additional routes as needed */}
              </Routes>
            </Col>
          </Row>
        </Container>
      </Router>
    </GeneratedContentProvider>

  );
};

export default App;
