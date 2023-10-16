/**
 * @file
 * gdc_chart behaviors.
 */

(function ($, Drupal) {
  Drupal.behaviors.gdcChartGdcChart = {
    attach: function (context, settings) {
      once('gdcChartGdcChart', 'html').forEach(function (element) {
       $(document).ready(function() {
   	displayChart();
        $('.chartContainer').css("display","block");
       });
      });
    },
  };

  function displayChart() {
    const ctx = document.getElementById("chart").getContext("2d");
    colors = [];
    Chart.Tooltip.positioners.customPosition = function (elements, position) {
      let currentChartHeight = chart.height;
      let currentChartWidth = chart.width;
      let x = position["x"];
      let y = position["y"];
      let halfHeight = currentChartHeight / y;
      let halfWidth = currentChartWidth / x;
      x = halfWidth > 2 ? x + 15 : x - 140;
      y = halfHeight > 2 ? y + 45 : y - 45;
      return {
        x: x,
        y: y
      };
    };
    let data = [];    
    let categories = {
      bladder: "#d33682",
      blood: "#ce6503",
      bone: "#166aa2",
      brain: "#6d72c5",
      breast: "#dc609c",
      cervix: "#e9931c",
      colorectal: "#1c87ce",
      esophagus: "#22cc00",
      "head and neck": "#d33682",
      kidney: "#166aa2",
      liver: "#1693c0",
      lung: "#eda94a",
      ovary: "#24b2e5",
      pancreas: "#e9931c",
      prostate: "#1a9900",
      skin: "#1693c0",
      stomach: "#fb7e09",
      uterus: "#9295d3",
      "": "#ccc"
    };
    
    for (var key in categories) {
      var value = categories[key];
      data.push({'id':key, cases:25, filles: 34});
      colors.push(value);
    }
    const chart = new Chart(ctx, {
      type: "pie",
      data: {
        datasets: [
          {
            data: data,
            backgroundColor: colors
          }
        ]
      },
      options: {
        parsing: {
          key: "cases"
        },
        plugins: {
          legend: {
            display: false
          },
    
          tooltip: {
            usePointStyle: true,
            position: "customPosition",
            backgroundColor: "rgba(255, 255, 255, 1)",
            titleColor: "#000",
            footerColor: "#000",
            displayColors: true,
            bodyColor: "#000",
            borderColor: "#000",
            footerColor: "#000",
            borderWidth: 2,
            titleFont: { color: "red" },
            xAlign: "left",
            yAlign: "middle",
            footerFont: {
              weight: "normal",
              size: 16
            },
            bodyFont: {
              weight: "bold",
              size: 16
            },
            callbacks: {
              labelPointStyle: function (context) {
                return {
                  pointStyle: "triangle",
                  rotation: 90
                };
              },
              label: function (context) {
                const dataItem = context.dataset.data[context.dataIndex];
                let label = dataItem.id;
                return label;
              },
              footer: function (context) {
                const dataItem = context[0].dataset.data[context[0].dataIndex];
                let footer = `${dataItem["cases"]} Cases (${dataItem["files"]} Files)`;
                return footer;
              }
            }
          }
        }
      }
    });
    
  };                                                                                               
})(jQuery, Drupal);  
