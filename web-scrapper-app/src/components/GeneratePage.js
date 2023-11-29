import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { useGeneratedContent } from '../contexts/GeneratedContentContext';
import 'react-quill/dist/quill.snow.css'; // Include the Quill CSS
import axios from 'axios';
import { Button } from 'react-bootstrap';

const GeneratePage = () => {
    const { generatedContent, setGeneratedContent } = useGeneratedContent();

    const saveContent = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/save-content',{ content: generatedContent });
            console.log(response.data);
            alert('Content saved!');
        } catch (error) {
            console.error('Error saving content:', error);
        }
    };

    return (
        <div>
            <ReactQuill theme="snow" value={generatedContent} onChange={setGeneratedContent} />
            <Button onClick={saveContent}>Save</Button>
            <Button onClick={() => setGeneratedContent('')}>Cancel</Button>
        </div>
    );
};

export default GeneratePage;
