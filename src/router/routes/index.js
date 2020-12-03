// auto build
const moduleFiles = require.context(".", false, /\.js$/);

const modules = moduleFiles.keys().reduce((modules, modulePath) => {
  if (modulePath === "./index.js") return modules;

  modules.push.call(modules, moduleFiles(modulePath).default);

  return modules;
}, []);

export default modules[0]
