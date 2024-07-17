import React from 'react';
import './CategorySection.css';
import VideoCard from './VideoCard';

function CategorySection({ title, videos, onEdit, onDelete }) {
    return (
        <div className="category-section">
            <h2>{title}</h2>
            <div className="video-list">
                {videos.map(video => (
                    <VideoCard key={video.id} video={video} onEdit={onEdit} onDelete={onDelete} />
                ))}
            </div>
        </div>
    );
}

export default CategorySection;
