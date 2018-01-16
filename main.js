const API_KEY_WEATHER = 'a6bf53373f37dd8aee1f605cd2408f81';
const API_KEY_MAPS = 'AIzaSyC5dvOMHD3JZsyxKHucZNeJR18LaJQEwxs';
var currentCity = '';
$('#city-search-button').click(get_city);

function get_city() {
    currentCity = $("#city-search").val();
    get_weather();
    $('#city-search').val('');
}

function get_weather() {
   $.ajax({
    url: 'http://api.openweathermap.org/data/2.5/weather',
    type: 'GET',
    data: {
        'q': currentCity,
        'APPID': API_KEY_WEATHER,
        'units': 'imperial'
    },
    success: function (response) {
        var weatherType = response.weather[0].main;
        var temperature = response.main.temp + ' °F';
        var bgIcon = 'http://openweathermap.org/img/w/'+response.weather[0].icon+'.png';
        console.log(bgIcon);
        $('#weather-here').text('Current weather for '+currentCity+':');
        $('#weather-main').text(weatherType);
        $('#temp').text(temperature);
        $('body').css('background-image', 'url('+ bgIcon +')');
    },
    error: function(e) {
        console.log(e);
    }
    });
}

function get_reverse_geocode() {

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }
    function success (position) {
        $.ajax({
            url: 'https://maps.googleapis.com/maps/api/geocode/json',
            type: 'GET',
            data: {
                latlng: position.coords.latitude+','+position.coords.longitude,
                key: API_KEY_MAPS
            },
            success: function(response) {
                currentCity =response.results[1].address_components[2].long_name;
                $('.loader').remove();
                get_weather();
            },
            error: function(e) {
                console.log(e);
            }
            });
    }
    getLocation();
}

get_reverse_geocode();

