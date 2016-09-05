let TabController = require('./TabController');
let FormController = require('./FormController');
let SliderController = require('./SliderController');
let PageController = require('./PageController');

class SiteBuilder {
	constructor () {
		this.tabController = new TabController();
		this.addListeners();
		this.addDefaultContent();
		this.tabController.setCurrentTab(0);
	}

	static get DEFAULT_IMAGE_URL () {
		return 'http://img0.joyreactor.cc/pics/post/full/%D0%BA%D0%BE%D1%82%D1%8D-%D0%9A%D0%BB%D0%B8%D0%BA%D0%B0%D0%B1%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE-%D0%BE%D0%B1%D0%BE%D0%B8-%D0%BA%D1%80%D0%B0%D1%81%D0%B8%D0%B2%D1%8B%D0%B5-%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%BA%D0%B8-2629498.jpeg';
	}

	addListeners() { 
		this.tabController.addOnTabClickListener(function activeTab(index, title, content, imageUrl) {
			FormController.fillForm(index, title, content, imageUrl);
			SliderController.showSlide(imageUrl);
			PageController.showContent(content);
		});

		this.addOnFormClickListeners();
	}

	addOnFormClickListeners () {
		let tabController = this.tabController;

		FormController.addOnResetClickListener();

		FormController.addOnEditClickListener(function editTab (newIndex, content, imageUrl, title) {
			tabController.editTab(newIndex, content, imageUrl, title);
		});

		FormController.addOnAddClickListener(function addTab(index, content, imageUrl, title) {
			tabController.addTab(index, content, imageUrl, title);
		});

		FormController.addOnToggleClickListener();
	}

	addDefaultContent() {
		let imageUrl = SiteBuilder.DEFAULT_IMAGE_URL;
		let tabs = this.tabController.tabs;
		$(".tabs li").each(function(index) {
			tabs.addTab(index, `<li>${$(this).text()}</li>`, 
			imageUrl, `${$(this).text()}`);
		});
	}
}

module.exports = SiteBuilder;