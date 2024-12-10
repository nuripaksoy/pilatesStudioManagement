const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const ClassRegistration = sequelize.define('class_registrations', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    class_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    registered_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'class_registrations',
    schema: 'public',
    timestamps: false, // created_at, updated_at kullanmıyorsanız false yapabilirsiniz
    underscored: true,
    indexes: [
      {
        name: "class_registrations_pkey",
        unique: true,
        fields: [
          { name: "id" }
        ]
      }
    ]
  });

  // İlişkiler burada tanımlanır
  ClassRegistration.associate = function(models) {
    // ClassRegistration - Class
    // Her class_registration bir class'a aittir
    ClassRegistration.belongsTo(models.classes, { foreignKey: 'class_id' });

    // ClassRegistration - User (student)
    // Her class_registration bir öğrenciye aittir
    ClassRegistration.belongsTo(models.users, { foreignKey: 'student_id' });
  };

  return ClassRegistration;
};
