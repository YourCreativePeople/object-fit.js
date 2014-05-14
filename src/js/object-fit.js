// OBJECT-FIT
(function($) {
    $(function() {
        var $objects = $();
        var fadeImageObjects = false;
        var fadeVideoObjects = false;

        var bindDoSize = function ($object, method) {
            $object.bind('doSize', fitObject).trigger('doSize');
            $objects = $objects.add($object);
        };

        var fitObject = function () {
            var $object = $(this);
            var $parent = $(this).parent();

            var pos = $object.data('object-position'), xpos = 'left', ypos = 'top';

            if (pos)
            {
                if (pos.indexOf('left') >= 0) xpos = 'left';
                else if (pos.indexOf('right') >= 0) xpos = 'right';
                else if (pos.indexOf('center') >= 0) xpos = 'center';
                if (pos.indexOf('top') >= 0) ypos = 'top';
                else if (pos.indexOf('bottom') >= 0) ypos = 'bottom';
                else if (pos.indexOf('center') >= 0) ypos = 'center';
            }

            if ($object.data('object-fit') == 'cover') {
                if ($object.width() / $object.height() > $parent.width() / $parent.height()) {
                    $object.css({width: '', height: '100%'}).css({
                        top: '',
                        right: xpos == 'right' ? 0 : '',
                        bottom: '',
                        left: xpos == 'center' ? -($object.width() - $parent.width()) / 2 : xpos == 'left' ? 0 : ''
                    });
                } else {
                    $object.css({width: '100%', height: ''}).css({
                        top: ypos == 'center' ? -($object.height() - $parent.height()) / 2 : ypos == 'top' ? 0 : '',
                        right: '',
                        bottom: ypos == 'bottom' ? 0 : '',
                        left: ''
                    });
                }
            }
            if ($object.data('object-fit') == 'contain') {
                $object.css({'max-width':'100%', 'max-height': '100%'}).css({
                    top: ypos == 'center' ? -($object.height() - $parent.height()) / 2 : ypos == 'top' ? 0 : '',
                    right: xpos == 'right' ? 0 : '',
                    bottom: ypos == 'bottom' ? 0 : '',
                    left: xpos == 'center' ? -($object.width() - $parent.width()) / 2 : xpos == 'left' ? 0 : ''
                });
            }
        };

        function initFitObjects() {
            $(function () {
                $('img[data-object-fit]').each(function () {
                    imageBind($(this));
                });
                $('video[data-object-fit]').each(function () {
                    videoBind($(this));
                });
                setTimeout(function () { fadeImageObjects = true; }, 50);
                setTimeout(function () { fadeVideoObjects = true; }, 200);
            });
        }

        function imageBind(img) {
            var $original = img.hide();
            var $new = $('<img>').hide();
            $original.parent().addClass('loading');
            $original.after($new);
            $original.remove();
            $new.addClass($original.attr('class')).attr('src', $original.attr('src')).data({
                'object-fit': $original.data('object-fit'),
                'object-position': $original.data('object-position')
            }).css('position','absolute').load(function () {
                $new.parent().removeClass('loading');
                if (fadeImageObjects) {
                    $new.fadeIn(600);
                } else {
                    $new.show();
                }
                bindDoSize($new);
            });
        }

        function videoBind(vid) {
            vid.parent().addClass('loading');
            vid.hide().get(0).addEventListener('loadedmetadata', function() {
                bindDoSize(vid);
            }, false);
            vid.get(0).addEventListener('loadeddata', function() {
                vid.css('position','absolute').parent().removeClass('loading');
                if (fadeVideoObjects) {
                    vid.fadeIn(600);
                } else {
                    vid.show();
                }
            }, false);
        }

        $(window).resize(function () {
            setTimeout(function () { $objects.trigger('doSize'); }, 0);
        });

        initFitObjects();
    });
}(jQuery));