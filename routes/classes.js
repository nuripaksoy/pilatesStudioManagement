const express = require('express');
const { classes, users } = require('../models');
const router = express.Router();

// CREATE - Yeni Ders Ekle
router.post('/', async (req, res) => {
  try {
    const { name, start_time, end_time, max_capacity, instructor_id } = req.body;

    const newClass = await classes.create({
      name,
      start_time,
      end_time,
      max_capacity,
      instructor_id
    });

    res.status(201).json(newClass);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ - Tüm Dersleri Listele
router.get('/', async (req, res) => {
  try {
    const allClasses = await classes.findAll({
      include: [{ model: users, as: 'instructor' }]
    });
    res.json(allClasses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - Belirli Bir Dersi Getir
router.get('/:id', async (req, res) => {
  try {
    const classItem = await classes.findByPk(req.params.id, {
      include: [{ model: users, as: 'instructor' }]
    });

    if (!classItem) {
      return res.status(404).json({ error: 'Ders bulunamadı.' });
    }

    res.json(classItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE - Ders Bilgilerini Güncelle
router.put('/:id', async (req, res) => {
  try {
    const { name, start_time, end_time, max_capacity } = req.body;

    const [updated] = await classes.update(
      { name, start_time, end_time, max_capacity },
      { where: { id: req.params.id } }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Ders bulunamadı.' });
    }

    const updatedClass = await classes.findByPk(req.params.id);
    res.json(updatedClass);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE - Dersi Sil
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await classes.destroy({ where: { id: req.params.id } });

    if (!deleted) {
      return res.status(404).json({ error: 'Ders bulunamadı.' });
    }

    res.json({ message: 'Ders başarıyla silindi.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
