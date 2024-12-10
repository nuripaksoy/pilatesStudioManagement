const express = require('express');
const { notifications, users } = require('../models');
const router = express.Router();

// CREATE - Yeni Bildirim Ekle
router.post('/', async (req, res) => {
  try {
    const { student_id, message, notification_type, sent_at, status } = req.body;

    const newNotification = await notifications.create({
      student_id,
      message,
      notification_type,
      sent_at,
      status
    });

    res.status(201).json(newNotification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ - Tüm Bildirimleri Listele
router.get('/', async (req, res) => {
  try {
    const allNotifications = await notifications.findAll({
      include: [users]
    });
    res.json(allNotifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - Belirli Bir Bildirimi Getir
router.get('/:id', async (req, res) => {
  try {
    const notification = await notifications.findByPk(req.params.id, {
      include: [users]
    });

    if (!notification) {
      return res.status(404).json({ error: 'Bildirim bulunamadı.' });
    }

    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE - Bildirim Güncelle
router.put('/:id', async (req, res) => {
  try {
    const { message, notification_type, status } = req.body;

    const [updated] = await notifications.update(
      { message, notification_type, status },
      { where: { id: req.params.id } }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Bildirim bulunamadı.' });
    }

    const updatedNotification = await notifications.findByPk(req.params.id);
    res.json(updatedNotification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE - Bildirimi Sil
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await notifications.destroy({ where: { id: req.params.id } });

    if (!deleted) {
      return res.status(404).json({ error: 'Bildirim bulunamadı.' });
    }

    res.json({ message: 'Bildirim başarıyla silindi.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
