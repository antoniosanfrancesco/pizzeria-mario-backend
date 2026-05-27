import jwt from 'jsonwebtoken';

const autenticaToken = (req, res, next) => {
  // 1. Recuperiamo il token dall'header della richiesta HTTP
  const authHeader = req.headers['authorization'];
  
  // Il formato standard è: "Bearer <TOKEN>". Estraiamo solo il token stringa.
  const token = authHeader && authHeader.split(' ')[1];

  // Se non c'è nessun token, blocchiamo subito l'accesso
  if (!token) {
    return res.status(401).json({ success: false, message: 'Accesso negato! Token mancante.' });
  }

  try {
    // 2. Verifichiamo se il token è valido ed è stato firmato con la nostra CHIAVE SEGRETA
    const verificato = jwt.verify(token, process.env.JWT_SECRET);
    
    // Salviamo i dati dell'utente dentro la richiesta (può tornare utile)
    req.user = verificato;
    
    // 3. TUTTO OK! Passiamo la mano alla rotta successiva (es. salvare la pizza)
    next(); 
  } catch (err) {
    // Se il token è scaduto o contraffatto, restituiamo un errore 403 (Proibito)
    return res.status(403).json({ success: false, message: 'Token non valido o scaduto!' });
  }
};

export default autenticaToken;