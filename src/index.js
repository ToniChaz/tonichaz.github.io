require('file-loader?name=[name].[ext]!./index.html');

import 'popper.js'
import 'jquery'
import 'jquery-easing'
import 'jquery-address'

import 'css-browser-selector'
import 'bootstrap'

import './css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/styles.css'
import './css/responsive.css'

((w, $) => {

    function windowEvents(){
        // Sticky Nav
        $(w).scroll(() => {
            let nav_anchor = $(w).scrollTop()

            if (nav_anchor > 0) {
                $('.nav').css({
                    'position': 'fixed',
                    'top': '0'
                }).addClass('splited')

                $('.nav_anchor').css('height', '60px')
            } else {

                $('.nav_anchor').css('height', '0px')

                $('.nav').css({
                    'position': 'relative'
                }).removeClass('splited')
            }
        })
    }

    function setupSkills() {
        let counter = 1
        $('.skill').each(function () {
            let el = $(this)
            let level = el.attr('data-level')

            el.append("<div class='bar-holder'><div class='progress-bar'></div></div>")
            el.find('.progress-bar').delay(counter * 100).animate({width: level + '%'}, 1500, 'easeOutBack')
            counter++
        })
    }

    function scrollToSection(destSection) {
        $('html, body').stop().animate({
            scrollTop: $(destSection).offset().top - 30
        }, 1500, 'easeInOutExpo')
    }

    function addressValidation(){
        $.address.change(function (event) {
            let pageID = event.value.split('/')[1]

            if (pageID != '') {
                $('select.nav option').each(function () {
                    let val = $(this).val()

                    if (val === "#" + pageID) {
                        $('select.nav option:selected').removeAttr('selected')
                        $(this).attr('selected', 'selected')
                    }
                })
                scrollToSection("#" + pageID)
            }
        })
    }

    // Document ready
    $(function () {
        windowEvents()
        setupSkills()
        addressValidation()

        $('.nav-menu a').address($(this).attr('href'))
        $('select.nav').change(function () {
            let loc = ($(this).find('option:selected').val())
            scrollToSection(loc)
        })
        $('.nav-menu a').bind('click', function (event) {
            let clickedMenu = $(this)
             $('.nav-menu .active').toggleClass('active')
            clickedMenu.parent().toggleClass('active')
            scrollToSection(clickedMenu.attr('href'))
            event.preventDefault()
        })
    })

})(window, jQuery)