import React, { useState, useEffect } from 'react';
import { fetchNews } from '../services/NewService';
import SearchBar from './SearchBar';

const NewsList = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchNews(); // Adjust parameters as needed
                setNewsItems(data.items || []);
                setFilteredItems(data.items || []);
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };

        loadData();
    }, []);

    const handleSearch = () => {
        const filtered = newsItems.filter(item =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredItems(filtered);
    };

    return (
        <div>
            <SearchBar 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
                onSearch={handleSearch} 
            />
            <table>
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
                                <a href={item.link} target="_blank" rel="noreferrer">Link</a>
                            </td>
                            <td>
                                <img src={item.image} alt={item.title} style={{ width: '100px' }} />
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