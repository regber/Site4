// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$(document).on("click", ".panel-side>div >ul>li", function () {
    let currentElement = $(this);
    let allElements = $(".panel-side >div>ul>li");

    allElements.each(function () {
        if ($(this).is(currentElement)) {
            if (currentElement.hasClass("selected")) {
                currentElement.removeClass("selected");
            }
            else {
                currentElement.addClass("selected");
            }
        }
        else {
            $(this).removeClass("selected");
        }
    });
});
$(document).on("click", ".panel-side >div>ul>li>ul", function (e) {
    e.stopPropagation()
});
