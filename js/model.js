var model = (function(){

  'use strict';

  var storage = localStorage,
      data = [];

  function isArgExists(arg, msg) {
    if (typeof arg === 'string' || typeof arg === 'number') {
      return true;
    } else {
      alert(msg + ', ' + typeof arg + ' given.');
      return false;
    }
  }

  function isKeyExists(key) {
    return (_get(key)) ? true : false;
  }

  function _save(key, value) {
    if (!isArgExists(key, 'Key argument must be string or integer')) return;
    value = JSON.stringify(value);
    storage.setItem(key, value);
  }

  function _get(key) {
    if (!isArgExists(key, 'Key argument must be string or integer')) return;
    return JSON.parse(storage.getItem(key));
  }

  function _update() {
    var containerId,
        jobId,
        value;

    if (arguments.length === 2) {
      containerId = arguments[0];
      value = arguments[1];

      data[containerId].jobs.splice(0, 0, value);
    } else if (arguments.length === 3) {
      containerId = arguments[0];
      jobId = arguments[1];
      value = arguments[2];

      data[containerId].jobs[jobId].done = value;
    }

    _save('todoList', data);
  }

  function _createStructure(value) {
    if (typeof value !== 'object') {
      alert("Model's createStructure method value argument must be an object. You give: " + typeof value + ".");
      return;
    }

    data = [value];
    _save('todoList', data);
  }

  function _getAll() {
    return data;
  }

  var init = (function () {
    if (!isKeyExists('todoList')) return;
    data = _get('todoList');
  }());

  return {
    get: _get,
    getAll: _getAll,
    update: _update,
    save: _save,
    createStructure: _createStructure
  };

}());

// var data = [
//   {
//     title: 'Block_1',
//     jobs: [
//       {job: 'Block_1 Task1', done: false},
//       {job: 'Block_1 Task2', done: true},
//       {job: 'Block_1 Task3', done: false}
//     ]
//   }
// ];
