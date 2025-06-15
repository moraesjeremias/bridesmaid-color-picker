import { Color } from "./colors.js";
import { User } from "./users.js";

Color.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

User.hasOne(Color, {
  foreignKey: 'userId',
  as: 'color'
});

export { User, Color };