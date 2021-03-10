import React from "react";
import DataComp from "./../DataComponent/index.js";
// import ReactDOM from "react-dom";


class DataCompHolder extends React.Component {state = { name : "my name", data: "0.0" }
    constructor(){
        super();
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
      };
      
      forceUpdateHandler(){
        this.forceUpdate();
      };
      
    render() {
      return <div>
        <DataComp dataType = {this.props.name} dataNum={this.props.data}></DataComp></div>
    }
};
export default DataCompHolder;
