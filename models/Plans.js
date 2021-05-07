module.exports = (sequelize, DataTypes) => {
  const Plans = sequelize.define("Plans", {
    planName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    planPrice: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    planDesc: DataTypes.STRING,
    allowNull: false,
  });

  // REVIEW CASCADE ??
  Plans.associate = (models) => {
    Plans.belongsTo(models.Account, {
      foreignKey: {
        name: "planId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return Plans;
};
