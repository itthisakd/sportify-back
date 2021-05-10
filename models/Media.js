module.exports = (sequelize, DataTypes) => {
  const Media = sequelize.define(
    "media",
    {
      media: {
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
