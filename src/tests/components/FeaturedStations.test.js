import React from "react";
import { shallow } from "enzyme";
import FeaturedStations from "../../components/FeaturedStations";

const stationsMock = [
  {
    id: 13223,
    massif: "alpes du nord",
    code: "aillons--margeriaz",
    name: "AILLONS- MARGERIAZ",
    description:
      "Au cœur des montagnes élancées du Parc naturel régional du Massif des Bauges, les Aillons-Margériaz vous accueillent !\nUne station familiale idéalement située à 30mn de Chambéry et 1h30 de Lyon.",
    state: "Domaine skiable ouvert",
    altitude: null,
    opening: "Du 22/12/2018 au 31/03/2019",
    partial_opening: null,
    snowpark: 0,
    images: [
      "https://www.france-montagnes.com/sites/default/files/styles/station_slideshow_large/public/station/hiver/-GLM4352-2.jpg",
      "https://www.france-montagnes.com/sites/default/files/styles/station_slideshow_large/public/station/hiver/AI10-0250.jpg",
      "https://www.france-montagnes.com/sites/default/files/styles/station_slideshow_large/public/station/hiver/1500AI10-0024.jpg",
      "https://www.france-montagnes.com/sites/default/files/styles/station_slideshow_large/public/station/hiver/P12-2-b.JPG",
      "https://www.france-montagnes.com/sites/default/files/styles/station_slideshow_large/public/station/hiver/ILM-9625-2.jpg",
      "https://www.france-montagnes.com/sites/default/files/styles/station_slideshow_large/public/station/hiver/AI10-0262-redim.jpg",
      "https://www.france-montagnes.com/sites/default/files/styles/station_slideshow_large/public/station/ete/-GLM4352-2.jpg",
      "https://www.france-montagnes.com/sites/default/files/styles/station_slideshow_large/public/station/ete/ILM-9625-2.jpg",
      "https://www.france-montagnes.com/sites/default/files/styles/station_slideshow_thumb/public/station/hiver/-GLM4352-2.jpg",
      "https://www.france-montagnes.com/sites/default/files/styles/station_slideshow_thumb/public/station/hiver/AI10-0250.jpg",
      "https://www.france-montagnes.com/sites/default/files/styles/station_slideshow_thumb/public/station/hiver/1500AI10-0024.jpg",
      "https://www.france-montagnes.com/sites/default/files/styles/station_slideshow_thumb/public/station/hiver/P12-2-b.JPG",
      "https://www.france-montagnes.com/sites/default/files/styles/station_slideshow_thumb/public/station/hiver/ILM-9625-2.jpg",
      "https://www.france-montagnes.com/sites/default/files/styles/station_slideshow_thumb/public/station/hiver/AI10-0262-redim.jpg",
      "https://www.france-montagnes.com/sites/default/files/styles/station_slideshow_thumb/public/station/ete/-GLM4352-2.jpg",
      "https://www.france-montagnes.com/sites/default/files/styles/station_slideshow_thumb/public/station/ete/ILM-9625-2.jpg"
    ],
    styles: [
      "stations nouvelles glisses",
      "stations villages de charme",
      "village de charme",
      "montagne aventure",
      "montagne douce"
    ],
    contact: {
      address:
        "    OFFICE DE TOURISME DES AILLONS-MARGERIAZ     chef lieu     73340 - AILLONS- MARGERIAZ   ",
      phone:
        "\n                \n                  OFFICE DE TOURISME DES AILLONS-MARGERIAZ                  chef lieu                  73340 - AILLONS- MARGERIAZ                \n              "
    },
    domains: {
      info: "40 km de pistes",
      green: 8,
      blue: 22,
      red: 6,
      black: 4
    },
    snowfall: {
      top: "190cm à 1900m",
      bottom: "60cm à 1000m"
    },
    open_domains: {
      info: "38 pistes sur 40",
      green: 7,
      blue: 21,
      red: 6,
      black: 4
    },
    ski_pass: {
      day: "26 €",
      week: "127 €"
    },
    weather: {
      state: "Soleil",
      morning: "Matin -2°",
      afternoon: "Après-midi 3°"
    },
    tops: false,
    created_at: "2019-02-14T16:09:58.428Z",
    updated_at: "2019-02-14T16:09:58.428Z"
  }
];

describe("The FeaturedStations component should ", () => {

  it("renders without crashing", () => {
    const wrapper = shallow(<FeaturedStations />);
    wrapper.setState({ stations: stationsMock });
    expect(wrapper.find({ key: "13223" })).toBeTruthy();
  });

});
