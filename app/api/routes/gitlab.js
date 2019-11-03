import { projects, tree } from '../../../controllers/gitlab';

const { Router } = require('express');
const router = Router();
const Gitlab = require('gitlab').Gitlab;
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const services = new Gitlab({
  host: 'http://10.36.13.89',
  token: '__5uUEPux-qreBuxsJt2',
});

/*
__5uUEPux-qreBuxsJt2 - 안예솔
W3_ndi11mLCNVRu5XUgD - 인혜민
 */

router.get('/projects', projects);
router.get('/projects/:id', tree);

router.get('/getRepositoryFileTree', (req, res) => {
  const projectId = req.query.projectId;
  let branchName = req.query.branchName;
  if (branchName === '') {
    branchName = 'master';
  }

  const opt = {
    ref: branchName,
    recursive: true, // recursive : true일 경우 하위 트리까지 가져옴
  };

  services.Repositories.tree(projectId, opt)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(err.response.status).send({ error: err.description });
    });
});

// 프로젝트 생성
router.post('/createProject', (req, res) => {
  const parameters = {
    name: req.body.productName,
    description: req.body.productDescription,
  };
  // 토큰에 해당하는 사용자의 프로젝트로 들어가는 것 같음
  services.Projects.create(parameters)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(err.response.status).send({ error: err.description });
    });
});

// 프로젝트 리스트 가져오기
router.get('/getProjectList', (req, res) => {
  services.Projects.all()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(err.response.status).send({ error: err.description });
    });
});

// 브런치 만들기
router.get('/newBranch', (req, res) => {
  const projectId = req.query.projectId;
  const branchName = req.query.branchName;
  services.Branches.create(projectId, branchName, 'dev')
    .then((result) => {
      console.error('newBranch :: ', result);
      res.json(result);
    })
    .catch((err) => {
      res.status(err.response.status).send({ error: err.description });
    });
});

// 파일 정보 읽기 - content 내용 읽기
router.get('/readFile', (req, res) => {
  console.log('여기들어왔는가!!');
  const projectId = req.query.projectId;
  const filePath = req.query.filePath;
  let branchName = req.query.branchName;
  if (branchName === '') {
    branchName = 'master';
  }
  console.log(projectId);
  console.log(filePath);
  console.log(branchName);
  services.RepositoryFiles.showRaw(projectId, filePath, branchName)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(err.response.status).send({ error: err.description });
    });
});

// router.get('/commits', (req, res) => {
//   const projectId = req.query.projectId;
//   const branchName = req.query.branchName;
//   const action = req.query.action;
//   const commitMsg = req.query.branchName + ' ' + action + ' commit!!';
//   let filePath = req.query.filePath;
//   let contents = '';
//   if (action !== 'delete') {
//     contents = Buffer.from(req.query.contents).toString('base64');
//   }
//   let previousPath = '';
//   let actions = [];
//   if (action === 'move') {
//     filePath = req.query.changePath;
//     previousPath = req.query.filePath;
//
//     if (!previousPath.includes('.md')) {
//       // 폴더선택 -> 폴더명 수정일 경우
//       if (previousPath !== filePath) {
//         // 경로가 다를 경우 - 폴더명 수정
//         var opt = { ref: 'master', recursive: true, path: previousPath };
//         services.Repositories.tree(projectId, opt).then((result) => {
//           if (result.length > 0) {
//             for (var i = 0; i < result.length; i++) {
//               if (result[i].type === 'blob') {
//                 console.error('----> ', i, ' :: ', result[i]);
//                 var chgFile = result[i].path.replace(previousPath, filePath);
//                 if (result.name === 'default.md') {
//                   actions.push({ action: 'delete', file_path: result[i].path });
//                 } else {
//                   actions.push({
//                     action: action,
//                     file_path: chgFile,
//                     previous_path: result[i].path,
//                   });
//                 }
//               }
//             }
//
//             services.Commits.create(projectId, branchName, commitMsg, actions)
//               .then((result) => {
//                 res.json(result);
//               })
//               .catch((err) => {
//                 console.error(err);
//               });
//           }
//         });
//       }
//     } else {
//       actions = [
//         {
//           action: action,
//           file_path: filePath,
//           previous_path: previousPath,
//           content: contents,
//           encoding: 'base64',
//         },
//       ];
//
//       services.Commits.create(projectId, branchName, commitMsg, actions)
//         .then((result) => {
//           res.json(result);
//         })
//         .catch((err) => {
//           console.error(err);
//         });
//     }
//   } else {
//     actions = [
//       {
//         action: action,
//         file_path: filePath,
//         previous_path: previousPath,
//         content: contents,
//         encoding: 'base64',
//       },
//     ];
//
//     services.Commits.create(projectId, branchName, commitMsg, actions)
//       .then((result) => {
//         res.json(result);
//       })
//       .catch((err) => {
//         console.error(err);
//         console.error(err.response.status, '----', err.description);
//         res.status(err.response.status).json({ error: err.description });
//       });
//   }
// });

router.get('/createMergeRequest', (req, res) => {
  const projectId = req.query.projectId;
  const branchName = req.query.branchName;

  services.MergeRequests.create(
    projectId,
    branchName,
    'dev',
    branchName + ' merge request!!'
  )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(err.response.status).send({ error: err.description });
    });
});

module.exports = router;
