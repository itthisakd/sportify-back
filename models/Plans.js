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
        allowNull: true,
      },
    },
    {
      underscored: true,
      timestamps: false,
    }
  );

  // REVIEW CASCADE ??
  // NO, account belongs to plan so account can be deleted but plan will remain
  Plans.associate = (models) => {
    Plans.hasMany(models.Account, {
      foreignKey: {
        name: "planId",
        allowNull: false,
      },
    });
  };

  return Plans;
};
