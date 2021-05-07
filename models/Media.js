module.exports = (sequelize, DataTypes) => {
  const Media = sequelize.define("Media", {
    accountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    Media: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  // REVIEW -- ON DELETE AND ON UPDATE SHOULD BE CASCADE ?? as every account has a media plan so if user delete their account then the media plan should be remove from our database as well ??

  Media.associate = (models) => {
    Media.belongsTo(models.Account, {
      foreignKey: {
        name: "accountId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return Media;
};
