import { UserModel } from '../../../models/user';
import { checkGroupwareUser, searchUser } from './../../../controllers/auth/gw';
import {
  checkDBSUser,
  createToken,
  createUser,
} from './../../../controllers/auth/dbs';
import { saveUser } from './../../../../api/controllers/auth/user';
import * as IAuth from './../auth-interface';

const bcrypt = require('bcrypt');
const { Router } = require('express');
const createError = require('http-errors');
const router = Router();

interface Login {
  loginId: string;
  loginPw: string;
}

router.post('/', async (request, response, next) => {
  const user: Login = request.body.user;

  // admin 로그인에 대한 처리
  if (user.loginId === 'admin') {
    const adminUser = await UserModel.find({ loginId: user.loginId });

    if (user.loginPw !== adminUser[0].loginPw) {
      response.send({
        success: false,
        msg: '비밀번호가 잘못되었습니다.',
      });

      return;
    }

    // 개발자사이트 admin 이 DBS admin 에 대한 권한및 토큰을 가질수 있도록 한다.
    user.loginId = 'admin@test.com';

    // DBS 사용자 조회: 개발자사이트 admin 토큰 생성
    checkDBSUser(user)
      .then((res: IAuth.CheckDBSRes) => {
        console.log('[checkDBSUser] ', res);
        return createToken(user);
      })
      .then((res) => {
        if (res) {
          tokenResponser(JSON.parse(res));
        }
      })
      .catch((err) => {
        response.status(err.status).send({
          data: '',
          msg: err.message,
        });
      });

    const tokenResponser = (res: IAuth.CreateTokenRes): void => {
      console.log('[createToken] ', res);
      if (res && res.resultCode === '0') {
        // 토큰 생성 O : 로그인 처리
        response.status(200).send({
          success: true,
          data: res.key,
          msg: '토큰 발급이 완료되었습니다.',
        });
      } else {
        // 토큰 생성X :
        response.status(200).send({
          success: false,
          msg: '토큰 발급 실패',
        });
      }
    };

    return;

    // UserModel.find({ loginId: user.loginId })
    //   .then((findUser) => {
    //     if (findUser.length) {
    //       // 로그인 패스워드와 mongodb 암호화 패스워드 비교
    //       return bcrypt.compare(user.loginPw, findUser[0].loginPw);
    //     } else {
    //       const admin = {
    //         positionName: '관리자',
    //         deptName: '관리자',
    //         photoUrl: '',
    //         name: '관리자',
    //         deptPath: '',
    //         compName: '(주)더존비즈온',
    //
    //         authToken: '',
    //         gitlabToken: '',
    //         authority: 'S',
    //       };
    //
    //       saveUser(user, admin)
    //         .then((user) => {})
    //         .catch((err) => {
    //           next(createError(500, err));
    //         });
    //     }
    //   })
    //   .then((isAdmin) => {
    //     console.log('isAdmin :: ', isAdmin);
    //     if (isAdmin) {
    //       // DBS 사용자 조회: 개발자사이트 admin 토큰 생성
    //       return checkDBSUser(user);
    //     } else {
    //       response.send({
    //         success: false,
    //         msg: '비밀번호가 잘못되었습니다.',
    //       });
    //     }
    //   })
    //   .then((res: IAuth.CheckDBSRes) => {
    //     // 개발자사이트 admin 이 DBS admin 에 대한 권한및 토큰을 가질수 있도록 한다.
    //     user.loginId = 'admin@test.com';
    //
    //     console.log('[checkDBSUser] ', res);
    //     if (res && res.resultCode === '0') {
    //       return createToken(user);
    //     } else {
    //       throw createError(404, res.message);
    //     }
    //   })
    //   .then((res) => {
    //     if (res) {
    //       tokenResponser(JSON.parse(res) as IAuth.CreateTokenRes);
    //     }
    //   })
    //   .catch((err) => {
    //     next(err);
    //   });

    // const tokenResponser = (res: IAuth.CreateTokenRes): void => {
    //   console.log('[createToken] ', res);
    //   if (res && res.resultCode === '0') {
    //     // 토큰 생성 O : 로그인 처리
    //     response.status(200).send({
    //       success: true,
    //       data: res.key,
    //       msg: '토큰 발급이 완료되었습니다.',
    //     });
    //   } else {
    //     // 토큰 생성X :
    //     response.status(200).send({
    //       success: false,
    //       msg: '토큰 발급 실패',
    //     });
    //   }
    // };
    //
    // return;
  }

  // 그룹웨어 직원 조회
  checkGroupwareUser(user)
    .then((res: IAuth.CheckGroupwareRes) => {
      console.log('[checkGroupwareUser] ', res);

      if (res.resultCode === '0' && res.result !== null) {
        // DBS 사용자 조회
        return checkDBSUser(user);
      } else {
        throw createError(404, res.resultMessage);
      }
    })
    .then((res: IAuth.CheckDBSRes) => {
      console.log('[checkDBSUser] ', res);

      if (res.resultCode === '0') {
        return createToken(user); // DBS 직원 존재 O : 토큰 생성
      } else {
        insertToDBS(user); // DBS 직원 존재X : 직원 추가 or DBS DB 연결 실패
      }
    })
    .then((res: string) => {
      console.log('createToken :: ', res);
      if (res) {
        tokenResponser(JSON.parse(res) as IAuth.CreateTokenRes);
      }
    })
    .catch((err) => {
      response.send({ success: false, msg: err.message });
    });

  const insertToDBS = (user): void => {
    // 그룹웨어 직원 조회
    return searchUser(user)
      .then((res) => {
        console.log('[searchUser] ', res);

        // DBS 에 존재하지 않지만 그룹웨어에 존재하는 경우
        if (res.resultCode === '0' && res.result.user) {
          // mongodb 저장
          return saveUser(user, res.result.user);
        } else {
          response.send({
            success: false,
            msg: '그룹웨어에 해당 직원에 대한 정보가 없습니다.',
          });
        }
      })
      .then((result: IAuth.User) => {
        console.log('[saveUser] ', result);

        // DBS 작원 저정: 개발자사이트에서 DBS 넘어가기위해
        return createUser(result);
      })
      .then((res) => {
        console.log('[createUser] ', res);
        if (res && res.resultCode === '0') {
          return createToken(user);
        } else {
          throw createError(500, 'DBS 유저생성에 실패하였습니다.');
        }
      })
      .then((res: string) => {
        if (res) {
          return tokenResponser(JSON.parse(res) as IAuth.CreateTokenRes);
        }
      })
      .catch((err) => {
        // console.error('err ', err);
        // response.status(err.status).send({
        //   data: '',
        //   msg: err.message,
        // });

        next(err);
      });
  };

  const tokenResponser = (res: IAuth.CreateTokenRes): void => {
    console.log('[createToken] ', res);
    if (res && res.resultCode === '0') {
      // 토큰 생성 O : 로그인 처리
      response.status(200).send({
        success: true,
        data: res.key,
        msg: '토큰 발급이 완료되었습니다.',
      });
    } else {
      // 토큰 생성X :
      throw createError(500, '토큰 발급 실패');
      // response.status(200).send({
      //   success: false,
      //   // msg: '토큰 발급 실패',
      //   msg: res.message,
      // });
    }
  };
});

module.exports = router;
