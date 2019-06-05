import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import CurrentPlantData from "./CurrentPlantData";
import Loading from "./Layout/Loading";
import "../style/personalDash.css";

@inject("itemStore", "plantsStore", "user")
@observer
class PersonalDash extends Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }

  componentDidMount = async () => {
    // await this.props.plantsStore.getDataFromDB();
    // await this.props.itemStore.getDataFromDB();
    this.setState({
      loading: false
    });
  };

  connect = (e) => {
    let userId = JSON.parse(sessionStorage.getItem("currentLogin"))
    console.log(userId._id)
    console.log(e.target.id)
    console.log(e.target.textContent)

    this.props.user.conncetPlantToSensor(userId._id, e.target.id)
    this.props.plantsStore.getPlantMaxTemp(e.target.textContent)
    this.props.plantsStore.getPlantMinTemp(e.target.textContent)
    this.props.plantsStore.getPlantMaxHumid(e.target.textContent)
    this.props.plantsStore.getPlantMinHumid(e.target.textContent)
    this.props.plantsStore.getPlantMaxMoist(e.target.textContent)
    this.props.plantsStore.getPlantMinMoist(e.target.textContent)
  }

  render() {
    const loading = this.state.loading;
    let userPlants = this.props.user.myPlants;

    return (
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <CurrentPlantData />
            <div className="myPlants-container">
              {userPlants.map(p => (
                <div>
                  <div id = {p._id} onClick = {this.connect}>{p.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default PersonalDash;
