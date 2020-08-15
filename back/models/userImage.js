const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class UserImage extends Model {
  static init(sequelize) {
    return super.init({
      src: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    }, {
      modelName: 'UserImage',
      tableName: 'userimages',
      charset: 'utf8',
      collate: 'utf8_general_ci',
      sequelize,
    });
  }
  static associate(db) {
    db.UserImage.belongsTo(db.User);
  }
};