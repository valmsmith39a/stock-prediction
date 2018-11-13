import React, { Component } from 'react'
import { predictStockPriceMovement } from '../services/neuralNet'
import mockTrainingData from '../mockData/sampleTrainingStockData'

class AppRoot extends Component {
  constructor (props) {
    super(props)
    this.state = { output: 0 }
  }

  predictStockPriceMovement = (testData) => {
    // const output = net.run([-15, -18, 115]) // Expect 1 (Stock price will increase);
    // const output = net.run([35, 45, 250]) // Expect 0 (Stock price will decrease);
    const prediction = predictStockPriceMovement(testData)
    this.setState({output: prediction})
  }

  render () {
    return (
      <div>
        Predict Stock Prices
        <div>Sample Training Stock Input Data:</div>
        <div>{JSON.stringify(mockTrainingData)}</div>
        <div>Sample Training Stock Output Data</div>
        <button onClick={this.predictStockPriceMovement.bind(this, [-15, -18, 115])}>Predict Stock 1 (expect 1 - up)</button>
        <button onClick={this.predictStockPriceMovement.bind(this, [5, 13, 250])}>Predict Stock 2 (expect 0 - down)</button>
        <div>Test stock result: {this.state.output}</div>
      </div>
    )
  }
}

export default AppRoot
