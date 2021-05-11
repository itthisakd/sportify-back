module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define(
    "Account",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      gender: {
        type: DataTypes.ENUM,
        values: ["m", "f"],
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      aboutMe: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      instagram: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      job: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      school: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      currentLocation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastActive: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      searchLocation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      searchAge: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      searchGender: {
        type: DataTypes.ENUM,
        values: ["m", "f", "a"],
        defaultValue: "a",
      },
      searchDistance: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 80,
      },
      showInStack: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 1,
      },
      showActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 1,
      },
      deactivated: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      underscored: true,
    }
  );

  Account.associate = (models) => {
    Account.hasMany(models.SportBelongsTo, {
      foreignKey: {
        name: "accountId",
        allowNull: false,
      },
    });
  };

  Account.associate = (models) => {
    Account.hasMany(models.Media, {
      foreignKey: {
        name: "accountId",
        allowNull: false,
      },
    });
  };

  Account.associate = (models) => {
    Account.belongsTo(models.Plans, {
      foreignKey: {
        name: "planId",
        allowNull: false,
      },
    });
  };

  Account.associate = (models) => {
    Account.hasMany(models.Match, {
      as: "MatchFrom",
      foreignKey: {
        name: "fromId",
        allowNull: false,
      },
    });
  };

  Account.associate = (models) => {
    Account.hasMany(models.Match, {
      as: "MatchTo",
      foreignKey: {
        name: "toId",
        allowNull: false,
      },
    });
  };

  return Account;
};
