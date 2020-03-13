const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
const userScheme = new mongoose.Schema({
  // id: mongoose.Schema.Types.ObjectId,

  loginId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  loginPw: { type: String, required: true },

  positionName: { type: String, default: '' },
  deptName: { type: String, default: '' },
  photoUrl: { type: String, default: '' },
  name: { type: String, default: '' },
  deptPath: { type: String, default: '' },
  compName: { type: String, default: '' },

  authToken: { type: String, default: '' },
  gitlabToken: { type: String, default: '' },

  authority: { type: String, default: 'E' },
});

const UserModel = mongoose.model('User', userScheme);

module.exports = {
  UserModel,
};

// interface LoginUser {
//   loginId: string; // 로그인 계정
//   loginPw: string; // 로그인 패스워드
//
//   positionName: string; // 직급
//   deptName: string; // 직책
//   photoUrl: string; // 직원 사진
//   empName: string; // 직원 이름
//   deptPath: string; // 소속
//   compName: string; // 회사명
//
//   authToken: string; // DBS가 생성한 유저 토큰
//   gitlabToken: string; // 깃랩 토큰
// }
