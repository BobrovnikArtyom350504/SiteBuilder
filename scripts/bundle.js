/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	let SiteBuilder = __webpack_require__(1);
	siteBuilder = new SiteBuilder();









/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	let TabController = __webpack_require__(2);
	let FormController = __webpack_require__(5);
	let SliderController = __webpack_require__(6);
	let PageController = __webpack_require__(7);

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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	let TabCollection = __webpack_require__(3);

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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	let Tab = __webpack_require__(4);

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

/***/ },
/* 4 */
/***/ function(module, exports) {

	class Tab {
		constructor (content, imageUrl, title) {
			this.content = content;
			this.imageUrl = imageUrl;
			this.title = title;
		}
	}

	module.exports = Tab;


/***/ },
/* 5 */
/***/ function(module, exports) {

	class FormController {

		static fillForm(index, title, content, imageUrl) {
			$('#index').val(index);
			$('#title').val(title);
			$('#html').val(content);
			$('#image').val(imageUrl);
		}

		static cleanForm() {
			$('aside input, aside textarea').each(function () {
				$(this).val('');
			});
		}

		static isFormVisible() {
			return $('.collapse').attr('id') !== 'expand';
		}

		static showForm() {
			if(!FormController.isFormVisible()) {
				$('aside').children().not('.collapse').removeClass('hidden');
				$('.collapse').removeAttr('id', 'expand');
				$('.collapse').text('⇐');
				$('aside').removeAttr('id', 'hidden-aside');
				$('main').removeAttr('id', 'full-screan');
			}
		}

		static hideForm() {
			if(FormController.isFormVisible()) {
				$('aside').children().not('.collapse').addClass('hidden');
				$('.collapse').attr('id', 'expand').text('⇒');
				$('aside').attr('id', 'hidden-aside');
				$('main').attr('id', 'full-screan');
			}
		}

		static isValidForm() {
			if($('#index').val() && $('#title').val() && $("#html").val())
				if(typeof Number($('#index').val()) === 'number' && Number($('#index').val()) >= 0)
					return true;
			return false;
		}

		static addOnAddClickListener (addTabFunction) {
			$('.add').on('click', function() {
				if(FormController.isValidForm() === true) {
					addTabFunction(parseInt($('#index').val()), $('#html').val(), 
						$('#image').val(), $('#title').val());
					FormController.cleanForm();
				}
				else 
					alert("fill all the fields, index should be larger than 0");
				return false; 	
			});
		}

		static addOnResetClickListener () {
			$('.reset').on('click', function() {
				FormController.cleanForm();
				return false;	
			});
		}

		static addOnEditClickListener (editTabFunction) {
			$('.edit').on('click', function() {
				if(FormController.isValidForm() === true) {
					debugger;
					editTabFunction(parseInt($('#index').val()), $('#html').val(), 
						$('#image').val(), $('#title').val());
					FormController.cleanForm();
				}
				else 
					alert("fill all the fields, index should be larger than 0");
				return false; 	
			});
		}

		static addOnToggleClickListener () {
			$('.collapse').on('click', function(event) {
				event.preventDefault();
				if($('.collapse').attr('id') !== 'expand')
					FormController.hideForm();
				else 
					FormController.showForm();
			});
		}
	}

	module.exports = FormController;

/***/ },
/* 6 */
/***/ function(module, exports) {

	class SliderController {

		static showSlide(imageUrl) {
			$('.slider').css('background', `url(${imageUrl}) no-repeat`);
			$('.slider').css('background-size', 'cover');
		}

		static showTabImage(tab) {
			$('.slider').css('background', `url(${tab.imageUrl}) no-repeat`);
			$('.slider').css('background-size', 'cover');
		}
	}

	module.exports = SliderController;

/***/ },
/* 7 */
/***/ function(module, exports) {

	class PageController {

		static showContent(content) {
			$('.content').html(content);
		}
	}

	module.exports = PageController;

/***/ }
/******/ ]);