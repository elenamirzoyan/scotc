/**
 * Created by Elena Mirzoyan on 2/9/17.
 */
(function ($) {
    $.fn.xcollapsible = function(options) {
        var defaults = {
            accordion: undefined,
            onOpen: undefined,
            onClose: undefined,
            onBeforeOpen: undefined,
            onBeforeClose: undefined
        };

        options = $.extend(defaults, options);


        return this.each(function() {

            var $this = $(this);

            var $panel_headers = $(this).find('> li > .collapsible-header');
            var $panel_hanadle = $(this).find('> li > .collapsible-header .handle');

            var collapsible_type = $this.data("collapsible");

            // Turn off any existing event handlers
            $this.off('click.collapse', '> li > .collapsible-header .handle');
            $panel_headers.off('click.collapse');
            $panel_hanadle.off('click.collapse');


            /****************
             Helper Functions
             ****************/

            // Accordion Open
            function accordionOpen(object) {
                $panel_headers = $this.find('> li > .collapsible-header');
                if (object.hasClass('active')) {
                    object.parent().addClass('active');
                }
                else {
                    object.parent().removeClass('active');
                }
                if (object.parent().hasClass('active')){
                    object.siblings('.collapsible-body').stop(true,false).slideDown({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}});
                }
                else{
                    object.siblings('.collapsible-body').stop(true,false).slideUp({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}});
                }

                $panel_headers.not(object).removeClass('active').parent().removeClass('active');

                // Close previously open accordion elements.
                $panel_headers.not(object).parent().children('.collapsible-body').stop(true,false).each(function() {
                    if ($(this).is(':visible')) {
                        $(this).slideUp({
                            duration: 350,
                            easing: "easeOutQuart",
                            queue: false,
                            complete:
                                function() {
                                    $(this).css('height', '');
                                    execCallbacks($(this).siblings('.collapsible-header'));
                                }
                        });
                    }
                });
            }

            // Expandable Open
            function expandableOpen(object) {
                if (object.hasClass('active')) {
                    object.parent().addClass('active');
                }
                else {
                    object.parent().removeClass('active');
                }
                if (object.parent().hasClass('active')){
                    object.siblings('.collapsible-body').stop(true,false).slideDown({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}});
                }
                else {
                    object.siblings('.collapsible-body').stop(true,false).slideUp({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}});
                }
            }

            // Open collapsible. object: .collapsible-header
            function collapsibleOpen(object) {
                execBeforeCallbacks(object);

                if (options.accordion || collapsible_type === "accordion" || collapsible_type === undefined) { // Handle Accordion
                    accordionOpen(object);
                } else { // Handle Expandables
                    expandableOpen(object);
                }

                execCallbacks(object);
            }

            // Handle before callbacks
            function execBeforeCallbacks(object) {
                if (object.hasClass('active')) {
                    if (typeof(options.onBeforeOpen) === "function") {
                        options.onBeforeOpen.call(this, object.parent());
                    }
                } else {
                    if (typeof(options.onBeforeClose) === "function") {
                        options.onBeforeClose.call(this, object.parent());
                    }
                }
            }
            // Handle callbacks
            function execCallbacks(object) {
                if (object.hasClass('active')) {
                    if (typeof(options.onOpen) === "function") {
                        options.onOpen.call(this, object.parent());
                    }
                } else {
                    if (typeof(options.onClose) === "function") {
                        options.onClose.call(this, object.parent());
                    }
                }
            }

            /**
             * Check if object is children of panel header
             * @param  {Object}  object Jquery object
             * @return {Boolean} true if it is children
             */
            function isChildrenOfPanelHeader(object) {

                var panelHeader = getPanelHeader(object);

                return panelHeader.length > 0;
            }

            /**
             * Get panel header from a children element
             * @param  {Object} object Jquery object
             * @return {Object} panel header object
             */
            function getPanelHeader(object) {

                return object.closest('li > .collapsible-header');
            }

            /*****  End Helper Functions  *****/



            // Add click handler to only direct collapsible header children
            $this.on('click.collapse', '> li > .collapsible-header .handle', function(e) {
                var element = $(e.target);

                if (isChildrenOfPanelHeader(element)) {
                    element = getPanelHeader(element);
                }

                element.toggleClass('active');

                collapsibleOpen(element);
            });


            // Open first active
            if (options.accordion || collapsible_type === "accordion" || collapsible_type === undefined) { // Handle Accordion
                collapsibleOpen($panel_headers.filter('.active').first());

            } else { // Handle Expandables
                $panel_headers.filter('.active').each(function() {
                    collapsibleOpen($(this));
                });
            }

        });
    };

    $(document).ready(function(){
        $('.collapsible').collapsible();
    });
}( jQuery ));
