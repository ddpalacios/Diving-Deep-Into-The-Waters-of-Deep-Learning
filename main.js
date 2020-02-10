//Make the DIV element draggagle:
class Settings{
  constructor(){
    this.units = document.getElementById("units").value
    this.iterations = document.getElementById("iterations").value
    this.lr = document.getElementById("lr").value
    this.activation = document.getElementById("activation").value
  }

}


function Train(){
  
  var setting = new Settings()
  var simulation = new Render_NN()
  // Testing dataset
  const trainingData = [
    { input: [0, 0], output: [0] },
    { input: [0, 1], output: [1] },
    { input: [1, 0], output: [1] },
    { input: [1, 1], output: [0] }
  ];
  


  var div = document.getElementById("output")
    const net = new brain.NeuralNetwork({hiddenLayers: [parseInt(setting.units, 10)],
                                         activation: setting.activation, 
                                         iterations: parseInt(setting.iterations),
                                         learningRate: parseFloat(setting.lr),
                                         log: false
                                        
                                        });
  simulation.setup(setting.units)
  document.getElementById("demo").innerHTML = 'Calculating...'
  net.train(trainingData).learningRatelatin
  div.innerHTML = net.run([0,1])

    

}
