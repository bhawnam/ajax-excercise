"use strict";


// PART 1: SHOW A FORTUNE

function replaceFortune(response){
    $('#fortune-text'). html(response);
}

function showFortune(evt) {
    $.get("/fortune", replaceFortune);
}

//document.querySelector('#get-fortune-button').addEventListener('click', showFortune)
// with jQuery
$('#get-fortune-button').on('click', showFortune);



// PART 2: SHOW WEATHER

function replaceForecast(response){
    $('#weather-info').html(response.forecast);
}

function showWeather(evt) {
    evt.preventDefault();

    let url = "/weather.json";
    let formData = {"zipcode": $("#zipcode-field").val()};

    $.get(url, formData, replaceForecast);

}
//document.getElementById('get-fortune-button').addEventListener('submit', showFortune)
// with jQuery
$("#weather-form").on('submit', showWeather);




// PART 3: ORDER MELONS

function updateMelons(response){
    if (response.code === 'OK'){
        if($('#order-status').hasClass('order-error'))
        {
            $('#order-status').removeClass('order-error');
        }
        $('#order-status').html(response.msg);
    } 
    else {
        $('#order-status').addClass('order-error');
        $('#order-status').html(response.msg);
    }
}
function orderMelons(evt) {
    evt.preventDefault();

    let formData = {
        "melon_type" : $("#melon-type-field").val(),
        "qty" : $("#qty-field").val()
    };

    $.ajax({
        url : "/order-melons.json",
        data: JSON.stringify(formData),
        contentType: "application/json",
        success: updateMelons,
        method : "POST",
    });
   
}
//document.getElementById('order-form').addEventListener('submit', orderMelons)
//with jQuery
$("#order-form").on('submit', orderMelons);

// Further Study

function displayImage(response){
    const imageURL = response.message;
    const dogImage = $('<img>').attr('src' , imageURL);
    $('#dog-image').append(dogImage);
}

function getImage(){

    let url = 'https://dog.ceo/api/breeds/image/random'
    $.get(url, displayImage);

}

$('#get-dog-image').on('click', getImage);