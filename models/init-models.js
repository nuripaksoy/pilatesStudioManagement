var DataTypes = require("sequelize").DataTypes;
var _class_registrations = require("./class_registrations");
var _classes = require("./classes");
var _notifications = require("./notifications");
var _packages = require("./packages");
var _payments = require("./payments");
var _student_packages = require("./student_packages");
var _users = require("./users");

function initModels(sequelize) {
  var class_registrations = _class_registrations(sequelize, DataTypes);
  var classes = _classes(sequelize, DataTypes);
  var notifications = _notifications(sequelize, DataTypes);
  var packages = _packages(sequelize, DataTypes);
  var payments = _payments(sequelize, DataTypes);
  var student_packages = _student_packages(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  class_registrations.belongsTo(classes, { as: "class", foreignKey: "class_id"});
  classes.hasMany(class_registrations, { as: "class_registrations", foreignKey: "class_id"});
  payments.belongsTo(packages, { as: "package", foreignKey: "package_id"});
  packages.hasMany(payments, { as: "payments", foreignKey: "package_id"});
  student_packages.belongsTo(packages, { as: "package", foreignKey: "package_id"});
  packages.hasMany(student_packages, { as: "student_packages", foreignKey: "package_id"});
  class_registrations.belongsTo(users, { as: "student", foreignKey: "student_id"});
  users.hasMany(class_registrations, { as: "class_registrations", foreignKey: "student_id"});
  classes.belongsTo(users, { as: "instructor", foreignKey: "instructor_id"});
  users.hasMany(classes, { as: "classes", foreignKey: "instructor_id"});
  notifications.belongsTo(users, { as: "student", foreignKey: "student_id"});
  users.hasMany(notifications, { as: "notifications", foreignKey: "student_id"});
  payments.belongsTo(users, { as: "student", foreignKey: "student_id"});
  users.hasMany(payments, { as: "payments", foreignKey: "student_id"});
  student_packages.belongsTo(users, { as: "student", foreignKey: "student_id"});
  users.hasMany(student_packages, { as: "student_packages", foreignKey: "student_id"});

  return {
    class_registrations,
    classes,
    notifications,
    packages,
    payments,
    student_packages,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
