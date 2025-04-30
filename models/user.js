const moogoose = require('mongoose');

const userSchema = new moogoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    role: {type: moogoose.Schema.Types.ObjectId, ref: 'Role', required: true},
    isdeleted: {type: Boolean, default: false},
},{
    timestamps: true,
});

userSchema.pre('save', async function async (next) {
  if(!this.isModified('password')){ return next(); }

  try{
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();

  }catch(error){ return next(error); }
});

module.exports = moogoose.model('User', userSchema);