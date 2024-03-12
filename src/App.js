/** @format */

import React, { Component } from "react";
import { Chatbox, Home, Trash, Create } from "react-ionicons";
import { Journal } from "react-ionicons";
import "./App.css";
import { firestore } from "./firebase.js";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      textarea: "",
      data: [],
    };
    this.setField = this.setField.bind(this);
    this.submitData = this.submitData.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    this.showNote();
  }
  setField = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, name: this.state.title });
  };
  submitData = async (e) => {
    e.preventDefault();
    try {
      await firestore.collection("myCollection").add({
        dataField: {
           title:this.state.title,
           textarea:this.state.textarea
        },
      });
      console.log("Data added to Firestore successfully");
    } catch (error) {
      console.error("Error adding data to Firestore:", error);
    }
    this.setState({ title: "", textarea: "" });
  };
  showNote = async (e) => {
    try {
      const response = await firestore.collection("myCollection").get();
      const fetchedData = response.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      this.setState({ data: fetchedData });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  async handleDelete(id) {
    console.log(this.state.data);
    try {
      await firestore.collection('myCollection').doc(id).delete();
      console.log('Document successfully deleted!');
      // After deletion, update the component state to reflect changes
      this.setState(prevState => ({
        data: prevState.data.filter(item => item.id !== id)
      }));
    } catch (error) {
      console.error('Error removing document:', error);
    }
  }
  render() {
    return (
      <div className="main">
        <div className="leftPane">
          <h1>Notes</h1>
          <ul>
            <h2>
              <Home color={"#fff"} style={{ marginRight: "10px" }}></Home>Home
            </h2>
            <h2>
              <Journal color={"#fff"} style={{ marginRight: "10px" }}></Journal>
              Notes
            </h2>
            <h2>
              <Chatbox color={"#fff"} style={{ marginRight: "10px" }}></Chatbox>
              Tasks
            </h2>
            <h2>
              <Trash color={"#fff"} style={{ marginRight: "10px" }}></Trash>
              Trash
            </h2>
          </ul>
        </div>
        <div className="notearea">
          <h2 className="heading">
            <Create style={{ marginLeft: "10px" }}></Create>New Note
          </h2>
          <hr></hr>
          <form>
            <div>
              <input
                type="text"
                className="title"
                placeholder="Title"
                name="title"
                value={this.state.title}
                onChange={this.setField}></input>
              <hr></hr>
            </div>
            <div>
              <textarea
                className="ta"
                placeholder="Enter Details"
                name="textarea"
                value={this.state.textarea}
                onChange={this.setField}></textarea>
            </div>
            <button type="submit" onClick={this.submitData} className="submit">
              Add New Note
            </button>
          </form>
        </div>
        <div>
          {this.state.data.map((item) =>(
            <div className="container" key={item.id}>
            <h1 className="ttle">Title: {item.dataField.title}</h1>
            <p>Note: {item.dataField.textarea}</p>
            <div className="btncontainer">
              <button type="" className="button" onClick={()=>this.handleDelete(item.id)}>
                Delete
              </button>
            </div>
          </div>
          ))}
        </div>
          
      </div>
    );
  }
}
export default App;
