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
      superlike: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 0,
      },
      likeReturned: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
      seen: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
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
