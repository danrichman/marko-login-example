//require('./style.scss');
var emailValidator = require("email-validator");

module.exports = require('marko-widgets').defineComponent({
    template: require('./template.marko'),
    getInitialState: function(input) {
        return {
            label: input.label,
            className: input.class,
            name: input.name,
            required: input.required,
            disabled: input.disabled,
            autofocus: input.autofocus || false ,
            type: input.type || 'text',
            errorMessage: input.errorMessage || 'There was an error',
            selected: input.selected || false ,
            //required: input.required || false ,
            pattern: input.pattern,
            maxlength: input.maxlength,
            minlength: input.minlength
        };
    },
    getTemplateData: function(state, input) {
        return state;
    },
    handleInputFocus: function() {
        // When input is selected set the state
        this.setState('selected', true);
        this.handleInputCheck();
    },
    handleInputBlur: function() {
        // When input is not selected set the state
        this.setState('selected', false);
        this.handleInputCheck();
    },
    handleInputChange: function() {
        this.handleInputCheck();
    },
    handleInputKeyUp: function() {
        this.handleInputCheck();
    },
    handleInputCheck: function() {
        // Check the validation and states of the input with each keystroke
        var newInput = this.getEl('floatInput');
        var newInputValue = this.getEl('floatInput').value;
        var floatClass = this.el.classList;
        var inputType = this.state.type;
        var errorMessage = this.state.errorMessage;

        if (newInputValue.length && !floatClass.contains('floating-label-form-group-with-value') ){
            // If the input has a value flip the class for presentation effects.
            this.setState('selected', true);
            this.el.className += ' floating-label-form-group-with-value';
        } else if (!newInputValue.length) {
            // If the input has no value flip remove the classes to turn off presentation effects.
            this.setState('selected', false);
            this.el.className = this.el.className.replace(' floating-label-form-group-with-error','');
            this.el.className = this.el.className.replace(' floating-label-form-group-with-value','');
        };
        if (inputType === 'email') {
            // If the input type is "email", validate it.
            if (emailValidator.validate(newInputValue)) { // Need to set a slight delay here. Maybe setTimeout(function() {}, 3000);
                this.isValid();
            } else if (newInputValue.length) {
                this.isInvalid();
                this.triggerErrorMessage(errorMessage);
            };
        };
        if (inputType === 'password') {
            console.log('Input senses a password');
            if (newInputValue.length) {
                // Emit a 'hasValue' event to other widgets
                this.emit('hasValue', this);
            } else if (!newInputValue.length) {
                // Emit a 'noValue' event to other widgets
                this.emit('noValue', this);
            }
        };
        if (inputType === 'text') {
            // If the input type is "text", make sure it has a value.
            if (newInputValue.length) {
                // Emit a 'hasValue' event to other widgets
                this.emit('hasValue', this);
            } else if (!newInputValue.length) {
                // Emit a 'noValue' event to other widgets
                this.emit('noValue', this);
            }
        };
    },
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
    },
    isValid: function() {
        var floatClass = this.el.classList;
        var newInputValue = this.getEl('floatInput').value;
        if (floatClass.contains('floating-label-form-group-with-error')) {
            this.el.className = this.el.className.replace(' floating-label-form-group-with-error','');
        }
        if (newInputValue.length && !floatClass.contains('floating-label-form-group-with-value')) {
            this.el.className += ' floating-label-form-group-with-value';
        }
        this.triggerNormalLabel();
        this.emit('valid', this);
    },
    isInvalid: function() {
        var floatClass = this.el.classList;
        if (!floatClass.contains('floating-label-form-group-with-error')) {
            this.el.className += ' floating-label-form-group-with-error';
        }
        this.emit('invalid', this);
    },
    triggerErrorMessage: function(errorMessage) {
        // Change label to display an error message from widget's input attribute
        var inputLabelEl = this.getEl('floatInputLabel');
        inputLabelEl.innerHTML = errorMessage;
    },
    triggerNormalLabel: function() {
        // When validation error is resolved, show the normal label again.
        var inputLabelEl = this.getEl('floatInputLabel');
        var label = this.state.label;
        inputLabelEl.innerHTML = label;
    }
});