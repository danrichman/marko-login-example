require('./style.scss');

module.exports = require('marko-widgets').defineComponent({
    template: require('./template.marko'),
    getInitialState: function(input) {
        return input;
    },
    getTemplateData: function(state, input) {
        return state;
    },
    handleSwitchChange: function(event, input) {
        var checked = input.checked === true;
        this.setState('checked', checked);

        // this.emit('someEvent', { /* Some data object that the parent might be interested in */ });
        this.emit('checkboxChanged', {
            name: input.name,
            checked: checked
        });
    },
});
