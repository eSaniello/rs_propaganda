<!DOCTYPE HTML>
<html>
<head>  
<script>
window.onload = function () {
 
var dataPoints = [];
 
var chart = new CanvasJS.Chart("chartContainer",
{ 
	title:{
	  	text:	"Area of Continents"
  	},
	data: [
	{
		type: "pie",
		indexLabel: "{label} : #percent%",
		toolTipContent : "{label}: {y} sq. km",
		dataPoints: dataPoints
	}					
	]
});
 
$.get("https://canvasjs.com/data/gallery/php/area-of-continents.xml", function (data) {
	$(data).find("point").each(function () {
		var $dataPoint = $(this);
		var label = $dataPoint.find("label").text();
		var y = $dataPoint.find("y").text();
		dataPoints.push({ label: label, y: parseFloat(y) });
 
	});
	chart.render();
});
 
}
</script>
</head>
<body>
<div id="chartContainer" style="height: 370px; width: 100%;"></div>
<script type="text/javascript" src="https://canvasjs.com/assets/script/jquery-1.11.1.min.js"></script>  
<script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
</body>
</html>                          