"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/embla-carousel-reactive-utils";
exports.ids = ["vendor-chunks/embla-carousel-reactive-utils"];
exports.modules = {

/***/ "(ssr)/./node_modules/embla-carousel-reactive-utils/esm/embla-carousel-reactive-utils.esm.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/embla-carousel-reactive-utils/esm/embla-carousel-reactive-utils.esm.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   areOptionsEqual: () => (/* binding */ areOptionsEqual),\n/* harmony export */   arePluginsEqual: () => (/* binding */ arePluginsEqual),\n/* harmony export */   canUseDOM: () => (/* binding */ canUseDOM),\n/* harmony export */   sortAndMapPluginToOptions: () => (/* binding */ sortAndMapPluginToOptions)\n/* harmony export */ });\nfunction isObject(subject) {\n  return Object.prototype.toString.call(subject) === '[object Object]';\n}\nfunction isRecord(subject) {\n  return isObject(subject) || Array.isArray(subject);\n}\nfunction canUseDOM() {\n  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);\n}\nfunction areOptionsEqual(optionsA, optionsB) {\n  const optionsAKeys = Object.keys(optionsA);\n  const optionsBKeys = Object.keys(optionsB);\n  if (optionsAKeys.length !== optionsBKeys.length) return false;\n  const breakpointsA = JSON.stringify(Object.keys(optionsA.breakpoints || {}));\n  const breakpointsB = JSON.stringify(Object.keys(optionsB.breakpoints || {}));\n  if (breakpointsA !== breakpointsB) return false;\n  return optionsAKeys.every(key => {\n    const valueA = optionsA[key];\n    const valueB = optionsB[key];\n    if (typeof valueA === 'function') return `${valueA}` === `${valueB}`;\n    if (!isRecord(valueA) || !isRecord(valueB)) return valueA === valueB;\n    return areOptionsEqual(valueA, valueB);\n  });\n}\nfunction sortAndMapPluginToOptions(plugins) {\n  return plugins.concat().sort((a, b) => a.name > b.name ? 1 : -1).map(plugin => plugin.options);\n}\nfunction arePluginsEqual(pluginsA, pluginsB) {\n  if (pluginsA.length !== pluginsB.length) return false;\n  const optionsA = sortAndMapPluginToOptions(pluginsA);\n  const optionsB = sortAndMapPluginToOptions(pluginsB);\n  return optionsA.every((optionA, index) => {\n    const optionB = optionsB[index];\n    return areOptionsEqual(optionA, optionB);\n  });\n}\n\n\n//# sourceMappingURL=embla-carousel-reactive-utils.esm.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZW1ibGEtY2Fyb3VzZWwtcmVhY3RpdmUtdXRpbHMvZXNtL2VtYmxhLWNhcm91c2VsLXJlYWN0aXZlLXV0aWxzLmVzbS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0RUFBNEU7QUFDNUUsNEVBQTRFO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELE9BQU8sU0FBUyxPQUFPO0FBQ3ZFO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFa0Y7QUFDbEYiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AbWluaW1hbC1raXQvbmV4dC10cy8uL25vZGVfbW9kdWxlcy9lbWJsYS1jYXJvdXNlbC1yZWFjdGl2ZS11dGlscy9lc20vZW1ibGEtY2Fyb3VzZWwtcmVhY3RpdmUtdXRpbHMuZXNtLmpzP2RjMjMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gaXNPYmplY3Qoc3ViamVjdCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN1YmplY3QpID09PSAnW29iamVjdCBPYmplY3RdJztcbn1cbmZ1bmN0aW9uIGlzUmVjb3JkKHN1YmplY3QpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHN1YmplY3QpIHx8IEFycmF5LmlzQXJyYXkoc3ViamVjdCk7XG59XG5mdW5jdGlvbiBjYW5Vc2VET00oKSB7XG4gIHJldHVybiAhISh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQgJiYgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xufVxuZnVuY3Rpb24gYXJlT3B0aW9uc0VxdWFsKG9wdGlvbnNBLCBvcHRpb25zQikge1xuICBjb25zdCBvcHRpb25zQUtleXMgPSBPYmplY3Qua2V5cyhvcHRpb25zQSk7XG4gIGNvbnN0IG9wdGlvbnNCS2V5cyA9IE9iamVjdC5rZXlzKG9wdGlvbnNCKTtcbiAgaWYgKG9wdGlvbnNBS2V5cy5sZW5ndGggIT09IG9wdGlvbnNCS2V5cy5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgY29uc3QgYnJlYWtwb2ludHNBID0gSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmtleXMob3B0aW9uc0EuYnJlYWtwb2ludHMgfHwge30pKTtcbiAgY29uc3QgYnJlYWtwb2ludHNCID0gSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmtleXMob3B0aW9uc0IuYnJlYWtwb2ludHMgfHwge30pKTtcbiAgaWYgKGJyZWFrcG9pbnRzQSAhPT0gYnJlYWtwb2ludHNCKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBvcHRpb25zQUtleXMuZXZlcnkoa2V5ID0+IHtcbiAgICBjb25zdCB2YWx1ZUEgPSBvcHRpb25zQVtrZXldO1xuICAgIGNvbnN0IHZhbHVlQiA9IG9wdGlvbnNCW2tleV07XG4gICAgaWYgKHR5cGVvZiB2YWx1ZUEgPT09ICdmdW5jdGlvbicpIHJldHVybiBgJHt2YWx1ZUF9YCA9PT0gYCR7dmFsdWVCfWA7XG4gICAgaWYgKCFpc1JlY29yZCh2YWx1ZUEpIHx8ICFpc1JlY29yZCh2YWx1ZUIpKSByZXR1cm4gdmFsdWVBID09PSB2YWx1ZUI7XG4gICAgcmV0dXJuIGFyZU9wdGlvbnNFcXVhbCh2YWx1ZUEsIHZhbHVlQik7XG4gIH0pO1xufVxuZnVuY3Rpb24gc29ydEFuZE1hcFBsdWdpblRvT3B0aW9ucyhwbHVnaW5zKSB7XG4gIHJldHVybiBwbHVnaW5zLmNvbmNhdCgpLnNvcnQoKGEsIGIpID0+IGEubmFtZSA+IGIubmFtZSA/IDEgOiAtMSkubWFwKHBsdWdpbiA9PiBwbHVnaW4ub3B0aW9ucyk7XG59XG5mdW5jdGlvbiBhcmVQbHVnaW5zRXF1YWwocGx1Z2luc0EsIHBsdWdpbnNCKSB7XG4gIGlmIChwbHVnaW5zQS5sZW5ndGggIT09IHBsdWdpbnNCLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBvcHRpb25zQSA9IHNvcnRBbmRNYXBQbHVnaW5Ub09wdGlvbnMocGx1Z2luc0EpO1xuICBjb25zdCBvcHRpb25zQiA9IHNvcnRBbmRNYXBQbHVnaW5Ub09wdGlvbnMocGx1Z2luc0IpO1xuICByZXR1cm4gb3B0aW9uc0EuZXZlcnkoKG9wdGlvbkEsIGluZGV4KSA9PiB7XG4gICAgY29uc3Qgb3B0aW9uQiA9IG9wdGlvbnNCW2luZGV4XTtcbiAgICByZXR1cm4gYXJlT3B0aW9uc0VxdWFsKG9wdGlvbkEsIG9wdGlvbkIpO1xuICB9KTtcbn1cblxuZXhwb3J0IHsgYXJlT3B0aW9uc0VxdWFsLCBhcmVQbHVnaW5zRXF1YWwsIGNhblVzZURPTSwgc29ydEFuZE1hcFBsdWdpblRvT3B0aW9ucyB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZW1ibGEtY2Fyb3VzZWwtcmVhY3RpdmUtdXRpbHMuZXNtLmpzLm1hcFxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/embla-carousel-reactive-utils/esm/embla-carousel-reactive-utils.esm.js\n");

/***/ })

};
;