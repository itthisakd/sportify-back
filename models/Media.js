module.exports = (sequelize, DataTypes) => {
  const Media = sequelize.define(
    "Media",
    {
      media: {
        type: DataTypes.STRING,
        allowNull: false,
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
