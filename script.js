var zero_hp = {};
ImageData.fromBase64(function(i) {
		zero_hp.img = i
	},
	'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAOCAIAAACU32q7AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFKSURBVChTY5CSEJUQFQYiMREhIBuIgAxZKQm4OBAxBHoaIpAHEBmA2RASihisjVQhKMRZ8cYa7u9H2PZOF3AwU4GLWxuoMvi5WULQ8YViKzqlJEW5t09iaczk9XGxgEsxOFga2VsaOVoZ/DjKbqTFLyctXpehcGweu7K8NFDcwdIAiBjszfWAyMdR998pVmZmJmMDreQQtcfbOPh5ucFSBtamegxGehpA5O2o8uMYGwMDiBvkrvzxADsbGytECoigiuzM1UAmMTEC2dG+ik+3czIzM0OkgAiqCIg+HGBXlAIpKkuSObOYG4tJQLShX6gjh8VYV+nIXP62XEEebi64FIORFpTlbqdyehH7tyNsB2bzS4jwSIuLIRQBgwCOLI11+Xi5mZmYhAX5bc2BnoeKM8hJiIKQDJjERGBxBntLbTDSQmLA2WCupTYAH1JvHRPT8hAAAAAASUVORK5CYII'
);

var zero_scop_hp = {};
ImageData.fromBase64(function(i) {
		zero_scop_hp.img = i
	},
	'iVBORw0KGgoAAAANSUhEUgAAAAoAAAANCAIAAAAfVWhSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEmSURBVChTY5CSEJUQFQYiMREhIBuIgAxZKQmIOEOgpyECeQCRAZgNIQ0ZrI1UISjEWfHGGu7vR9j2ThdwMFOBCDL4uVlC0PGFYis6pSRFubdPYmnM5PVxsQAKMjhYGtlbGjlaGfw4ym6kxS8nLV6XoXBsHruyvDRQnMHeXA+IfBx1/51iZWZmMjbQSg5Re7yNg5+XGyjOYKSnAUTejio/jrExMIC4Qe7KHw+ws7GxAtlQaTtzNZBuJkYgO9pX8el2TmZmZoQ0EH04wK4oBZIuS5I5s5gbRTcQbegX6shhMdZVOjKXvy1XkIebCyytBZV2t1M5vYj92xG2A7P5JUR4pMXFQNJAj8GRpbEuHy83MxOTsCC/rbkBUIRBTkIUhGTAJBqSEAUAECdY1Tb9JVAAAAAASUVORK5CYII'
);




function find(img) {
	if (!img) img = a1lib.bindfullrs();
	if (!img) return null;

	var VoragoImg = a1lib.findsubimg(img, zero_hp.img);
	if (VoragoImg.length != 0) {
		return true;
	}
	
	var ScopImg = a1lib.findsubimg(img, zero_scop_hp.img);
	if (ScopImg.length != 0) {
		return true;
	}
	return false;
} 
function getColor(value) {
	var hue = (value * 1.2).toString(10);
	return "hsl(" + hue + ",75%,50%)";
}
function sanitisePercentage(i){
    return Math.min(100,Math.max(0,i));   
}
var running = false;

var beamTimer = new _timer(function(time) {
	var secs_left = (Math.floor(time / 600) * 0.6 ).toFixed(1);
	$("#beam_timer").html(secs_left + "s");
	
	var percent = sanitisePercentage(secs_left / 246 * 1000);
	
	$("#beamBar").width(percent + "%");
	$("#beamBar").css('background-color', getColor(percent));
	if (time <= 0) {
		beamTimer.stop();
		running = false;
	}
});


//01:38:24 0 hp
//01:38:48 tag
//40 ticks
function start() {
	if (window.alt1) {
		setInterval(function(time) {
			if (!running && find()) {
				running = true;
				beamTimer.reset(246);
				beamTimer.start(10);
			}
		}, 100);
	} else {
		$("#telosMenu").html('<a href="alt1://addapp/http://holycoil.nl/alt1/EDcgest/appconfig.json">Click here to add this app</a>'); 
	}
}