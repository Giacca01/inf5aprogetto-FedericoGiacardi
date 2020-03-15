"use strict";

$(document).ready(function () {
    let chkToken = inviaRichiesta('/api/chkToken', 'POST', {});
    chkToken.fail(function (jqXHR, test_status, str_error) {
    });
    chkToken.done(function (data) {
        window.location.href = "about.html";
    });
    gestLoadCounter();
    gestRecensioni();
});

function gestLoadCounter() {
    let loadCounterRQ = inviaRichiesta('/api/loadCounter', 'POST', {});
    loadCounterRQ.fail(function (jqXHR, test_status, str_error) {
        printErrors(jqXHR, "#msgCounter");
    });
    loadCounterRQ.done(function (data) {
        for (const key in data) {
            $("#" + key).html(data[key]);
        }
        $('.counter').counterUp({
            time: 1000
        });
    });
}

function gestRecensioni() {
    let elRecensioniRQ = inviaRichiesta('/api/elRecensioni', 'POST', {});
    elRecensioniRQ.fail(function (jqXHR, test_status, str_error) {
        printErrors(jqXHR, "#msgRec");
    });
    elRecensioniRQ.done(function (data) {
        let codHtml = "";
        $("#contRecensioni").html("");
        data.forEach(rec => {
            if (rec["recensione"] != undefined && rec["user"] != undefined && rec["foto"] != undefined) {
                codHtml += '<div class="testimonial_slider">';
                codHtml += '<div class="row">';
                codHtml += '<div class="col-lg-8 col-xl-4 col-sm-8 align-self-center">';
                codHtml += '<div class="testimonial_slider_text">';
                codHtml += '<p>' + rec["recensione"] + '</p>';
                codHtml += '<h4>' + rec["user"] + '</h4>';
                codHtml += '</div>';
                codHtml += '</div>';
                codHtml += '<div class="col-lg-4 col-xl-2 col-sm-4">';
                codHtml += '<div class="testimonial_slider_img">';
                codHtml += '<img src="' + rec["foto"] + '">';
                codHtml += '</div>';
                codHtml += '</div>';
                codHtml += '</div>';
                codHtml += '</div>';
            }
        });
        $("#contRecensioni").html(codHtml);
    });
}