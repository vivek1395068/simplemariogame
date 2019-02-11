import React, { Component } from 'react';

import './App.css';

class App extends Component {

  state={
    template:"",
    gridWidth:"40px",
    noOfRows:0,
    noOfColumns:0

  }

  componentDidMount(){
    var noOfRows=prompt("Please enter the no of rows","");
    var noOfColumns=prompt("Please enter the no of columns","");
    var template=[];
    var positions=[];
    while(positions.length < Number(noOfRows)){//console.log(Math.floor(Math.random()*noOfColumns*noOfRows)+1);
      //console.log(positions.length,noOfRows)
      var r = Math.floor(Math.random()*noOfColumns*noOfRows) + 1;
      if(positions.indexOf(r) === -1){positions.push(r)};
    };
    var mappedPositions=positions.map((a)=>{
      if(a%noOfColumns){
        //console.log(`${(a-a%noOfColumns)/noOfColumns}`+`${a%noOfColumns-1}`)
        return `${(a-a%noOfColumns)/noOfColumns}${a%noOfColumns-1}`
      }else{
        //console.log(`${a/noOfColumns-1}`+`${noOfColumns-1}`)
        return `${a/noOfColumns-1}${noOfColumns-1}`

      }
      
    })
    for(let i=0;i<noOfRows;i++){
      for(let j=0;j<noOfColumns;j++){
        if(i===0 && j===0){
          template.push(<span key={"span"+i+j} id={"span"+i+j} style={{height:"40px",width:"40px"}}>&#xFFEB;</span>)
        }else{console.log(String(i)+String(j))
          var content=mappedPositions.indexOf(String(i)+String(j))!==-1?"1":"";
          template.push(<span key={"span"+i+j} id={"span"+i+j} style={{height:"40px",width:"40px"}}>{content}</span>)
        }
        
      }
    };
    this.setState({
      template:template,
      gridWidth:40*noOfColumns+"px",
      noOfColumns:noOfColumns,
      noOfRows:noOfRows
    });

    document.onkeyup=(event)=>{
      event.preventDefault();
      alert("HK");
      switch(event.keyCode){
        case 37:
        //alert('Left key pressed');
        this.moveType="column";
        this.startPoint="end"
      break;
      case 38:
        this.moveType="row";
        this.startPoint="end"
            //alert('Up key pressed');
          break;
      case 39:
          this.moveType="column";
          this.startPoint="start"
            //alert('Right key pressed');
          break;
      case 40:
          this.moveType="row";
          this.startPoint="start"
            //alert('Down key pressed');
          break;
      default:
        return;
      }
    }
  }
  onStart(){
    var columnPosition=0;
    var rowPostion=0;
    this.startPoint="start";
    this.moveType="column"
    
    setInterval(()=>{
      if(columnPosition===this.state.noOfColumns-1 && this.moveType==="column"){
        this.startPoint="end"
      }else if(columnPosition===0 && this.moveType==="column"){
        this.startPoint="start"
      }

      if(rowPostion===this.state.noOfRows-1 && this.moveType==="row"){
        this.startPoint="end"
      }else if(rowPostion===0 && this.moveType==="row"){
        this.startPoint="start"
      }
      document.getElementById("span"+rowPostion+columnPosition).innerHTML="";
      if(this.startPoint==="start" && this.moveType==="column"){
        columnPosition+=1;
        document.getElementById("span"+rowPostion+columnPosition).innerHTML="&#xFFEB;"
      }else if(this.startPoint==="end" && this.moveType==="column"){
        columnPosition-=1;
        document.getElementById("span"+rowPostion+columnPosition).innerHTML="&#xFFE9;"
      }
      if(this.startPoint==="start" && this.moveType==="row"){
        rowPostion+=1;
        document.getElementById("span"+rowPostion+columnPosition).innerHTML="&#xFFEC;"
      }else if(this.startPoint==="end" && this.moveType==="row"){debugger
        rowPostion-=1;
        document.getElementById("span"+rowPostion+columnPosition).innerHTML="&#xFFEA;"
      }
    },500)
  }
  render() {
    return (
      <div className="App">
        <div id="grid" style={{width:this.state.gridWidth}}>
          {this.state.template}
        </div>
        <button onClick={this.onStart.bind(this)}>start</button>
      </div>
    );
  }
}

export default App;
