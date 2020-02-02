export interface User {
  loginId: string; // 로그인 계정
  loginPw: string; // 로그인 패스워드

  positionName: string; // 직급
  deptName: string; // 직책
  photoUrl: string; // 직원 사진
  empName: string; // 직원 이름
  deptPath: string; // 소속
  compName: string; // 회사명

  authToken: string; // DBS 가 생성한 유저 토큰
  gitlabToken: string; // 깃랩 토큰
  authority: string; // 사용자 권한

  _id?: string;
  __v?: number;
}

export interface CheckGroupwareRes {
  resultCode: string; // '1', '0'
  resultMessage: string; // SUCCESS
  result: object;
}

export interface CheckDBSRes {
  result: boolean;
  data: object;
  resultCode: string; // '1' ,'0'
  message: string;
}

export interface CreateTokenRes {
  result: boolean;
  resultCode: string;
  message: string;
  key: string;
}
