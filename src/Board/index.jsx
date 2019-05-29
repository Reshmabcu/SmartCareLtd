import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import ReactDom from 'react-dom';
import HTML5Backend from 'react-dnd-html5-backend';
import LineTo from 'react-lineto';
import Popup from "reactjs-popup";
import Draggable,{DraggableCore} from 'react-draggable'; // <DraggableCore>
import Drop from './Drop';
import Source from './Source';
import Target from './Target';
import './Board.css';
import * as Template from '../Template.json'


import Logo1 from './Logo1.png';
import cancel from './cancel.png';
import undo from './undo.jpg';
import bigdatacorridor from './bigdatacorridor.png';



class index extends React.Component {
  constructor(props) {
    super(props)
    this.openoutPopup = this.openoutPopup.bind(this)
    this.openinPopup = this.openinPopup.bind(this)
    this.delete = this.delete.bind(this)
    this.undof = this.undof.bind(this)
    this.onStop = this.onStop.bind(this)
    this.onStart = this.onStart.bind(this)
  }
  
  state = {
    profileb: [
      { no : "Personal-Info", text : "Personal Info", info : "Information about that element" }],
medical_infob: [
      { no : "Medical-Info", text : "Medical Info" ,info : "Information about that element"  }],
      houseb: [
        { no : "House-Info", text : "House Info" ,info : "Information about that element"  }],
    roomb: [
      { no : "Bedroom", text : "Bedroom" , info : "Information about that element" },
      { no : "Living Room", text : "Columns", info : "Information about that element"  },
      { no : "Kitchen", text : "Kitchen", info : "Information about that element"  }],
      sensorb:[
        { no : "Temparature", text : "Temparature" , info : "Information about that element" },
        { no : "Movement", text : "Movement", info : "Information about that element"  },
        { no : "Light", text : "Light" , info : "Information about that element" },
        { no : "Touch", text : "Touch", info : "Information about that element"  }],
        databaseb: [
          { no : "Mongo-DB", text : "Mongo-DB", info : "Information about that element"  },
          { no : "Relational", text : "Relational", info : "Information about that element"  }],
        zoneb: [
          { no : "Sink-zone", text : "Sink-zone", info : "Information about that element"  },
        { no : "Cooking-zone", text : "Cooking-zone" , info : "Information about that element" },
        { no : "Prep-zone", text : "Prep-zone", info : "Information about that element"  },
        { no : "Wasing-zone", text : "Wasing-zone" , info : "Information about that element" }],

      rightContainer: [],
      leftContainer: [],
      itemList: [],
      houses:[],
      rooms:[],
      zones:[],
      sensors:[],
      profiles : [],
      databases:[],
      profile:{
        pid:"",
        surname:"put your fisrt name here",
        name:"put your last name here",
        dob:"your date of birth here",
        email:"put your email here",
        mobile:"put your mobile number here",
        identification_number:"put your identification number here",
        driving_license:"put your driving license number here",
        home_address:"put your home address here",
        office_address:"put your office address here",
        city:"put your city here",
        country:"put your country here",
      },
      house:{
        house_number:"put your house_number here",
        house_name:"put your house_name here",
        house_address:"put your house_address here",
        location:"put your location here",
        postcode:"put your postcode here",
        city:"put your city here",
        country:"put your country here",
        house_details:"put your house_details here"
      },
      room:{
        room_type:"put your room_type here",
        room_details:"put your room_details here"
      },
      zone:{
        zone_type:"put your zone_type here",
        zone_details:"put your zone_details here"
      },
      sensor:{
        sensor_name:"put your sensor_name here",
        sensor_type:"put your sensor_type here",
        sensor_version:"put your sensor_version here",
        sensor_details:"put your sensor_details here"
      },
      firstbuttonclicked: false,
      isOpen: false,
      shown: false,
      fclick: null,
      linetos: []
  }
  componentDidMount() {
    this.getProfiles();
  }
  getProfiles = _ =>{
    fetch(`https://github.com/lameea29/SmrtCareLTD/blob/master/controllers/profileController`)
    .then(response => response.json())
    .then(response => this.setState[{ Profiles: response.data}])
    .catch(err => console.error(err))
  }
  renderProfile = ({first_name}) => <div>{first_name}</div>

  delete  = (index) =>{
    const leftContainer = Object.assign([], this.state.leftContainer);
    leftContainer.splice(index,1)
    this.setState({leftContainer:leftContainer})
  }
  undof  = (index) =>{
    const linetos = Object.assign([], this.state.linetos);
    linetos.splice(index,1)
    this.setState({linetos:linetos})
  }

  openPopup = () => {
    this.setState({
      isOpen: true
    });
  }
  openinPopup = (input) => {
    var { linetos, fclick } = this.state;
    if (!fclick) {
      //this.B = output;
      this.setState({
        firstbuttonclicked: false,
        fclick: input
      });
      //alert(oupu)
    }
    else {
      //  this.A = output;
      linetos.push([fclick, input])
      this.setState({
        firstbuttonclicked: true,
        linetos,
        fclick: null
      });

      // alert(this.A)
    }

    //alert(input)
  }
  openoutPopup = (output) => {
    var { linetos, fclick } = this.state;
    if (!fclick) {
      //this.B = output;
      this.setState({
        firstbuttonclicked: false,
        fclick: output
      });
      //alert(oupu)
    }
    else {
      //  this.A = output;
      linetos.push([fclick, output])
      this.setState({
        firstbuttonclicked: true,
        linetos,
        fclick: null
      });

      // alert(this.A)
    }

    //alert(output)
  }

