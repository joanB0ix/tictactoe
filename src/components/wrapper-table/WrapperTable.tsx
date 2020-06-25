import * as React from "react";
import Table from "../table/Table";
import "./WrapperTable.scss";
import { AppContext, AppContextConsumer } from "../provider/AppContext";

export default function WrapperTable(props: any) {

    function getText(status:any, current:any){
        switch(status){
            case -1:
                return "IT'S " + ((current === 0) ? "X" : "O") + "'S TURN"
            case 1:
                return "O WINS!"
            case 0:
                return "X WINS!"
            case 2:
                return "TIE!"
        }
    }

  return (
    <AppContext>
      <AppContextConsumer>
        {(context: any) => {
          return (
            <div className="wrappertable-wrapper">
              <div className="wrappertable-top">
                <div className="wrappertable-title">TicTacToe</div>
                <div className="wrappertable-buttons">
                  <button onClick={()=>context.changeType(0)} className={context.gameType === 0 ? "button-active" : ""}>2 PLAYERS</button>
                  <button onClick={()=>context.changeType(1)} className={context.gameType === 1 ? "button-active" : ""}>VS COMPUTER</button>
                </div>
                <div className="wrappertable-reset">
                  <button onClick={()=>context.newGame()}>NEW GAME</button>
                </div>
              </div>
              <div className="wrappertable-bottom">
                <div className="wrappertable-bottom-text">
                    {getText(context.status, context.current)}
                </div>
                <div>
                  <Table findBestMove={context.findBestMove} table={context.table} flag={context.flag} gameType={context.gameType} makeMove={context.makeMove} current={context.current} robot={context.robot}/>
                </div>
              </div>
            </div>
          );
        }}
      </AppContextConsumer>
    </AppContext>
  );
}
