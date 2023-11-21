import React, { useState, useEffect } from 'react';
import { fetchNews } from './services/NewService'; // Update the import path
import Sidebar from './components/Sidebar';
import NewsList from './components/NewsList';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure you've installed React Bootstrap
import { Container, Row, Col } from 'react-bootstrap';
import './App.css'; // Ensure the path is correct
import Header from './components/Header'; // Import the Header component

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
    <div>
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
          <NewsList
            newsItems={filteredItems}
            setNewsItems={setNewsItems}
            filteredItems={filteredItems}
            setFilteredItems={setFilteredItems}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default App;
