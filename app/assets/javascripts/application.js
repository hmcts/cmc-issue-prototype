/* global $ */
/* global GOVUK */

// Warn about using the kit in production
if (window.console && window.console.info) {
	window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
    // Use GOV.UK shim-links-with-button-role.js to trigger a link styled to look like a button,
    // with role="button" when the space key is pressed.
    GOVUK.shimLinksWithButtonRole.init()

    // Show and hide toggled content
    // Where .multiple-choice uses the data-target attribute
    // to toggle hidden content
    var showHideContent = new GOVUK.ShowHideContent()
    showHideContent.init()
})

$( document ).ready(function() {
	$('.otherType').on('change',function(){
		if( $(this).val()==="4"){
			$(".other").show()
		}
		else if ( $(this).val()==="7"){
			$(".other").show()
		}		
		else{
			$(".other").hide()

		}
	}); 


	$(".summary-link").click(function(){
	    $(".sub").toggle();

	   
	});
 	
 		$(".summary-link2").click(function(){
	    $(".sub2").toggle();

	   
	});



	$('.otherType').on('change',function(){
		if( $(this).val()==="4"){
			$(".evidence-message").text("Please specify");


		}
		else if ( $(this).val()==="7"){
			$(".evidence-message").text("Please specify");
		}
		else{
			$(".evidence-message").text("");
		}
	});

	if ($('form.postcode')) {
		  
	    $('#continue-button').removeClass('button');
	    $('#continue-button').addClass('secondary-button');
	    $('#find-button').click(function(e){
	      e.preventDefault();
	      showSelectAddress();
	    });
	      $('#continue-button').click(function(e){
	        e.preventDefault();
	        $('#select-address').addClass('error');
	        $('#select-address .error-message').show();
	      });
	    $('#postcode-seach-error').hide();
	}



});


function showSelectAddress() {

    $('#address-select-container').removeClass('error');
    $('#address-select-container .error-message').hide();
    $('#enter-manually').show();

  if ( $('#postcode').val().toUpperCase().indexOf('BT') === 0 ) {

    $('#country').val( 'Northern Ireland' );
    $('#postcode-seach-ni-error').show();
    $('#select-address').hide();
    showManaulEntry();

  } else {

      $.ajax({
        url: "/postcode-lookup?postcode=" + encodeURIComponent($('#postcode').val()),
        method: "GET",
        success: function(data, status, xhr){
          if(status === "success" && data.length){

            var html = '<option>' + data.length + ' addresses found </option>';

            jQuery.each( data, function(key, value){
              var formatted_address = [
                value.building_number || value.building_name || value.organisation_name,
                value.thoroughfare_name || value.dependent_locality,
                value.post_town,
                value.postcode
              ];
              html += '<option value="' + formatted_address.join(', ') + '">' + formatted_address.join(', ') + '</option>';
            });

            $('#addressList').html(html);

            $('.postcode-as-text p').html($('#postcode').val());
            $('#enter-postcode').hide();
            $('#select-address').show();
            $('#selected-address').hide();
            $('#manual-address').hide();
            $('#postcode-seach-error').hide();
            $('#postcode-seach-ni-error').hide();
            $('#continue-button').unbind('click').click(function(e){
              e.preventDefault();
              $('#address-select-container').addClass('error');
              $('#address-select-container .error-message').show();
            });

          } else {

            $('#postcode-seach-error').show();
            $('#postcode-seach-ni-error').hide();
            showManaulEntry();

          }

        },
        dataType: 'JSON'
      });

      $.ajax({
        url: "/country-lookup?postcode=" + encodeURIComponent($('#postcode').val()),
        method: "GET",
        success: function(data, status, xhr){

            $('#country').val( data.country.name );
      },
        dataType: 'JSON'

      });
    }
  }

 function showSelectedAddress() {
    $('#address-select-container').removeClass('error');
    $('#address-select-container .error-message').hide();
    $('#enter-postcode').hide();
    $('#select-address').show();
    $('#selected-address').hide();
    $('#manual-address').show();
  }

  function updateAddress(address) {
    showSelectedAddress();
    var addresses = $('#addressList').val().split(',');
    $("#street-1").val(addresses[0]);
    $("#street-2").val(addresses[1]);
    $("#town").val(addresses[2]);
    $("#postcode-full, #postcode-full-auto").val(addresses[3]);
    $('#continue-button').unbind('click');
    $('#find-button').addClass('secondary-button');
    $('#continue-button').removeClass('secondary-button');
    $('#continue-button').addClass('button');
    $('#enter-manually').hide();
  }

  function showAbroadAddress() {
    $('#street-label').html('Address');
    $('#postcode-label').html('Postal/ZIP code');
    $('#manual-address').show();
    $('#country').attr('type', 'text');
    $('#manual-address').addClass( 'abroad' );
    $('#enter-manually').hide();
    $('#postcode-finder').hide();

    $('#continue-button').unbind('click');
    $('#continue-button').removeClass('secondary-button');
    $('#continue-button').addClass('button');
    return false
  }

  function showManaulEntry() {
    $('#manual-address').show();
    $("#postcode-full").val( $('#postcode').val() );

    $('#continue-button').unbind('click');
    $('#find-button').addClass('secondary-button');
    $('#continue-button').removeClass('secondary-button');
    $('#continue-button').addClass('button');
    return false;
    
  }