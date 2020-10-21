import React, { Component } from 'react';
import './App.css';
import ItemCard from './ItemCard';

class App extends Component {

  state = {
    items: []
  }

  componentDidMount() {
    fetch('http://localhost:3001/items')
    .then(r => r.json())
    .then(data => {
      this.setState({
        items: data
      })
    });
  };
  
  render(){
    return(
      <div>
        <header>Stripe Shop</header>
        <div className="home_page_container">
          { this.state.items.map(item => <ItemCard key={item.id} item={item} />) }
        </div>
      </div>
    );
  };
}

export default App;
