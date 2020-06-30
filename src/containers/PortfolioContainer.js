import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
          {
            this.props.portfolio.map((stock, index) => {
              return <Stock 
              key={`${stock.name} - ${index}`} 
              stock={stock}
              handleClick={this.props.sellStock}/>
            })
          }
      </div>
    );
  }

}

export default PortfolioContainer;
