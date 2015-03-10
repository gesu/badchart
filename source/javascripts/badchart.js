window.onload = function () {

  generateData = function() {
    var data = [];
    var date = new Date(Math.random()*10001238674);
    date = new Date(date.setHours(0,0,0,0));
    for(var i = 0; i < 30; i++) {
      var d = {};
      // Set fake date
      next_date = date.setDate(date.getDate() + 1);
      d.date = next_date;
      // Set fake pageviews
      d.pageviews = Math.floor(Math.random()*1000);
      // Set fake unique pageviews
      d.unique_pageviews = Math.floor(Math.random()*1000);

      data.push(d);
    }
    return data;
  }


  render = function(data) {
    d3.select("#bad-chart").remove();
    d3.select(".js-bad-chart").append("svg").attr("id", "bad-chart");

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 980 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var barWidth = width / data.length;

    var start = new Date(data[0].date),
        end = new Date(data[data.length-1].date),
        graph_start = d3.time.day.offset(start, -1),
        graph_end = d3.time.day.offset(end, +1);

    var x = d3.time.scale()
            .domain([start, graph_end])
            .range([0, width])

    var y = d3.scale.linear()
        .domain([0, d3.max(data, function(d){ return d.pageviews;})])
        .range([height, 0]);

    var xAxis = d3.svg.axis()
              .scale(x)
              .orient('bottom')
              .ticks(d3.time.day, 5)
              .tickFormat(d3.time.format('%b %e'))
              .outerTickSize(0)

    var yAxis = d3.svg.axis()
                .scale(y)
                .orient('left')
                .ticks(5)
                .tickPadding(8);

    var chart = d3.select("#bad-chart")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var barWidth = width / data.length;

    var bar = chart.selectAll("g")
        .data(data)
      .enter().append("g")
        .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

    bar.append("rect")
        .attr('class', 'bar')
        .attr("y", function(d) { return y(d.pageviews); })
        .attr("height", function(d) { return height - y(d.pageviews); })
        .attr("width", barWidth - 1)
    tooltip = bar.append("g")
        .attr('class', 'tooltip')

    chart.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0, ' + height + ')')
      .call(xAxis)
    .selectAll("text")
      .attr("y", 6)
      .attr("x", barWidth / 2)

    chart.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    bar.on("mouseover", function(d){
      console.log('hello');
      console.log(this);
      d3.select(this).append("text")
        .attr("text-anchor", "middle")
        .attr("x", data.length / 2)
        .attr("y", function(d) { return y(d.pageviews + 60); })
        .text(function(d) { return d.date });
      d3.select(this).append("text")
        .attr("text-anchor", "middle")
        .attr("x", data.length / 2)
        .attr("y", function(d) { return y(d.pageviews + 30); })
        .text(function(d) { return "views: " + d.pageviews });
      d3.select(this).append("text")
        .attr("text-anchor", "middle")
        .attr("x", data.length / 2)
        .attr("y", function(d) { return y(d.pageviews); })
        .text(function(d) { return "uniq: " + d.unique_pageviews });
    });

  }

  document.getElementsByClassName('js-render')[0].onclick = function() {
    render(generateData());
  }

  render(generateData());
}
