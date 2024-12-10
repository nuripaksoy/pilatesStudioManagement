const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const StudentPackage = sequelize.define('student_packages', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    package_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    remaining_lessons: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "active"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'student_packages',
    schema: 'public',
    timestamps: true,
    underscored: true, // created_at, updated_at alanlarını underscore formatında kullanır
    indexes: [
      {
        name: "student_packages_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      }
    ]
  });

  // İlişkileri burada tanımlıyoruz
  StudentPackage.associate = function(models) {
    // StudentPackage -> User
    // Bir student_package kaydı bir kullanıcıya aittir
    StudentPackage.belongsTo(models.users, { foreignKey: 'student_id' });

    // StudentPackage -> Package
    // Bir student_package kaydı bir pakete aittir
    StudentPackage.belongsTo(models.packages, { foreignKey: 'package_id' });
  };

  return StudentPackage;
};
