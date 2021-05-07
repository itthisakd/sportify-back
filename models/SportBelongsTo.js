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
    }
  );

  SportBelongsTo.associate = (models) => {
    SportBelongsTo.hasMany(models.Sport, {
      foreignKey: {
        name: "sportName",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });

    SportBelongsTo.associate = (models) => {
      SportBelongsTo.BelongsToMany(models.Account, {
        foreignKey: {
          name: "accountId",
          allowNull: false,
        },
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
      });
    };
  };

  return SportBelongsTo;
};
