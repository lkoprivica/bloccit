const Advertisements = require("./models").Advertisement;

module.exports = {
  getAllAdvertisements(callback){
    return Advertisements.all()

    .then((advertisements)=> {
      callback(null, advertisements);
    })
    .catch((err) => {
      callback(err);
    })
  }
}
