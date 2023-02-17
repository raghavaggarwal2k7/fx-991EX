var elt = document.getElementById("graph");
var graphButton = document.getElementById("graphButton");
var calcCreated = false;
var calc;
var graphs = 0;

graphButton.onclick = function(){
	var equation = document.getElementById('rawField').value;
	if(!calcCreated){
		calc = Desmos.GraphingCalculator(elt, {expressionsCollapsed: true, border: false, actions: true, restrictedFunctions: true, invertedColors : true});
		calcCreated = true;
	}
	var graphID = "graph" + graphs;
	calc.setExpression({id: graphID, latex: equation});
	calc.observe('expressionAnalysis', function() {
		for (var id in calc.expressionAnalysis) {
			var analysis = calc.expressionAnalysis[id];
			if (analysis.isGraphable) console.log('This expression can be plotted.');
			if (analysis.isError)
			console.log(`Expression '${id}': ${analysis.errorMessage}`);
			if (analysis.evaluation) console.log(`value: ${analysis.evaluation.value}`);
		}
	});
	graphs++;
}