import React from 'react';
import { deleteData } from '../api';
import './VideoCard.css';

function VideoCard({ video, onEdit, onDelete }) {
    const handleDelete = async () => {
        const confirmDelete = window.confirm('¿Estás seguro de querer eliminar este video?');
        if (confirmDelete) {
            await deleteData(`https://videos.pexels.com/video-files/12099321/12099321-sd_640_360_25fps.mp4/${video.id}`);
            onDelete(video.id);
        }
    };

    return (
        <div className="video-card">
            <img src={video.image} alt={video.title} />
            <div className="video-info">
                <h3>{video.title}</h3>
                <p>{video.description}</p>
                <div className="video-buttons">
                    <button onClick={handleDelete}>Borrar</button>
                    <button onClick={onEdit}>Editar</button>
                </div>
            </div>
        </div>
    );
}

export default VideoCard;
