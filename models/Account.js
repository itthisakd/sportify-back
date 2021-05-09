module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define(
    "Account",
    {
      planId: {
        type: DataTypes.ENUM,
        values: ["BASIC", "SEMI-PRO", "PRO"],
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        // validate: {},
      },
      gender: {
        type: DataTypes.ENUM,
        values: ["MALE", "FEMALE"],
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateOfBirth: {
        type: DataTypes.DATE,
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
      occupation: {
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
      searchGendeer: {
        type: DataTypes.ENUM,
        values: ["MALE", "FEMALE"],
      },
      searchDistance: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      showInStack: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      showActive: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      underscored: true,
    }
  );
  Account.associate = (models) => {
    Account.hasOne(models.SportBelongsTo, {
      foreignKey: {
        name: "accountId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTIRCT",
    });
  };

  Account.associate = (models) => {
    Account.hasMany(models.Media, {
      foreignKey: {
        name: "accountId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  // REVIEW -- CASCADE for onDelete and onUpdate ??
  Account.associate = (models) => {
    Account.hasOne(models.Plans, {
      foreignKey: {
        name: "planId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  Account.associate = (models) => {
    Account.hasOne(models.Match, {
      as: "MatchFrom",
      foreignKey: {
        name: "fromId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  Account.associate = (models) => {
    Account.hasOne(models.Match, {
      as: "MatchTo",
      foreignKey: {
        name: "toId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return Account;
};
