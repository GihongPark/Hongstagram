const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init({
      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      visibility: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
    }, {
      modelName: 'User',
      tableName: 'users',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      sequelize,
    })
  }
  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.Post.belongsTo(db.Image);
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
    db.User.belongsToMany(db.Post, { through: 'Bookmark', as: 'Bookmarked' });
    db.User.belongsToMany(db.Post, { through: 'PostUserTag' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowId' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'FOLLOWs', foreignKey: 'FollowerId' });
  }
}