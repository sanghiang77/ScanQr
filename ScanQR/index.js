import React from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet, Dimensions, Button} from 'react-native';
import { RNCamera } from 'react-native-camera';
import axios from 'react-native-axios'


const { width } = Dimensions.get('screen');

const IconWithText = (props) => {
  return (
    <TouchableOpacity>
    <View>
      <Image style={{width: 90, height: 90, borderRadius: 90}} source={props.img} />
  <Text style={{maxWidth:60, textAlign:'center', marginLeft:6,fontWeight:'bold'}}>{props.title}</Text>
    </View>
    </TouchableOpacity>
  )
}

const IconAction = (props) => {
  return (
    <TouchableOpacity>
    <View>
      <Image style={{width: 56, height: 56, borderRadius: 55}} source={props.img} />
    </View>
    </TouchableOpacity>
     
  )
}

class ScanQode extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      barcode: '',
      loading: false,
      
    };
};

state = {
  jsonData: '',
};
componentDidMount() {
  fetch('http://admin-2go.satyadm.co.id/service/product/items', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      KEY: 'id',
      VALUE: '29301683;PPD2020020073;1',
    }),
  })
    .then(response => response.json())
    .then(json => {
      this.setState({
        jsonData: json.price,
      });
    })
    .catch(error => {
      console.error(error);
    });
}



  render(){  
   
    const leftTop = {
    borderLeftWidth: 3,
    borderTopWidth: 3,
    borderColor: 'white'
  };
  const leftBottom = {
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: 'white'
  };
  const rightTop = {
    borderRightWidth: 3,
    borderTopWidth: 3,
    borderColor: 'white'
  };
  const rightBottom = {
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderColor: 'white'
  };

      return (
      <View style={{flex:1}}>
        <View style={{flex: 1, backgroundColor:'grey'}}>
            <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={{ ...StyleSheet.absoluteFill }}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            onBarCodeRead={(barcode)=>{
                console.log(barcode);
                this.setState({
                  barcode:barcode.data
                })
            }}
          />
          
          <View style={{ ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: width / 2, height: width / 2 }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1, ...leftTop }} />
                            <View style={{ flex: 1 }} />
                            <View style={{ flex: 1, ...rightTop }} />
                        </View>
                        <View style={{ flex: 1 }} />
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1, ...leftBottom }} />
                            <View style={{ flex: 1 }} />
                            <View style={{ flex: 1, ...rightBottom }} />
                        </View>
                    </View>
                </View>

          <View style={{flexDirection:'row', paddingHorizontal: 16, justifyContent: 'space-between', marginTop: 16, position:'absolute',
              top:0,
              left:0, width:'100%'}}>
            <IconAction onPress={() => this.props.navigation.navigate('ScanQR')}
            img={require('../../../assets/icons/back.png')}/>
            <View style={{flexDirection: 'row', justifyContent:'space-between', width:110,}}>
              <IconAction img={require('../../../assets/icons/image.png')}/>
              <IconAction img={require('../../../assets/icons/star.png')}/>
            </View>
          </View>
        </View>
        <View style={{height: 250, backgroundColor: 'white', paddingHorizontal:16}}>
          <View style={{alignItems: 'center', marginTop: 8, marginBottom: 18}}>
              <View style={{width:35, height:2, backgroundColor:'#EAEAEA', marginVertical:2}}/>
              <View style={{width:35, height:2, backgroundColor:'#EAEAEA', marginVertical:2}}/>
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
            <Text style={{fontSize:20, fontWeight:'bold', color:'black', marginLeft:10, color :'#191970'}}>Satya2GoQR</Text>
            <Text style={{fontSize:14, fontWeight:'bold', color:'purple'}}>Details Item</Text>
          </View>
          <View style={{flexDirection:'row', alignItems:'flex-start', marginTop:14, width:'100%',}}>
            <View style={{alignItems:'center', width: 160, justifyContent:'center', paddingRight: 12}}>
              <IconWithText 
              img={require('../../../assets/icons/scanQR.png')}/>
            </View>
            <View style={{ width:1, height:100, backgroundColor:'#EAEAEA'}}/>
            <View style={{flex:1, paddingLeft: 12}}>
            <Text style={{fontSize:17, fontWeight:'bold', color:'black', textAlign:'center', color:'green'}}>
            {` ${this.state.barcode}`}
            </Text>
            <Text style={{fontSize:17, fontWeight:'bold', color:'black', textAlign:'center', color:'green'}}>
            {` ${this.state.barcode}`}
            </Text>
            <Text style={{fontSize:17, fontWeight:'bold', color:'black', textAlign:'center', color:'green'}}>
            {` ${this.state.jsonData}`}
            </Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default ScanQode;