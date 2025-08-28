import Batch from "./batchModel.js";
import User from "./userModel.js";

// Relations
Batch.hasMany(User);
User.belongsTo(Batch);



export {
  Batch,
  User,
};
