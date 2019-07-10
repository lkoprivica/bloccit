'use strict';
module.exports = (sequelize, DataTypes) => {
  var Flair = sequelize.define('Flair', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});

  Flair.associate = function(models) {
    // associations can be defined here
    Flair.belongsTo(models.Topic, {
      foreignKey: "topicId",
      onDelete: "CASCADE"
    });
  };  
  return Flair;
};
