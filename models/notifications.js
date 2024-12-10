const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Notification = sequelize.define('notifications', {
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
    message: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    notification_type: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "email"
    },
    sent_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "pending"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'notifications',
    schema: 'public',
    timestamps: false, // Eğer created_at dışında updated_at kullanmıyorsanız timestamps: false yapabilirsiniz
    underscored: true,
    indexes: [
      {
        name: "notifications_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      }
    ]
  });

  // İlişkiler burada tanımlanır
  Notification.associate = function(models) {
    // Notification - User
    // Her bildirim bir kullanıcıya aittir
    Notification.belongsTo(models.users, { foreignKey: 'student_id' });
  };

  return Notification;
};
