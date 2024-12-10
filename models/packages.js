const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Package = sequelize.define('packages', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    total_lessons: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
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
    tableName: 'packages',
    schema: 'public',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        name: "packages_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      }
    ]
  });

  // İlişkileri tanımla
  Package.associate = function(models) {
    // Package - Student_Package: bir paket, birden çok student_package kaydına sahip olabilir
    Package.hasMany(models.student_packages, { foreignKey: 'package_id' });
    
    // Package - Payment: bir paket, birden çok payment kaydına sahip olabilir
    Package.hasMany(models.payments, { foreignKey: 'package_id' });
  };

  return Package;
};
