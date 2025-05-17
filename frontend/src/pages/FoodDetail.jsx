import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getFoodById, deleteFood } from '../services/foodService';
import dayjs from 'dayjs';

export default function FoodDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getFoodById(id)
      .then(res => {
        setFood(res.data);
        setError(null);
      })
      .catch(() => setError('Error al cargar el alimento'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('¿Eliminar este alimento?')) {
      try {
        await deleteFood(id);
        navigate('/');
      } catch {
        alert('Error al eliminar el alimento');
      }
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!food) return <p>No se encontró el alimento.</p>;

  return (
    <div>
      <h1>{food.name}</h1>
      {food.imageUrl ? (
        <img src={food.imageUrl} alt={food.name} width={150} style={{ borderRadius: '8px' }} />
      ) : (
        <p>No hay imagen disponible.</p>
      )}
      <p><strong>Categoría:</strong> {food.category}</p>
      <p><strong>Cantidad:</strong> {food.quantity}</p>
      <p><strong>Fecha de caducidad:</strong> {dayjs(food.expirationDate).format('DD/MM/YYYY')}</p>

      <Link to={`/edit/${food._id}`}>Editar</Link> |{' '}
      <button onClick={handleDelete}>Eliminar</button> |{' '}
      <Link to="/">Volver a la lista</Link>
    </div>
  );
}
