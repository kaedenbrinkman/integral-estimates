var MQ = MathQuill.getInterface(2);

var function1_latex = "x^2";
var function2_latex = "0";
var starting_bound = "0";
var ending_bound = "1";
var density = "1";

var visual_shown = "";
var bound_right = 0;
var bound_left = 0;
var bound_top = 0;
var bound_bottom = 0;

var centroid_x_value = 0;
var centroid_y_value = 0;

var elt = document.getElementById("calculator");
var calculator = Desmos.GraphingCalculator(elt);
calculator.updateSettings({
  expressionsCollapsed: true,
  zoomButtons: false,
  settingsMenu: false,
  expressions: false,
});
updateGraph(true);

function updateGraph(observe = false) {
  calculator.setExpression({
    id: "function1",
    latex: "f(x)=" + function1_latex,
    secret: true,
  });
  calculator.setExpression({
    id: "function2",
    latex: "g(x)=" + function2_latex,
    secret: true,
  });
  calculator.setExpression({
    id: "bound1",
    latex: "x=" + starting_bound,
    color: "#ff0000",
    lineStyle: Desmos.Styles.DASHED,
    secret: true,
  });
  calculator.setExpression({
    id: "bound1_2",
    latex: "a=" + starting_bound,
    secret: true,
    hidden: true,
  });
  calculator.setExpression({
    id: "bound3",
    latex: "x=" + ending_bound,
    color: "#ff0000",
    lineStyle: Desmos.Styles.DASHED,
    secret: true,
  });
  calculator.setExpression({
    id: "bound3_2",
    latex: "b=" + ending_bound,
    secret: true,
    hidden: true,
  });
  calculator.setExpression({
    id: "density1",
    latex: "p=" + density,
    secret: true,
    hidden: true,
  });

  if (observe) {
    //Define anything that only happens once
    calculator.setExpression({
      id: "area_visual",
      latex:
        "\\min\\left(f\\left(x\\right),g\\left(x\\right)\\right)<y<\\max\\left(f\\left(x\\right),g\\left(x\\right)\\right)\\left\\{a<x<b\\right\\}",
      secret: true,
      color: "#000000",
      lineStyle: Desmos.Styles.DOTTED,
    });
    calculator.setExpression({
      id: "moment_x",
      latex:
        "M_{x}=p\\int_{a}^{b}\\frac{1}{2}\\left(f\\left(x\\right)^{2}-g\\left(x\\right)^{2}\\right)dx",
      secret: true,
      color: "#000000",
      lineStyle: Desmos.Styles.DOTTED,
    });
    calculator.setExpression({
      id: "moment_y",
      latex:
        "M_{y}=p\\int_{a}^{b}x\\left(f\\left(x\\right)-g\\left(x\\right)\\right)dx",
      secret: true,
      color: "#000000",
      lineStyle: Desmos.Styles.DOTTED,
    });
    calculator.setExpression({
      id: "centroid_x",
      latex: "x_{m}=\\frac{M_{y}}{m}",
      secret: true,
      color: "#000000",
      lineStyle: Desmos.Styles.DOTTED,
    });
    calculator.setExpression({
      id: "centroid_y",
      latex: "y_{m}=\\frac{M_{x}}{m}",
      secret: true,
      color: "#000000",
      lineStyle: Desmos.Styles.DOTTED,
    });
    calculator.setExpression({
      id: "centroid",
      latex: "\\left(x_{m},\\ y_{m}\\right)",
      secret: true,
      color: "#000000",
      lineStyle: Desmos.Styles.DOTTED,
      label: "Centroid",
    });
    calculator.setExpression({
      id: "mass",
      latex:
        "m=p\\int_{a}^{b}\\left(f\\left(x\\right)-g\\left(x\\right)\\right)dx",
      secret: true,
      color: "#000000",
      lineStyle: Desmos.Styles.DOTTED,
    });
    calculator.setExpression({
      id: "bound_max",
      latex:
        "\\max\\left(f\\left(a\\right),\\ f\\left(b\\right),\\ g\\left(a\\right),\\ g\\left(b\\right),\\ f\\left(\\frac{\\left(b-a\\right)}{2}\\right),\\ \\ g\\left(\\frac{\\left(b-a\\right)}{2}\\right)\\right)",
      secret: true,
      hidden: true,
    });
    calculator.setExpression({
      id: "bound_min",
      latex:
        "\\min\\left(f\\left(a\\right),\\ f\\left(b\\right),\\ g\\left(a\\right),\\ g\\left(b\\right),\\ f\\left(\\frac{\\left(b-a\\right)}{2}\\right),\\ \\ g\\left(\\frac{\\left(b-a\\right)}{2}\\right)\\right)",
      secret: true,
      hidden: true,
    });
    //Observe the evaluated values
    calculator.observe("expressionAnalysis", function () {
      var hasError = false;
      for (var id in calculator.expressionAnalysis) {
        if (
          id == "moment_x" ||
          id == "moment_y" ||
          id == "centroid_x" ||
          id == "centroid_y"
        ) {
          var analysis = calculator.expressionAnalysis[id];
          if (analysis.isError || hasError) {
            hasError = true;
            console.log(analysis.errorMessage);
            reportError("Parse error: Check your input and try again.");
          } else if (typeof analysis.evaluation !== "undefined") {
            var area = analysis.evaluation.value;
            mathResult(id, area);
            if (id == "centroid_x") {
              centroid_x_value = area;
            } else if (id == "centroid_y") {
              centroid_y_value = area;
            }
            updateCentroid(centroid_x_value, centroid_y_value);
          } else {
            console.log("No evaluation for " + id);
            mathResult(id, "ERROR");
            calculator.setExpression({
              id: id,
              secret: false,
            });
          }
        } else if (id === "bound_max" || id === "bound_min") {
          var start_double = parseFloat(starting_bound);
          var end_double = parseFloat(ending_bound);
          var leftBound = Math.min(start_double, end_double);
          var rightBound = Math.max(start_double, end_double);
          var distance = rightBound - leftBound;
          var margin = 0.2;
          rightBound += distance * margin;
          leftBound -= distance * margin;

          bound_right = rightBound;
          bound_left = leftBound;

          var analysis = calculator.expressionAnalysis[id];
          if (analysis.isError || hasError) {
          } else if (typeof analysis.evaluation !== "undefined") {
            var val = analysis.evaluation.value;
            var vertDistance = bound_top - bound_bottom;
            if (id === "bound_max") {
              val += vertDistance * margin;
              bound_top = val;
            } else {
              val -= vertDistance * margin;
              bound_bottom = val;
            }
            setBounds();
          }
        }
      }
      if (!hasError) {
        reportError("");
      }
    });
  }
}

