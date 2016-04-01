require('./style.scss');

module.exports = require('marko-widgets').defineComponent({
    template: require('./template.marko'),
    getInitialState: function(input) {
        return {
            label: input.label,
            className: input.class,
            type: input.type || 'text',
            selected: input.selected || false //,
          //  text: input.['text'],
            //label: input.['label']
        };
    },
    getTemplateData: function(state, input) {
        // ...

        return {
            label: state.label,
            type: state.type,
            className: input.class,
            //className: state.selected ? 'floating' : 'normal'
        };
    },
    handleInputFocus: function() {
        this.setState('selected', true);
        //console.log(this.state.selected);
    },
    handleInputBlur: function() {
        this.setState('selected', false);
        // console.log(this.state.selected);
    },

    //handleInputKeyUp: function() {
    handleInputChange: function() {
        var newInput = this.getEl('floatInput').value;
        var floatClass = this.el.classList;
        if (newInput.length && !floatClass.contains('floating-label-form-group-with-value') ){
            this.setState('selected', true);
            this.el.className += ' floating-label-form-group-with-value';
            // console.log(this.state.selected);
        } else if (!newInput.length) {
            this.setState('selected', false);
            this.el.className = this.el.className.replace(' floating-label-form-group-with-value','');
            // console.log(this.state.selected);
        };
    },

    // handleInputChange: function(event, input) {
    //     var newInput = this.getEl('floatInput').value;
    // },
    isSelected: function() {
        return this.state.selected;
    },
    update_selected: function(newSelected) {
        // update_selected is invoked by Marko Widgets behind the scenes
        // Manually update the DOM to reflect the new "selected"
        // state" to avoid re-rendering the entire widget.
        if (newSelected) {
            this.el.className += ' floating-label-form-group-with-focus';
        } else {
            this.el.className = this.el.className.replace(' floating-label-form-group-with-focus','');
        }
    }
});