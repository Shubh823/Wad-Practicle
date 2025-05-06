
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const path = require('path');
const { JWT_SECRET_KEY, PORT } = require('./config/config');

// Initialize express
const app = express();

// Middleware
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));  // Set views folder

// Temporary user storage (In a real app, you'd use a database)
let users = [];

// Helper function to generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET_KEY, { expiresIn: '1h' });
};

// Serve the registration page
app.get('/register', (req, res) => {
  res.render('register'); // Render the 'register.ejs' file
});

// Register Route - POST /register
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // Check if the user already exists
  const userExists = users.find((user) => user.email === email);
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = { id: users.length + 1, email, password: hashedPassword };
  users.push(newUser);

  // Send response
  const token = generateToken(newUser);
  res.status(201).json({ message: 'User registered successfully', token });
});

// Serve the login page
app.get('/login', (req, res) => {
  res.render('login'); // Render the 'login.ejs' file
});

// Login Route - POST /login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = users.find((user) => user.email === email);
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  // Compare passwords
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

  // Generate JWT token
  const token = generateToken(user);
  res.status(200).json({ message: 'Login successful', token });
});

app.get('/', (req, res) => {
    res.redirect('/register'); // Redirect
})
// Define verifyToken function first
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) return res.status(403).json({ message: 'Token required' });
  
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Invalid or expired token' });
  
      req.user = decoded;
      next();
    });
  };
  
  // Now you can use the verifyToken middleware
  app.get('/protected', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Welcome to the protected route', user: req.user });
  });
  

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
