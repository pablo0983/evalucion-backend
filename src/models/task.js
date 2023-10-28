const Sequelize = require("sequelize");
const { Model } = Sequelize;
const { sequelize } = require("../config/sequelize");

class Task extends Model {}

Task.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    
    taskTitle: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },

    taskDescription: {
      type: Sequelize.STRING(60),
      allowNull: false,
    },

    taskStatus: {
      type: Sequelize.STRING(30),
      allowNull: false,
      defaultValue: 'incomplete',
    },

    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      forengKey: true,
    },
  },
  {
    sequelize,
    modelName: "task",
    timestamps: true,
  }
);

module.exports = Task;