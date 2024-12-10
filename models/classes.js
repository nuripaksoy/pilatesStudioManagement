const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Class = sequelize.define('classes', {
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
    start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    max_capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    instructor_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'classes',
    schema: 'public',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        name: "classes_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      }
    ]
  });

  // İlişkiler burada tanımlanır
  Class.associate = function(models) {
    // Class - User (instructor)
    // Bir dersin bir eğitmeni vardır
    Class.belongsTo(models.users, { foreignKey: 'instructor_id' });

    // Class - User (öğrenci rolünde, N:N ilişki class_registrations üzerinden)
    // Bir derse birden çok öğrenci katılabilir, bir öğrenci birden çok derse katılabilir
    Class.belongsToMany(models.users, {
      through: models.class_registrations,
      foreignKey: 'class_id'
    });
  };

  return Class;
};
