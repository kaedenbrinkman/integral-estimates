var MQ = MathQuill.getInterface(2);

var function_latex = "x^2";
var starting_bound = "-1";
var ending_bound = "1";
var num_intervals = "10";

var visual_shown = "";
var bound_right = 0;
var bound_left = 0;
var bound_top = 0;
var bound_bottom = 0;

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
    id: "graph1",
    latex: "f(x)=" + function_latex,
    secret: true,
  });
  calculator.setExpression({
    id: "graph2",
    latex: "x=" + starting_bound,
    color: "#ff0000",
    lineStyle: Desmos.Styles.DASHED,
    secret: true,
  });
  calculator.setExpression({
    id: "graph2_2",
    latex: "a=" + starting_bound,
    secret: true,
    hidden: true,
  });
  calculator.setExpression({
    id: "graph3",
    latex: "x=" + ending_bound,
    color: "#ff0000",
    lineStyle: Desmos.Styles.DASHED,
    secret: true,
  });
  calculator.setExpression({
    id: "graph3_2",
    latex: "b=" + ending_bound,
    secret: true,
    hidden: true,
  });
  calculator.setExpression({
    id: "area_m_visual1",
    latex:
      "\\min\\left(0,f\\left(a+\\left(i-\\frac{1}{2}\\right)\\left(\\frac{b-a}{n}\\right)\\right)\\right)\\le y\\le\\max\\left(0,f\\left(a+\\left(i-\\frac{1}{2}\\right)\\left(\\frac{b-a}{n}\\right)\\right)\\right)\\left\\{a+\\frac{b-a}{n}\\left(i-1\\right)\\le x\\le a+\\frac{b-a}{n}\\left(i\\right)\\right\\}",
    secret: true,
    color: "#000000",
    hidden: visual_shown !== "area_m",
  });
  calculator.setExpression({
    id: "area_m_visual2",
    latex:
      "x=a+\\left(i-1\\right)\\frac{b-a}{n}\\left\\{\\min\\left(0,f\\left(a+\\left(i-\\frac{1}{2}\\right)\\frac{b-a}{n}\\right)\\right)\\le y\\le\\max\\left(0,f\\left(a+\\left(i-\\frac{1}{2}\\right)\\frac{b-a}{n}\\right)\\right)\\right\\}",
    secret: true,
    color: "#000000",
    hidden: visual_shown !== "area_m",
  });
  calculator.setExpression({
    id: "area_m_visual3",
    latex:
      "x=a+i\\frac{b-a}{n}\\left\\{\\min\\left(0,f\\left(a+\\left(i-\\frac{1}{2}\\right)\\frac{b-a}{n}\\right)\\right)\\le y\\le\\max\\left(0,f\\left(a+\\left(i-\\frac{1}{2}\\right)\\frac{b-a}{n}\\right)\\right)\\right\\}",
    secret: true,
    color: "#000000",
    hidden: visual_shown !== "area_m",
  });
  calculator.setExpression({
    id: "area_a_visual1",
    latex:
      "\\min\\left(0,\\ f\\left(x\\right)\\right)<y<\\max\\left(0,\\ f\\left(x\\right)\\right)\\left\\{a<x<b\\right\\}",
    secret: true,
    hidden: visual_shown !== "area_a",
  });
  calculator.setExpression({
    id: "area_r_visual1",
    latex:
      "\\min\\left(0,f\\left(a+i\\frac{b-a}{n}\\right)\\right)\\le y\\le\\max\\left(0,f\\left(a+i\\frac{b-a}{n}\\right)\\right)\\left\\{a+\\frac{b-a}{n}\\left(i-1\\right)\\le x\\le a+\\frac{b-a}{n}\\left(i\\right)\\right\\}",
    secret: true,
    color: "#000000",
    hidden: visual_shown !== "area_r",
  });
  calculator.setExpression({
    id: "area_r_visual2",
    latex:
      "x=a+\\left(i-1\\right)\\frac{b-a}{n}\\left\\{\\min\\left(0,f\\left(a+i\\frac{b-a}{n}\\right)\\right)\\le y\\le\\max\\left(0,f\\left(a+i\\frac{b-a}{n}\\right)\\right)\\right\\}",
    secret: true,
    color: "#000000",
    hidden: visual_shown !== "area_r",
  });
  calculator.setExpression({
    id: "area_r_visual3",
    latex:
      "x=a+i\\frac{b-a}{n}\\left\\{\\min\\left(0,f\\left(a+i\\frac{b-a}{n}\\right)\\right)\\le y\\le\\max\\left(0,f\\left(a+i\\frac{b-a}{n}\\right)\\right)\\right\\}",
    secret: true,
    color: "#000000",
    hidden: visual_shown !== "area_r",
  });
  calculator.setExpression({
    id: "area_l_visual1",
    latex:
      "\\min\\left(0,f\\left(a+(i-1)\\frac{b-a}{n}\\right)\\right)\\le y\\le\\max\\left(0,f\\left(a+(i-1)\\frac{b-a}{n}\\right)\\right)\\left\\{a+\\frac{b-a}{n}\\left(i-1\\right)\\le x\\le a+\\frac{b-a}{n}\\left(i\\right)\\right\\}",
    secret: true,
    color: "#000000",
    hidden: visual_shown !== "area_l",
  });
  calculator.setExpression({
    id: "area_l_visual2",
    latex:
      "x=a+\\left(i-1\\right)\\frac{b-a}{n}\\left\\{\\min\\left(0,f\\left(a+(i-1)\\frac{b-a}{n}\\right)\\right)\\le y\\le\\max\\left(0,f\\left(a+(i-1)\\frac{b-a}{n}\\right)\\right)\\right\\}",
    secret: true,
    color: "#000000",
    hidden: visual_shown !== "area_l",
  });
  calculator.setExpression({
    id: "area_l_visual3",
    latex:
      "x=a+(i-1)\\frac{b-a}{n}\\left\\{\\min\\left(0,f\\left(a+(i-1)\\frac{b-a}{n}\\right)\\right)\\le y\\le\\max\\left(0,f\\left(a+(i-1)\\frac{b-a}{n}\\right)\\right)\\right\\}",
    secret: true,
    color: "#000000",
    hidden: visual_shown !== "area_l",
  });
  calculator.setExpression({
    id: "area_s_visual1",
    latex: "S_{i3}=\\left[2,4,...n\\right]",
    secret: true,
    color: "#000000",
    hidden: visual_shown !== "area_s",
  });
  calculator.setExpression({
    id: "area_s_visual2",
    latex: "x_{1}=a+\\left(S_{i3}-2\\right)\\frac{b-a}{n}",
    secret: true,
    color: "#000000",
    hidden: visual_shown !== "area_s",
  });
  calculator.setExpression({
    id: "area_s_visual3",
    latex: "x_{2}=a+\\left(S_{i3}-1\\right)\\frac{b-a}{n}",
    secret: true,
    color: "#000000",
    hidden: visual_shown !== "area_s",
  });
  calculator.setExpression({
    id: "area_s_visual4",
    latex: "x_{3}=a+S_{i3}\\frac{b-a}{n}",
    secret: true,
    color: "#000000",
    hidden: visual_shown !== "area_s",
  });
  calculator.setExpression({
    id: "area_s_visual5",
    latex:
      "\\min\\left(0,P\\left(x\\right)\\right)\\le y\\le\\max\\left(0,P\\left(x\\right)\\right)\\left\\{x_{1}\\le x\\le x_{3}\\right\\}",
    secret: true,
    color: "#000000",
    hidden: visual_shown !== "area_s",
  });
  calculator.setExpression({
    id: "area_s_visual6",
    latex:
      "x=a+\\left(i-1\\right)\\frac{b-a}{n}\\left\\{\\min\\left(0,f\\left(a+\\left(i-1\\right)\\frac{b-a}{n}\\right)\\right)\\le y\\le\\max\\left(0,f\\left(a+\\left(i-1\\right)\\frac{b-a}{n}\\right)\\right)\\right\\}",
    secret: true,
    color: "#000000",
    lineStyle: Desmos.Styles.DOTTED,
    hidden: visual_shown !== "area_s",
  });
  calculator.setExpression({
    id: "area_s_visual7",
    latex:
      "x=b\\left\\{\\min\\left(0,f\\left(b\\right)\\right)\\le y\\le\\max\\left(0,f\\left(b\\right)\\right)\\right\\}",
    secret: true,
    color: "#000000",
    lineStyle: Desmos.Styles.DOTTED,
    hidden: visual_shown !== "area_s",
  });
  calculator.setExpression({
    id: "area_s_visual8",
    latex:
      "P\\left(x\\right)=f\\left(x_{1}\\right)\\cdot\\frac{x-x_{2}}{x_{1}-x_{2}}\\cdot\\frac{x-x_{3}}{x_{1}-x_{3}}+f\\left(x_{2}\\right)\\cdot\\frac{x-x_{1}}{x_{2}-x_{1}}\\cdot\\frac{x-x_{3}}{x_{2}-x_{3}}+f\\left(x_{3}\\right)\\cdot\\frac{x-x_{1}}{x_{3}-x_{1}}\\cdot\\frac{x-x_{2}}{x_{3}-x_{2}}\\left\\{x_{1}\\le x\\le x_{3}\\right\\}",
    secret: true,
    color: "#000000",
    lineStyle: Desmos.Styles.DOTTED,
    hidden: visual_shown !== "area_s",
  });
  calculator.setExpression({
    id: "area_t_visual1",
    latex: "x_{T1}=a+\\left(i-1\\right)\\frac{b-a}{n}",
    secret: true,
    color: "#168c36",
    lineStyle: Desmos.Styles.DOTTED,
    hidden: visual_shown !== "area_t",
  });
  calculator.setExpression({
    id: "area_t_visual2",
    latex: "x_{T2}=a+i\\frac{b-a}{n}",
    secret: true,
    color: "#168c36",
    lineStyle: Desmos.Styles.DOTTED,
    hidden: visual_shown !== "area_t",
  });
  calculator.setExpression({
    id: "area_t_visual4",
    latex:
      "\\min\\left(0,T\\left(x\\right)\\right)\\le y\\le\\max\\left(0,T\\left(x\\right)\\right)\\left\\{x_{T1}\\le x\\le x_{T2}\\right\\}",
    secret: true,
    color: "#168c36",
    lineStyle: Desmos.Styles.DOTTED,
    hidden: visual_shown !== "area_t",
  });
  calculator.setExpression({
    id: "area_t_visual5",
    latex:
      "x=a+\\left(i-1\\right)\\frac{b-a}{n}\\left\\{\\min\\left(0,f\\left(a+\\left(i-1\\right)\\frac{b-a}{n}\\right)\\right)\\le y\\le\\max\\left(0,f\\left(a+\\left(i-1\\right)\\frac{b-a}{n}\\right)\\right)\\right\\}",
    secret: true,
    color: "#168c36",
    lineStyle: Desmos.Styles.DOTTED,
    hidden: visual_shown !== "area_t",
  });
  calculator.setExpression({
    id: "area_t_visual6",
    latex:
      "x=b\\left\\{\\min\\left(0,f\\left(b\\right)\\right)\\le y\\le\\max\\left(0,f\\left(b\\right)\\right)\\right\\}",
    secret: true,
    color: "#168c36",
    lineStyle: Desmos.Styles.DOTTED,
    hidden: visual_shown !== "area_t",
  });
  calculator.setExpression({
    id: "area_t_visual7",
    latex: "",
    secret: true,
    color: "#168c36",
    lineStyle: Desmos.Styles.DOTTED,
    hidden: visual_shown !== "area_t",
  });
  calculator.setExpression({
    id: "area_r",
    latex:
      "R_{n}=\\sum_{j=1}^{n}f\\left(a+\\frac{\\left(b-a\\right)}{n}j\\right)\\frac{\\left(b-a\\right)}{n}",
    secret: true,
    hidden: true,
  });
  calculator.setExpression({
    id: "area_l",
    latex:
      "L_{n}=\\sum_{j=0}^{n-1}f\\left(a+\\frac{\\left(b-a\\right)}{n}j\\right)\\frac{\\left(b-a\\right)}{n}",
    secret: true,
    hidden: true,
  });
  calculator.setExpression({
    id: "graph6",
    latex: "n=" + num_intervals,
    secret: true,
  });
  if (observe) {
    calculator.setExpression({
      id: "define_i",
      latex: "i=\\left[1...n\\right]",
      secret: true,
      hidden: true,
    });
    calculator.setExpression({
      id: "area_t_visual3",
      latex:
        "T\\left(x\\right)=f\\left(x_{T1}\\right)\\cdot\\frac{x-x_{T2}}{x_{T1}-x_{T2}}+f\\left(x_{T2}\\right)\\cdot\\frac{x-x_{T1}}{x_{T2}-x_{T1}}",
      secret: true,
      hidden: true,
    });
    calculator.setExpression({
      id: "area_s",
      latex:
        "S_{n}=\\frac{1}{3}\\cdot\\frac{b-a}{n}\\left(f\\left(a\\right)+\\sum_{t=1}^{\\frac{n}{2}}4f\\left(a+\\left(2t-1\\right)\\frac{b-a}{n}\\right)+\\sum_{t=1}^{\\frac{n}{2}-1}2f\\left(a+2t\\frac{b-a}{n}\\right)+f\\left(b\\right)\\right)",
      secret: true,
      hidden: true,
    });
    calculator.setExpression({
      id: "area_a",
      latex: "\\int_a^b f(x)dx",
      secret: true,
    });
    calculator.setExpression({
      id: "area_m",
      latex:
        "M_{n}=\\sum_{t=1}^{n}f\\left(a+\\left(t-\\frac{1}{2}\\right)\\frac{b-a}{n}\\right)\\left(\\frac{b-a}{n}\\right)",
      secret: true,
      hidden: true,
    });
    calculator.setExpression({
      id: "area_t",
      latex:
        "T_{n}=\\frac{1}{2}\\cdot\\frac{b-a}{n}\\left(f\\left(a\\right)+2\\sum_{t=1}^{n-1}f\\left(a+t\\frac{b-a}{n}\\right)+f\\left(b\\right)\\right)",
      secret: true,
      hidden: true,
    });

    calculator.setExpression({
      id: "bound_max",
      latex:
        "\\max\\left(f\\left(a\\right),\\ f\\left(b\\right),\\ f\\left(\\frac{\\left(b+a\\right)}{2}\\right)\\right)",
      secret: true,
      hidden: true,
    });
    calculator.setExpression({
      id: "bound_min",
      latex:
        "\\min\\left(f\\left(a\\right),\\ f\\left(b\\right),\\ f\\left(\\frac{\\left(b+a\\right)}{2}\\right)\\right)",
      secret: true,
      hidden: true,
    });

    //Observe the evaluated values
    calculator.observe("expressionAnalysis", function () {
      var hasError = false;
      for (var id in calculator.expressionAnalysis) {
        if (
          id == "area_a" ||
          id == "area_m" ||
          id == "area_t" ||
          id == "area_s" ||
          id == "area_r" ||
          id == "area_l"
        ) {
          var analysis = calculator.expressionAnalysis[id];
          if (analysis.isError || hasError) {
            hasError = true;
            console.log(analysis.errorMessage);
            reportError("Parse error: Check your input and try again.");
          } else if (typeof analysis.evaluation !== "undefined") {
            var area = analysis.evaluation.value;
            mathResult(id, area);
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

var problemSpan = document.getElementById("fn");
MQ.StaticMath(problemSpan);
var answerSpan = document.getElementById("answer");
var answerMathField = MQ.MathField(answerSpan, {
  handlers: {
    edit: function () {
      var enteredMath = answerMathField.latex(); // Get entered math in LaTeX format
      function_latex = enteredMath;
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

var n_promptSpan = document.getElementById("n_prompt");
MQ.StaticMath(n_promptSpan);
var numSpan = document.getElementById("num");
var numMathField = MQ.MathField(numSpan, {
  handlers: {
    edit: function () {
      var enteredMath = numMathField.latex(); // Get entered math in LaTeX format
      num_intervals = enteredMath;
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
