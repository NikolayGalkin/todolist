(function(model, view, $, _){

  'use strict';

  if (typeof model !== 'object' || typeof view !== 'object') {
    alert(
      'Model and View must be an object. You give: Model = ' + typeof storage + '; View = ' + typeof view + '.'
    );
    return;
  }

  var app = {
    model: model,
    view: view,

    init: function() {
      this.view.render('template', { data: this.model.getAll() });
      this._checkAllTodosForDone();
      if (this._isFirstStart()) this.createAppStructure();
      this.initEvents();
    },

    initEvents: function() {
      $('#main').delegate('[data-role="new job"]', 'keypress', {app: this}, this.addNewJob);
      $('#main').delegate('[data-role="todo job"] input[type="checkbox"]', 'click', {app: this}, this.markJob);
    },

    addNewJob: function() {
      if (event.charCode !== 13 || $(this).prop('value') === '') return;

      var id = +app._getJobContainer(this).attr('data-containerid'),
          job = $(this).prop('value');

      app._createNewJobElem(this, job);
      app._recountJobId(this);
      app.model.update(id, {job: job, done: false});
      $(this).closest('[data-role="todo container"]').toggleClass('done');
      $(this).prop('value', '');
    },

    markJob: function() {
      var checked = $(this).prop('checked'),
          job = $(this).closest('[data-role="todo job"]').find('[data-role="job text"]'),
          id = +app._getJobContainer(this).attr('data-containerid'),
          jobId = $(this).closest('[data-role="todo job"]').attr('data-jobid');

      if (checked === true) {
        job.wrap($('<del></del>'));
      } else if (checked === false) {
        job.unwrap();
      }

      app._checkTodoForDone(this);
      app.model.update(id, jobId, checked);
    },

    createAppStructure: function() {
      var todoContainer = $('[data-containerid="0"]', '#main'),
          title = _.trim($(todoContainer).find('[data-role="todo title"]').text()),
          structure = {
            title: title,
            jobs: []
          };

      this.model.createStructure(structure);
      this.model.save('firstStart', {"firstStart": "false"});
    },

    _createNewJobElem: function(elem, job) {
      this._getJobContainer(elem)
         .find('[data-role="todo body"]')
         .prepend(
           '<div class="checkbox" data-jobid="0" data-role="todo job">' +
           '<label><input type="checkbox"><span data-role="job text">' + job + '</span></label>' +
           '</div>'
          );
    },

    _recountJobId: function(elem) {
      this._getJobContainer(elem).find('[data-role="todo job"]').each(function(index) {
        $(this).attr('data-jobid', index);
      });
    },

    _checkTodoForDone: function(elem, flag) {
      var checkboxes,
          container;

      if (flag === true) {
        checkboxes = $(elem).find('[data-role="todo body"] input[type="checkbox"]');
        container = $(elem);
      } else {
        checkboxes = $(elem).closest('[data-role="todo body"]').find('input[type="checkbox"]');
        container = $(elem).closest('[data-role="todo container"]');
      }

      for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked === false) {
          container.removeClass('done');
          return;
        }
      }

      container.addClass('done');
    },

    _checkAllTodosForDone: function() {
      var app = this;
      $('#main').find('[data-role="todo container"]').each(function(){
        app._checkTodoForDone(this, true);
      });
    },

    _isFirstStart: function() {
      return (!this.model.get('firstStart')) ? true : false;
    },

    _getJobContainer: function(elem) {
      return $(elem).closest('[data-role="todo container"]');
    }
  };

  app.init();

}(model, view, jQuery, _));
