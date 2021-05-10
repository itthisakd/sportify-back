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
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      likeReturned: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
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
    });
  };

  Match.associate = (models) => {
    Match.belongsTo(models.Account, {
      as: "MatchTo",
      foreignKey: {
        name: "toId",
        allowNull: false,
      },
    });
  };

  return Match;
};
