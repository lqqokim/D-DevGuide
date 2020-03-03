// const userSaveRes = userSave(user, res.result.user);
import { UserModel } from './../../../models/user';
const bcrypt = require('bcrypt');
const saltRounds = 10;

export const saveUser = async (user, searchUser) => {
  try {
    const bcryptPw = await bcrypt.hash(user.loginPw, saltRounds);

    // console.log('bcryptPw :: ', bcryptPw);

    const userModel = new UserModel({
      loginId: user.loginId,
      loginPw: bcryptPw,

      positionName: searchUser.positionName,
      deptName: searchUser.deptName,
      photoUrl: searchUser.photoUrl,
      name: searchUser.empName,
      deptPath: searchUser.deptPath,
      compName: searchUser.compName,

      authToken: '',
      gitlabToken: '',
      authority: searchUser.authority ? 'S' : 'E', // 일반 직원 권한
    });

    return userModel.save().then((res) => {
      res.loginPw = user.loginPw;
      return res;
    });
  } catch (e) {
    console.error(e);
  }
};
