import express from 'express';
import Piatto from '../models/Piatto.js';
import autenticaToken from '../middleware/auth.js'; // <-- 1. IMPORTA IL MIDDLEWARE

const router = express.Router();

// LEGGE TUTTI I PIATTI (Resta pubblica per i clienti)
router.get('/', async (req, res) => {
  try {
    const piatti = await Piatto.find(); //prende tutti i piatti
    res.json(piatti); //li trasforma in JSON
  } catch (error) {
    res.status(500).json({message: 'Errore nel recuper del menu', error: error.message })
  }
});

//  AGGIUNGI UN PIATTO (Protetta)
router.post('/', autenticaToken, async (req, res) => {
  try {
    //creiamo un piatto con i dati inviati dal frontend 
    const nuovoPiatto = new Piatto(req.body);
    const piattoSalvato = await nuovoPiatto.save(); //lo salviamo nel database
    res.status(201).json(piattoSalvato); //rispondiamo dicendo che è stato creato
  } catch (error){
    res.status(400).json({message: 'Errore nella creazione del piatto', error: error.message});
  }
});


//  CANCELLA UN PIATTO (Protetta + Corretto l'ordine req, res!)
router.delete('/:id', autenticaToken, async (req, res) => {
  try {
    const { id } = req.params; //legge id dall'indirizzo web
    const piattoEliminato = await Piatto.findByIdAndDelete(id); //cancella dal db

    if(!piattoEliminato) {
      return res.status(404).json({message: 'Piatto non trovato'});
    }

    // Nota: Ho corretto le virgolette in backtick `` per far funzionare il template literal ${}
    res.json({message: `Il piatto "${piattoEliminato.nome}" è stato eliminato dal menu`});
  } catch (error) {
    res.status(500).json({message: 'Errore nella cancellazione del piatto', error: error.message});
  }
});

//  MODIFICA UN PIATTO (Protetta)
router.put('/:id', autenticaToken, async (req, res) => {
  try {
    const { id } = req.params;
    const piattoAggiornato = await Piatto.findByIdAndUpdate(id, req.body, { new: true});
    
    if(!piattoAggiornato) {
      return res.status(404).json({message: 'Piatto non trovato'});
    }

    res.json(piattoAggiornato);

  } catch (error) {
      res.status(400).json({message: 'Errore nella modifica del piatto', error: error.message });
  }
}); 


export default router;