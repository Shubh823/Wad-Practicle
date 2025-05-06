
//you can test this apis uning https://hoppscotch.io/



const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let users = []; // In-memory array

// CREATE
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  users.push({ id: users.length + 1, name, email });
  res.status(201).json({ message: 'User added', users });
});

// READ ALL
app.get('/users', (req, res) => {
  res.json(users);
});

// READ ONE
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (user) res.json(user);
  else res.status(404).json({ message: 'User not found' });
});

// UPDATE
app.put('/users/:id', (req, res) => {
  const { name, email } = req.body;
  const user = users.find(u => u.id == req.params.id);
  if (user) {
    user.name = name;
    user.email = email;
    res.json({ message: 'User updated', user });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// DELETE
app.delete('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id == req.params.id);
  if (index !== -1) {
    users.splice(index, 1);
    res.json({ message: 'User deleted' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
