var inputField = document.getElementById("inputField");
var rawField = document.getElementById("rawField");
var equationDiv = document.getElementById("equation");
var i = 0;
var raw = "";

// document.onkeydown = function(event){
// 	if(event.key == "Enter"){document.getElementById("submitButton").click();}
// }

function sliceMain(start, end){
	return raw.slice(start, end).toString();
}
function sliceTmp(start, end, tmp_string){
	return tmp_string.slice(start, end).toString();
}

document.getElementById("submitButton").onclick = function convertToEquation(){
	var input = inputField.value.split("+").slice(-1).toString().replaceAll(' ', '');
	if(input.substring(0,2).toString() == "E-"){raw = input.slice(2).toString();}else {raw = input;}
	var equation = "";
	while(i < raw.length){
		var tmp_result = decode(sliceMain(i, i+2));
		if(tmp_result != "BIG"){equation += tmp_result;i+=2;}
		else{
			switch (true) {
				// Square Root
				case sliceMain(i, i+4) == "741A":
					var numtill = numbersTill(i+4);
					if(sliceMain(numtill, numtill+2) == "1B"){
						var tmp_raw = sliceMain(i+4, numtill);
						var radicand = "";
						for(var j = 0; j < tmp_raw.length; j+=2){radicand += decode(sliceTmp(j, j+2, tmp_raw));};
						equation += ("\\sqrt{" + radicand + "}");
						i+=numtill+2;
						break;
					}
				// Nth Root
				case sliceMain(i, i+6) == "CA1D1A":
					var numtill_1 = numbersTill(i+6);
					var numtill_2 = numbersTill(numtill_1+4);
					if(sliceMain(numtill_1, numtill_1+4) == "1B1A" && sliceMain(numtill_2, numtill_2+4) == "1B1E"){
						var tmp_raw_1 = sliceMain(i+6, numtill_1); var tmp_raw_2 = sliceMain(numtill_1+4, numtill_2);
						var degree = "", radicand = "";
						for(var j = 0; j < tmp_raw_1.length; j+=2){degree += decode(sliceTmp(j, j+2, tmp_raw_1));};
						for(var j = 0; j < tmp_raw_2.length; j+=2){radicand += decode(sliceTmp(j, j+2, tmp_raw_2));};
						equation += ("\\sqrt[" + degree + "]{" + radicand + "}");
						i+=numtill_2+4;
						break;
					}
				// Absolute Value
				case sliceMain(i, i+4) == "681A":
					var numtill = numbersTill(i+4);
					if(sliceMain(numtill, numtill+2) == "1B"){
						var tmp_raw = sliceMain(i+4, numtill);
						var value = "";
						for(var j = 0; j < tmp_raw.length; j+=2){value += decode(sliceTmp(j, j+2, tmp_raw));};
						equation += ("|" + value + "|");
						i+=numtill+2;
						break;
					}
				// Fraction
				case sliceMain(i, i+6) == "C81D1A":
					var numtill_1 = numbersTill(i+6);
					var numtill_2 = numbersTill(numtill_1+4);
					if(sliceMain(numtill_1, numtill_1+4) == "1B1A" && sliceMain(numtill_2, numtill_2+4) == "1B1E"){
						var tmp_raw_1 = sliceMain(i+6, numtill_1); var tmp_raw_2 = sliceMain(numtill_1+4, numtill_2);
						var numerator = "", denominator = "";
						for(var j = 0; j < tmp_raw_1.length; j+=2){numerator += decode(sliceTmp(j, j+2, tmp_raw_1));};
						for(var j = 0; j < tmp_raw_2.length; j+=2){denominator += decode(sliceTmp(j, j+2, tmp_raw_2));};
						equation += ("\\frac{" + numerator + "}{" + denominator + "}");
						i+=numtill_2+4;
						break;
					}
				// Mixed Fraction
				case sliceMain(i, i+8) == "181F1D1A":
					var numtill_1 = numbersTill(i+8);
					var numtill_2 = numbersTill(numtill_1+4);
					var numtill_3 = numbersTill(numtill_2+4);
					if(sliceMain(numtill_1, numtill_1+4) == "1B1A" && sliceMain(numtill_2, numtill_2+4) == "1B1A" && sliceMain(numtill_3, numtill_3+4) == "1B1E"){
						var tmp_raw_1 = sliceMain(i+8, numtill_1); var tmp_raw_2 = sliceMain(numtill_1+4, numtill_2); var tmp_raw_3 = sliceMain(numtill_2+4, numtill_3);
						var number = "", numerator = "", denominator = "";
						for(var j = 0; j < tmp_raw_1.length; j+=2){number += decode(sliceTmp(j, j+2, tmp_raw_1));};
						for(var j = 0; j < tmp_raw_2.length; j+=2){numerator += decode(sliceTmp(j, j+2, tmp_raw_2));};
						for(var j = 0; j < tmp_raw_3.length; j+=2){denominator += decode(sliceTmp(j, j+2, tmp_raw_3));};
						equation += (number +"\\frac{" + numerator + "}{" + denominator + "}");
						i+=numtill_3+4;
						break;
					}
				// Power
				case sliceMain(i, i+4) == "C91A":
					var numtill = numbersTill(i+4);
					if(sliceMain(numtill, numtill+2) == "1B"){
						var tmp_raw = sliceMain(i+4, numtill);
						var power = "";
						for(var j = 0; j < tmp_raw.length; j+=2){power += decode(sliceTmp(j, j+2, tmp_raw));};
						equation += ("^{" + power + "}");
						i+=numtill+2;
						break;
					}
				// e^power
				case sliceMain(i, i+4) == "721A":
					var numtill = numbersTill(i+4);
					if(sliceMain(numtill, numtill+2) == "1B"){
						var tmp_raw = sliceMain(i+4, numtill);
						var power = "";
						for(var j = 0; j < tmp_raw.length; j+=2){power += decode(sliceTmp(j, j+2, tmp_raw));};
						equation += ("e^{" + power + "}");
						i+=numtill+2;
						break;
					}
				// 10^power
				case sliceMain(i, i+4) == "731A":
					var numtill = numbersTill(i+4);
					if(sliceMain(numtill, numtill+2) == "1B"){
						var tmp_raw = sliceMain(i+4, numtill);
						var power = "";
						for(var j = 0; j < tmp_raw.length; j+=2){power += decode(sliceTmp(j, j+2, tmp_raw));};
						equation += ("10^{" + power + "}");
						i+=numtill+2;
						break;
					}
				// log(
				case sliceMain(i, i+2) == "7D":
					if (sliceMain(i+2, i+4) != "1A") {
						equation += "\\log(";
						i += 2;
						break;
					}
				// log_b(a)
				case sliceMain(i, i+4) == "7D1A":
					var numtill_1 = numbersTill(i+4);
					var numtill_2 = numbersTill(numtill_1+2);
					if(sliceMain(numtill_1, numtill_1+2) == "1C" && sliceMain(numtill_2, numtill_2+2) == "1B"){
						var tmp_raw_1 = sliceMain(i+4, numtill_1); var tmp_raw_2 = sliceMain(numtill_1+2, numtill_2);
						var base = "", antilog = "";
						for(var j = 0; j < tmp_raw_1.length; j+=2){base += decode(sliceTmp(j, j+2, tmp_raw_1));};
						for(var j = 0; j < tmp_raw_2.length; j+=2){antilog += decode(sliceTmp(j, j+2, tmp_raw_2));};
						equation += ("\\log_" + base + "(" + antilog + ")");
						i+=numtill_2+2;
						break;
					}
				// Integral
				case sliceMain(i, i+4) == "511A":
					var numtill_1 = numbersTill(i+4);
					var numtill_2 = numbersTill(numtill_1+2);
					var numtill_3 = numbersTill(numtill_2+2);
					if(sliceMain(numtill_1, numtill_1+2) == "1C" && sliceMain(numtill_2, numtill_2+2) == "1C" && sliceMain(numtill_3, numtill_3+2) == "1B"){
						var tmp_raw_1 = sliceMain(i+4, numtill_1); var tmp_raw_2 = sliceMain(numtill_1+2, numtill_2); var tmp_raw_3 = sliceMain(numtill_2+2, numtill_3);
						var derivative = "", lowerLim = "", upperLim = "";
						for(var j = 0; j < tmp_raw_1.length; j+=2){derivative += decode(sliceTmp(j, j+2, tmp_raw_1));};
						for(var j = 0; j < tmp_raw_2.length; j+=2){lowerLim += decode(sliceTmp(j, j+2, tmp_raw_2));};
						for(var j = 0; j < tmp_raw_3.length; j+=2){upperLim += decode(sliceTmp(j, j+2, tmp_raw_3));};
						equation += ("\\int\\limits_{" + lowerLim + "}^{" + upperLim + "}" + derivative + "\\mathrm{d}x");
						i+=numtill_3+4;
						break;
					}
				default:
					equation += "'UNDEFINED'";
					i+=2;
					break;
			};
		}
	};
	equationDiv.innerHTML ="$$" + equation + "$$";
	MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
	rawField.value = equation;
	i=0; raw= "";
};

