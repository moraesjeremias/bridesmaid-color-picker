import { Color } from "./colors.js";
import { User } from "./users.js";

//garante 1-1 
Color.hasOne(User);
User.belongsTo(Color);