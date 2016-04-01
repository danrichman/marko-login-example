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
        if (this.state.emailValid && this.state.usernameValid && this.state.fullnameValid) {

            // RUN ADDITIONAL VALIDATION CHECKS HERE!!!

            this.unlockForm();
            console.log('Form is unlocked!');

            // If Not valid, turn off submit button with:
            // this.lockForm();
        }
    },
    handleFormSubmit: function(event) {
        var submittedEmail = this.getWidget('email').getEl('floatInput').value;
        var submittedFullname = this.getWidget('fullname').getEl('floatInput').value;
        var submittedUsername = this.getWidget('username').getEl('floatInput').value;

        // FORM IS COLLECTING THESE VALUES
        console.log(submittedEmail);
        console.log(submittedFullname);
        console.log(submittedUsername);

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
    handleUsernameHasValue: function() {
        console.log('Form senses Username has a value');

        // if not valid then do:

        // this.lockForm();
        // this.setState('usernameValid', false);

        // Then switch nested input field widget to invalid by doing:
        //
        // var username = this.getWidget('username');
        // username.isInvalid(); // Send isInvalid to nested widget
        // username.triggerErrorMessage(); // send a custom with triggerErrorMessage('Custon Error Message');

        // If valid do:

        this.setState('usernameValid', true); // Used to attempt to unlock form
        // username.isValid();  // Send isValid to nested widget
        // username.triggerNormalLabel();

        // If all tests pass then:
        this.attemptUnlockForm();

    },
    handleFullnameHasValue: function() {
        console.log('Form senses Full name has value!');

        // if not valid then do:

        // this.lockForm();
        // this.setState('fullnameValid', false);

        // Then switch nested input field widget to invalid by doing:
        //
        // var fullname = this.getWidget('fullname');
        // fullname.isInvalid(); // Send isInvalid to nested widget
        // fullname.triggerErrorMessage(); // send a custom with triggerErrorMessage('Custon Error Message');

        // If valid do:

        this.setState('fullnameValid', true); // Used to attempt to unlock form
        // fullname.isValid();  // Send isValid to nested widget
        // fullname.triggerNormalLabel();

        // If all tests pass then:
        this.attemptUnlockForm();

    },

    handleEmailInvalid: function() {
        console.log('Form senses an Invalid email');
        this.setState('emailValid', false);
        this.lockForm();
    },
    handleUsernameNoValue: function() {
        console.log('Form senses Username has no value');
        this.setState('usernameValid', false);
        this.lockForm();
    },
    handleFullnameNoValue: function() {
        console.log('Form senses Full name has no value!');
        this.setState('fullnameValid', false);
        this.lockForm();
    },
    renderWelcomeForm: function() {
        welcome.render({
            // label: 'Hello World',
            // checked: true
        })
        .appendTo(document.getElementById("register"));
    }
});