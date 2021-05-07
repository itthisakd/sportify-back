module.exports = (sequelize, DataTypes) => {
  const Match = sequelize.define(
    "Match",
    {
      fromId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      toId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      superLike: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      likeReturned: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      unmatched: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      underscored: true,
      timestamps: true,
    }
  );

  Match.associate = (models) => {
    Match.belongsTo(models.Account, {
      as: "MatchFrom",
      foreignKey: {
        name: "fromId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  Match.associate = (models) => {
    Match.belongsTo(models.Account, {
      as: "MatchTo",
      foreignKey: {
        name: "toId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return Match;
};
