// const userSaveRes = userSave(user, res.result.user);
import { UserModel } from './../../../models/user';

export const saveUser = (user, searchUser, cb) => {
  const userModel = new UserModel({
    loginId: user.loginId,
    loginPw: user.loginPw,

    positionName: searchUser.positionName,
    deptName: searchUser.deptName,
    photoUrl: searchUser.photoUrl,
    name: searchUser.empName,
    deptPath: searchUser.deptPath,
    compName: searchUser.compName,

    authToken: '',
    gitlabToken: '',
    authority: 'E', // 일반 직원 권한
  });

  userModel
    .save()
    .then((user) => {
      cb(user);
    })
    .catch((err) => {
      console.error(err);
    });
};
