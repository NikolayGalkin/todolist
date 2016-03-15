(function(storage, view){

  'use strict';

  if (typeof storage !== 'object' || typeof view !== 'object') {
    alert(
      'Storage and View must be an object. You give: Storage = ' + typeof storage + '; View = ' + typeof view + '.'
    );
    return;
  }

  var data = [
    {
      title: 'Block_1',
      todo: [
        {task: 'Block_1 Task1', done: false},
        {task: 'Block_1 Task2', done: true},
        {task: 'Block_1 Task3', done: false}
      ]
    },
    {
      title: 'Block_2',
      todo: [
        {task: 'Block_2 Task1', done: true},
        {task: 'Block_2 Task2', done: false},
        {task: 'Block_2 Task3', done: false}
      ]
    },
    {
      title: 'Block_3',
      todo: [
        {task: 'Block_3 Task1', done: true},
        {task: 'Block_3 Task2', done: false},
        {task: 'Block_3 Task3', done: true}
      ]
    },
    {
      title: 'Block_4',
      todo: [
        {task: 'Block_4 Task1', done: false},
        {task: 'Block_4 Task2', done: false},
        {task: 'Block_4 Task3', done: false}
      ]
    }
  ];

  var app = {
    model: storage,
    view: view,
    modelData: null,
    init: function() {
      this.modelData = this.model.getAll();
      this.view.render('template', { data: this.modelData });
    }
  };

  app.init();

}(storage, view));
