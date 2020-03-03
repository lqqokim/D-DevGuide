/* eslint-disable */
import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';
import { RootState } from '@/store';

interface SearchState {
  searchDataArray: Array<any>;
  searchResult: Array<any>;
}

interface Response {
  config: object;
  data: any;
  headers: object;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}

interface Result {
  productName: string;
  resultData: Array<Search>;
}

export interface Search {
  data: string;
  filename: string;
  basename: string;
  project_id: number;
  startline: number;
  ref: string;
}

export const state = (): SearchState => ({
  searchDataArray: [],
  searchResult: [],
});

export const namespaced: boolean = true;

export const getters: GetterTree<SearchState, RootState> = {};

export const mutations: MutationTree<SearchState> = {
  setSearchData(state, payload: Array<Search>) {
    state.searchDataArray = payload;
  },
  // setSearchResult(state, payload: Result) {
  //   let sameProductFlag = false;
  //   if (state.searchResult.length > 0) {
  //     state.searchResult.forEach((data) => {
  //       if (data.productName === payload.productName) {
  //         data.resultData = data.resultData.concat(payload.resultData);
  //         sameProductFlag = true;
  //       }
  //     });
  //   }
  //   console.error('여기를?');
  //   !sameProductFlag ? state.searchResult.push(payload) : '';
  // },
  searchDevDocTitle(
    state,
    payload: {
      searchDataArray: Array<any>;
      treeData: Array<any>;
      pageType: string;
      productName: string;
      productCode: string;
      searchWord: string;
    }
  ) {
    const resultArray: Array<any> = [];
    payload.searchDataArray.forEach((searchData) => {
      const matchedPathArray: Array<any> = [];
      const initPath = payload.pageType + '/';
      if (payload.treeData[0] === undefined) {
        return;
      }
      payload.treeData.forEach((data) => {
        findPath(data, searchData.filename, initPath, matchedPathArray);
      });

      if (matchedPathArray.length > 0) {
        matchedPathArray.forEach((matchedPath) => {
          const newSearchData: {
            pageTitle: string;
            pagePath: string;
          } = { pageTitle: '', pagePath: '' };
          Object.assign(newSearchData, searchData);
          newSearchData.pageTitle = matchedPath.pageTitle
            .split(payload.searchWord)
            .join('<em>' + payload.searchWord + '</em>');
          newSearchData.pagePath = matchedPath.pagePath;
          resultArray.push(newSearchData);
        });
      }
    });

    let sameProductFlag = false;
    if (state.searchResult.length > 0) {
      state.searchResult.forEach((data) => {
        if (data.productName === payload.productName) {
          data.resultData = data.resultData.concat(resultArray);
          sameProductFlag = true;
        }
      });
    }
    !sameProductFlag
      ? state.searchResult.push({
          productName: payload.productName,
          productCode: payload.productCode,
          resultData: resultArray,
        })
      : '';
  },
  setIndexSearchResult(state, payload: Result) {
    state.searchResult.forEach((result) => {
      if (result.productName === payload.productName) {
        result.resultData = result.resultData.concat(payload.resultData);
      }
    });
  },
  setEmptySearchResult(state) {
    state.searchResult = [];
  },
  setEmptySearchData(state) {
    state.searchDataArray = [];
  },
};

function findPath(
  parent,
  searchFileName: string,
  path: string,
  matchedPathArray: Array<any>
): any {
  if (parent.option.path === searchFileName) {
    matchedPathArray.push({
      pageTitle: parent.title,
      pagePath: path + parent.title,
    });
  }
  if (parent.children && parent.children.length > 0) {
    for (let childIdx = 0; childIdx < parent.children.length; childIdx++) {
      findPath(
        parent.children[childIdx],
        searchFileName,
        path + parent.title + '/',
        matchedPathArray
      );
    }
  }
}

