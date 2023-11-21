import React from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';

const Sidebar = ({ searchTerm, setSearchTerm, onSearch, onGenerate, generateTerm, setGenerateTerm }) => {
  return (
    <div className="sidebar">
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search News..."
          className="me-2"
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="outline-success" onClick={onSearch}>Search</Button>
      </Form>
      <Form className="d-flex mt-3">
        <FormControl
          type="text"
          placeholder="Enter text..."
          className="me-2"
          aria-label="Generate"
          value={generateTerm}
          onChange={(e) => setGenerateTerm(e.target.value)}
        />
        <Button variant="primary" onClick={onGenerate}>Generate</Button>
      </Form>
    </div>
  );
};

export default Sidebar;
