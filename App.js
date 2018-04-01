import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { ARKit } from 'react-native-arkit';
import { RNCamera } from 'react-native-camera';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});

const products = {
  5000128649650: 11,
  5012035950132: 18,
};
export default class ReactNativeARKit extends Component {
  state = {
    scanning: true,
    barcode: null,
    gramsOfSugar: null,
  };
  camera: Object;
  onBarCodeRead = (e) => {
    this.setState({
      barcode: e.data,
      gramsOfSugar: products[e.data] || 'unknown',
      scanning: false,
    });
  };
  renderScanner() {
    return (
      <RNCamera
        style={styles.preview}
        onBarCodeRead={this.onBarCodeRead}
        ref={cam => this.camera = cam}
      />
    );
  }
  renderCubes(cubes) {
    return Array(cubes).fill().map((_, i) =>
      <ARKit.Box
        key={i}
        position={{ x: (i - 1) * 0.15, y: 0, z: -2 }}
        shape={{ width: 0.1, height: 0.1, length: 0.1, chamfer: 0.0 }}
      />
      // i * i
    );
  }
  renderAr() {
    const cubes = Math.round(this.state.gramsOfSugar / 4);
    return (
      <View style={{ flex: 1 }}>
        <ARKit
          style={{ flex: 1 }}
          debug
          // enable plane detection (defaults to Horizontal)
          planeDetection={ARKit.ARPlaneDetection.Horizontal}

          // enable light estimation (defaults to true)
          lightEstimationEnabled
          // get the current lightEstimation (if enabled)
          // it fires rapidly, so better poll it from outside with
          // ARKit.getCurrentLightEstimation()
          // onLightEstimation={e => console.log(e.nativeEvent)}

          // event listener for (horizontal) plane detection
          onPlaneDetected={anchor => console.log(anchor)}

          // event listener for plane update
          onPlaneUpdated={anchor => console.log(anchor)}

          // arkit sometimes removes detected planes
          onPlaneRemoved={anchor => console.log(anchor)}

          // event listeners for all anchors, see [Planes and Anchors](#planes-and-anchors)
          onAnchorDetected={anchor => console.log(anchor)}
          onAnchorUpdated={anchor => console.log(anchor)}
          onAnchorRemoved={anchor => console.log(anchor)}

          // you can detect images and will get an anchor for these images
          detectionImages={[{ resourceGroupName: 'DetectionImages' }]}


          onARKitError={console.log} // if arkit could not be initialized (e.g. missing permissions), you will get notified here
        >
          {this.renderCubes(cubes)}
          <ARKit.Text
            text={this.state.gramsOfSugar + 'g of sugar!'}
            position={{ x: 0.2, y: 0.3, z: -2 }}
            font={{ size: 0.15, depth: 0.05 }}
          />
          {/*<ARKit.Light*/}
            {/*position={{ x: 1, y: 3, z: 2 }}*/}
            {/*type={ARKit.LightType.Omni}*/}
            {/*color="white"*/}
          {/*/>*/}
          {/*<ARKit.Light*/}
            {/*position={{ x: 0, y: 1, z: 0 }}*/}
            {/*type={ARKit.LightType.Spot}*/}
            {/*eulerAngles={{ x: -Math.PI / 2 }}*/}
            {/*spotInnerAngle={45}*/}
            {/*spotOuterAngle={45}*/}
            {/*color="green"*/}
          {/*/>*/}
        </ARKit>
      </View>
    );
  }

  render() {
    if (this.state.scanning) {
      return this.renderScanner();
    }

    return this.renderAr();
  }
}

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

/*
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
*/
