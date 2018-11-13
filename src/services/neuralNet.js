import brain from 'brain.js'
import trainingData from '../mockData/sampleTrainingStockData'

export const predictStockPriceMovement = (testData) => {
   /*
      Example Stock data attributes: [x, y, z]
      1. Daily percentage change
      2. P/E difference (percentage) from industry
      3. Market Capitalization (price per share * # of shares outstanding)

      Stock price will increase: 1
      Stock price will decrease: 0
    */
    const config = {
      binaryThresh: 0.5,
      hiddenLayers: [20],  // array of ints for the sizes of the hidden layers in the network
      activation: 'sigmoid' // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh']
    };
    const net = new brain.NeuralNetwork(config);
    let output
    net.train(trainingData)
    output = net.run(testData)
    return output
}