function numbersTill(startLoc){
	var isNumber = true;
	while (isNumber){
		if (decode(sliceMain(startLoc, startLoc+2)) != "BIG"){startLoc += 2;}
		else {isNumber = false;}
	}
	return startLoc;
}

function decode(key){
	var dictionary = {
		"30": "0",
		"31": "1",
		"32": "2",
		"33": "3",
		"34": "4",
		"35": "5",
		"36": "6",
		"37": "7",
		"38": "8",
		"39": "9",
		"2E": ".",
		"2D": "*10^",
		"20": "\\iota",
		"21": "e",
		"22": "\\pi",
		"42": "A",
		"43": "B",
		"44": "C",
		"45": "D",
		"46": "E",
		"47": "F",
		"48": "x",
		"49": "y",
		"40": "M",
		"A6": "+",
		"A7": "-",
		"A8": "*",
		"A9": "/",
		"D7": "%",
		"D8": "!",
		"60": "(",
		"D0": ")",
		"DC": "°",
		"C0": "-",
		"75": "\\ln(",
		"77": "\\sin(",
		"78": "\\cos(",
		"79": "\\tan(",
		"7A": "\\sin^-1(",
		"7B": "\\cos^-1(",
		"7C": "\\tan^-1(",
		"DD": "*10^{18}",
		"DE": "*10^{15}",
		"DF": "*10^{12}",
		"E0": "*10^{9}",
		"E1": "*10^{6}",
		"E2": "*10^{3}",
		"E3": "*10^{-3}",
		"E4": "*10^{-6}",
		"E5": "*10^{-9}",
		"E6": "*10^{-12}",
		"E7": "*10^{-15}"
	};
	if(dictionary[key]){return dictionary[key];}
	else{return "BIG"}
}
