import React from "react";
import axios from "axios";
import Slider from "react-slick";
import moment from "moment";
import "moment/locale/fr";
import "../assets/css/components/Slider.css";
import BackButton from "../components/BackButton";

class Station extends React.Component {
  state = {
    station: null
  };

  componentDidMount() {
    const { match } = this.props;
    const code = match.params.station;
    this.fetchDetails(code);
  }

  render() {
    const { station } = this.state;
    if (!station) return null;
    return (
      <div className="station minheight">
        <div className="container">
          <BackButton />
          <div className="title">
            <h1>{station.name}</h1>
          </div>
          <div className="left">
            <div className="images">
              <Slider
                {...{
                  arrows: true,
                  infinite: true,
                  speed: 500,
                  slidesToShow: 1,
                  slidesToScroll: 1
                }}
              >
                {station.images.length > 0 ? (
                  station.images.map((i, index) => (
                    <img src={i} alt={index} key={index} />
                  ))
                ) : (
                  <img
                    className="placeholder"
                    src="https://i.pinimg.com/originals/ba/5c/d4/ba5cd4ab883552ebd22932317aa0d5a0.jpg"
                    height={300}
                  />
                )}
              </Slider>
            </div>
            <div className="description">
              <p>{station.description}</p>
              <p>
                <small>
                  <b>Adresse : </b>
                  {station.contact && station.contact.address}
                </small>
              </p>
            </div>
          </div>
          <div className="right">
            <div className="informations">
              <div className="left">
                <div className="meteo">
                  <div className="d-flex align-items-center">
                    <img
                      src="https://image.flaticon.com/icons/svg/118/118755.svg"
                      alt="weather"
                      height="14"
                    />
                    <b>
                      &nbsp;<u>Météo</u>
                    </b>
                  </div>
                  <div className="weather">
                    <br />
                    <div>
                      <b>Ciel : </b>
                      {station.weather && station.weather.state}
                    </div>
                    <div>
                      <b>Matin : </b>
                      {station.weather &&
                        station.weather.morning &&
                        station.weather.morning.replace("Matin", "")}
                    </div>
                    <div>
                      <b>Après-midi : </b>
                      {station.weather &&
                        station.weather.afternoon &&
                        station.weather.afternoon.replace("Après-midi", "")}
                    </div>
                    <br />
                    <div>
                      <b>Enneigement</b>
                    </div>
                    <div>
                      <b>Sommet : </b>
                      {station.snowfall && station.snowfall.top}
                    </div>
                    <div>
                      <b>Pied : </b>
                      {station.snowfall && station.snowfall.bottom}
                    </div>
                  </div>
                </div>
                <div className="state">
                  <div className="d-flex align-items-center">
                    <img
                      src="https://image.flaticon.com/icons/svg/883/883360.svg"
                      alt="piste"
                      height="14"
                    />
                    <b>
                      &nbsp;
                      <u>Etat de la station</u>
                    </b>
                  </div>
                  <br />
                  <div>{station.state}</div>
                  <br />

                  <div>
                    <b>Pistes ouvertes : </b>
                    {station.open_domains && station.open_domains.info}
                  </div>
                  <br />
                  <div className="green">
                    <span>
                      <div className="bubble bg-green" />{" "}
                      {station.open_domains && station.open_domains["green"]}{" "}
                      station(s) verte(s)
                    </span>
                  </div>
                  <div className="blue">
                    <span>
                      <div className="bubble bg-blue" />{" "}
                      {station.open_domains && station.open_domains["blue"]}{" "}
                      station(s) bleue(s)
                    </span>
                  </div>
                  <div className="red">
                    <span>
                      <div className="bubble bg-red" />{" "}
                      {station.open_domains && station.open_domains["red"]}{" "}
                      station(s) rouge(s)
                    </span>
                  </div>
                  <div className="black">
                    <span>
                      <div className="bubble bg-black" />{" "}
                      {station.open_domains && station.open_domains["black"]}{" "}
                      station(s) noire(s)
                    </span>
                  </div>
                  <div className="clearfix" />
                  <br />
                  <div>
                    <b>
                      Mise à jour le{" "}
                      {moment(station.updated_at).format("dddd DD MMMM YYYY")}
                    </b>
                  </div>
                </div>
              </div>
              <div className="right">
                <div className="infos">
                  <div className="d-flex align-items-center">
                    <img
                      src="https://image.flaticon.com/icons/svg/685/685815.svg"
                      alt="information"
                      height="14"
                    />
                    <b>
                      &nbsp;
                      <u>Infos pratiques</u>
                    </b>
                  </div>
                  <br />
                  <div>
                    <b>Altitude : </b>
                    {station.altitude}
                  </div>
                  <div>
                    <b>Horaires : </b>
                    {station.opening}
                  </div>
                  <br />
                  <div>
                    <b>Particularités : </b>
                    <br />
                    {station.styles.map((s, i) => (
                      <div className="tag" key={i}>{s}</div>
                    ))}
                  </div>
                  <div className="clearfix" />
                  <br />
                  <div className="d-flex align-items-center">
                    <img
                      src="https://image.flaticon.com/icons/svg/1412/1412921.svg"
                      alt="piste"
                      height="14"
                    />
                    <b>
                      &nbsp;<u>Pistes</u>
                    </b>
                  </div>
                  <br />
                  <div>
                    <b>Distance : </b>
                    {station.domains.info}
                  </div>
                  <div>
                    <b>Pistes totales : </b>
                    {station.open_domains &&
                      station.open_domains.info &&
                      station.open_domains.info.split(" ").pop()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  fetchDetails = async code => {
    const { data } = await axios.get(
      "https://ski-station-api.herokuapp.com/api/v1/stations/" + code
    );
    this.setState({
      station: data
    });
  };
}

export default Station;
