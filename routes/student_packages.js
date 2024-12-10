const express = require('express');
const { student_packages, users, packages } = require('../models');
const router = express.Router();

// CREATE - Öğrenciye Paket Ekle
router.post('/', async (req, res) => {
  try {
    const { student_id, package_id, remaining_lessons, start_date, end_date } = req.body;

    const newStudentPackage = await student_packages.create({
      student_id,
      package_id,
      remaining_lessons,
      start_date,
      end_date
    });

    res.status(201).json(newStudentPackage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ - Tüm Öğrenci Paketlerini Listele
router.get('/', async (req, res) => {
  try {
    const allStudentPackages = await student_packages.findAll({
      include: [users, packages] // İlişkili verileri getir
    });
    res.json(allStudentPackages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - Belirli Bir Öğrenci Paketini Getir
router.get('/:id', async (req, res) => {
  try {
    const studentPackage = await student_packages.findByPk(req.params.id, {
      include: [users, packages]
    });

    if (!studentPackage) {
      return res.status(404).json({ error: 'Öğrenci paketi bulunamadı.' });
    }

    res.json(studentPackage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE - Öğrenci Paketini Güncelle
router.put('/:id', async (req, res) => {
  try {
    const { remaining_lessons, start_date, end_date } = req.body;

    const [updated] = await student_packages.update(
      { remaining_lessons, start_date, end_date },
      { where: { id: req.params.id } }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Öğrenci paketi bulunamadı.' });
    }

    const updatedStudentPackage = await student_packages.findByPk(req.params.id);
    res.json(updatedStudentPackage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE - Öğrenci Paketini Sil
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await student_packages.destroy({ where: { id: req.params.id } });

    if (!deleted) {
      return res.status(404).json({ error: 'Öğrenci paketi bulunamadı.' });
    }

    res.json({ message: 'Öğrenci paketi başarıyla silindi.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
