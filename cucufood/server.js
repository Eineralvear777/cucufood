const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos desde cuFront
app.use(express.static(path.join(__dirname, 'cuFront')));

// Redirigir la raíz al lobby.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'cuFront', 'lobby.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