export const actions: ActionTree<SearchState, RootState> = {
  async devDocSearch(
    { commit, state, dispatch },
    payload: { content: string; projectId: string }
  ): Promise<any> {
    try {
      const searchData: Response = await this.$axios.get(
        'api/docs/search/devDocSearch',
        {
          params: {
            contents: payload.content,
            projectId: payload.projectId,
          },
        }
      );

      if (searchData.data.length > 0) {
        searchData.data.forEach((data, index) => {
          for (let idx = index + 1; idx < searchData.data.length; idx++) {
            if (data.filename === searchData.data[idx].filename) {
              searchData.data.splice(idx, 1);
              idx--;
            }
          }
        });

        let filteredDatas = searchData.data.filter(
          (data) =>
            data.filename.slice(-3) === '.md' &&
            data.ref === 'master' &&
            data.filename.slice(-8) !== 'index.md'
        );
        const removeMd = require('remove-markdown');

        filteredDatas.forEach((filteredData) => {
          filteredData.data = removeMd(filteredData.data);
          filteredData.data = filteredData.data
            .split(payload.content)
            .join('<em>' + payload.content + '</em>')
            .split('\n')
            .join('<br/>');
        });

        filteredDatas = filteredDatas.filter((filteredData) => {
          return filteredData.data.includes(payload.content);
        });

        await commit('setSearchData', filteredDatas);
      }
    } catch (err) {
      console.error(err);
    }
  },
  async indexSearch(
    { commit, state, dispatch },
    payload: {
      treeData: Array<any>;
      searchWord: string;
      pageType: string;
      ref: string;
      productCode: string;
    }
  ): Promise<any> {
    try {
      if (payload.treeData[0] === undefined) {
        return;
      }
      const productData: Response = await this.$axios.get(
        'api/docs/product/getProjectId',
        {
          params: {
            productCode: payload.productCode,
          },
        }
      );

      const resultArr: Array<any> = [];
      payload.treeData.forEach((data) => {
        searchTitle(data, payload.searchWord, resultArr, payload.pageType);
      });

      // 검색 결과 중복 제거
      const indexSearchResults = resultArr.filter((result) => {
        return state.searchResult.findIndex((compareResult) => {
          return compareResult.pagePath === result.pagePath;
        });
      });

      for (let idx = 0; idx < indexSearchResults.length; idx++) {
        const result = indexSearchResults[idx];
        const fileData: Response = await this.$axios.get(
          'api/docs/repository/getRepositoryFileData',
          {
            params: {
              projectId: productData.data.projectId,
              filePath: result.option.path,
              ref: payload.ref,
            },
          }
        );
        indexSearchResults[idx].pageTitle = result.title
          .split(payload.searchWord)
          .join('<em>' + payload.searchWord + '</em>');
        indexSearchResults[idx].basename = result.option.path.split('.md')[0];

        let count = 0;
        let textData = fileData.data.split('\n')[0];

        for (let idx = 0; idx < textData.length; idx++) {
          const currentByte = textData.charCodeAt(idx);
          currentByte > 128 ? (count += 2) : count++;
          if (count > 190) {
            textData = textData.substr(0, idx - 1) + '...';
            break;
          }
        }

        indexSearchResults[idx].data = textData;
        indexSearchResults[idx].filename = result.option.path;
        indexSearchResults[idx].ref = payload.ref;
        indexSearchResults[idx].project_id = productData.data.projectId;
      }

      await commit('setIndexSearchResult', {
        productName: productData.data.productName,
        resultData: indexSearchResults,
      });
    } catch (err) {
      console.error(err);
    }
  },
};

function searchTitle(
  parent,
  searchWord: string,
  resultArr: Array<any>,
  path: string
): any {
  if (parent.title.includes(searchWord) && parent.type === 'page') {
    parent.pagePath = path + '/' + parent.title;
    resultArr.push(parent);
  }

  if (parent.children) {
    path += '/' + parent.title;
    parent.children.forEach((data) => {
      searchTitle(data, searchWord, resultArr, path);
    });
  }
}
