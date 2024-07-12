const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'La llaveee';

//Al final del programa hay disponible unos template para usar como casos de prueba.
//Se pueden descomentar y colocar en donde sea necesario.

// Analizar el cuerpo de las solicitudes
app.use(bodyParser.json());

// Usuario harcodeado para el login
const hardcodedUser = {
  username: 'Bielsa',
  password: 'PW2023',
};

// Endpoint de login
app.post('/login', (req, res) => {
  const { user, password } = req.body;

  // Verificar credenciales
  if (user === hardcodedUser.username && password === hardcodedUser.password) {
    // Generar token JWT
    const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: '1h' });

    res.json({
      Error: false,
      Mensaje: 'Login exitoso',
      Retorno: token,
    });
  } else {
    res.status(401).json({
      Error: true,
      Mensaje: 'Credenciales incorrectas',
    });
  }
});

// Verificar el token en las rutas protegidas
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(403).json({
      Error: true,
      Mensaje: 'Token no proporcionado',
    });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        Error: true,
        Mensaje: 'Token no válido',
      });
    }

    req.user = decoded.user;
    next();
  });
};

// Rutas protegidas
app.use(verifyToken);

// Obtener todos los jugadores
app.get('/players', (req, res) => {
    res.json({
      Error: false,
      Mensaje: 'Listado de jugadores obtenido con éxito',
      Retorno: players,
    });
  });
  
// Obtener un jugador por ID
app.get('/players/:id', (req, res) => {
    const playerId = req.params.id;
    const player = players.find((p) => p.id === playerId);
  
    if (player) {
      res.json({
        Error: false,
        Mensaje: 'Jugador encontrado',
        Retorno: player,
      });
    } else {
      res.status(404).json({
        Error: true,
        Mensaje: 'Jugador no encontrado',
      });
    }
  });
  
  // Agregar un nuevo jugador
app.post('/players', (req, res) => {
    const newPlayer = req.body;
    players.push(newPlayer);
  
    res.json({
      Error: false,
      Mensaje: 'Jugador agregado con éxito',
      Retorno: newPlayer,
    });
  });
  
  // Modificar un jugador por ID
app.put('/players/:id', (req, res) => {
    const playerId = req.params.id;
    const updatedPlayer = req.body;
  
    const index = players.findIndex((p) => p.id === playerId);
  
    if (index !== -1) {
      players[index] = { ...players[index], ...updatedPlayer };
  
      res.json({
        Error: false,
        Mensaje: 'Jugador modificado con éxito',
        Retorno: players[index],
      });
    } else {
      res.status(404).json({
        Error: true,
        Mensaje: 'Jugador no encontrado',
      });
    }
  });
  
  // Eliminar un jugador por ID
app.delete('/players/:id', (req, res) => {
    const playerId = req.params.id;
    players = players.filter((p) => p.id !== playerId);
  
    res.json({
      Error: false,
      Mensaje: 'Jugador eliminado con éxito',
    });
  });

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});


// datos de prueba para jugadores
/*let players = [
    { id: '0', name: 'Player 1', position: 'GK', suspended: false, injured: false },
    { id: '1', name: 'Player 2', position: 'DF', suspended: false, injured: false },
    // Se pueden agregar más jugadores según sea necesario
  ];*/