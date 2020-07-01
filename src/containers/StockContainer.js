import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {

  render() {

    //console.log(this.props)
    const stocksList = () => {
      let stocksToReturn = this.props.stocks.map(stock => <Stock stock={stock} key={stock.id} action={this.props.action}/>)
      return stocksToReturn
    }



    return (
      <div>
        <h2>Stocks</h2>
        {
          stocksList()
        }
      </div>
    );
  }

}

export default StockContainer;
