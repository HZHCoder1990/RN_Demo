/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  StatusBar
} from 'react-native';

const screen_width  = Dimensions.get('window').width
const image_size = (screen_width - 20) / 3 - 20
class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      categories: []
    }
  }

  componentDidMount() {

    // 通过ajax获取数据
    fetch('http://localhost:8080/dish/index.json')
    .then((res) => res.json()) 
    .then((result) => {
      if (result.ret && result.data) {
        this.setState({
          categories: result.data.categories
        })
      }
    })
    .catch(() => {
      console.log("请求异常")
    })

  }

  

  render() {
    return (
      <SafeAreaView style={{backgroundColor: 'blue'}}>
        {/** SafeAreaView 是由内容撑大的*/}

        <ScrollView>
          <Image source={require('./resource/images/banner.png')} style={{width:screen_width}}/>
          <View style={styels.content}>
            {/** JSX中书写JS代码 */}
            {
              this.state.categories.map((item) => {
                  return (
                      <View style={[{width: (screen_width - 20) / 3}, styels.item]}>
                        <Image source={{uri: item.imgUrl}}
                         style={[{width: image_size, height: image_size},styels.image]}/>
                        <Text>{item.title}</Text>
                      </View>
                  )
              })
            }
          </View>
        </ScrollView>

        
      </SafeAreaView>

      

      
    )
  }
}

const styels = StyleSheet.create({
  content: {
    height: 500,
    backgroundColor: 'red',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item: {
    display: 'flex',
  },
  image: {
    marginLeft: 10,
    marginTop: 5
  }
}
)


export default App;
