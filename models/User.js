const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});

// loads the schema INTO mongoose
mongoose.model("users", userSchema);
