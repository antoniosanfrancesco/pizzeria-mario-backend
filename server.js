import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import piattiRoutes from './routes/piattiRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; 

// 1. MIDDLEWARE 
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());


// 3. ROTTE DI PROVA E DEL MENU
app.get('/', (req, res) => {
  res.send('Il server del Ristorante Da Mario è connesso al database! 🍕');
});

app.use('/api/piatti', piattiRoutes);
app.use('/api/auth', authRoutes);

// 2. ACCENDIAMO SUBITO IL SERVER 
app.listen(PORT, () => {
  console.log(`🚀 Server in esecuzione alla grande su http://localhost:${PORT}`);
});


// 4. CONNESSIONE A MONGOOB ASINCRONA IN FONDO
console.log('⏳ Tento la connessione a MongoDB Atlas...');
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🍃 Connesso con successo a MongoDB Atlas!'))
  .catch((err) => console.error('❌ Errore di connessione al database:', err));

	export default app;