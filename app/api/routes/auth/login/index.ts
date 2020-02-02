import { checkGroupwareUser, searchUser } from './../../../controllers/auth/gw';
import {
  checkDBSUser,
  createToken,
  createUser,
} from './../../../controllers/auth/dbs';
import { saveUser } from './../../../../api/controllers/auth/user';
import * as IAuth from './../auth-interface';

const { Router } = require('express');
const createError = require('http-errors');
const router = Router();

router.post('/', (request, response, next) => {
  const { user } = request.body;

  // admin 로그인에 대한 처리
  if (user.loginId === 'admin') {
    user.loginId = 'admin@test.com';
    checkDBSUser(user)
      .then((res) => {
        const result: IAuth.CheckDBSRes = JSON.parse(res);
        console.log('[checkDBSUser] ', result);
        return createToken(user);
      })
      .then((res) => {
        if (res) {
          tokenResponser(JSON.parse(res) as IAuth.CreateTokenRes);
        }
      })
      .catch((err) => {
        console.error('err ', err);
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
  }

  checkGroupwareUser(user)
    .then((res: IAuth.CheckGroupwareRes) => {
      console.log('[checkGroupwareUser] ', res);

      if (res.resultCode === '0') {
        return checkDBSUser(user);
      } else {
        // response.status(404).send({ data: '', msg: res.resultMessage });
        // next(new Error(res.resultMessage));
        // throw createError(404, res.resultMessage);
        // next(createError(404, res.resultMessage));
        throw createError(404, res.resultMessage);
      }
    })
    .then((res: string) => {
      const result: IAuth.CheckDBSRes = JSON.parse(res);
      console.log('[checkDBSUser] ', result);

      if (result.resultCode === '0') {
        return createToken(user); // 직원이 존재 O : 토큰 생성
      } else {
        insertToDBS(user); // 직원이 존재X : 직원 추가 or DBS DB 연결 실패
      }
    })
    .then((res: string) => {
      if (res) {
        tokenResponser(JSON.parse(res) as IAuth.CreateTokenRes);
      }
    })
    .catch((err) => {
      response.send({ success: false, msg: err.message });
    });

  const insertToDBS = (user): void => {
    // 그룹웨어 직원 조회
    searchUser(user)
      .then((res) => {
        console.log('[searchUser] ', res);

        if (res.resultCode === '0') {
          return saveUser(user, res.result.user, (result: IAuth.User) => {
            console.log('[saveUser] ', result);

            createUser(result)
              .then((res) => {
                console.log('[createUser] ', res);
                return createToken(user);
              })
              .then((res: string) => {
                if (res) {
                  tokenResponser(JSON.parse(res) as IAuth.CreateTokenRes);
                } else {
                  throw new Error('토큰을 생성하는데에 문제가 발생');
                }
              })
              .catch((err) => {
                console.error('err ', err);
                response.status(err.status).send({
                  data: '',
                  msg: err.message,
                });
              });
          });
        } else {
          response.status(200).send({
            data: '',
            msg: '그룹웨어에 해당 직원에 대한 정보가 없습니다.',
          });
        }
      })
      .catch((err) => {
        console.error('err ', err);
        // response.status(err.status).send({
        //   data: '',
        //   msg: err.message,
        // });

        next('asd');
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
      response.status(200).send({
        success: false,
        // msg: '토큰 발급 실패',
        msg: res.message,
      });
    }
  };
});

module.exports = router;
