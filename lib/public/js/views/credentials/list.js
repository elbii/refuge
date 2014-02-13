define([
  'jquery',
  'underscore',
  'backbone',
  'lib/dispatch',
  'lib/state',
  'helpers/flash',
  'models/credential',
  'collections/credentials',
  'views/credentials/add',
  'text!templates/credentials/list.mtpl'
], function ($, _, Backbone, Dispatch, State, Flash, Credential, List,
  AddCredential, template) {

  var CredentialsList = Backbone.View.extend({
    call: function (e) {
      var target = $(e.target).closest('[data-action]')
        , func = target.data('action');
      this[func](e, target);
    },

    dispose: function () {
      this.undelegateEvents();
      this.stopListening();
      Dispatch.off('views/credentials/add:success', this.collection.add);
      this.remove();
    },

    editCredential: function (e, target) {
      var model = this.collection.get($(target).data('target-id'));
      Dispatch.trigger('views/credentials/list:edit', model);
    },

    events: {
      'click [data-action]': 'call'
    },

    initialize: function () {
      var self = this;

      if (!State.session.has('credentials')) {
        State.session.set('credentials', new List());
      }

      // reset collection from server if not existent
      State.session.get('credentials').fetch({
        success: function (collection) {
          self.collection = collection;
          self.listenTo(self.collection, 'add change', self.render);
          State.session.set('credentials', self.collection);
          Dispatch.on('views/credentials/add:success', self.collection.add,
            self.collection);

          self.render();
        },
        error: function (collection, xhr) {
          Flash.error(xhr.responseJSON.message);
        }
      });
    },

    render: function () {
      if (this.collection) {
        this.$el.html(this.template());
      }
    },

    showAddCredential: function () {
      (new AddCredential({
        model: new Credential()
      })).render();
    },

    template: _.template(template)
  });

  return CredentialsList;
});
