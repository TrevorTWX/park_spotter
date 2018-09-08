module.exports = function(sequelize, DataTypes) {
    var Car = sequelize.define("Car", {
      plateNumber: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
  
    return Car;
  };