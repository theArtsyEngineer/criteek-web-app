$('.fader').each(function(i) {
    $(this).delay((i++) * 500).fadeTo(1000, 1);
});
