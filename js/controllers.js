angular.module('TendulkarApp.controllers', []).
controller('statsController', function($scope) {
	$scope.batting;
	$scope.bowling;

	$scope.bowlingStats = function(opposition){

		var initialHeight = 0;
		$scope.batting = 0;
		$scope.bowling = 1;

		d3.select("#vis").remove();

		var margin = {top: 20, right: 20, bottom: 30, left: 40},
  	  width = 760 - margin.left - margin.right,
    	height = 400 - margin.top - margin.bottom;

		var x = d3.scale.ordinal()
  	  .rangeBands([0, width], .1);

		var y = d3.scale.linear()
  	  .range([height, 0]);

		var xAxis = d3.svg.axis()
  	  // .scale(x)
    	// .orient("bottom");

		var yAxis = d3.svg.axis()
  	  .scale(y)
    	.orient("left")

  	var div = d3.select("body").append("div")	
    	.attr("class", "tooltip")				
    	.style("opacity", 0);

		var svg = d3.select("#visualization").append("svg")
  		  .attr("width", width + margin.left + margin.right)
    		.attr("height", height + margin.top + margin.bottom)
    		.attr("id", "vis")
  		.append("g")
    		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		d3.csv("sachin.csv", type, function(error, data) {
			$scope.innings = 0;
			$scope.wickets = 0;
			$scope.runs_conceded = 0;

    	data = data.filter(function(d){
    		parseDate = d3.time.format("%Y");
    		parseDate.parse(d.date);
    		if(opposition !== 'All'){
    			if('v ' + opposition === d.opposition){
    					if(isNaN(d.wickets)){
          	  return false;
        			}
	        		d.wickets = parseInt(d.wickets, 10);
      	  		$scope.innings = $scope.innings +1;
      	  		$scope.wickets = $scope.wickets + d.wickets;
  	      		return true;		
    			}
    		}
        
				else{
        	if(isNaN(d.wickets)){
         		  return false;
        	}
	       	d.wickets = parseInt(d.wickets, 10);
      	 	$scope.innings = $scope.innings +1;
      	 	$scope.wickets = $scope.wickets + d.wickets;
  	     	return true;
				}

    });

    data = data.filter(function(d){

  	    if(isNaN(d.runs_conceded)){
       	  return false;
       	}
	      d.runs_conceded = parseInt(d.runs_conceded, 10);
    	  $scope.runs_conceded = $scope.runs_conceded + d.runs_conceded;
     	  $scope.bowlingAverage = ($scope.runs_conceded/$scope.innings);
     	  $scope.bowlingAverage = $scope.bowlingAverage.toFixed(2)
  	    return true;
  	});
    
    initialHeight =	d3.max(data, function(d) { return d.wickets; });
    $scope.$apply();
	  if (error) throw error;

	  x.domain(data.map(function(d) { return d.date; }));
  	y.domain([0, d3.max(data, function(d) { return d.wickets; })]);

	  svg.append("g")
  	    .attr("class", "x axis")
    	  .attr("transform", "translate(0," + height + ")")
      	.call(xAxis)
      .selectAll("text")
    	.attr("y", 0)
    		.attr("x", 9)
    		.attr("dy", ".35em")
    		.attr("transform", "rotate(90)")
    		.style("text-anchor", "start");

	  svg.append("g")
  	    .attr("class", "y axis")
    	  .call(yAxis)
	    .append("text")
  	    .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end")
	      .text("Wickets");

	  svg.selectAll(".bar")
	      .data(data)
	    .enter().append("rect")
	      .attr("class",  function(d) { 
	      	if(d.match_result === 'won')
	      		return 'bar-won' 
	      	if(d.match_result === 'lost')
	      		return 'bar-lost'
	      	else{
	      		return 'bar'
	      	}
	    	})
	    	.on("mouseover", function(d) {		
            div.transition()		
                .duration(100)		
                .style("opacity", .9);		
            div	.html(d.wickets + "<br/>"  + d.opposition + "<br/>" + 'in ' + d.ground + "<br/>" + d.date)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
            })					
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(800)		
                .style("opacity", 0);	
        })
        .attr("y", initialHeight)
				.attr("height", initialHeight)
	      .transition()
				.duration(500)
	      .attr("x", function(d) { return x(d.date); })
	      .attr("width", x.rangeBand())
	      .attr("y", function(d) { return y(d.wickets); })
	      .attr("height", function(d) { return height - y(d.wickets); });
	});

	function type(d) {
	  d.wickets = +d.wickets;
	  return d;
	}

}

	$scope.battingStats = function(opposition){

		$scope.bowling = 0;
		$scope.batting = 1;
		var initialHeight =0;

		d3.select("#vis").remove();
		var margin = {top: 20, right: 20, bottom: 30, left: 40},
  	  width = 760 - margin.left - margin.right,
    	height = 400 - margin.top - margin.bottom;

		var x = d3.scale.ordinal()
  	  .rangeBands([0, width], .1);

		var y = d3.scale.linear()
  	  .range([height, 0]);

		var xAxis = d3.svg.axis()
  	  // .scale(x)
    	// .orient("bottom");

		var yAxis = d3.svg.axis()
  	  .scale(y)
    	.orient("left")

  	var div = d3.select("body").append("div")	
    	.attr("class", "tooltip")				
    	.style("opacity", 0);

		var svg = d3.select("#visualization").append("svg")
  		  .attr("width", width + margin.left + margin.right)
    		.attr("height", height + margin.top + margin.bottom)
    		.attr("id","vis")
  		.append("g")
    		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		d3.csv("sachin.csv", type, function(error, data) {
				$scope.innings = 0;
				$scope.runs = 0;
				$scope.fifty = 0;
				$scope.hundered = 0;

    		data = data.filter(function(d){

    			if(opposition !== 'All'){
    				if('v ' + opposition === d.opposition){
    					 	if(isNaN(d.batting_score) && !(/[*]$/g.test(d.batting_score))){
          	  return false;
        	}
	        d.batting_score = parseInt(d.batting_score, 10);
	        $scope.innings = $scope.innings + 1;
	        $scope.runs = $scope.runs + d.batting_score;
	        $scope.battingAverage = ($scope.runs/$scope.innings)
      	  $scope.battingAverage = $scope.battingAverage.toFixed(2)
	        	if(d.batting_score >= 50 && d.batting_score < 100)
	        		$scope.fifty = $scope.fifty + 1;
	        	if(d.batting_score >= 100)
	        		$scope.hundered = $scope.hundered + 1;
  	      	return true;		
    				}
    			}

    			else{
	        	if(isNaN(d.batting_score) && !(/[*]$/g.test(d.batting_score))){
  	        	  return false;
    	   		}
	        	d.batting_score = parseInt(d.batting_score, 10);
	        	$scope.innings = $scope.innings + 1;
	        	$scope.runs = $scope.runs + d.batting_score;
	        	$scope.battingAverage = ($scope.runs/$scope.innings)
      	  	$scope.battingAverage = $scope.battingAverage.toFixed(2)
	        		if(d.batting_score >= 50 && d.batting_score < 100)
	        			$scope.fifty = $scope.fifty + 1;
	        		if(d.batting_score >= 100)
	        			$scope.hundered = $scope.hundered + 1;
  	      	return true;
  	    	}
    	});
    	
    	$scope.highestScore =	d3.max(data, function(d) { return d.batting_score; });
    	initialHeight = 0;
    	$scope.$apply();
	  	if (error) throw error;

	 		x.domain(data.map(function(d) { return d.date; }));
  		y.domain([0, d3.max(data, function(d) { return d.batting_score; })]);

	  	svg.append("g")
  	    .attr("class", "x axis")
    	  .attr("transform", "translate(0," + height + ")")
      	.call(xAxis);

	  	svg.append("g")
  	  	  .attr("class", "y axis")
    	  	.call(yAxis)
	    	.append("text")
  	    	.attr("transform", "rotate(-90)")
	      	.attr("y", 6)
	      	.attr("dy", ".71em")
	      	.style("text-anchor", "end")
	      	.text("Runs");

	  	svg.selectAll(".bar")
	    	  .data(data)
	    	.enter().append("rect")
	      	.attr("class", function(d) { 
	      		if(d.match_result === 'won')
	      			return 'bar-won' 
	      		if(d.match_result === 'lost')
	      			return 'bar-lost'
	      		else{
	      			return 'bar'
	      		}
	    		})
	    	.on("mouseover", function(d) {		
            div.transition()		
                .duration(100)		
                .style("opacity", .9);		
            div	.html(d.batting_score + "<br/>"  + d.opposition + "<br/>" + 'in ' + d.ground + "<br/>" + d.date)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
            })					
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(800)		
                .style("opacity", 0);	
        })
        .attr("y", initialHeight)
				.attr("height", initialHeight)
	      .transition()
				.duration(500)
	      .attr("x", function(d) { return x(d.date); })
	      .attr("width", x.rangeBand())
	      .attr("y", function(d) { return y(d.batting_score); })
	      .attr("height", function(d) { return height - y(d.batting_score); })
        .attr("stroke-dashoffset", 0);
	});

		function type(d) {
	 		d.wickets = +d.wickets;
	 		return d;
		}

	}



	$scope.update = function(opposition, batting, bowling){

		if(batting === 1)
			$scope.battingStats(opposition)
		if(bowling === 1)
			$scope.bowlingStats(opposition)
	}

});
