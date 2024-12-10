const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Payment = sequelize.define('payments', {
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
    amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    payment_method: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    transaction_id: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    payment_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
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
    },
    package_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'payments',
    schema: 'public',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        name: "payments_pkey",
        unique: true,
        fields: [
          { name: "id" }
        ]
      }
    ]
  });

  // İlişkiler burada tanımlanır
  Payment.associate = function(models) {
    // Payment - User
    // Her ödeme bir öğrenciye (User) aittir
    Payment.belongsTo(models.users, { foreignKey: 'student_id' });

    // Payment - Package
    // Her ödeme bir pakete aittir
    Payment.belongsTo(models.packages, { foreignKey: 'package_id' });
  };

  return Payment;
};
