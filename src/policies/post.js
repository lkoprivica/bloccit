// #1
const ApplicationPolicy = require("./application");

module.exports = class PostPolicy extends ApplicationPolicy {

  new() {
    return !!this.user;
  }

  create() {
    return this.new();
  }

  edit() {
    return this._isAdmin() || (this.user && this.record.userId == this.user.id);
  }

  update() {
    return this.edit();
  }

  destroy() {
    return this.update();
  }
}
