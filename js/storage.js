var storage = (function(){

  'use strict';

  var _storage = localStorage;

  var _isArgExists = function(arg, msg) {
    if (typeof arg === 'string' || typeof arg === 'number') {
      return true;
    } else {
      alert(msg + ', ' + typeof arg + ' given.');
      return false;
    }
  };

  var _isKeyExists = function(key) {
    return (_get(key)) ? true : false;
  };

  var _length = function() {
    return _storage.length;
  };

  var _save = function(key, value) {
    if (!_isArgExists(key, 'Key argument must be string or integer')) return;
    value = value || '';
    _storage.setItem(key, value);
  };

  var _get = function(key) {
    if (!_isArgExists(key, 'Key argument must be string or integer')) return;
    return _storage.getItem(key);
  };

  var _getAll = function() {
    return [];
  };

  var _delete = function(key) {
    if (!_isArgExists(key, 'Key argument must be string or integer')) return;
    _storage.removeItem(key);
  };

  var _clear = function() {
    _storage.clear();
  };

  return {
    save: _save,
    get: _get,
    getAll: _getAll,
    delete: _delete,
    clear: _clear,
    length: _length,
    isKeyExists: _isKeyExists
  };

}());
