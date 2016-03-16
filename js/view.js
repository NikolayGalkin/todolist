var view = (function(_, $){

  'use strict';

  function _render(elemID, data) {
    if (typeof elemID !== 'string' || typeof data !== 'object') {
      alert(
        'Element identifier must be a string, data must be an object. You give: ' +
        'Element ID = ' + typeof elemID + '; ' + 'Data = ' + typeof data + '.'
      );
      return;
    }

    var elem = $(document.getElementById(elemID)),
        tmpl = _.template($(elem).html());

    $(elem).replaceWith(tmpl(data));
  }

  return {
    render: _render
  };

}(_, jQuery));
