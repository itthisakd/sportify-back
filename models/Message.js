module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      fromId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      toId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
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
        name: "MessageSentFrom",
        allowNull: false,
      },
    });
    Message.belongsTo(models.Account, {
      as: "MessageTo",
      foreignKey: {
        name: "MessageSentTo",
        allowNull: false,
      },
    });
  };

  return Message;
};
