// Переменные для карты
var googleMap, marker;
var LatLon = {lat: -25.363, lng: 131.044};

// Инициализация карты
function initMap() {
	googleMap = new google.maps.Map(document.getElementById('map'), {
		zoom: 3,
		center: LatLon
	});

	marker = new google.maps.Marker({
		position: LatLon,
		map: googleMap,
		title: 'Позиция МКС'
	});
}

$(document).ready(function() {
	var htmllongitude 		= $('.longitude'),
			htmllatitude 			= $('.latitude'),
			htmltime 					=	$('.time'),
			htmlday 					= $('.day'),
			htmldt 						= $('.date'),
			htmlcrewMembers 	= $('.crew-members'),
			htmlamount 				= $('.amount');

	// Получение данных
	function getData () {
		// Координаты МКС
		$.getJSON('http://api.open-notify.org/iss-now.json?callback=?', function(data) {
			var lon = Number(data['iss_position']['longitude']),
					lat = Number(data['iss_position']['latitude']);

			htmllongitude.html(lon);
			htmllatitude.html(lat);

			LatLon['lat'] = lat;
			LatLon['lng'] = lon;
			googleMap.setCenter(LatLon);
			marker.setPosition(LatLon);
		});

		// Данные о людях на МКС
		$.getJSON('http://api.open-notify.org/astros.json', function(data) {
			var number = 0;

			htmlcrewMembers.empty();

			data['people'].forEach(function (d) {
				if (d['craft'] === 'ISS') {
					htmlcrewMembers.append('<li class="member">' + d['name'] + '</li>');
					number++;
				}
			});
			htmlamount.html(number);
		});

		// Время в формате UTC
		var d = new Date();
		var hours 		= d.getUTCHours(), 
				minutes 	=	d.getUTCMinutes(), 
				day 			= d.getUTCDay(), 
				dt 				= d.getUTCDate(), 
				month 		= d.getUTCMonth(), 
				year 			= d.getUTCFullYear();

		if (hours < 10) hours = '0' + hours;
		if (minutes < 10) minutes = '0' + minutes;
		if (dt < 10) dt = '0' + dt;

		switch(day) {
			case 0: 
				day = 'Воскресенье';
				break;
			case 1: 
				day = 'Понедельник';
				break;
			case 2: 
				day = 'Вторник';
				break;
			case 3: 
				day = 'Среда';
				break;
			case 4: 
				day = 'Четверг';
				break;
			case 5: 
				day = 'Пятнцица';
				break;
			case 6: 
				day = 'Суббота';
				break;
		}

		switch(month) {
			case 0: 
				month = 'Январь';
				break;
			case 1: 
				month = 'Февраль';
				break;
			case 2: 
				month = 'Март';
				break;
			case 3: 
				month = 'Апрель';
				break;
			case 4: 
				month = 'Май';
				break;
			case 5: 
				month = 'Июнь';
				break;
			case 6: 
				month = 'Июль';
				break;
			case 7: 
				month = 'Август';
				break;
			case 8: 
				month = 'Сентябрь';
				break;
			case 9: 
				month = 'Октябрь';
				break;
			case 10: 
				month = 'Ноябрь';
				break;
			case 11: 
				month = 'Декабрь';
				break;
		}

		htmltime.html(hours + ':' + minutes);
		htmlday.html(day);
		htmldt.html(dt + ' ' + month + ' ' + year);

		setTimeout(getData, 5000); 
	}

	getData();
});
