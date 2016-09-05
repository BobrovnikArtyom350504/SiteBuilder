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