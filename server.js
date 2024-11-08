import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

const users = []; // Simulation d'une base de données
const jwtSecret = 'votre_clé_secrète'; // Utilisez une clé secrète pour le JWT

app.post('/inscription', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: users.length + 1, firstName, lastName, email, password: hashedPassword };
    users.push(newUser);

    res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de l\'enregistrement de l\'utilisateur' });
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });

    if (result) {
      const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
      res.json({ message: 'Connexion réussie , bienvenue' });
    } else {
      res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }
  });
});

app.listen(5000, () => {
  console.log('Serveur démarré sur http://localhost:5000');
});
