import React, { useEffect, useState } from 'react';
import { getFoods, deleteFood } from '../services/foodService';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

export default function FoodList() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const res = await getFoods();
      setFoods(res.data.foods); // Ajuste para acceder al array de alimentos
      setError(null);
    } catch (err) {
      setError('Error al cargar alimentos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar este alimento?')) {
      try {
        await deleteFood(id);
        fetchFoods();
      } catch (err) {
        alert('Error al eliminar alimento');
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  if (loading) return <p>Cargando alimentos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Mis Alimentos</h1>
      <Link to="/add">Agregar alimento</Link>
      {foods.length === 0 ? (
        <p>No hay alimentos registrados.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {foods.map((food) => (
            <li
              key={food._id}
              style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {food.imageUrl && (
                  <img
                    src={food.imageUrl}
                    alt={food.name}
                    width={50}
                    style={{ marginRight: '1rem', borderRadius: '5px' }}
                  />
                )}
                <div>
                  <strong>{food.name}</strong> - {food.category} <br />
                  Cantidad: {food.quantity} <br />
                  Caduca: {dayjs(food.expirationDate).format('DD/MM/YYYY')}
                  <br />
                  <Link to={`/food/${food._id}`}>Ver</Link> {' | '}
                  <Link to={`/edit/${food._id}`}>Editar</Link> {' | '}
                  <button onClick={() => handleDelete(food._id)}>Eliminar</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
