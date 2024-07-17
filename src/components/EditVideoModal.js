import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { updateData } from '../api';
import './EditVideoModal.css';

Modal.setAppElement('#root');

function EditVideoModal({ isOpen, onRequestClose, video, onSave }) {
    const [formData, setFormData] = useState({
        id: video ? video.id : null,
        title: video ? video.title : '',
        category: video ? video.category : '',
        image: video ? video.image : '',
        videoUrl: video ? video.videoUrl : '',
        description: video ? video.description : ''
    });

    useEffect(() => {
        if (video) {
            setFormData({
                id: video.id,
                title: video.title,
                category: video.category,
                image: video.image,
                videoUrl: video.videoUrl,
                description: video.description
            });
        }
    }, [video]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await updateData(`URL_A_TU_API_DE_VIDEOS/${formData.id}`, formData);
        if (result) {
            onSave(result); // Actualiza la lista de videos en la vista principal
            onRequestClose(); // Cierra el modal
        }
    };

    const handleClear = () => {
        setFormData({
            title: '',
            category: '',
            image: '',
            videoUrl: '',
            description: ''
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Editar Video"
            className="Modal"
            overlayClassName="Overlay"
        >
            <div className="edit-video-modal">
                <button className="close-button" onClick={onRequestClose}>×</button>
                <h2>Editar Card</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Título</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Ingrese el título"
                        />
                    </div>
                    <div className="form-group">
                        <label>Categoría</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="">Seleccione una categoría</option>
                            <option value="frontend">Frontend</option>
                            <option value="backend">Backend</option>
                            <option value="innovacion">Innovación</option>
                            <option value="gestion">Gestión</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Imagen</label>
                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="Ingrese el enlace de la imagen"
                        />
                    </div>
                    <div className="form-group">
                        <label>Video</label>
                        <input
                            type="text"
                            name="videoUrl"
                            value={formData.videoUrl}
                            onChange={handleChange}
                            placeholder="Ingrese el enlace del video"
                        />
                    </div>
                    <div className="form-group">
                        <label>Descripción</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="¿De qué se trata este video?"
                        />
                    </div>
                    <div className="form-buttons">
                        <button type="submit">Guardar</button>
                        <button type="button" onClick={handleClear}>Limpiar</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default EditVideoModal;
