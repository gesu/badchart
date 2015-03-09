window.onload = function () {

  generateData = function() {
    var data = [];
    for(var i = 0; i < 30; i++) {
      var d = {};
      // Set fake date
      var date = new Date();
      date.setDate(date.getDate() + i);
      d.date = date;
      // Set fake pageviews
      d.pageviews = Math.floor(Math.random()*1000);
      data.push(d);
    }
    return data;
  }


  render = function(data) {
    d3.select("#bad-chart").remove();
    d3.select(".js-bad-chart").append("svg").attr("id", "bad-chart");

    var width = 960,
        height = 500;

    var y = d3.scale.linear()
        .range([height, 0])
        .domain([0, d3.max(data, function(d){ return d.pageviews;})]);

    var chart = d3.select("#bad-chart")
        .attr("width", width)
        .attr("height", height);

    var barWidth = width / data.length;

    var bar = chart.selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

    bar.append("rect")
        .attr("y", function(d) { return y(d.pageviews); })
        .attr("height", function(d) { return height - y(d.pageviews); })
        .attr("width", barWidth - 1)
  }

  document.getElementsByClassName('js-render')[0].onclick = function() {
    render(generateData());
  }
}
