module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
      timestamps: true,
    }
  );

  Message.associate = (models) => {
    Message.belongsTo(models.Account, {
      as: "MessageFrom",
      foreignKey: {
        name: "fromId",
        allowNull: false,
      },
    });
    Message.belongsTo(models.Account, {
      as: "MessageTo",
      foreignKey: {
        name: "toId",
        allowNull: false,
      },
    });
  };

  return Message;
};
