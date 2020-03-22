
class create_canvas{

  constructor(width, height){
    this.width = width
    this.height = height


    this.json = [{

      "nodes":[], 
  
  
    
    }]



  }


append_nodes(units, total_units){



var name = " "
var group_num = 1
var NODE_LIST = this.json[0].nodes
var LINKS_LIST = this.json[0].links

for(var i =0; i < units.length; i ++){
  console.log(units[i])
  var unit_layer_amount = units[i]
  for (var j=0; j<unit_layer_amount;j++){
    console.log(j)
    NODE_LIST.push({"name": name, "group": group_num})
    LINKS_LIST.push({"source": j, "target": i, "weights": 5})

  }

}


}

read_and_display_json_connections(units, total_units, force, svg){
    
  
  this.append_nodes(units, total_units)
    force.nodes(this.json[0].nodes)
        .links(this.json[0].links)
        .start();
  
    var link = svg.selectAll(".link")
        .data(this.json[0].links)
      .enter().append("line")
        .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(d.weight); });
  
    var node = svg.selectAll(".node")
        .data(this.json[0].nodes)
      .enter().append("g")
        .attr("class", "node")
        .call(force.drag);
  
    node.append("circle")
        .attr("r","5");
  
    node.append("text")
        .attr("dx", 12)
        .attr("dy", ".35em")
        .text(function(d) { return d.name });
  
    force.on("tick", function() {

      link.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });
  
      node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    });
  

}

get_total_units(units){
  var total_units = units.reduce(function(a,b){
    return a+b
  }, 0)

  return total_units


}

setup(units, iterations, lr, activation){

var total_units = this.get_total_units(units)


var svg = d3.select("body").append("svg")
    .attr("width", this.width)
    .attr("height", this.height);

var force = d3.layout.force().gravity(.05)
    .distance(100)
    .charge(-10)
    .size([this.width, this.height]);

    this.read_and_display_json_connections(units, total_units ,force, svg)


}

}