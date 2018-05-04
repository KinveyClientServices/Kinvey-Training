var BasePage = require("../../shared/BasePage");
var topmost = require("ui/frame").topmost;
var Observable = require("data/observable").Observable;

var SettingsPage = function() {
  this.viewModel.set("blackBackground", false);
};
SettingsPage.prototype = new BasePage();
SettingsPage.prototype.constructor = SettingsPage;

// Place any code you want to run when the home page loads here.
SettingsPage.prototype.contentLoaded = function() {

	console.log('settings loaded');
}

module.exports = new SettingsPage();
