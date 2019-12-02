export interface CommonState {
  authPages: string[];
}

export const namespaced: boolean = true;

export const state = (): CommonState => ({
  authPages: [
    '/myinfo',
    '/qna/:categoryName',
    '/qna/:productId/:rowId',
    '/qna/search',
    '/qna/register',
  ],
  // pageTypes: [
  //
  // ]
});
