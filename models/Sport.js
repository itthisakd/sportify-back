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
      timestamps: false,
    }
  );

  Sport.associate = (models) => {
    Sport.hasMany(models.SportBelongsTo, {
      foreignKey: {
        name: "sportId",
        allowNull: false,
      },
    });
  };
  return Sport;
};
