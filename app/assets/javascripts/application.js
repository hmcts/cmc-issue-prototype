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






});