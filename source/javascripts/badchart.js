window.onload = function () {
  data1 = [{date:"Sat, 07 Feb 2015", visits:10}, {date:"Sun, 08 Feb 2015", visits:8}, {date:"Mon, 09 Feb 2015", visits:267}, {date:"Tue, 10 Feb 2015", visits:79}, {date:"Wed, 11 Feb 2015", visits:140}, {date:"Thu, 12 Feb 2015", visits:152}, {date:"Fri, 13 Feb 2015", visits:145}, {date:"Sat, 14 Feb 2015", visits:109}, {date:"Sun, 15 Feb 2015", visits:101}, {date:"Mon, 16 Feb 2015", visits:83}, {date:"Tue, 17 Feb 2015", visits:51}, {date:"Wed, 18 Feb 2015", visits:55}, {date:"Thu, 19 Feb 2015", visits:67}, {date:"Fri, 20 Feb 2015", visits:35}, {date:"Sat, 21 Feb 2015", visits:30}, {date:"Sun, 22 Feb 2015", visits:31}, {date:"Mon, 23 Feb 2015", visits:102}, {date:"Tue, 24 Feb 2015", visits:123}, {date:"Wed, 25 Feb 2015", visits:47}, {date:"Thu, 26 Feb 2015", visits:22}, {date:"Fri, 27 Feb 2015", visits:41}, {date:"Sat, 28 Feb 2015", visits:38}, {date:"Sun, 01 Mar 2015", visits:28}, {date:"Mon, 02 Mar 2015", visits:92}, {date:"Tue, 03 Mar 2015", visits:66}, {date:"Wed, 04 Mar 2015", visits:19}, {date:"Thu, 05 Mar 2015", visits:42}, {date:"Fri, 06 Mar 2015", visits:17}, {date:"Sat, 07 Mar 2015", visits:50}, {date:"Sun, 08 Mar 2015", visits:13}, {date:"Mon, 09 Mar 2015", visits:10}]
  data2 = [{date:"Sat, 07 Feb 2015", visits:90}, {date:"Sun, 08 Feb 2015", visits:8}, {date:"Mon, 09 Feb 2015", visits:267}, {date:"Tue, 10 Feb 2015", visits:79}, {date:"Wed, 11 Feb 2015", visits:140}, {date:"Thu, 12 Feb 2015", visits:152}, {date:"Fri, 13 Feb 2015", visits:145}, {date:"Sat, 14 Feb 2015", visits:109}, {date:"Sun, 15 Feb 2015", visits:101}, {date:"Mon, 16 Feb 2015", visits:83}, {date:"Tue, 17 Feb 2015", visits:51}, {date:"Wed, 18 Feb 2015", visits:55}, {date:"Thu, 19 Feb 2015", visits:67}, {date:"Fri, 20 Feb 2015", visits:35}, {date:"Sat, 21 Feb 2015", visits:30}, {date:"Sun, 22 Feb 2015", visits:31}, {date:"Mon, 23 Feb 2015", visits:102}, {date:"Tue, 24 Feb 2015", visits:123}, {date:"Wed, 25 Feb 2015", visits:47}, {date:"Thu, 26 Feb 2015", visits:22}, {date:"Fri, 27 Feb 2015", visits:41}, {date:"Sat, 28 Feb 2015", visits:38}, {date:"Sun, 01 Mar 2015", visits:28}, {date:"Mon, 02 Mar 2015", visits:92}, {date:"Tue, 03 Mar 2015", visits:66}, {date:"Wed, 04 Mar 2015", visits:19}, {date:"Thu, 05 Mar 2015", visits:42}, {date:"Fri, 06 Mar 2015", visits:17}, {date:"Sat, 07 Mar 2015", visits:50}, {date:"Sun, 08 Mar 2015", visits:13}, {date:"Mon, 09 Mar 2015", visits:10}]

  render = function(data) {
    d3.select("#bad-chart").remove();
    d3.select(".js-bad-chart").append("svg").attr("id", "bad-chart");

    var width = 960,
        height = 500;

    var y = d3.scale.linear()
        .range([height, 0])
        .domain([0, d3.max(data, function(d){ return d.visits;})]);

    var chart = d3.select("#bad-chart")
        .attr("width", width)
        .attr("height", height);

    var barWidth = width / data.length;

    var bar = chart.selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

    bar.append("rect")
        .attr("y", function(d) { return y(d.visits); })
        .attr("height", function(d) { return height - y(d.visits); })
        .attr("width", barWidth - 1)
        .style("fill", function(){ return '#'+Math.floor(Math.random()*16777215).toString(16);});
  }

  document.getElementsByClassName('js-render')[0].onclick = function() {
    console.log('hello');
    render(data1);
  }
}
