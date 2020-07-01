import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {


  state = {
    stocks: [],
    portfolio: [],
    sort: "None",
    filter: "All"
  }


  componentDidMount(){
    fetch(`http://localhost:4000/stocks`).then(r => r.json()).then(stocks => this.setState({stocks: stocks}))
  }

  addToPortfolio = (props) => {
    let newPortfolio = [...this.state.portfolio, props]
    this.setState({portfolio: newPortfolio})
    console.log("clicked add")
  }


  removeFromPortfolio = (props) => {
    let newPortfolio = this.state.portfolio.filter(prop => prop !== props)
    this.setState({portfolio: newPortfolio})
  }


  updateFilter = (filter) => {
    this.setState({filter: filter})
  }

  updateSort = (sort) => {
    this.setState({sort: sort})
  }


  displayStocks = () => {
    let stocks = this.state.stocks
    if(this.state.filter !== "All") {
      stocks = stocks.filter(stock => stock.type === this.state.filter)
    }

    if (this.state.sort === "Alphabetically") {
      return stocks.sort((a,b) =>  a.name.localeCompare(b.name))
    }
    if (this.state.sort === "Price") {
      return stocks.sort((a,b) => a.price - b.price)
    }
    return stocks

  }






  render() {

    //let portfolio = this.state.portfolio.map((id) => this.state.stocks.find(stock => stock.id === id))
   // console.log(this.state.stocks)
    return (
      <div>
        <SearchBar sort={this.state.sort} filter={this.state.filter} updateSort={this.updateSort} updateFilter={this.updateFilter}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.displayStocks()} action={this.addToPortfolio}/>

            </div>
            <div className="col-4">

              <PortfolioContainer portfolio={this.state.portfolio} action={this.removeFromPortfolio}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
