const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: "users_email_key"
    },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "student"
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "users_email_key",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });

  // Burada ilişkileri tanımlıyoruz.
  // Bu fonksiyon `models/index.js` içerisinde çağrılacak.
  User.associate = function(models) {
    // User - Classes (Instrüktör)
    User.hasMany(models.classes, { foreignKey: 'instructor_id' });

    // User - Student_Package (Öğrencinin paket kayıtları)
    User.hasMany(models.student_packages, { foreignKey: 'student_id' });

    // User - Payments (Öğrencinin ödemeleri)
    User.hasMany(models.payments, { foreignKey: 'student_id' });

    // User - Notifications (Öğrencinin bildirimleri)
    User.hasMany(models.notifications, { foreignKey: 'student_id' });

    // User - Classes (Öğrenci olarak, N:N ilişki class_registrations üzerinden)
    // Burada classes ve users tabloları arasında class_registrations pivot tablo olarak kullanılıyor.
    User.belongsToMany(models.classes, {
      through: models.class_registrations,
      foreignKey: 'student_id'
    });
  };

  return User;
};
