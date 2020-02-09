
class Render_NN{


setup(num_of_hidden_layers){
    var list = []
    var links = []
    for (var i=0; i<num_of_hidden_layers; i++){
      var dic = {id : i.toString()}
  
      if (i < num_of_hidden_layers-1){
      var x = i+1
      }
      else{
      x = i-1
  
      }
      var link  = {target: i.toString(),source: x.toString(),strength: 0.1 }
      list.push(dic)
      links.push(link)
  }
  this.create_simulation(list, links)
  

  }

 drag(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
  
 getNeighbors(node) {
    return links.reduce(function (neighbors, link) {
        if (link.target.id === node.id) {
          neighbors.push(link.source.id)
        } else if (link.source.id === node.id) {
          neighbors.push(link.target.id)
        }
        return neighbors
      },
      [node.id]
    )
  }
  
 isNeighborLink(node, link) {
    return link.target.id === node.id || link.source.id === node.id
  }
  
   getNodeColor(node, neighbors) {
    if (Array.isArray(neighbors) && neighbors.indexOf(node.id) > -1) {
      return node.level === 1 ? 'blue' : 'green'
    }
  
    return node.level === 1 ? 'black' : 'green'
  }
   getLinkColor(node, link) {
    return isNeighborLink(node, link) ? 'green' : '#E5E5E5'
  }
  
   getTextColor(node, neighbors) {
    return Array.isArray(neighbors) && neighbors.indexOf(node.id) > -1 ? 'green' : 'black'
  }
  
   randomNum(){
  
    return Math.floor(Math.random() * Math.floor(700));
  
  }
  
  
  
   create_simulation(list, link){
    var nodes = list
    
    var links = link
    
    var width = window.innerWidth
    var height = window.innerHeight
    
    var svg = d3.select('svg')
    svg.attr('width', width).attr('height', height)
    
    // simulation setup with all forces
    var linkForce = d3
    .forceLink()
    .id(function (link) { return link.id })
    .strength(function (link) { return link.strength })
  
  
    var simulation = d3
    .forceSimulation()
    .force('link', linkForce)
    .force('charge', d3.forceManyBody().strength(-120))
    .force('center', d3.forceCenter(width / 2, height / 2))
    
  
    var dragDrop = d3.drag().on('start', function (node) {
      node.fx = node.x
      node.fy = node.y
    }).on('drag', function (node) {
      simulation.alphaTarget(0.7).restart()
      node.fx = d3.event.x
      node.fy = d3.event.y
    }).on('end', function (node) {
      if (!d3.event.active) {
        simulation.alphaTarget(0)
      }
      node.fx = null
      node.fy = null
    })
    
  
  
function selectNode(selectedNode) {
      var neighbors = getNeighbors(selectedNode)
    
      // we modify the styles to highlight selected nodes
      nodeElements.attr('fill', function (node) { return this.getNodeColor(node, neighbors) })
      linkElements.attr('stroke', function (link) { return this.getLinkColor(selectedNode, link) })
    }
    
    
    
    var nodeElements = svg.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(nodes)
      .enter().append("circle")
        .attr("r", 10)
        .attr("fill", this.getNodeColor)
        .call(dragDrop)
        .on('click', selectNode)
    
    var num = this.randomNum()
    
    simulation.nodes(nodes).on('tick', () => {
      nodeElements
        .attr('cx', function (node) { return node.x = num})
        .attr('cy', function (node) { return node.y })
     
      
    })
    
    simulation.force("link").links(links)
    
       
      }
  
  
    }