
    (function ($) {

      $.fn.doughnutChart = function (options) {
        var settings = $.extend(
          {
            positiveColor: "#00CEFF",
            negativeColor: "#008CA3",
            backgroundColor: "#28292B",
            textColor: "white",
            percentage: 92,
            size: 54,
            textYaxis: 30,
            fontSize: "small",
            doughnutSize: 0.3,
            innerText: "90%",
            innerTextOffset: 12,
          },
          options
        );

        //Main Layout
        var svgns = "http://www.w3.org/2000/svg";
        var chart = document.createElementNS(svgns, "svg:svg");
        chart.setAttribute("width", (settings.size));
        chart.setAttribute("height", settings.size);
        var center = (settings.size / 2);
        chart.setAttribute("viewBox", "0 0 " + (settings.size) + " " + settings.size);
        var back = document.createElementNS(svgns, "circle");
        back.setAttributeNS(null, "cx", center);
        back.setAttributeNS(null, "cy", center);
        back.setAttributeNS(null, "r", center);
        back.setAttributeNS(null, "fill", settings.negativeColor);
        chart.appendChild(back);

        // primary slice
        var path = document.createElementNS(svgns, "path");
        var unit = (Math.PI * 2) / 100;
        var startangle = 0;
        var endangle = settings.percentage * unit - 0.001;
        var x1 = center + center * Math.sin(startangle);
        var y1 = center - center * Math.cos(startangle);
        var x2 = center + center * Math.sin(endangle);
        var y2 = center - center * Math.cos(endangle);
        var big = 0;
        if (endangle - startangle > Math.PI) {
          big = 1;
        }
        //https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
        //Draw the main path
        var d = "M " + center + "," + center +      // Start at circle center
          " L " + x1 + "," + y1 +                 // Draw line to (x1,y1)
          " A " + center + "," + center +         // Draw an arc of radius r
          " 0 " + big + " 1 " +                   // Arc details...
          x2 + "," + y2 +                         // Arc goes to (x2,y2)
          " Z";                                   // Close path back to (cx,cy)
        path.setAttribute("d", d);
        path.setAttribute("fill", settings.positiveColor);
        chart.appendChild(path); // Add slice to chart

        // foreground circle
        var front = document.createElementNS(svgns, "circle");
        front.setAttributeNS(null, "cx", center);
        front.setAttributeNS(null, "cy", center);
        front.setAttributeNS(null, "r", (settings.size * settings.doughnutSize));
        front.setAttributeNS(null, "fill", settings.backgroundColor);
        chart.appendChild(front);

        //Inner text
        var newText = document.createElementNS(svgns, "text");
        newText.setAttributeNS(null, "x", center - settings.innerTextOffset);
        newText.setAttributeNS(null, "y", settings.textYaxis);
        newText.setAttribute("font-weight", "bold");
        newText.setAttribute("font-size", settings.fontSize);
        newText.setAttribute("fill", settings.textColor);
        var textNode = document.createTextNode(settings.innerText);
        newText.appendChild(textNode);
        chart.appendChild(newText);
        $(this).append(chart);
        this
        return this;
      };

    }(jQuery));

    $('#smallGraph,#smallGraph1,#smallGraph2').doughnutChart();

    // $('#container2').doughnutChart({
    //   positiveColor: "#DA4453",
    //   negativeColor: "#3BB0D6",
    //   backgroundColor: "white",
    //   percentage: 52,
    //   size: 100,
    //   textYaxis: 55,
    //   fontSize: "large",
    //   doughnutSize: 0.3,
    //   innerText: "52%",
    // });


