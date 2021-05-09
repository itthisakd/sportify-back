module.exports = (sequelize, DataTypes) => {
  const Plans = sequelize.define(
    "Plans",
    {
      planName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      planPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      planDesc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

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
