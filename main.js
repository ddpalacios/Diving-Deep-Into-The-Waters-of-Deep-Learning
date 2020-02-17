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

  

}
////////////To Be Moved to a seperate class for backend training////////////////
  function display_results(net){
    res = net.run([0,0])
    document.getElementById("output").innerHTML = "Probability result for current weights: " + res
    if (res >=.5){
      document.getElementById("result").innerHTML = "Predicted Result: " + 1
  
    }
    else{
      document.getElementById("result").innerHTML = "Predicted Result: " + 0
    }
  
  
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
    display_results(net)
  
  }
  ////////////////////////////////////////////////////////////////////

function Render(){
  var setting = new Settings()
  var simulation = new create_canvas(900, 500)
  simulation.setup(setting.get_unit_layers(), 
                    setting.iterations, 
                    setting.lr, 
                    setting.activation)

}
