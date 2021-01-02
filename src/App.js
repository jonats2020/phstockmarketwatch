import { AppBar, Avatar, Button, FormControl, IconButton, Link, MenuItem, Select, Toolbar, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import './App.css';
import axios from "./components/axios";
import MenuIcon from "@material-ui/icons/Menu";
import SimpleCard from "./components/SimpleCard";
import FacebookIcon from '@material-ui/icons/Facebook';


function App() {

  const [allStocks, setAllStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState();
  const [stocksDisplay, setStocksDisplay] = useState([]);
  const [asOf, setAsOf] = useState("");

  useEffect(() => {
    axios.get("/stocks.json")
    .then((response) => {
      setAllStocks(response.data.stock);
      setAsOf(response.data.as_of);
    });
  }, []);

  const AddStocksToDisplay = () => {
    const stockToBeAdded = allStocks.find((stock) => stock.symbol === selectedStock);
    if (stockToBeAdded)
    {
      setStocksDisplay([...stocksDisplay, stockToBeAdded]);
      setSelectedStock("");setStocksDisplay([...stocksDisplay, stockToBeAdded]);
      setSelectedStock("");
    }
  }

  const deleteStockDisplay = (symbol) => {
    
    setStocksDisplay(previousVal => {
      return previousVal.filter((val) => {
        
        console.log(symbol);
        return val.symbol !== symbol;
      })
    })
  }

  return (
    <div className="App">
    {/* {Header} */}
    <div className="app__header">
        
          

          <div className="app__headerTitle">
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">
              Philippines Stock Market Watch
            </Typography>
          </div>
          
          <div className="app__headerLogin">
            <Button>Login</Button>
          </div>
    </div>

    {/* {Body} */}
    <div className="app__body">
      <div className="app__sidebar">
        <div className="app__seach">
                <FormControl className="app__dropdown">
                  <Select
                    variant="outlined"
                    value={selectedStock}
                    onChange={e => setSelectedStock(e.target.value)}
                    >
                    {
                      allStocks.map((stocks) => (
                        <MenuItem value={stocks.symbol}>[{stocks.symbol}] {stocks.name}</MenuItem>))
                    }
                  </Select>
                </FormControl>
                
                <div className="app__searchButton">
                <Button onClick={AddStocksToDisplay}>Add</Button>
                </div>
                
        </div>
      </div>

      <div className="app__stocksContainer">
        {stocksDisplay.map((display, index) => (
          //console.log(display)
          display && <SimpleCard time={asOf} key={index} id={index} data={display} onDelete={deleteStockDisplay} />
        ))}
      </div>

    </div>

     {/* {Footer} */}
     <div className="footer"><Link className="footer__socialLinks" href="http://bit.ly/2X5YAYR" target="_blank"><FacebookIcon /></Link>
    </div>


    <div className="footer">
      <Typography variant="caption">Copyright 2021 by Nats. All Rights Reserved.</Typography>
    </div>

    </div>

    
  );
}

export default App;
