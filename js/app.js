(function(storage, view, $){

  'use strict';

  if (typeof storage !== 'object' || typeof view !== 'object') {
    alert(
      'Storage and View must be an object. You give: Storage = ' + typeof storage + '; View = ' + typeof view + '.'
    );
    return;
  }

  // var data = [
  //   {
  //     todoListTitle: 'Block_1',
  //     todoListID: 'todoList1',
  //     todoListItems: [
  //       {job: 'Block_1 Task1', done: false},
  //       {job: 'Block_1 Task2', done: true},
  //       {job: 'Block_1 Task3', done: false}
  //     ]
  //   }
  // ];

  var app = {
    model: storage,
    view: view,
    modelData: null,
    init: function() {
      this.modelData = this.model.getAll();
      this.view.render('template', { data: this.modelData });
      this.listeners();
    },
    listeners: function() {
      $('#mainTodoContainer').delegate('input[data-role="add new job"]', 'keypress', {app: this}, this.addNewJob);
    },
    addNewJob: function() {
      if (event.charCode !== 13 || $(this).prop('value') === '') return;
      var title, id, job;
      if (app._isFirstJob(this)) {

      }
    },
    _isFirstJob: function(elem) {
      var length =  $(elem)
                    .closest('[data-role="todo list container"]')
                    .find('[data-role="todo list body"]')
                    .children()
                    .length;
      return (!length) ? true : false;
    }
  };

  app.init();

}(storage, view, jQuery));
