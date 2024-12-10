const express = require('express');
const { packages } = require('../models');
const router = express.Router();

// CREATE - Yeni Paket Ekle
router.post('/', async (req, res) => {
  try {
    const { name, total_lessons, price, description } = req.body;

    const newPackage = await packages.create({
      name,
      total_lessons,
      price,
      description
    });

    res.status(201).json(newPackage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ - Tüm Paketleri Listele
router.get('/', async (req, res) => {
  try {
    const allPackages = await packages.findAll();
    res.json(allPackages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - Belirli Bir Paketi Getir
router.get('/:id', async (req, res) => {
  try {
    const package = await packages.findByPk(req.params.id);
    if (!package) {
      return res.status(404).json({ error: 'Paket bulunamadı.' });
    }
    res.json(package);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE - Paketi Güncelle
router.put('/:id', async (req, res) => {
  try {
    const { name, total_lessons, price, description } = req.body;

    const [updated] = await packages.update(
      { name, total_lessons, price, description },
      { where: { id: req.params.id } }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Paket bulunamadı.' });
    }

    const updatedPackage = await packages.findByPk(req.params.id);
    res.json(updatedPackage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE - Paketi Sil
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await packages.destroy({ where: { id: req.params.id } });

    if (!deleted) {
      return res.status(404).json({ error: 'Paket bulunamadı.' });
    }

    res.json({ message: 'Paket başarıyla silindi.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
