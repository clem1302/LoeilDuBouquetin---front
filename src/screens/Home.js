import React, {Component} from "react";
import axios from "axios";
import logo from "../assets/images/logo.png";
import map from "../assets/images/map.svg";
import "../assets/css/Home.css";
import {Link} from "react-router-dom";

class Home extends Component {
	state = {
		currentStation: undefined,
		stations: undefined,
	};

	componentDidMount() {
		console.log("componentDidMount");
		this.setUpMap();
	}

	render() {
		console.log("render");
		const {stations, currentStation} = this.state;

		return (
			<div className="home">
				<header>
					<nav className="bg-primary color-white">
						<div className="logo item">
							<img src={logo} alt="l'oeil du bouquetin"/>
						</div>
						<div className="item">
							<a href="/" className="color-white">
								<h1 className="brand">L'oeil du bouquetin</h1>
							</a>
						</div>
					</nav>
				</header>
				<div className="container">
					<div className="titles">
						<h2>Carte intéractive</h2>
						{currentStation && <h2>{currentStation}</h2>}
					</div>
					<div className="left">
						<object data={map} className="map" type="text/html"/>
					</div>
					<div className="right">
						{stations && stations.map(station => {
							let nb_pistes = 0;
							for (let piste in station.domains)
								if (piste !== "info")
									nb_pistes += +station.domains[piste];
							return <div key={station.id} style={{backgroundImage: "url("+station.images[0]+"),url(https://i.pinimg.com/originals/ba/5c/d4/ba5cd4ab883552ebd22932317aa0d5a0.jpg)", backgroundPosition: "center", backgroundSize: "cover"}}>
								<div className="detail" >
									<div className="title">{station.name}</div>
									<div className="nbpiste">
										{nb_pistes} pistes
									</div>
									<div className="pistes">
										<div className="green">
											<div className="bubble bg-green"/>
											{station.open_domains["green"]}</div>
										<div className="blue">
											<div className="bubble bg-blue"/>
											{station.open_domains["blue"]}</div>
										<div className="red">
											<div className="bubble bg-red"/>
											{station.open_domains["red"]}</div>
										<div className="black">
											<div className="bubble bg-black"/>
											{station.open_domains["black"]}</div>
									</div>
									<div className="details">
										<Link to={`/stations/${station.code}`}>Details</Link>
									</div>
								</div>
							</div>;
						})}
					</div>
				</div>
			</div>
		);
	}

	resetStations = () => {
		console.log("resetStations");
		this.setState({stations: null, currentStation: null});
		for (let mountain of this.mountains) {
			mountain.style.fill = null;
		}
	};

	fetchStations = async (e) => {
		console.log("fetchStations");
		this.resetStations();
		const mountain             = e.currentTarget.id;
		e.currentTarget.style.fill = "#ac3737";
		const mountains            = {
			corse: "Corse",
			med: "Pyrénés",
			centre: "Massif central",
			alpesud: "Alpes du sud",
			alpenord: "Alpes du nord",
			jura: "Jura",
			vosges: "Vosges",
		};
		this.setState({
			currentStation: mountains[mountain],
		});

		const massif = {
			corse: "corse",
			med: "pyrenees",
			centre: "massif central",
			alpesud: "alpes du sud",
			alpenord: "alpes du nord",
			jura: "jura",
			vosges: "vosges",
		};

		const response = await axios.get("https://ski-station-api.herokuapp.com/api/v1/stations?massif=" + massif[mountain]);
		const data     = response.data;
		this.setState({stations: data});

	};

	setUpMap = () => {
		console.log("setUpMap");
		const map  = document.body.querySelector(".map");
		map.onload = () => {
			const mountains = map.contentDocument.querySelectorAll("#layer101 > path");
			this.mountains  = mountains;
			for (let mountain of mountains) {
				mountain.style.cursor = "pointer";
				mountain.addEventListener("mouseenter", function () {if (this.style.fill !== "rgb(172, 55, 55)") this.style.fill = "#FF5252";});
				mountain.addEventListener("mouseleave", function () {if (this.style.fill !== "rgb(172, 55, 55)") this.style.fill = null;});
				mountain.addEventListener("click", this.fetchStations);
			}
		};
	};
}

export default Home;
