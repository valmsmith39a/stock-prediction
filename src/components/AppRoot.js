import React, { Component } from 'react'
import brain from 'brain.js'

class AppRoot extends Component {
  constructor (props) {
    super(props)
    this.state = { output: 0 }
  }

  predictStockPriceMovement = (testData) => {
    /*
      Example of Stock data
      1. Daily percentage change
      2. P/E difference (percentage) from industry
      3. Market Capitalization (price per share * # of shares outstanding)
    */
    
    // Stock price will increase: 1
    // Stock price will decrease: 0
    const config = {
      binaryThresh: 0.5,
      hiddenLayers: [20],  // array of ints for the sizes of the hidden layers in the network
      activation: 'sigmoid' // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh']
    };
    const net = new brain.NeuralNetwork(config);

    net.train([
      {input: [-17, -25, 130], output: [1]},
      {input: [-20, -35, 150], output: [1]},
      {input: [-45, -65, 180], output: [1]},
      {input: [-34, -54, 190], output: [1]},
      {input: [-25, -36, 310], output: [1]},
      {input: [19, 78, 300], output: [1]},
      {input: [15, 23, 135], output: [0]},
      {input: [13, 37, 156], output: [0]},
      {input: [34, 64, 186], output: [0]},
      {input: [32, 53, 165], output: [0]},
      {input: [25, 36, 310], output: [0]},
      {input: [21, 23, 380], output: [0]},
      {input: [-17, 25, 6], output: [1]},
      {input: [-20, 35, 5], output: [1]},
      {input: [-45, 65, 3], output: [1]},
      {input: [-34, 54, 6], output: [1]},
      {input: [-25, 36, 7], output: [1]},
      {input: [19, 78, 7], output: [1]},
      {input: [15, 23, 8], output: [0]},
      {input: [13, 37, 9], output: [0]},
      {input: [34, 64, 2], output: [0]},
      {input: [32, 53, 4], output: [0]},
      {input: [25, 36, 3], output: [0]},
      {input: [21, 23, 2], output: [0]},
    ]);

    // const output = net.run([-15, -18, 115]) // Expect 1 (Stock price will increase);
    // const output = net.run([35, 45, 250]) // Expect 0 (Stock price will decrease);
    const output = net.run(testData) // Expect 0 (Stock price will decrease);
    this.setState({output})
  }

  render () {
    return (
      <div>
        Stock Attributes
        <div>Sample Training Stock Input Data{JSON.stringify(sampleTrainingStockData)}</div>
        <div>Sample Training Stock Output Data {JSON.stringify(sampleTrainingStockDataOutput)}</div>
        <button onClick={this.predictStockPriceMovement.bind(this, [-15, -18, 115])}>Predict Stock 1 (expect 1 - up)</button>
        <button onClick={this.predictStockPriceMovement.bind(this, [5, 13, 7])}>Predict Stock 2 (expect 0 - down)</button>
        <div>Test stock result: {this.state.output}</div>
      </div>
    )
  }
}

const sampleTrainingStockData = 
  [[1.2, -5, 80], 
   [-8, -15, 65], 
   [20, 30, 8], 
   [3, 15, 6], 
   [8, 20, 7], 
   [4, 8, 110], 
   [-17, -3, 130]]

const sampleTrainingStockDataOutput = [1, 1, 0, 1, 0, 0, 1]

const testStockData = [-15, -18, 115]

const testStockExpectedOutput = [1]

const outputMessage = {
  0: 'Stock price will increase',
  1: 'Stock price will decrease',
  2: 'Click to predict!'
}

export default AppRoot
