import mongoose from 'mongoose';

const piattoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Il nome del piatto è obbligatorio'],
    trim: true
  },
  prezzo: {
    type: Number,
    required: [true, 'Il prezzo è obbligatorio']
  },
  ingredienti: {
    type: String,
    required: [true, 'Gli ingredienti sono obbligatori']
  },
  categoria: {
    type: String,
    required: [true, 'La categoria è obbligatoria'],
    trim: true
  },
  vegano: {
    type: Boolean,
    default: false
  },
  disponibile: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true // Crea automaticamente i campi "createdAt" e "updatedAt" (utilissimi per sapere quando hai aggiunto un piatto)
});

// Esportiamo il modello. MongoDB creerà automaticamente una collezione chiamata "piattos" (o "piatti") nel database
const Piatto = mongoose.model('Piatto', piattoSchema);
export default Piatto;