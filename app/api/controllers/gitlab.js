const { Gitlab } = require('gitlab');

const services = new Gitlab({
  host: 'http://10.36.13.89',
  token: 'W3_ndi11mLCNVRu5XUgD',
});

// 해당 gitlab의 모든 프로젝트 가져오기
const projects = (req, res) => {
  services.Projects.all().then((projects) => {
    // console.log('prj :: ', projects)
    res.json(projects);
  });
};

// 특정 프로젝트 파일 트리 가져오기
const tree = (req, res) => {
  const projectId = req.params.id;
  const opt = { ref: 'master', recursive: true }; // recursive : true일 경우 하위 트리까지 가져옴
  services.Repositories.tree(projectId, opt).then((result) => {
    res.json(result);
  });
};

module.exports = {
  projects,
  tree,
};