function setBounds() {
  calculator.setMathBounds({
    left: bound_left,
    right: bound_right,
    top: bound_top,
    bottom: bound_bottom,
  });
}

var problemSpan = document.getElementById("fn1");
MQ.StaticMath(problemSpan);
var answerSpan = document.getElementById("answer1");
var answerMathField = MQ.MathField(answerSpan, {
  handlers: {
    edit: function () {
      var enteredMath = answerMathField.latex(); // Get entered math in LaTeX format
      function1_latex = enteredMath;
      updateGraph();
    },
  },
});

var problemSpan = document.getElementById("fn2");
MQ.StaticMath(problemSpan);
var answerSpan = document.getElementById("answer2");
var answerMathField = MQ.MathField(answerSpan, {
  handlers: {
    edit: function () {
      var enteredMath = answerMathField.latex(); // Get entered math in LaTeX format
      function2_latex = enteredMath;
      updateGraph();
    },
  },
});

var a_promptSpan = document.getElementById("a_prompt");
MQ.StaticMath(a_promptSpan);
var startSpan = document.getElementById("start");
var startMathField = MQ.MathField(startSpan, {
  handlers: {
    edit: function () {
      var enteredMath = startMathField.latex(); // Get entered math in LaTeX format
      starting_bound = enteredMath;
      updateGraph();
    },
  },
});

var b_promptSpan = document.getElementById("b_prompt");
MQ.StaticMath(b_promptSpan);
var endSpan = document.getElementById("end");
var endMathField = MQ.MathField(endSpan, {
  handlers: {
    edit: function () {
      var enteredMath = endMathField.latex(); // Get entered math in LaTeX format
      ending_bound = enteredMath;
      updateGraph();
    },
  },
});

var n_promptSpan = document.getElementById("p_prompt");
MQ.StaticMath(n_promptSpan);
var numSpan = document.getElementById("num");
var numMathField = MQ.MathField(numSpan, {
  handlers: {
    edit: function () {
      var enteredMath = numMathField.latex(); // Get entered math in LaTeX format
      density = enteredMath;
      updateGraph();
    },
  },
});

import { evaluatex } from "./evaluatex/evaluatex.js";
function reportError(msg) {
  $("#area_error").text(msg);
}

function mathResult(elem_id, result) {
  var resultSpan = document.getElementById(elem_id);
  resultSpan.textContent = result;
  MQ.StaticMath(resultSpan);
}

function latexEval(expression, args) {
  console.log(expression);
  console.log(args);
  var fn = evaluatex(expression);
  return fn(args);
}

$("#results p").click(function () {
  var id = $(this).find("span").attr("id");
  visual_shown = id;
  updateGraph();
});

function updateCentroid(x, y) {
  var centroidSpan = document.getElementById("centroid");
  centroidSpan.textContent = "(" + x + ", " + y + ")";
  MQ.StaticMath(centroidSpan);
}
