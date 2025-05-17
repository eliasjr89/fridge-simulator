import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createFood, getFoodById, updateFood } from '../services/foodService';

export default function FoodForm() {
  const { id } = useParams(); // Si hay id, estamos editando
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    expirationDate: '',
    imageUrl: '',
    quantity: 1, // Nuevo campo cantidad
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Si editamos, cargar datos existentes
  useEffect(() => {
    if (id) {
      setLoading(true);
      getFoodById(id)
        .then(res => {
          const food = res.data;
          setFormData({
            name: food.name,
            category: food.category,
            expirationDate: food.expirationDate.slice(0, 10), // para input date
            imageUrl: food.imageUrl || '',
            quantity: food.quantity || 1, // Cargar la cantidad existente
          });
          setLoading(false);
        })
        .catch(() => {
          setError('Error al cargar alimento');
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (id) {
        await updateFood(id, formData);
      } else {
        await createFood(formData);
      }
      navigate('/');
    } catch (err) {
      setError('Error al guardar alimento');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h1>{id ? 'Editar Alimento' : 'Agregar Alimento'}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label><br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Categoría:</label><br />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Fecha de Caducidad:</label><br />
          <input
            type="date"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Cantidad:</label><br />
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div>
          <label>URL de la Imagen:</label><br />
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Opcional"
          />
        </div>

        <button type="submit" disabled={loading}>
          {id ? 'Actualizar' : 'Agregar'}
        </button>
      </form>
    </div>
  );
}
