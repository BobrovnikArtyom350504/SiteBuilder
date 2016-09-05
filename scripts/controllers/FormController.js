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