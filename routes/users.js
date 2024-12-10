const express = require('express');
const { users } = require('../models'); // Sequelize modelini içe aktar
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { first_name, last_name, email, phone_number, password_hash } = req.body;

    const newUser = await users.create({
      first_name,
      last_name,
      email,
      phone_number,
      password_hash,
      role: 'student' // Varsayılan rol
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const allUsers = await users.findAll();
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await users.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { first_name, last_name, email, phone_number } = req.body;

    const [updated] = await users.update(
      { first_name, last_name, email, phone_number },
      { where: { id: req.params.id } }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    const updatedUser = await users.findByPk(req.params.id);
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await users.destroy({ where: { id: req.params.id } });

    if (!deleted) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    res.json({ message: 'Kullanıcı başarıyla silindi.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
