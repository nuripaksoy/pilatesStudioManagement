const express = require('express');
const { class_registrations, users, classes } = require('../models');
const router = express.Router();

// CREATE - Yeni Ders Kaydı Ekle
router.post('/', async (req, res) => {
  try {
    const { class_id, student_id, registered_at } = req.body;

    const newRegistration = await class_registrations.create({
      class_id,
      student_id,
      registered_at
    });

    res.status(201).json(newRegistration);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ - Tüm Ders Kayıtlarını Listele
router.get('/', async (req, res) => {
  try {
    const allRegistrations = await class_registrations.findAll({
      include: [users, classes] // Kullanıcı ve ders bilgilerini dahil et
    });
    res.json(allRegistrations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - Belirli Bir Ders Kaydını Getir
router.get('/:id', async (req, res) => {
  try {
    const registration = await class_registrations.findByPk(req.params.id, {
      include: [users, classes]
    });

    if (!registration) {
      return res.status(404).json({ error: 'Ders kaydı bulunamadı.' });
    }

    res.json(registration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE - Ders Kaydını Güncelle
router.put('/:id', async (req, res) => {
  try {
    const { class_id, student_id, registered_at } = req.body;

    const [updated] = await class_registrations.update(
      { class_id, student_id, registered_at },
      { where: { id: req.params.id } }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Ders kaydı bulunamadı.' });
    }

    const updatedRegistration = await class_registrations.findByPk(req.params.id);
    res.json(updatedRegistration);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE - Ders Kaydını Sil
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await class_registrations.destroy({ where: { id: req.params.id } });

    if (!deleted) {
      return res.status(404).json({ error: 'Ders kaydı bulunamadı.' });
    }

    res.json({ message: 'Ders kaydı başarıyla silindi.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
