class Settings{
  constructor(){
    this.units = document.getElementById("units").value
    this.iterations = document.getElementById("iterations").value
    this.lr = document.getElementById("lr").value
    this.activation = document.getElementById("activation").value
  }


  get_unit_layers(){
    var units = this.units.split(",").map(Number)
    return units
  }

  initialize(simulation){
    var unit_layers = this.get_unit_layers()
    for (var unit_quantity=0;  unit_quantity<unit_layers.length; unit_quantity++){
        var unit = unit_layers[unit_quantity]
        simulation.setup(unit)
    }
  }

}

function Render(){
  var setting = new Settings()
  var simulation = new Render_NN()
  setting.initialize(simulation)

}
function Reset(){
location.reload()
}
function Train(){
  var setting = new Settings()
  var units_per_layers = setting.get_unit_layers()
 
  // Testing dataset
  const trainingData = [
    { input: [0, 0], output: [0] },
    { input: [0, 1], output: [1] },
    { input: [1, 0], output: [1] },
    { input: [1, 1], output: [0] }
  ];
  
    const net = new brain.NeuralNetwork({hiddenLayers:units_per_layers,
                                         activation: setting.activation, 
                                         iterations: parseInt(setting.iterations),
                                         learningRate: parseFloat(setting.lr),
                                         log: true
                                        
                                        });
  
  
  document.getElementById("demo").innerHTML = 'Calculating...'
  net.train(trainingData)
  document.getElementById("output").innerHTML = "Probability result for current weights: " + net.run([0,1])

    

}
