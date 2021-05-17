module.exports = (sequelize, DataTypes) => {
  const Media = sequelize.define(
    "Media",
    {
      Media: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      underscored: true,
    }
  );

  Media.associate = (models) => {
    Media.belongsTo(models.Account, {
      foreignKey: {
        name: "accountId",
        allowNull: false,
      },
    });
  };

  return Media;
};
