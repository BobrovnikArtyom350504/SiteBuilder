let Tab = require('./Tab');

class TabCollection {

	constructor() {
		this.tabs = [];
		this.currentTabIndex = 0;
	}

	addTab(index, content, imageUrl, title) {
		this.tabs.splice(index, 0, new Tab(content, imageUrl, title));
	}

	removeTab(index) {
		this.tabs.splice(index, 1);
	}

	editTab(index, newIndex, content, imageUrl, title) { 
		if(index < this.tabs.length) {
			this.removeTab(index);
			this.addTab(newIndex, content, imageUrl, title);
		}
	}

	get currentTab () {
		return this.tabs[this.currentTabIndex];
	}

	getTab (index) {
		return this.tabs[index];
	}

	get length () {
		return this.tabs.length;
	}
}

module.exports = TabCollection;