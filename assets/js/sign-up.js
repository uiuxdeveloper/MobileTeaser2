$(document).ready(function(){
	$('.tip').tooltip({
          'speed': 300,
          'position': 'top'
     });
	
	var cp = captcha();
	
	var userInfo = {
		email:'',
		password: '',
		dob: '1/1/1970',		
	}
	
	var apiSettings = {
		register_url:'https://api.nexon.net/account/register',
		product_id:'10200',
		mobile_product_id:'30100',
		blackbox: '',
		host_settings : 'api.nexon.net'
	}

	var isFormError = false;

	$(document).on('click','#submit-btn',function(event){
		event.preventDefault();
		if( !validateForm(this) ) {
			sendFormData();
		}
	});

	$('.input-holder > input').on('blur',function(){
		validateForm(this);
	});

	$('body').flowtype({
		maximum   : 1200,
		minimum   : 320,
		maxFont   : 30,
		minFont   : 12,
		fontRatio : 30
	});

	function captcha() {
		var init = function() {

			$('#flipper').switchify().data('switch').bind('switch:slide', function(e, type) {
				console.log(type);
				if (type ==="on") {
					$('#form-submit').append('<input type="button" id="submit-btn" value="" class="ga-tracker" data-track="Sign Up submit button clicked">');
				} else {
					$('#submit-btn').remove();
				}
			}); 
			randomize();
		},
		randomize = function() {
			var randomBool = [true,false][Math.round(Math.random())];
			if (randomBool)  {
				$('.ui-switch').addClass('flip');
			} 
		}
		return init();
	}

	function sendFormData() {
		if (!isFormError) {
			$.ajax({
				type: 'POST',
				url: apiSettings.register_url,
				headers: {'Host': apiSettings.host_settings},	
				crossDomain: true,		
				data:{
					
					'email_address': userInfo.email,
					'password': userInfo.password,
					'dob': userInfo.dob ,
					'product_id': apiSettings.mobile_product_id,
					'is_mobile':true

				},
				dataType: 'JSONP',
				success: function(data){
					handleResponse(data);
				},
				error: function (responseData, textStatus, errorThrown) {
					showError(textStatus);
				}
			});
		}
	};
	
	function validateForm(formInput){
		$formEmail = $('#form-email'),
	    $formPassword = $('#form-password'),
	    $formPasswordConfirm = $('#form-password-confirm'),
	    $formEmail = $('#form-email'),
	    $formDOB = $('#form-dob'),
	    $formTermsAgree = $('#terms-agree');
	    isFormError = false;
	    userInfo.email = $formEmail.val();
		userInfo.password = $formPassword.val();
		userInfo.dob = $formDOB.val();

		switch( formInput.id ) {
			case "form-email":
				isValidEmail($formEmail);
				break;
			case "form-password":
				isValidPassword($formPassword);
				break;
			case "form-password-confirm":
				isPasswordMatched($formPasswordConfirm,$formPassword);
				break;
			case "form-dob":
				isValidDob($formDOB);
				break;
			case "terms-agree":
				isAgreeChecked($formTermsAgree);
				break;
			default:
				isValidEmail($formEmail);
				isValidPassword($formPassword);
				isPasswordMatched($formPasswordConfirm,$formPassword);
				isAgreeChecked($formTermsAgree);
				isValidDob($formDOB);
				break;
		}
		
		function  isValidEmail(email) {
			var emailRegEx = /(.+)@(.+){2,}\.(.+){2,}/;
			showFieldError( email,emailRegEx.test( email.val() ),'Invalid Email address') 
		}

		function  isValidDob(dob) {
			showFieldError( dob,isValidDate(dob.val()),'please enter a birthdate in mm/dd/yyyy format') 
		}

		function  isValidPassword(password) {
			showFieldError(  password,password.val().length >= 6 ,'passwords must be at least 6 characters long');
		}

		function  isPasswordMatched(password,passwordConfirm) {
			showFieldError( password,password.val() === passwordConfirm.val(),'oops,Passwords do not match');
		}

		function  isAgreeChecked(agree) {
			showFieldError( agree,agree.is(':checked'),'Please agree to terms and privacy policy');
		}

		function showFieldError(field,bool,msg) {
			if(bool) {
				field.next('.input-error').html('');
				field.siblings('.error-msg').html('&nbsp;')
			} else {
				field.next('.input-error').html('*');
				field.siblings('.error-msg').html(msg);
				isFormError = true;
			}
		}
		return isFormError;
	};

	function showFormError(msg) {
		var $errorWrapper =$(".error-wrapper");
			if(msg === 'DUPLICATED_EMAIL') {
				$errorWrapper.html('It looks like this email is already in use.');
			} else {
				$errorWrapper.html(msg);
			}
		}
	
	function handleResponse(obj) {
		var $captchaWrapper = $(".captcha-wrapper"),
		$successWrapper = $(".success-wrapper"),
		$confEmail = $("#conf-email");
		
		if (obj.success) {
			$confEmail.html(userInfo.email);
			$captchaWrapper.html('');
			$successWrapper.show(300);
		} else if (obj.error){
			showFormError(obj.error.message);
		}
		
	};

	function showError(msg){
		var $errorWrapper = $(".error-wrapper");
		$errorWrapper.html(msg).show(300);
		return false;
	};
	
	
	function isValidDate(dateString)
	{
		// First check for the pattern
		if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
			return false;
	
		// Parse the date parts to integers
		var parts = dateString.split("/");
		var day = parseInt(parts[1], 10);
		var month = parseInt(parts[0], 10);
		var year = parseInt(parts[2], 10);
	
		// Check the ranges of month and year
		if(year < 1000 || year > 3000 || month == 0 || month > 12)
			return false;
	
		var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
	
		// Adjust for leap years
		if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
			monthLength[1] = 29;
	
		// Check the range of the day
		return day > 0 && day <= monthLength[month - 1];
	};
	
	//adding slashes to dob automatically
	$('#form-dob').on('input',function(){
		var val = $(this).val();
		if (val.length == 2){
			$(this).val(val + "/");
		}else if (val.length == 5){
			$(this).val(val + "/");
		}

	});
	
	$('.ga-tracker').on('click',function(){
		ga('send', 'button', 'click', $(this).data('track')); 
	});

});
