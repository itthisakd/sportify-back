module.exports = (sequelize, DataTypes) => {
  const SportBelongsTo = sequelize.define(
    "SportBelongsTo",
    {},
    {
      underscored: true,
      timestamps: false,
    }
  );

  SportBelongsTo.associate = (models) => {
    SportBelongsTo.belongsTo(models.Sport, {
      foreignKey: {
        name: "sportId",
        allowNull: false,
      },
    });
    SportBelongsTo.belongsTo(models.Account, {
      foreignKey: {
        name: "accountId",
        allowNull: false,
      },
    });
  };

  return SportBelongsTo;
};
