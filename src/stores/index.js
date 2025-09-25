// import { createPinia } from 'pinia';

// const modulesFiles = import.meta.glob('./modules/*.js', { import: 'default', eager: true })

// // you do not need `import app from './modules/app'`
// // it will auto require all vuex module from modules file
// let modules = {};
// for (const path in modulesFiles) {
//   const moduleName = path.replace(/^\.\/(.*)\/(.*)\.\w+$/, '$2');
//   modules[moduleName] = modulesFiles[path]
// }

// const store = createPinia({
//   modules
// });

// export default store;


// // https://webpack.js.org/guides/dependency-management/#requirecontext
// const modulesFiles = require.context('./modules', true, /\.js$/)

// // you do not need `import app from './modules/app'`
// // it will auto require all vuex module from modules file
// const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//   // set './app.js' => 'app'
//   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
//   const value = modulesFiles(modulePath)
//   modules[moduleName] = value.default
//   return modules
// }, {})

// const store = new Vuex.Store({
//   modules,
//   getters
// })

// export default store