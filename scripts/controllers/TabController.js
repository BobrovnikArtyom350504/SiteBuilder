let TabCollection = require('../models/TabCollection');

class TabController {

	constructor () {
		this.tabs = new TabCollection();
	}

	addTab(index, content, imageUrl, title) {
		this.addTabView(index, title);
		this.tabs.addTab(index, content, imageUrl, title);
		this.setCurrentTab(index);
	}

	editTab(newIndex, content, imageUrl, title) {
		debugger;
		this.removeTabView(this.tabs.currentTabIndex);
		this.addTabView(newIndex, title);
		this.tabs.editTab(this.tabs.currentTabIndex, newIndex, content, imageUrl, title);
		this.setCurrentTab(newIndex);
	}

	setCurrentTab(index) {
		if(index >= $(".tabs li").length)
			this.tabs.currentTabIndex = this.tabs.length - 1;
		else
			this.tabs.currentTabIndex = index;
		$('.tabs li').eq(this.tabs.currentTabIndex).trigger('click');
	}

	addTabView(index, title) {
		debugger;
		let newElement = `<li class="tab"> ${title} </li>`; 
		let tabs = this.tabs;
		$('.tabs li').eq(tabs.currentTabIndex).removeAttr('id');
		if(index >= $(".tabs li").length) {
			$(".tabs li").eq($(".tabs li").length - 1).after(newElement);
		}
		else {
			$(".tabs li").eq(index).before(newElement);
		}

	}

	removeTabView(index) {
		$('.tabs li').eq(index).remove();
	}

	addOnTabClickListener(activeTabFunction) {
		let tabs = this.tabs;
		$(document).on('click', '.tabs li', function() {
			$('.tabs li').eq(tabs.currentTabIndex).removeAttr('id');
			tabs.currentTabIndex = $(this).index();
			$(this).attr('id', 'active-tab') 
			
			activeTabFunction(tabs.currentTabIndex,
				tabs.currentTab.title,
				tabs.currentTab.content,
				tabs.currentTab.imageUrl);
		});
	}
}

module.exports = TabController;