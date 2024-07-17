import React, { useState } from 'react';
import { postData } from '../api';
import './NewVideoForm.css';

function NewVideoForm() {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        image: '',
        videoUrl: '',
        description: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        let formErrors = {};
        if (!formData.title) formErrors.title = 'El título es obligatorio';
        if (!formData.category) formErrors.category = 'La categoría es obligatoria';
        if (!formData.image) formErrors.image = 'El enlace es obligatorio';
        if (!formData.videoUrl) formErrors.videoUrl = 'El enlace del video es obligatorio';
        return formErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            const result = await postData('https://videos.pexels.com/video-files/12099321/12099321-sd_640_360_25fps.mp4', formData);
            if (result) {
                console.log('Video creado:', result);
                // Opcionalmente, resetear el formulario o redireccionar al usuario
                setFormData({
                    title: '',
                    category: '',
                    image: '',
                    videoUrl: '',
                    description: ''
                });
            }
        } else {
            setErrors(formErrors);
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
        setErrors({});
    };

    return (
        <div className="new-video-form">
            <h1>Nuevo Video</h1>
            <p>Complete el formulario para crear una nueva tarjeta de video</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Título</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Ingrese el título"
                        className={errors.title ? 'error' : ''}
                    />
                    {errors.title && <span className="error-message">{errors.title}</span>}
                </div>
                <div className="form-group">
                    <label>Categoría</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className={errors.category ? 'error' : ''}
                    >
                        <option value="">Seleccione una categoría</option>
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="innovacion">Innovación</option>
                        <option value="gestion">Gestión</option>
                    </select>
                    {errors.category && <span className="error-message">{errors.category}</span>}
                </div>
                <div className="form-group">
                    <label>Imagen</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="Ingrese el enlace de la imagen"
                        className={errors.image ? 'error' : ''}
                    />
                    {errors.image && <span className="error-message">{errors.image}</span>}
                </div>
                <div className="form-group">
                    <label>Video</label>
                    <input
                        type="text"
                        name="videoUrl"
                        value={formData.videoUrl}
                        onChange={handleChange}
                        placeholder="Ingrese el enlace del video"
                        className={errors.videoUrl ? 'error' : ''}
                    />
                    {errors.videoUrl && <span className="error-message">{errors.videoUrl}</span>}
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
    );
}

export default NewVideoForm;