  getInitialState() {
    return {
      activeDrags: 0,
      deltaPosition: {
        x: 0, y: 0
      },
      controlledPosition: {
        x: -400, y: 200
      }
    };
  }

  handleDrag(e, ui) {
    const {x, y} = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      }
    });
  }

  onStart() {
    this.setState({activeDrags: ++this.state.activeDrags});
  }

  onStop() {
    this.setState({activeDrags: --this.state.activeDrags});
  }

  // For controlled component
  adjustXPos(e) {
    e.preventDefault();
    e.stopPropagation();
    const {x, y} = this.state.controlledPosition;
    this.setState({controlledPosition: {x: x - 10, y}});
  }

  adjustYPos(e) {
    e.preventDefault();
    e.stopPropagation();
    const {controlledPosition} = this.state;
    const {x, y} = controlledPosition;
    this.setState({controlledPosition: {x, y: y - 10}});
  }

  onControlledDrag(e, position) {
    const {x, y} = position;
    this.setState({controlledPosition: {x, y}});
  }

  onControlledDragStop(e, position) {
    this.onControlledDrag(e, position);
    this.onStop();
  }
  closePopup = () => {
    this.setState({
      isOpen: false
    });
  }

  onDragStart = (e, v) => {
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.setData("text/plain", v)
  }

  allowDrop = ev => {
    ev.preventDefault();
  }

  onDropLeft = e => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    let { leftContainer } = this.state;
    leftContainer.push(data);
    this.setState({ leftContainer });
  }

  onDropRight = e => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    let { rightContainer } = this.state;
    rightContainer.push(data);
    this.setState({ rightContainer });
  }

  render() {
    const {profileb,medical_infob,houseb,roomb,zoneb,databaseb,sensorb,profile,house,room,zone,sensor, leftContainer, rightContainer,DropRoom,DropZone,itemList,profiles,houses,rooms,zones,sensors} = this.state;
    const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
    const {deltaPosition, controlledPosition} = this.state;
    var inClass = 'input';
    var outClass = 'output';
    return (
      <div class="main">
        <div class="header">
          <img id="logo" src={Logo1} alt="Logo" />
          <div id="name"><p>Smart Care Solutions</p></div>

        </div>

        <div id="middle" class="row"></div>

        <div id="input" class="column">
                     Personal Details : <br />
                    
                    <div id="profile">
                      {
                        profileb.map((item) =>{
                          return <button class="s1"draggable="true" onDragStart={ (e) => this.onDragStart(e, item.text) } >{item.no}</button>
                        })
                      }
                    </div>
		                <div id="medical_info">
                      {
                        medical_infob.map((item) =>{
                          return <button class="s1"draggable="true" onDragStart={ (e) => this.onDragStart(e, item.text) } >{item.no}</button>
                        })
                      }
                    </div>
                    Houses : <br/>
                    <div id="medical_info">
                      {
                        houseb.map((item) =>{
                          return <button class="s1"draggable="true" onDragStart={ (e) => this.onDragStart(e, item.text) } >{item.no}</button>
                        })
                      }
                    </div>
                    Room : <br />
                    <div id="room">
                      {
                        roomb.map((item) =>{
                          return <button class="s1"draggable="true" onDragStart={ (e) => this.onDragStart(e, item.text) } >{item.no}</button>
                        })
                      }
                    </div>
                    
                    Sensor : <br />
                    <div id="sensor">
                      {
                        sensorb.map((item) =>{
                          return <button class="s1"draggable="true" onDragStart={ (e) => this.onDragStart(e, item.text) } >{item.no}</button>
                        })
                      }
                    </div>
                    Zone : <br />
                    <div id="zone">
                      {
                        zoneb.map((item) =>{
                          return <button class="s1"draggable="true" onDragStart={ (e) => this.onDragStart(e, item.text) } >{item.no}</button>
                        })
                      }
                    </div>
                    Database : <br />
                    <div id="database">
                      {
                        databaseb.map((item) =>{
                          return <button class="s1"draggable="true" onDragStart={ (e) => this.onDragStart(e, item.text) } >{item.no}</button>
                        })
                      }
                    </div>
        </div>

        <div id="workspace" class="column" onDragOver={this.allowDrop} onDrop={this.onDropLeft} style={{height: '850px', width: '710px', position: 'relative', overflow: 'auto', padding: '0'}}>
        Workspace <br />
        {
        <div style={{height: '1000px', width: '1000px', padding: '10px'}}>
        <button id="undobtn" onClick={() => this.undof(index)}><img id="undo"src={undo} alt="undo" /></button>
        
          {
            
            leftContainer.map((itm, index) => {
              switch (itm){
                case 'Personal Info':
              return (
                
                
                // itemList.map((ilist, index) => {
                  <Draggable bounds="parent" axis='both' cancel=".non_draggable_input" {...dragHandlers}>
                  
                  <div id="button" class="row" >
                    <div id="in" class={`btn-in-${index}`} onClick={() => this.openinPopup(`btn-in-${index}`)}></div>
                    <Popup
                      trigger={<div id="center" class="C">{itm}</div>}
                      modal
                    // contentStyle={contentStyle}
                    >
                      {close => (
                        <div className="modal">
                          <a className="close" onClick={close}>
                            &times;
                                </a>
                          <div className="header"> Place your personal details here </div>

                          <div className="actions">

                          <label>
                                    Surname:
                                    <input value={profile.surname} className="non_draggable_input"onChange={ e => this.setState({profile: {...profile,surname:e.target.value}})}/>
                                  </label><br /><br />
                                  <label>
                                    Name  :
                                    <input value={profile.name} className="non_draggable_input"onChange={ e => this.setState({profile: {...profile,name:e.target.value}})}/>
                                  </label><br /><br />
                                  <label>
                                    DOB:
                                    <input value={profile.dob} className="non_draggable_input"onChange={ e => this.setState({profile: {...profile,dob:e.target.value}})}/>
                                  </label><br /><br /> 
                                  <label>
                                    Email :
                                    <input value={profile.email} className="non_draggable_input"onChange={ e => this.setState({profile: {...profile,email:e.target.value}})}/>
                                  </label><br /><br />
                                  <label>
                                    Mobile:
                                    <input value={profile.mobile} className="non_draggable_input"onChange={ e => this.setState({profile: {...profile,mobile:e.target.value}})}/>
                                  </label><br /><br />
                                  <label>
                                    Identification Number:
                                    <input value={profile.identification_number} className="non_draggable_input"onChange={ e => this.setState({profile: {...profile,identification_number:e.target.value}})}/>
                                  </label><br /><br />
                                  <label>
                                    Driving License:
                                    <input value={profile.driving_license} className="non_draggable_input"onChange={ e => this.setState({profile: {...profile,driving_license:e.target.value}})}/>
                                  </label><br /><br />
                                  <label>
                                    Home Address:
                                    <input value={profile.home_address} className="non_draggable_input"onChange={ e => this.setState({profile: {...profile,home_address:e.target.value}})}/>
                                  </label><br /><br />
                                  <label>
                                    Office Address:
                                    <input value={profile.office_address} className="non_draggable_input"onChange={ e => this.setState({profile: {...profile,office_address:e.target.value}})}/>
                                  </label><br /><br />
                                  <label>
                                    City:
                                    <input value={profile.city} className="non_draggable_input"onChange={ e => this.setState({profile: {...profile,city:e.target.value}})}/>
                                  </label><br /><br />
                                  <label>
                                    Country:
                                    <input value={profile.country} className="non_draggable_input"onChange={ e => this.setState({profile: {...profile,country:e.target.value}})}/>
                                  </label><br /><br />
                                  
                                  <button
                                    className="button"
                                    onClick={() => {
                                      const {profile} = this.state;
                                      fetch(`https://github.com/lameea29/SmrtCareLTD/blob/master/controllers/profileController?surname=$(profile.surname)&name=$(profile.name)&dob=$(profile.dob)&email=$(profile.email)&mobile=$(profile.mobile)&identification_number=$(profile.identification_number)&driving_license=$(profile.driving_license)&home_address=$(profile.home_address)&office_address=$(profile.office_address)&city=$(profile.city)&country=$(profile.country)`)
                                      .catch(err => console.error(err))
                                      console.log("modal closed ");
                                      console.log(profile);
                                      close();
                                    }}
                                  >
                                    Save
                                  </button>


                          </div>
                        </div>
                      )}
                    </Popup>

                    <div id="out" class={`btn-out-${index}`} onClick={() => this.openoutPopup(`btn-out-${index}`)}></div>
                    <button id="del" onClick={() => this.delete(index)}><img id="cancel"src={cancel} alt="cancel" /></button>
                  </div>
                  </Draggable>
                  
              ); 
              case 'Medical Info':
              return (
                
                
                // itemList.map((ilist, index) => {
                  <Draggable bounds="parent" axis='both' {...dragHandlers}>
                  
                  <div id="button" class="row" >
                    <div id="in" class={`btn-in-${index}`} onClick={() => this.openinPopup(`btn-in-${index}`)}></div>
                    <Popup
                      trigger={<div id="center" class="C">{itm}</div>}
                      modal
                    // contentStyle={contentStyle}
                    >
                      {close => (
                        <div className="modal">
                          <a className="close" onClick={close}>
                            &times;
                                </a>
                          <div className="header"> Place your personal details here </div>

                          <div className="actions">

                          <label>
                                    Surname:
                                    <input value={profile.surname} className="non_draggable_input"onChange={ e => this.setState({profile: {...profile,surname:e.target.value}})}/>
                                  </label><br /><br />
                                  <label>
                                    Name  :
                                    <input value={profile.name} className="non_draggable_input"onChange={ e => this.setState({profile: {...profile,name:e.target.value}})}/>
                                  </label><br /><br />
                                  <label>
                                    DOB:
                                    <input value={profile.dob} className="non_draggable_input"onChange={ e => this.setState({profile: {...profile,dob:e.target.value}})}/>
                                  </label><br /><br /> 
                                  <label>
                                    Email :
                                    <input value={profile.email} className="non_draggable_input"onChange={ e => this.setState({profile: {...profile,email:e.target.value}})}/>
                                  </label><br /><br />
                                  <label>
                                    Mobile:
                                    <input value={profile.mobile} className="non_draggable_input"onChange={ e => this.setState({profile: {...profile,mobile:e.target.value}})}/>
                                  </label><br /><br />
                                  <label>
                                    Identification Number:
                                    <input value={profile.identification_number} className="non_draggable_input"onChange={ e => this.setState({profile: {...profile,identification_number:e.target.value}})}/>
                                  </label><br /><br />
                                  <label>
                                    Driving License:
                                    <input value={profile.driving_license} className="non_draggable_input"onChange={ e => this.setState({profile: {...profile,driving_license:e.target.value}})}/>
                                  </label><br /><br />
                                  <label>
                                    Home Address:
                                    <input value={profile.home_address} className="non_draggable_input"onChange={ e => this.setState({profile: {...profile,home_address:e.target.value}})}/>
                                  </label><br /><br />
                                  <label>
                                    Office Address:
                                    <input value={profile.office_address} className="non_draggable_input"onChange={ e => this.setState({profile: {...profile,office_address:e.target.value}})}/>
                                  </label><br /><br />
                                  <label>
                                    City:
                                    <input value={profile.city} className="non_draggable_input"onChange={ e => this.setState({profile: {...profile,city:e.target.value}})}/>
                                  </label><br /><br />
                                  <label>
                                    Country:
                                    <input value={profile.country} className="non_draggable_input"onChange={ e => this.setState({profile: {...profile,country:e.target.value}})}/>
                                  </label><br /><br />
                                  
                                  <button
                                    className="button"
                                    onClick={() => {
                                      const {profile} = this.state;
                                      fetch(`https://github.com/lameea29/SmrtCareLTD/blob/master/controllers/profileController?surname=$(profile.surname)&name=$(profile.name)&dob=$(profile.dob)&email=$(profile.email)&mobile=$(profile.mobile)&identification_number=$(profile.identification_number)&driving_license=$(profile.driving_license)&home_address=$(profile.home_address)&office_address=$(profile.office_address)&city=$(profile.city)&country=$(profile.country)`)
                                      .catch(err => console.error(err))
                                      console.log("modal closed ");
                                      close();
                                    }}
                                  >
                                    Save
                                  </button>


                          </div>
                        </div>
                      )}
                    </Popup>

                    <div id="out" class={`btn-out-${index}`} onClick={() => this.openoutPopup(`btn-out-${index}`)}></div>
                    <button id="del" onClick={() => this.delete(index)}><img id="cancel"src={cancel} alt="cancel" /></button>
                  </div>
                  </Draggable>
                  
              ); 
              case 'House Info':
              return (
                
                
                // itemList.map((ilist, index) => {
                  <Draggable bounds="parent" axis='both' {...dragHandlers}>
                  
                  <div id="button" class="row" >
                    <div id="in" class={`btn-in-${index}`} onClick={() => this.openinPopup(`btn-in-${index}`)}></div>
                    <Popup
                      trigger={<div id="center" class="C">{itm}</div>}
                      modal
                    // contentStyle={contentStyle}
                    >
                      {close => (
                        <div className="modal">
                          <a className="close" onClick={close}>
                            &times;
                                </a>
                          <div className="header"> Place your personal details here </div>

                          <div className="actions">

                          <label>
                          house_number:
                                    <input value={house.house_number} className="non_draggable_input"onChange={ e => this.setState({house: {...house,house_number:e.target.value}})}/>
                                  </label><br /><br />
                                  <label>
                                  house_name  :
                                    <input value={house.house_name} className="non_draggable_input"onChange={ e => this.setState({house: {...house,house_name:e.target.value}})}/>
                                  </label><br /><br />
                                  <label>
                                  house_address:
                                    <input value={house.house_address} className="non_draggable_input"onChange={ e => this.setState({house: {...house,house_address:e.target.value}})}/>
                                  </label><br /><br /> 
                                  <label>
                                  location :
                                    <input value={house.location} className="non_draggable_input"onChange={ e => this.setState({house: {...house,location:e.target.value}})}/>
                                  </label><br /><br />
                                  <label>
                                  postcode:
                                    <input value={house.postcode} className="non_draggable_input"onChange={ e => this.setState({house: {...house,postcode:e.target.value}})}/>
                                  </label><br /><br />
                                  <label>
                                  city:
                                    <input value={house.city} className="non_draggable_input"onChange={ e => this.setState({house: {...house,city:e.target.value}})}/>
                                  </label><br /><br />
                                  <label>
                                  country:
                                    <input value={house.country} className="non_draggable_input"onChange={ e => this.setState({house: {...house,country:e.target.value}})}/>
                                  </label><br /><br />
                                  <label>
                                  house_details:
                                    <input value={house.house_details} className="non_draggable_input"onChange={ e => this.setState({house: {...house,house_details:e.target.value}})}/>
                                  </label><br /><br />
                                   
                                  
                                  <button
                                    className="button"
                                    onClick={() => {
                                      const {house} = this.state;
                                      fetch(`https://github.com/lameea29/SmrtCareLTD/blob/master/controllers/profileController?surname=$(profile.surname)&name=$(profile.name)&dob=$(profile.dob)&email=$(profile.email)&mobile=$(profile.mobile)&identification_number=$(profile.identification_number)&driving_license=$(profile.driving_license)&home_address=$(profile.home_address)&office_address=$(profile.office_address)&city=$(profile.city)&country=$(profile.country)`)
                                      .catch(err => console.error(err))
                                      console.log("modal closed ");
                                      close();
                                    }}
                                  >
                                    Save
                                  </button>


                          </div>
                        </div>
                      )}
                    </Popup>

                    <div id="out" class={`btn-out-${index}`} onClick={() => this.openoutPopup(`btn-out-${index}`)}></div>
                    <button id="del" onClick={() => this.delete(index)}><img id="cancel"src={cancel} alt="cancel" /></button>
                  </div>
                  </Draggable>
                  
              ); 
              case 'Bedroom':
              return (
                
                
                // itemList.map((ilist, index) => {
                  <Draggable bounds="parent" axis='both' {...dragHandlers}>
                  
                  <div id="button" class="row" >
                    <div id="in" class={`btn-in-${index}`} onClick={() => this.openinPopup(`btn-in-${index}`)}></div>
                    <Popup
                      trigger={<div id="center" class="C">{itm}</div>}
                      modal
                    // contentStyle={contentStyle}
                    >
                      {close => (
                        <div className="modal">
                          <a className="close" onClick={close}>
                            &times;
                                </a>
                          <div className="header"> Place your personal details here </div>

                          <div className="actions">
                          <label>
                          room_type:
                                    <input value={room.room_type} className="non_draggable_input"onChange={ e => this.setState({room: {...room,room_type:e.target.value}})}/>
                                  </label><br /><br />
                                  <label>
                                  room_details:
                                    <input value={room.room_type} className="non_draggable_input"onChange={ e => this.setState({room: {...room,room_details:e.target.value}})}/>
                                  </label><br /><br />
                                   
                                  
                                  <button
                                    className="button"
                                    onClick={() => {
                                      const {house} = this.state;
                                      fetch(`https://github.com/lameea29/SmrtCareLTD/blob/master/controllers/profileController?surname=$(profile.surname)&name=$(profile.name)&dob=$(profile.dob)&email=$(profile.email)&mobile=$(profile.mobile)&identification_number=$(profile.identification_number)&driving_license=$(profile.driving_license)&home_address=$(profile.home_address)&office_address=$(profile.office_address)&city=$(profile.city)&country=$(profile.country)`)
                                      .catch(err => console.error(err))
                                      console.log("modal closed ");
                                      close();
                                    }}
                                  >
                                    Save
                                  </button>


                          </div>
                        </div>
                      )}
                    </Popup>

                    <div id="out" class={`btn-out-${index}`} onClick={() => this.openoutPopup(`btn-out-${index}`)}></div>
                    <button id="del" onClick={() => this.delete(index)}><img id="cancel"src={cancel} alt="cancel" /></button>
                  </div>
                  </Draggable>
                  
              ); 
              case 'Living_Room':
              return (
                
                
                // itemList.map((ilist, index) => {
                  <Draggable bounds="parent" axis='both' {...dragHandlers}>
                  
                  <div id="button" class="row" >
                    <div id="in" class={`btn-in-${index}`} onClick={() => this.openinPopup(`btn-in-${index}`)}></div>
                    <Popup
                      trigger={<div id="center" class="C">{itm}</div>}
                      modal
                    // contentStyle={contentStyle}
                    >
                      {close => (
                        <div className="modal">
                          <a className="close" onClick={close}>
                            &times;
                                </a>
                          <div className="header"> Place your personal details here </div>

                          <div className="actions">

                          <label>
                          room_type:
                                    <input value={room.room_type} className="non_draggable_input"onChange={ e => this.setState({room: {...room,room_type:e.target.value}})}/>
                                  </label><br /><br />
                                  <label>
                                  room_details:
                                    <input value={room.room_type} className="non_draggable_input"onChange={ e => this.setState({room: {...room,room_details:e.target.value}})}/>
                                  </label><br /><br />
                                   
                                  
                                  <button
                                    className="button"
                                    onClick={() => {
                                      const {house} = this.state;
                                      fetch(`https://github.com/lameea29/SmrtCareLTD/blob/master/controllers/profileController?surname=$(profile.surname)&name=$(profile.name)&dob=$(profile.dob)&email=$(profile.email)&mobile=$(profile.mobile)&identification_number=$(profile.identification_number)&driving_license=$(profile.driving_license)&home_address=$(profile.home_address)&office_address=$(profile.office_address)&city=$(profile.city)&country=$(profile.country)`)
                                      .catch(err => console.error(err))
                                      console.log("modal closed ");
                                      close();
                                    }}
                                  >
                                    Save
                                  </button>


                          </div>
                        </div>
                      )}
                    </Popup>

                    <div id="out" class={`btn-out-${index}`} onClick={() => this.openoutPopup(`btn-out-${index}`)}></div>
                    <button id="del" onClick={() => this.delete(index)}><img id="cancel"src={cancel} alt="cancel" /></button>
                  </div>
                  </Draggable>
                  
              ); 
              case 'Kitchen':
              return (
                
                
                // itemList.map((ilist, index) => {
                  <Draggable bounds="parent" axis='both' {...dragHandlers}>
                  
                  <div id="button" class="row" >
                    <div id="in" class={`btn-in-${index}`} onClick={() => this.openinPopup(`btn-in-${index}`)}></div>
                    <Popup
                      trigger={<div id="center" class="C">{itm}</div>}
                      modal
                    // contentStyle={contentStyle}
                    >
                      {close => (
                        <div className="modal">
                          <a className="close" onClick={close}>
                            &times;
                                </a>
                          <div className="header"> Place your personal details here </div>

                          <div className="actions">

                          <label>
                          room_type:
                                    <input value={room.room_type} className="non_draggable_input"onChange={ e => this.setState({room: {...room,room_type:e.target.value}})}/>
                                  </label><br /><br />
                                  <label>
                                  room_details:
                                    <input value={room.room_type} className="non_draggable_input"onChange={ e => this.setState({room: {...room,room_details:e.target.value}})}/>
                                  </label><br /><br />
                                   
                                  
                                  <button
                                    className="button"
                                    onClick={() => {
                                      const {house} = this.state;
                                      fetch(`https://github.com/lameea29/SmrtCareLTD/blob/master/controllers/profileController?surname=$(profile.surname)&name=$(profile.name)&dob=$(profile.dob)&email=$(profile.email)&mobile=$(profile.mobile)&identification_number=$(profile.identification_number)&driving_license=$(profile.driving_license)&home_address=$(profile.home_address)&office_address=$(profile.office_address)&city=$(profile.city)&country=$(profile.country)`)
                                      .catch(err => console.error(err))
                                      console.log("modal closed ");
                                      close();
                                    }}
                                  >
                                    Save
                                  </button>


                          </div>
                        </div>
                      )}
                    </Popup>

                    <div id="out" class={`btn-out-${index}`} onClick={() => this.openoutPopup(`btn-out-${index}`)}></div>
                    <button id="del" onClick={() => this.delete(index)}><img id="cancel"src={cancel} alt="cancel" /></button>
                  </div>
                  </Draggable>
                  
              ); 
              case 'Temparature':
              return (
                
                
                // itemList.map((ilist, index) => {
                  <Draggable bounds="parent" axis='both' {...dragHandlers}>
                  
                  <div id="button" class="row" >
                    <div id="in" class={`btn-in-${index}`} onClick={() => this.openinPopup(`btn-in-${index}`)}></div>
                    <Popup
                      trigger={<div id="center" class="C">{itm}</div>}
                      modal
                    // contentStyle={contentStyle}
                    >
                      {close => (
                        <div className="modal">
                          <a className="close" onClick={close}>
                            &times;
                                </a>
                          <div className="header"> Place your personal details here </div>

                          <div className="actions">

                          <label>
                          sensor_name:
                                    <input value={sensor.sensor_name} className="non_draggable_input"onChange={ e => this.setState({sensor: {...sensor,sensor_name:e.target.value}})}/>
                                  </label><br /><br />
                                  <label>
                                  sensor_type:
                                    <input value={sensor.sensor_type} className="non_draggable_input"onChange={ e => this.setState({sensor: {...sensor,sensor_type:e.target.value}})}/>
                                  </label><br /><br />
                                  <label>
                                  sensor_version:
                                    <input value={sensor.sensor_version} className="non_draggable_input"onChange={ e => this.setState({sensor: {...sensor,sensor_version:e.target.value}})}/>
                                  </label><br /><br />
                                  <label>
                                  sensor_details:
                                    <input value={sensor.sensor_details} className="non_draggable_input"onChange={ e => this.setState({sensor: {...sensor,sensor_details:e.target.value}})}/>
                                  </label><br /><br />
                                   
                                  
                                  <button
                                    className="button"
                                    onClick={() => {
                                      const {house} = this.state;
                                      fetch(`https://github.com/lameea29/SmrtCareLTD/blob/master/controllers/profileController?surname=$(profile.surname)&name=$(profile.name)&dob=$(profile.dob)&email=$(profile.email)&mobile=$(profile.mobile)&identification_number=$(profile.identification_number)&driving_license=$(profile.driving_license)&home_address=$(profile.home_address)&office_address=$(profile.office_address)&city=$(profile.city)&country=$(profile.country)`)
                                      .catch(err => console.error(err))
                                      console.log("modal closed ");
                                      close();
                                    }}
                                  >
                                    Save
                                  </button>


                          </div>
                        </div>
                      )}
                    </Popup>

                    <div id="out" class={`btn-out-${index}`} onClick={() => this.openoutPopup(`btn-out-${index}`)}></div>
                    <button id="del" onClick={() => this.delete(index)}><img id="cancel"src={cancel} alt="cancel" /></button>
                  </div>
                  </Draggable>
                  
              ); 
              case 'Light':
              return (
                
                
                // itemList.map((ilist, index) => {
                  <Draggable bounds="parent" axis='both' {...dragHandlers}>
                  
                  <div id="button" class="row" >
                    <div id="in" class={`btn-in-${index}`} onClick={() => this.openinPopup(`btn-in-${index}`)}></div>
                    <Popup
                      trigger={<div id="center" class="C">{itm}</div>}
                      modal
                    // contentStyle={contentStyle}
                    >
                      {close => (
                        <div className="modal">
                          <a className="close" onClick={close}>
                            &times;
                                </a>
                          <div className="header"> Place your personal details here </div>

                          <div className="actions">

                          <label>
                          sensor_name:
                                    <input value={sensor.sensor_name} className="non_draggable_input"onChange={ e => this.setState({sensor: {...sensor,sensor_name:e.target.value}})}/>
                                  </label><br /><br />
                                  <label>
                                  sensor_type:
                                    <input value={sensor.sensor_type} className="non_draggable_input"onChange={ e => this.setState({sensor: {...sensor,sensor_type:e.target.value}})}/>
                                  </label><br /><br />
                                  <label>
                                  sensor_version:
                                    <input value={sensor.sensor_version} className="non_draggable_input"onChange={ e => this.setState({sensor: {...sensor,sensor_version:e.target.value}})}/>
                                  </label><br /><br />
                                  <label>
                                  sensor_details:
                                    <input value={sensor.sensor_details} className="non_draggable_input"onChange={ e => this.setState({sensor: {...sensor,sensor_details:e.target.value}})}/>
                                  </label><br /><br />
                                   
                                  
                                  <button
                                    className="button"
                                    onClick={() => {
                                      const {house} = this.state;
                                      fetch(`https://github.com/lameea29/SmrtCareLTD/blob/master/controllers/profileController?surname=$(profile.surname)&name=$(profile.name)&dob=$(profile.dob)&email=$(profile.email)&mobile=$(profile.mobile)&identification_number=$(profile.identification_number)&driving_license=$(profile.driving_license)&home_address=$(profile.home_address)&office_address=$(profile.office_address)&city=$(profile.city)&country=$(profile.country)`)
                                      .catch(err => console.error(err))
                                      console.log("modal closed ");
                                      close();
                                    }}
                                  >
                                    Save
                                  </button>


                          </div>
                        </div>
                      )}
                    </Popup>

                    <div id="out" class={`btn-out-${index}`} onClick={() => this.openoutPopup(`btn-out-${index}`)}></div>
                    <button id="del" onClick={() => this.delete(index)}><img id="cancel"src={cancel} alt="cancel" /></button>
                  </div>
                  </Draggable>
                  
              ); 
              case 'Movement':
              return (
                
                
                // itemList.map((ilist, index) => {
                  <Draggable bounds="parent" axis='both' {...dragHandlers}>
                  
                  <div id="button" class="row" >
                    <div id="in" class={`btn-in-${index}`} onClick={() => this.openinPopup(`btn-in-${index}`)}></div>
                    <Popup
                      trigger={<div id="center" class="C">{itm}</div>}
                      modal
                    // contentStyle={contentStyle}
                    >
                      {close => (
                        <div className="modal">
                          <a className="close" onClick={close}>
                            &times;
                                </a>
                          <div className="header"> Place your personal details here </div>

                          <div className="actions">

                          <label>
                          sensor_name:
                                    <input value={sensor.sensor_name} className="non_draggable_input"onChange={ e => this.setState({sensor: {...sensor,sensor_name:e.target.value}})}/>
                                  </label><br /><br />
                                  <label>
                                  sensor_type:
                                    <input value={sensor.sensor_type} className="non_draggable_input"onChange={ e => this.setState({sensor: {...sensor,sensor_type:e.target.value}})}/>
                                  </label><br /><br />
                                  <label>
                                  sensor_version:
                                    <input value={sensor.sensor_version} className="non_draggable_input"onChange={ e => this.setState({sensor: {...sensor,sensor_version:e.target.value}})}/>
                                  </label><br /><br />
                                  <label>
                                  sensor_details:
                                    <input value={sensor.sensor_details} className="non_draggable_input"onChange={ e => this.setState({sensor: {...sensor,sensor_details:e.target.value}})}/>
                                  </label><br /><br />
                                   
                                  
                                  <button
                                    className="button"
                                    onClick={() => {
                                      const {house} = this.state;
                                      fetch(`https://github.com/lameea29/SmrtCareLTD/blob/master/controllers/profileController?surname=$(profile.surname)&name=$(profile.name)&dob=$(profile.dob)&email=$(profile.email)&mobile=$(profile.mobile)&identification_number=$(profile.identification_number)&driving_license=$(profile.driving_license)&home_address=$(profile.home_address)&office_address=$(profile.office_address)&city=$(profile.city)&country=$(profile.country)`)
                                      .catch(err => console.error(err))
                                      console.log("modal closed ");
                                      close();
                                    }}
                                  >
                                    Save
                                  </button>


                          </div>
                        </div>
                      )}
                    </Popup>

                    <div id="out" class={`btn-out-${index}`} onClick={() => this.openoutPopup(`btn-out-${index}`)}></div>
                    <button id="del" onClick={() => this.delete(index)}><img id="cancel"src={cancel} alt="cancel" /></button>
                  </div>
                  </Draggable>
                  
              ); 
              case 'Mongo_DB':
              return (
                
                
                // itemList.map((ilist, index) => {
                  <Draggable bounds="parent" axis='both' {...dragHandlers}>
                  
                  <div id="button" class="row" >
                    <div id="in" class={`btn-in-${index}`} onClick={() => this.openinPopup(`btn-in-${index}`)}></div>
                    <Popup
                      trigger={<div id="center" class="C">{itm}</div>}
                      modal
                    // contentStyle={contentStyle}
                    >
                      {close => (
                        <div className="modal">
                          <a className="close" onClick={close}>
                            &times;
                                </a>
                          <div className="header"> Place your personal details here </div>

                          <div className="actions">

                            <label>
                              Disease Name  :
                                    <input type="text" name="name" />
                            </label><br /><br />
                            <label>
                              Duration :
                                    <input type="text" email="email" />
                            </label><br /><br />
                            <label>
                              DOB   :
                                    <input type="text" dob="dob" />
                            </label><br /><br />
                            <label>
                              Address:
                                    <input type="text" address="address" />
                            </label><br /><br />
                            <button
                              className="button"
                              onClick={() => {
                                console.log("modal closed ");
                                close();
                              }}
                            >
                              Save
                                  </button>


                          </div>
                        </div>
                      )}
                    </Popup>

                    <div id="out" class={`btn-out-${index}`} onClick={() => this.openoutPopup(`btn-out-${index}`)}></div>
                    <button id="del" onClick={() => this.delete(index)}><img id="cancel"src={cancel} alt="cancel" /></button>
                  </div>
                  </Draggable>
                  
              ); 
              case 'Relational':
              return (
                
                
                // itemList.map((ilist, index) => {
                  <Draggable bounds="parent" axis='both' {...dragHandlers}>
                  
                  <div id="button" class="row" >
                    <div id="in" class={`btn-in-${index}`} onClick={() => this.openinPopup(`btn-in-${index}`)}></div>
                    <Popup
                      trigger={<div id="center" class="C">{itm}</div>}
                      modal
                    // contentStyle={contentStyle}
                    >
                      {close => (
                        <div className="modal">
                          <a className="close" onClick={close}>
                            &times;
                                </a>
                          <div className="header"> Place your personal details here </div>

                          <div className="actions">

                            <label>
                              Disease Name  :
                                    <input type="text" name="name" />
                            </label><br /><br />
                            <label>
                              Duration :
                                    <input type="text" email="email" />
                            </label><br /><br />
                            <label>
                              DOB   :
                                    <input type="text" dob="dob" />
                            </label><br /><br />
                            <label>
                              Address:
                                    <input type="text" address="address" />
                            </label><br /><br />
                            <button
                              className="button"
                              onClick={() => {
                                console.log("modal closed ");
                                close();
                              }}
                            >
                              Save
                                  </button>


                          </div>
                        </div>
                      )}
                    </Popup>

                    <div id="out" class={`btn-out-${index}`} onClick={() => this.openoutPopup(`btn-out-${index}`)}></div>
                    <button id="del" onClick={() => this.delete(index)}><img id="cancel"src={cancel} alt="cancel" /></button>
                  </div>
                  </Draggable>
                  
              ); 
              case 'Sink_zoneones':
              return (
                
                
                // itemList.map((ilist, index) => {
                  <Draggable bounds="parent" axis='both' {...dragHandlers}>
                  
                  <div id="button" class="row" >
                    <div id="in" class={`btn-in-${index}`} onClick={() => this.openinPopup(`btn-in-${index}`)}></div>
                    <Popup
                      trigger={<div id="center" class="C">{itm}</div>}
                      modal
                    // contentStyle={contentStyle}
                    >
                      {close => (
                        <div className="modal">
                          <a className="close" onClick={close}>
                            &times;
                                </a>
                          <div className="header"> Place your personal details here </div>

                          <div className="actions">

                            <label>
                              Disease Name  :
                                    <input type="text" name="name" />
                            </label><br /><br />
                            <label>
                              Duration :
                                    <input type="text" email="email" />
                            </label><br /><br />
                            <label>
                              DOB   :
                                    <input type="text" dob="dob" />
                            </label><br /><br />
                            <label>
                              Address:
                                    <input type="text" address="address" />
                            </label><br /><br />
                            <button
                              className="button"
                              onClick={() => {
                                console.log("modal closed ");
                                close();
                              }}
                            >
                              Save
                                  </button>


                          </div>
                        </div>
                      )}
                    </Popup>

                    <div id="out" class={`btn-out-${index}`} onClick={() => this.openoutPopup(`btn-out-${index}`)}></div>
                    <button id="del" onClick={() => this.delete(index)}><img id="cancel"src={cancel} alt="cancel" /></button>
                  </div>
                  </Draggable>
                  
              ); 
              case 'Wasing_zone':
              return (
                
                
                // itemList.map((ilist, index) => {
                  <Draggable bounds="parent" axis='both' {...dragHandlers}>
                  
                  <div id="button" class="row" >
                    <div id="in" class={`btn-in-${index}`} onClick={() => this.openinPopup(`btn-in-${index}`)}></div>
                    <Popup
                      trigger={<div id="center" class="C">{itm}</div>}
                      modal
                    // contentStyle={contentStyle}
                    >
                      {close => (
                        <div className="modal">
                          <a className="close" onClick={close}>
                            &times;
                                </a>
                          <div className="header"> Place your personal details here </div>

                          <div className="actions">

                            <label>
                              Disease Name  :
                                    <input type="text" name="name" />
                            </label><br /><br />
                            <label>
                              Duration :
                                    <input type="text" email="email" />
                            </label><br /><br />
                            <label>
                              DOB   :
                                    <input type="text" dob="dob" />
                            </label><br /><br />
                            <label>
                              Address:
                                    <input type="text" address="address" />
                            </label><br /><br />
                            <button
                              className="button"
                              onClick={() => {
                                console.log("modal closed ");
                                close();
                              }}
                            >
                              Save
                                  </button>


                          </div>
                        </div>
                      )}
                    </Popup>

                    <div id="out" class={`btn-out-${index}`} onClick={() => this.openoutPopup(`btn-out-${index}`)}></div>
                    <button id="del" onClick={() => this.delete(index)}><img id="cancel"src={cancel} alt="cancel" /></button>
                  </div>
                  </Draggable>
                  
              ); 
              case 'Prep_zone':
              return (
                
                
                // itemList.map((ilist, index) => {
                  <Draggable bounds="parent" axis='both' {...dragHandlers}>
                  
                  <div id="button" class="row" >
                    <div id="in" class={`btn-in-${index}`} onClick={() => this.openinPopup(`btn-in-${index}`)}></div>
                    <Popup
                      trigger={<div id="center" class="C">{itm}</div>}
                      modal
                    // contentStyle={contentStyle}
                    >
                      {close => (
                        <div className="modal">
                          <a className="close" onClick={close}>
                            &times;
                                </a>
                          <div className="header"> Place your personal details here </div>

                          <div className="actions">

                            <label>
                              Disease Name  :
                                    <input type="text" name="name" />
                            </label><br /><br />
                            <label>
                              Duration :
                                    <input type="text" email="email" />
                            </label><br /><br />
                            <label>
                              DOB   :
                                    <input type="text" dob="dob" />
                            </label><br /><br />
                            <label>
                              Address:
                                    <input type="text" address="address" />
                            </label><br /><br />
                            <button
                              className="button"
                              onClick={() => {
                                console.log("modal closed ");
                                close();
                              }}
                            >
                              Save
                                  </button>


                          </div>
                        </div>
                      )}
                    </Popup>

                    <div id="out" class={`btn-out-${index}`} onClick={() => this.openoutPopup(`btn-out-${index}`)}></div>
                    <button id="del" onClick={() => this.delete(index)}><img id="cancel"src={cancel} alt="cancel" /></button>
                  </div>
                  </Draggable>
                  
              ); 
                            }           
            })}

          {this.state.linetos.map((value, index) => { return <LineTo key={index} from={value[0]} to={value[1]} /> }
          )}

          </div>
        }
        </div>
        <div id="output" class="column" onDragOver={this.allowDrop} onDrop={this.onDropRight}>Output
                  {
            rightContainer.map(itm => {
              return <button class="s1" onClick={this.onClick}>{itm}</button>
            })
          }
        </div>

        <div id="footer" class="footer"></div>
        <div >
          <h1> Hello There</h1>
          {Template.zone.map((zones,inedx)=>{
            return <h1>{zones.zone_type}</h1>
          })}
        </div>
      </div>
      
    )
  }

}
export default index;