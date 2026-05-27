import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

//rotta di login
router.post('/login', (req, res) => {
	const {username, password } = req.body;

	//check per vedere se le credenziali sono correte
	if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
		const token = jwt.sign(
			{user: username},
			process.env.JWT_SECRET, 
			{expiresIn: '2h'}
		);

		//rispondiamo inviando il token al frontend
		return res.json({success: true, token});
	}
	
	
	//se sono sbagliate invece risponde con un messaggio errore 401
	return res.status(401).json({success: false, message: 'Username o Password errati!'})
});

export default router;