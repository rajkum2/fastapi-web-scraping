import React, { useState, useEffect } from 'react';
import { fetchNews } from '../services/NewService'; // Make sure the path is correct
import SearchBar from './SearchBar';
import '../../src/App.css'; // Ensure this path is correct

const NewsList = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchNews(); // No need to adjust parameters
                console.log("Fetched data:", data); // Log the response data
                setNewsItems(data); // Assuming 'data' is the array of news items
                setFilteredItems(data); // Set filtered items to the full list initially
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };

        loadData();
    }, []);

    const handleSearch = () => {
        const filtered = newsItems.filter(item =>
            item.title?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredItems(filtered);
    };

    const handleClear = () => {
        setFilteredItems(newsItems);
        setSearchTerm('');
    };

    return (
        <div>
            <SearchBar 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
                onSearch={handleSearch} 
                onClear={handleClear} 
            />
            <table className="news-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Category</th>
                        <th>Title</th>
                        <th>Link</th>
                        <th>Image</th>
                        <th>Date/Time</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.category}</td>
                            <td>{item.title}</td>
                            <td>
                                {item.link ? <a href={item.link} target="_blank" rel="noreferrer">Link</a> : 'N/A'}
                            </td>
                            <td>
                                {item.image ? <img src={item.image} alt={item.title} style={{ width: '100px' }} /> : 'No Image'}
                            </td>
                            <td>{item.datetime_utc}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NewsList;
