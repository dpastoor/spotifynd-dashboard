/**
 *
 * Created by devin on 1/16/16.
 */
import {default as React, Component} from "react";

import {GoogleMap, Marker} from "react-google-maps";
import {default as MarkerClusterer} from "react-google-maps/lib/addons/MarkerClusterer";

export default class MarkerClustererExample extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let data = this.props.data || [];
    return (
      <GoogleMap
        containerProps={{
          ...this.props,
          style: {
            height: "100%",
          },
        }}
        defaultZoom={ 3 }
        defaultCenter={{ lat: 38.92929, lng: -98.525 }}>
        <MarkerClusterer
          averageCenter={ true }
          enableRetinaIcons={ true }
          gridSize={ 60 }>
          { data.map((marker, i) => (
            <Marker
              position={{ lat: marker[0], lng: marker[1]}}
              key={i }
            />
          )) }
        </MarkerClusterer>
      </GoogleMap>
    );
  }
}

