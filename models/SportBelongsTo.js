module.exports = (sequelize, DataTypes) => {
  const SportBelongsTo = sequelize.define(
    "SportBelongsTo",
    {
      accountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      sportId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
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

    SportBelongsTo.associate = (models) => {
      SportBelongsTo.belongsTo(models.Account, {
        foreignKey: {
          name: "accountId",
          allowNull: false,
        },

      });
    };
  };

  return SportBelongsTo;
};
