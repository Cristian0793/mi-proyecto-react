import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { fetchData } from './api';
import './App.css';
import Banner from './components/Banner/Banner';
import CategorySection from './components/CategorySection/CategorySection';
import EditVideoModal from './components/EditVideoModal/EditVideoModal';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import NewVideoPage from './components/NewVideoPage';

function App() {
    const [videos, setVideos] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const fetchedVideos = await fetchData();
        setVideos(fetchedVideos);
    };

    const handleDelete = (id) => {
        setVideos(videos.filter(video => video.id !== id));
    };

    const openModal = (video) => {
        setSelectedVideo(video);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const saveChanges = (updatedVideo) => {
        const updatedVideos = videos.map(video => video.id === updatedVideo.id ? updatedVideo : video);
        setVideos(updatedVideos);
    };

    const categorizeVideos = (videos) => {
        return videos.reduce((acc, video) => {
            const category = video.category.toLowerCase();
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(video);
            return acc;
        }, {});
    };

    const videosByCategory = categorizeVideos(videos);

    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/nuevo-video">
                        <NewVideoPage />
                    </Route>
                    <Route path="/">
                        <Header />
                        <Banner />
                        <div className="categories">
                            {Object.keys(videosByCategory).map(category => (
                                <CategorySection
                                    key={category}
                                    title={category.charAt(0).toUpperCase() + category.slice(1)}
                                    videos={videosByCategory[category]}
                                    onEdit={openModal}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                        <EditVideoModal isOpen={modalIsOpen} onRequestClose={closeModal} video={selectedVideo} onSave={saveChanges} />
                        <Footer />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
