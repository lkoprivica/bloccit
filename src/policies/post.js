// #1
const ApplicationPolicy = require("./application");

module.exports = class PostPolicy extends ApplicationPolicy {

 // #2
  new() {
    return !!this.user;
  }

  create() {
    return this.new();
  }

 // #3
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
