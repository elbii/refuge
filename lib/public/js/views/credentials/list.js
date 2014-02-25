define([
  'jquery',
  'underscore',
  'backbone',
  'lib/dispatch',
  'lib/state',
  'helpers/flash',
  'models/credential',
  'collections/credentials',
  'views/credentials/form',
  'text!templates/credentials/list.mtpl'
], function ($, _, Backbone, Dispatch, State, Flash, Credential, List,
  CredentialForm, template) {

  var CredentialsList = Backbone.View.extend({
    call: function (e) {
      var target = $(e.target).closest('[data-action]')
        , func = target.data('action');
      this[func](e, target);
    },

    dispose: function () {
      this.undelegateEvents();
      this.stopListening();
      Dispatch.off('views/credentials/form:success', this.modifyCollection);
      Dispatch.off('views/credentials/toolbar:filter', this.filter);
      this.remove();
    },

    editCredential: function (e, target) {
      var model = this.collection.get($(target).data('target-id'));
      Dispatch.trigger('views/credentials/list:edit', model);
    },

    events: {
      'click [data-action]': 'call'
    },

    filter: function (text) {
      var matched = this.origCollection.filter(function (credential) {
        return credential.get('title').indexOf(text) > -1;
      });

      this.collection.reset(matched);
    },

    initialize: function () {
      var self = this;

      Dispatch.on('views/credentials/toolbar:filter', this.filter, this);
      Dispatch.on('views/credentials/form:success', this.modifyCollection,
        this);

      if (!State.session.has('credentials')) {
        State.session.set('credentials', new List());
      }

      // reset collection from server if not existent
      State.session.get('credentials').fetch({
        success: function (collection) {
          self.origCollection = collection;
          self.collection = _.clone(self.origCollection);
          self.listenTo(self.collection, 'add change reset', self.render);
          State.session.set('credentials', self.collection);

          self.render();
        },
        error: function (collection, xhr) {
          Flash.error(xhr.responseJSON.message);
        }
      });
    },

    modifyCollection: function (model) {
      this.collection.add(model, { merge: true });
    },

    render: function () {
      if (this.collection) {
        this.$el.hide().html(this.template()).fadeIn('fast');
      }

      this.delegateEvents();
    },

    template: _.template(template)
  });

  return CredentialsList;
});
