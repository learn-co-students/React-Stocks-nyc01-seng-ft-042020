import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  state = {
    stocks: [],
    portfolio: [],
    filterTerm: 'All',
    sortTerm: ''
  }

  componentDidMount() {
    fetch('http://localhost:3000/stocks')
    .then(res => res.json())
    .then(data => {
      this.setState({
        stocks: data
      })
    })
  }

  // ADD ELEMENT
  buyStock = (stockObj) => {
    // console.log('working', stockObj)
    this.setState(prevState => {
      return {
        portfolio: [stockObj, ...prevState.portfolio]
      }
    })
  }
  
  //MORE COMMON WAY TO DELETE AN ITEM  
  // sellStock = (stockObj) => {
  //   let index = this.state.portfolio.filter(stock => {
    //     return stock.id !== stockObj.id
    //   })
  //   this.setState({
    //     portfolio: index
    //   })
    //   console.log(index)
    // }
        

  //DELETE / REMOVE SPECIFIC ITEM FROM ARRAY
  sellStock = (stockObj) => {
    let index = this.state.portfolio.indexOf(stockObj)
    let copyPortfolio = [...this.state.portfolio]
    copyPortfolio.splice(index, 1)
    this.setState({
      portfolio: copyPortfolio
    })
  }    

  setFilterTerm = (term) => {
    this.setState({
      filterTerm: term
    })
  }

  setSortTerm = (term) => {
    this.setState({
      sortTerm: term
    })
  }
  
  //DECIDING WHICH STOCK TO SEND DOWN TO STOCKCONTAINER
  //BOTH SORTING AND FILTERING  
  arrayOfStocks = () => {
    let copyOfStocks = [...this.state.stocks] ///[...this.state.stocks is making a copy of the original list of stocks]
    //FILTER 
    if (this.state.filterTerm === 'All') {
      copyOfStocks = [...this.state.stocks]
    } else {
      copyOfStocks = this.state.stocks.filter(stock => stock.type === this.state.filterTerm)
    }
    //SORT 
    if (this.state.sortTerm === 'Price') {
      copyOfStocks.sort((a,b) => {
        return a.price - b.price 
      })
    } else if (this.state.sortTerm === 'Alphabetically') {
      copyOfStocks.sort((a,b) => {
        return a.name.localeCompare(b.name) 
      })
    }
    return copyOfStocks
  }

  render() {
    return (
      <div>
        <SearchBar 
        setFilterTerm={this.setFilterTerm}
        filterTerm={this.state.filterTerm}
        setSortTerm={this.setSortTerm}
        sortTerm={this.state.sortTerm}
        />

          <div className="row">
            <div className="col-8">

              <StockContainer 
                stocks={this.arrayOfStocks()} 
                buyStock={this.buyStock}
                />

            </div>
            <div className="col-4">

              <PortfolioContainer
                portfolio={this.state.portfolio}
                sellStock={this.sellStock}
              />
                
            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
