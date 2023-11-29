import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchNews } from '../services/NewService'; // Make sure the path is correct
import SearchBar from './SearchBar';
import '../../src/App.css'; // Ensure this path is correct
import axios from 'axios';
import DialogComponent from './DialogComponent'; // Adjust the path to where your DialogComponent is defined
import { useGeneratedContent } from '../contexts/GeneratedContentContext'; // Import the context hook


const NewsList =() => {
    const navigate = useNavigate();
    const { setGeneratedContent } = useGeneratedContent();
    const [newsItems, setNewsItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDialog, setShowDialog] = useState(false);

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

    const handleGenerateClick = async (newsItem) => {
        try {
                // Ensure the object passed here matches the structure of NewsItemSchema
            const payload = {
                id: newsItem.id,
                category: newsItem.category,
                title: newsItem.title,
                link: newsItem.link,
                image: newsItem.image,
                datetime_utc: newsItem.datetime_utc
            };

            const response = await axios.post('http://127.0.0.1:8000/generate-social-post', payload);
            console.log("Generated post:", response.data.generated_post); // Log the response data

            setGeneratedContent(response.data.generated_post); // Set the generated post
            navigate('/generate'); // Navigate to the generate page
            setShowDialog(true); // Open the dialog box
            console.log("Show dialog state:", showDialog); // Log the showDialog state AFTER calling setShowDialog

        } catch (error) {
            console.error("Error generating social media post:", error);
        }
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
                        <th>Image</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Link</th>
                        {/* <th>Date/Time</th> */}
                        <th>Actions</th> {/* New column for actions */}

                    </tr>
                </thead>
                <tbody>
                    {filteredItems.map(item => (
                        <tr key={item.id}>
                             <td>
                                {item.image ? <img src={item.image} alt={item.title} style={{ width: '100px' }} /> : 'No Image'}
                            </td>
                            <td>{item.title}</td>
                            <td>{item.category}</td>
                            <td>
                                {item.link ? <a href={item.link} target="_blank" rel="noreferrer">Link</a> : 'N/A'}
                            </td>
                            {/* <td>{item.datetime_utc}
                            </td> */}
                            <td>
                                <button onClick={() => handleGenerateClick(item)}>Generate</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* {showDialog && (
                <DialogComponent onClose={() => setShowDialog(false)}>
                    <p>{generatedPost}</p>
                </DialogComponent>
            )} */}
        </div>
    );
};

export default NewsList;
