const express = require('express');
const { sequelize } = require('./models'); // Sequelize modellerini içe aktarın
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const packageRoutes = require('./routes/packages');
const studentPackageRoutes = require('./routes/student_packages');
const paymentRoutes = require('./routes/payments');
const classRoutes = require('./routes/classes');
const notificationRoutes = require('./routes/notifications');
const classRegistrationRoutes = require('./routes/class_registrations');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(bodyParser.json()); // JSON verilerini parse et

app.use('/users', userRoutes);
app.use('/packages', packageRoutes);
app.use('/student-packages', studentPackageRoutes);
app.use('/payments', paymentRoutes);
app.use('/classes', classRoutes);
app.use('/notifications', notificationRoutes);
app.use('/class-registrations', classRegistrationRoutes);


// Middleware'ler
app.use(express.json());

// Veritabanı Bağlantısını Test Et
(async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL bağlantısı başarılı!');
  } catch (error) {
    console.error('Bağlantı hatası:', error);
    process.exit(1); // Bağlantı başarısızsa uygulamayı sonlandır
  }
})();

// Basit bir endpoint
app.get('/', (req, res) => {
  res.send('Uygulama çalışıyor!');
});

// Sunucuyu başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
