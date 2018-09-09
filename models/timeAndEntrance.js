module.exports = function(sequelize, DataTypes) {
    var TimeEntrance = sequelize.define("TimeEntrance", {
      timeslot: {
        type: DataTypes.STRING,
        allowNull: false
      },
      A: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      B: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      C: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    });
  
    return TimeEntrance;
  };