// Theme driven uiProperties overrides.  If you want to override elements
// of uiProperties within this file then
// 1) Uncomment the code between //OVERRIDES START HERE and
//                               //OVERRIDES END HERE
// 2) Define the specific property(ies) that you wish to
//    override from the managed package.
//
// Note that you must override according to the full object path
// but you can only override specific values, i.e. you do not need
// to provide the whole object copy.
//
//
// OVERRIDES START HERE
// CCRZ.uiProperties = $.extend(true,CCRZ.uiProperties,{
//     //Overriden partial objects here
// });
// OVERRIDES END HERE

/* Function declarations
--------------------------------------------------------------------*/
function scriptInjector() {
    /*-----------------------------*
     *----- Jquery validator  -----*
     *--- frontend  validation ----*
     *-----------------------------*/
     console.log('%c Script injector was invoked', 'font-size: 12px; color: #299009;');
    let url = 'https://cdn.jsdelivr.net/npm/jquery-validation@1.19.1/dist/jquery.validate.min.js';
    let script = document.createElement('script');
        script.setAttribute('async', true);
        script.setAttribute('defer', true);
        scripts = document.getElementsByTagName('script')[0];

    script.src = url;
    scripts.parentNode.appendChild(script);
}


function fixedHeaderAndScrollToTop() {
    /*-----------------------------*
     *----- Scroll top arrow  -----*
     *------- fixed header -- -----*
     *-----------------------------*/
    console.log('%c Scroll top arrow script is running sound', 'font-size: 12px; color: #2980b9;');

    let sliderPos = $('.cc_home_slider').offset().top;
    let windowPos;
    let calculation;
    let headerHeight = $('.header-wrapper').outerHeight();

    $('header').add('<div class=\"header-wrapper\"></div>').appendTo('header');
    $('header').height(headerHeight);
    $('header .cc_header').appendTo('.header-wrapper');
    $('header .cc_menu_container').appendTo('.header-wrapper');

    $(window).scroll(function(){
        windowPos = $(window).scrollTop();
        calculation = sliderPos - windowPos;

        headerHeight = $('.header-wrapper').outerHeight();
        $('header').height(headerHeight);

        // scroll back to the top statement
        if(calculation <= 0 && $(window).width() <= 767) {
            $('.cc_scroll-top').addClass('is-visible');
        } else {
            $('.cc_scroll-top').removeClass('is-visible');
        }

        // Fixed header statement
        if(calculation <= 0 && $(window).width() >= 991) {
            $('.header-wrapper').addClass('is-fixed');
        }

        if (windowPos === 0) {
            $('.header-wrapper').removeClass('is-fixed');
        }
    });
}

function treatUserTagNameOnHeader() {
    /*-----------------------------*
     *------ Treat user name ------*
     *--------- at  Header --------*
     *-----------------------------*/
    console.log('%c treatUserNameTagOnHeader script is running sound', 'font-size: 12px; color: #00F898;');

    $('.effAccount.cc_eff_account a').addClass('oldUserName');
    let regExMatcher, headerUserName, headerUserNameText, storeSpanValue, returnedMatch, newHeaderName, spanObjDefined;
    regExMatcher = /undefined|\-|\(undefined\)|\(\)/gmi;

    headerUserName = $('.effAccount.cc_eff_account a').clone();
    $(headerUserName).addClass('clonedUserName').removeClass('oldUserName');
    $(headerUserName).appendTo('.effAccount.cc_eff_account').css({
        visibility: 'hidden',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 'auto',
        left: 'auto'
    });

    headerUserNameText = $('.oldUserName').text().trim();
    storeSpanValue = {
        defineValue: function() {
            if(!$('.clonedUserName > span').length){
                var valueDefined = {
                    storeClasses: 'default-Class',
                    storeAriaValue: 'default',
                    spanTagName: 'DIV'
                }
                return valueDefined;
            } else {
                var valueDefined = {
                    storeClasses: $('.clonedUserName > span').attr('class').toString().trim(),
                    storeAriaValue: $('.clonedUserName > span').attr('aria-hidden').toString().trim(),
                    spanTagName: $('.clonedUserName > span').get(0).tagName.toString().trim()
                }
                return valueDefined;
            }
        }
    };

    spanObjDefined = storeSpanValue.defineValue();

    returnedMatch = headerUserNameText.match(regExMatcher);
    newHeaderName = headerUserNameText.replace(regExMatcher, '');

    $('.oldUserName').html(newHeaderName);
    $('.oldUserName').addClass('newUserName')
    $('.newUserName').removeClass('oldUserName');
    $('.newUserName').append('<' + spanObjDefined.spanTagName + '></' + spanObjDefined.spanTagName + '>');
    $('.newUserName > span').addClass(spanObjDefined.storeClasses).prop('aria-hidden', spanObjDefined.storeAriaValue);
    $('.clonedUserName').remove();
    $('.effAccount.cc_eff_account').css({ visibility: 'visible' });
}

function intervalSetter() {
    console.log('%c intervalSetter() was invoked', 'font-size: 12px; color: #f82548;');
    var treatUserName = setInterval(treatUserTagNameOnHeader, 2500);
    $('body').on('DOMSubtreeModified', '.effAccount.cc_eff_account', function(){
        console.log('something was removed from here, buddy!');
        clearInterval(treatUserName);
    });

    setTimeout(function(){
        console.log('interval cleaned');
        clearInterval(treatUserName);
    }, 150000);
}

function formValidator() {
    console.log('%c formValidator() was invoked', 'font-size: 12px; color: #2952f8;');
    if(!$('.checkoutContent').length) {
        console.log('This isn\'t the checkout page');
        return;
    } else {
        console.log('We\'re at the checkout page!');
        $('#mainform').validate({
            rules:  {
                firstNameField: "required",
                lastNameField: "required",
                homePhoneField: "required",
                emailField: {
                    required: true,
                    email: true
                }
            },
            messages: {
                firstNameField: "Please enter your firstname",
                lastNameField: "Please enter your lastname",
                homePhoneField: "Please enter your main phone number",
                emailField: "Please enter a valid email"
            }
        });

        $('#billingAddressForm, #shippingAddressForm').validate();
    }
}


/* Function calls
--------------------------------------------------------------------*/
jQuery(document).ready(function(){
    $=jQuery;

    scriptInjector();
    intervalSetter();
    fixedHeaderAndScrollToTop();
    formValidator();
});