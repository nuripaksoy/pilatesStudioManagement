require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,      // .env dosyasından DB_USER değerini okur
    password: process.env.DB_PASS,      // .env dosyasından DB_PASS değerini okur
    database: process.env.DB_NAME,      // .env dosyasından DB_NAME değerini okur
    host: process.env.DB_HOST,          // .env dosyasından DB_HOST değerini okur
    port: process.env.DB_PORT,          // .env dosyasından DB_PORT değerini okur (opsiyonel)
    dialect: process.env.DB_DIALECT     // .env dosyasından DB_DIALECT değerini okur (postgres, mysql vb.)
  },
  test: {
    username: process.env.DB_USER || 'test_user',
    password: process.env.DB_PASS || 'test_pass',
    database: process.env.DB_NAME || 'test_database',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '5432',
    dialect: process.env.DB_DIALECT || 'postgres'
  },
  production: {
    username: process.env.DB_USER, 
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT
  }
};
