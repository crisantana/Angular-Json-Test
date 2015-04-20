var obJson;	

$(document).ready(function() {
	//Copy data from other site
	var url = 'http://www.stellarbiotechnologies.com/media/press-releases/json',
		objEvent= '',
		objects,
		jsonEvents;	
	
	$.ajax({
		crossOrigin: true,
		url: url,
		context: {},
		success: function(data) {
			objects = data;
		}
	})

	//Convert strings to Json object
	setTimeout(function(){ 
		obJson = JSON.parse(objects);
	}, 1800);

	//Swiche view
	$( '.view-list' ).click(function() {
		$('body').attr("id","list");
	});

	$( '.view-grid' ).click(function() {
		$('body').attr("id","grid");
	});

	//Filter bar to fixe position
	$(window).scroll(function () {
	    if ($(this).scrollTop() > 150) {
	       $('.content-filter-bar').addClass('filter-bar-scrolltop');
	       $('.search-filter').addClass('active');
	    } else {
	       $('.content-filter-bar').removeClass('filter-bar-scrolltop');
	       $('.search-filter').removeClass('active');
	    }
	});
});

//--Angular Events

var app = angular.module('myapp', ['infinite-scroll']),
	limitStep = 15;

//Json object in my Angular controller
app.controller('myController', function($scope, $timeout) {
    $timeout( function(){ 
    	var json = obJson;
    	$scope.myscope = json;
    	$scope.limit = limitStep;

 		$scope.loadMore = function() {
		     $scope.limit += 1;
		};
    }, 2000);//Time while load items
});