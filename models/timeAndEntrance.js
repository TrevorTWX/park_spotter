module.exports = function(sequelize, DataTypes) {
    var TimeEntrance = sequelize.define("TimeEntrance", {
      timeslot: {
        type: DataTypes.STRING,
        allowNull: false
      },
      entranceA: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      entranceB: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      entranceC: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    });
  
    return TimeEntrance;
  };