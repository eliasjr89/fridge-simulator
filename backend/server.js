import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import foodRoutes from './routes/foodRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

app.use('/api', foodRoutes)

app.get('/', (req, res) => {
    res.send('API de Simulación de Nevera funcionando...')
});

// Middleware para errores no capturados
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal, intenta más tarde' });
});

// Conexión a MongoDB
mongoose.connect(MONGO_URI)
.then(() => {
    console.log('✅ MongoDB conectado');
    app.listen(PORT, () => {
        console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    });
})
.catch((err) => {
    console.error('❌ Error conectando a MongoDB:', err.message);
  });