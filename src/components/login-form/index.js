//var validate = require("validate.js");

module.exports = require('marko-widgets').defineComponent({
    template: require('./template.marko'),
    getInitialState: function(input) {
        return input;
    },
    getTemplateData: function(state, input) {
        // No need to explicitly declare individual states when all inputs have state.
        return state;
    },
    unlockForm: function() {
        //Use this to turn the submit button on when everything is valid
        this.setState('formValid', true);
        this.getWidget('submit').setDisabled();
    },
    lockForm: function() {
        //Use this to turn the submit button off (when something isn't valid)
        this.setState('formValid', false);
        this.getWidget('submit').setDisabled('disabled');
    },
    attemptUnlockForm: function() {
        //
        if (this.state.emailValid && this.state.passwordValid) {

            // RUN ADDITIONAL VALIDATION CHECKS HERE!!!

            this.unlockForm();
            console.log('Form is unlocked!');

            // If Not valid, turn off submit button with:
            // this.lockForm();
        }
    },
    handleFormSubmit: function(event) {
        var submittedEmail = this.getWidget('email').getEl('floatInput').value;
        var submittedPassword = this.getWidget('password').getEl('floatInput').value;
        var submittedCheckbox = this.getWidget('staySignedIn').getEl('switch').checked;

        // FORM IS COLLECTING THESE VALUES
        console.log(submittedEmail);
        console.log(submittedPassword);
        console.log(submittedCheckbox);

        event.preventDefault(); // Not entirely sure what this does, but it was in another example
    },
    handleEmailValid: function() {
        console.log('Form senses valid Email');

        // if not valid then do:

        // this.lockForm();
        // this.setState('emailValid', false);

        // Then switch nested input field widget to invalid by doing:
        //
        // var email = this.getWidget('email');
        // email.isInvalid(); // Send isInvalid to nested widget
        // email.triggerErrorMessage(); // send a custom with triggerErrorMessage('Custon Error Message');

        // If valid do:

        this.setState('emailValid', true); // Used to attempt to unlock form
        // email.isValid();  // Send isValid to nested widget
        // email.triggerNormalLabel();

        // If all tests pass then:
        this.attemptUnlockForm();

    },
    handlePasswordHasValue: function() {
        console.log('Form senses Password has a value');

        // if not valid then do:

        // this.lockForm();
        // this.setState('passwordValid', false);

        // Then switch nested input field widget to invalid by doing:
        //
        // var password = this.getWidget('password');
        // password.isInvalid(); // Send isInvalid to nested widget
        // password.triggerErrorMessage(); // send a custom with triggerErrorMessage('Custon Error Message');

        // IF valid do:

        this.setState('passwordValid', true); // Used to attempt to unlock form
        // password.isValid();  // Send isValid to nested widget
        // password.triggerNormalLabel();

        // If all tests pass then:
        this.attemptUnlockForm();

    },
    handleCheckboxChanged: function(name) { // Not sure I did this right
        console.log('Form senses Checkbox was changed');
        console.log(name);
    },
    handleEmailInvalid: function() {
        console.log('Form senses an Invalid email');
        this.setState('emailValid', false);
        this.lockForm();
    },
    handlePasswordNoValue: function() {
        console.log('Form senses Password has no value');
        this.setState('passwordValid', false);
        this.lockForm();
    }
});