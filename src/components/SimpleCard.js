import React from 'react';
import Typography from '@material-ui/core/Typography';
import "./SimpleCard.css";
import DeleteIcon from '@material-ui/icons/Delete';
import prettyPrintStat from "./util";
import numeral from "numeral";

export default function SimpleCard( props ) {
  const {name, price, percent_change, volume, symbol} = props.data;
  const {currency, amount} = price;

  return (
    <div className="card">
    <Typography color="textSecondary" gutterBottom>
          [{symbol}] {name}
        </Typography>
        <Typography variant="h5" component="h2">
          {currency} {numeral(amount).format()}
        </Typography>
        <div className="card__info">
            <div className="card__infoChange">
                <Typography variant="body2" color="textSecondary">
                %Change:
                </Typography>
                
                <Typography className="info__percentChange" variant="body2" 
                    color={`${percent_change >= 0 ? "textSecondary": "secondary"}`} >
                {percent_change}
                </Typography>
            </div>

            <div className="card__volume">
                <Typography variant="body2" color="textSecondary">
                Volume:
                </Typography>
                
                <Typography className="info__percentChange" variant="body2" color="textSecondary">
                {prettyPrintStat(volume)}
                </Typography>
            </div>
            
            

        </div>
        <Typography variant="caption" color="textSecondary" component="p">
        Data as of {props.time}
        </Typography>
        <DeleteIcon onClick={ () => props.onDelete(symbol)} />
    </div>
  );
}
