import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {


  render() {
    const portfolioList = () => {
      let stocksToReturn = this.props.portfolio.map(stock => <Stock stock={stock} key={stock.id} action={this.props.action}/>)
      return stocksToReturn
    }

    return (
      <div>
        <h2>My Portfolio</h2>
          {
           portfolioList()
          }
      </div>
    );
  }

}

export default PortfolioContainer;
