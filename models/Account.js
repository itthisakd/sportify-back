module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define(
    "Account",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        // validate: {},
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
        allowNull: false,
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
        allowNull: false,
      },
      lastActive: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      searchLocation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      searchAge: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      searchGender: {
        type: DataTypes.ENUM,
        values: ["m", "f", "a"],
      },
      searchDistance: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      showInStack: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      showActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      deactivated: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
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
