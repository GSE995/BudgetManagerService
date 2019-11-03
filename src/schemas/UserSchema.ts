import * as mongoose from "mongoose"
import * as bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
	username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
	}
})

UserSchema.pre('save', function (next) {
    const user: any = this;
    if (this.isModified('password') || this.isNew) {
      bcrypt.genSalt(10, (error, salt) => {
      if (error) return next(error);
      bcrypt.hash(user.password, salt, (error, hash) => {
        if (error) return next(error);
        user.password = hash;
          next();
        });
      });
    } else {
      return next();
    }
  });



UserSchema.methods.comparePassword = async function(password, callback) : Promise<any>{
	return await bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", UserSchema);

export default User;
