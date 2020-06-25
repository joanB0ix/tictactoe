import * as React from "react";
import "./Table.scss";
import CloseIcon from "@material-ui/icons/Close";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { AppContextConsumer } from "../provider/AppContext";

export default function Table(props: any) {
  const cols = [0, 1, 2];
  const rows = [0, 1, 2];

  const[canMove, setCanMove] = React.useState(true)

  React.useEffect(()=>{
    console.log(props.flag)
    if(props.current === props.robot && props.gameType === 1){
      setCanMove(false)
      setTimeout(()=>{
        props.findBestMove().then((result:any)=>{
          props.makeMove(result);
        });
      },500)
      setCanMove(true);
    }
  },[props.flag])

  return (
      <AppContextConsumer>
        {(context: any) => {
          return (
            <div className="table-wrapper">
              {
                rows.map((row)=>{
                  // eslint-disable-next-line no-lone-blocks
                  {
                    return cols.map((col) => {
                      return (
                        <div
                        key={Math.random()}
                        className="table-element"
                        onClick={
                          async() => {
                          if(context.table[row][col] === -1 && context.status === -1 && await canMove){
                              await context.makeMove([row,col])
                              if(context.status === -1 && context.gameType === 1){
                                setCanMove(false)
                                setTimeout(()=>{
                                  setCanMove(true);
                                },1100)
                              }
                          }
                        }}
                      >
                        {context.table[row][col] === 0 ? (
                          <CloseIcon />
                        ) : context.table[row][col] === 1 ? (
                          <RadioButtonUncheckedIcon />
                        ) : null}
                      </div>
                      )
                    })  
                  }
                  
                })
              }
            </div>
          );
        }}
      </AppContextConsumer>
  );
}