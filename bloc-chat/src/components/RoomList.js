import React, { Component } from 'react';
import Modal from 'react-modal';
import { Row, Col } from 'react-grid-system';
import '.././styles/roomlist.css';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement(document.getElementById('App'));

class RoomList extends Component {

	constructor(props)
	{
		super(props);
		this.state = {
			rooms: [],
			newRoomName: '',
			modalIsOpen: false

		};
	    this.roomsRef = this.props.firebase.database().ref('rooms');
	    this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
	}

	openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        
    }

    closeModal() {
    	this.setState({modalIsOpen: false});
    }

	handleChange(e) {
		this.setState({
			newRoomName: e.target.value
		});
	}

	componentDidMount() {
		this.roomsRef.on('child_added', snapshot => {
			const room = snapshot.val();
			room.key = snapshot.key;
			this.setState({rooms: this.state.rooms.concat(room) });
		});
	}


	createRoom(newRoomName) {
		this.roomsRef.push({
			name: newRoomName
		});
		this.setState({newRoomName:''});
	}
	


render() {

	return(
	<Row className = "chat-rooms">	
      <Col md={4} className = "room-holder">
        <section className = "room-numbers">
    <Row>
        <h1 className = "hero-name">Bloc Chat</h1>
        <button className = "modal-button" onClick={this.openModal}>New Room</button>
    </Row>
        <Modal
    	  isOpen={this.state.modalIsOpen}
    	  onAfterOpen={this.afterOpenModal}
    	  onRequestClose={this.closeModal}
    	  style={customStyles}
    	  contentLabel="Modal"
        >
        
        <form className = "modal-form" onSubmit={ (e) => { e.preventDefault(); this.createRoom(this.state.newRoomName) }}>
          <Row><h3>New Room Name: </h3></Row>
          
          <Row>
          <input type="text" name="newRoomName"  value = {this.state.newRoomName} onChange = {this.handleChange.bind(this)}/>
          <input className = "submit-bttn" type="submit" value="+" />
          </Row>
          <Row>
          <button className = "close-modal" onClick={this.closeModal}>close</button>
          </Row>
        </form>
        </Modal>
          {this.state.rooms.map((room, key) =>
    	  <div key={room.key}>
    	  <span className = "rooms-avail">{room.name}</span>
    	  </div>
    	  )}
        </section>
      </Col>
    </Row>
   );
}
}



export default RoomList;


