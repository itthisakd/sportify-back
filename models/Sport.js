module.exports = (sequelize, DataTypes) => {
  const Sport = sequelize.define(
    "Sport",
    {
      sportName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      underscored: true,
    }
  );

  Sport.associate = (models) => {
    Sport.belongsTo(models.SportBelongsTo, {
      foreignKey: {
        name: "sportId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };
  return Sport;
};
