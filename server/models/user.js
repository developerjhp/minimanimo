import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const userSchema = mongoose.Schema(
  {
    nickname: {
      type: String,
      minlength: [2, '닉네임은 2자 이상 입력해주세요.'],
      maxLength: [10, '닉네임은 10자 미만이어야 합니다.'],
      trim: true,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, '이메일 형식에 맞게 작성해주세요'],
      required: true, // 필수 항목
      unique: true, // 동일 이메일이 없도록 설정
    },
    password: {
      type: String,
      minlength: [8, '비밀번호를 8자 이상 입력해주세요.'],
      trim: true,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}; // 비밀번호 해독 함수

// hashing password  manually in the controller
// this little middleware is really helpful
// don't need to mock up controller with all that stuff
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // 해시된 패스워드로 재할당
}); // 비밀번호 암호화 함수

const User = mongoose.model('User', userSchema);

export default User;
// 유저 스키마 작성 및 모델 생성
