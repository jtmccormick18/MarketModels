const bcrypt = require('bcryptjs');

const hashPassword = function (user) {
    user.password = bcrypt.hashSync(user.password, 12);
};
module.exports = function(connection, Sequelize) {
    const AuthUser= connection.define('AuthUser', {
      username: {
          type:Sequelize.STRING,
          unique:true,
          len:[2,20],
          allowNull:false
      },
      password: {
          type:Sequelize.STRING,
          allowNull:false
      }
    });

    AuthUser.beforeCreate(hashPassword);

    AuthUser.prototype.validatePw = function (password) {
        return bcrypt.compareSync(password, this.password);
    };
  
    return AuthUser;
  }