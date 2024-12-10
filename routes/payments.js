const express = require('express');
const { payments, users, packages } = require('../models');
const router = express.Router();

// CREATE - Yeni Ödeme Ekle
router.post('/', async (req, res) => {
  try {
    const { student_id, package_id, amount, payment_method, transaction_id, payment_date } = req.body;

    const newPayment = await payments.create({
      student_id,
      package_id,
      amount,
      payment_method,
      transaction_id,
      payment_date
    });

    res.status(201).json(newPayment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ - Tüm Ödemeleri Listele
router.get('/', async (req, res) => {
  try {
    const allPayments = await payments.findAll({
      include: [users, packages] // İlişkili kullanıcı ve paket bilgileri
    });
    res.json(allPayments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - Belirli Bir Ödemeyi Getir
router.get('/:id', async (req, res) => {
  try {
    const payment = await payments.findByPk(req.params.id, {
      include: [users, packages]
    });

    if (!payment) {
      return res.status(404).json({ error: 'Ödeme bulunamadı.' });
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE - Ödeme Bilgilerini Güncelle
router.put('/:id', async (req, res) => {
  try {
    const { amount, payment_method, transaction_id, payment_date } = req.body;

    const [updated] = await payments.update(
      { amount, payment_method, transaction_id, payment_date },
      { where: { id: req.params.id } }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Ödeme bulunamadı.' });
    }

    const updatedPayment = await payments.findByPk(req.params.id);
    res.json(updatedPayment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE - Ödemeyi Sil
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await payments.destroy({ where: { id: req.params.id } });

    if (!deleted) {
      return res.status(404).json({ error: 'Ödeme bulunamadı.' });
    }

    res.json({ message: 'Ödeme başarıyla silindi.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
