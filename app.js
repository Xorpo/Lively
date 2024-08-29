const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express;
const router = express.Router();
const ws = require('WebSocket');
const port = '8081';
const connection = ('./db');

console.log('azz');

//create new user
router.post('/', (req, res) => {
    const newUser = new User({
      email:req.body.email,
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      password:$2a$10$,
      phoneNumber:req.body.phoneNumber,
    });

    newUser.save()
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        res.json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//read users
router.get('/', (req, res) => {
    User.find()
    .then((users) => {
        res.json(users);
    })
    .catch((error) => {
        res.status(500).json({ error: error.message });
    });
});

router.put('/:userId', (req, res) => {
    const userId = req.params.userId;
  
    User.findOneAndUpdate(
      { _id: userId },
      {
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phoneNumber: req.body.phoneNumber,
      },
      { new: true } // resend doc
    )
      .then((user) => {
        res.json(user);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  });
//delete user by id
router.delete('/:userId', (req, res) => {
    const userId = req.params.userId;
  
    User.findByIdAndRemove(userId)
      .then(() => {
        res.json({ message: 'Utilisateur supprimé avec succès' });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  });


  ws.onmessage = (event) => { 
    // Parsing the JSON message received from the server 
    const message = JSON.parse(event.data); 
    // Updating the UI based on the received message data 
  }; 
    
  ws.send('Hello from the client!'); 

  const wsServer = new WebSocket.Server({ port: 3000 });
wsServer.on('connection', (socket) => {
socket.onmessage = (event) => {
const message = JSON.parse(event.data);

socket.send('Server response');
};
});