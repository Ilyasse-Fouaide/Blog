const mongoose = require('mongoose');

exports.connect = () => {
  mongoose.set({ 'strictQuery': true });
  mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("Connected success");
  }).catch((e) => {
    console.log("Error Connection to the Database : " + e)
  })
}
