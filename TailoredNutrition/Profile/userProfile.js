import React, { Component } from 'react'
import {
  Animated,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Icon } from 'react-native-elements'
import {
  TabViewAnimated,
  TabBar,
  TabViewPagerScroll,
  TabViewPagerPan,
} from 'react-native-tab-view'
import PropTypes from 'prop-types'

import Posts from './Posts'
import Post from './Post'
import {keto,actualBurn} from '../NutritionFunctions';


//DB
import Expo, { SQLite } from 'expo';//Import SQLite
const db = SQLite.openDatabase('db.db'); //Open db here



const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginBottom: 10,
    marginTop: 45,
  },
  indicatorTab: {
    backgroundColor: 'transparent',
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  sceneContainer: {
    marginTop: 10,
  },
  socialIcon: {
    marginLeft: 14,
    marginRight: 14,
  },
  socialRow: {
    flexDirection: 'row',
  },
  tabBar: {
    backgroundColor: '#EEE',
  },
  tabContainer: {
    flex: 1,
    marginBottom: 12,
  },
  tabLabelNumber: {
    color: 'gray',
    fontSize: 12.5,
    textAlign: 'center',
  },
  tabLabelText: {
    color: 'black',
    fontSize: 22.5,
    fontWeight: '600',
    textAlign: 'center',
  },
  userBioRow: {
    marginLeft: 40,
    marginRight: 40,
  },
  userBioText: {
    color: 'gray',
    fontSize: 13.5,
    textAlign: 'center',
  },
  userImage: {
    borderRadius: 60,
    height: 110,
    marginBottom: 10,
    width: 110,
  },
  userNameRow: {
    marginBottom: 10,
  },
  userNameText: {
    color: '#5B5A5A',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 12,
  },
})



class userProfile extends Component {
  
  componentWillMount() {
   
  let today = new Date()
  let day = String(today).split(' ');
  let ddate = day[0] +" "+ day[1]+ " " + day[2] + " " + day[3]
  
  db.transaction(
    tx => {
      tx.executeSql('SELECT * FROM LOGS WHERE date = ? AND username = ?  ORDER BY time DESC  limit 1;',
      [ddate,global.user.user],
      (_,result)=>{
        console.log(result.rows)
        if(result.rows.length != 0){
          console.log("Updated daily limits")
           global.user.LimCal = result.rows._array[0].dcalc
           global.user.LimCarbs = result.rows._array[0].dcc
           global.user.Limfat = result.rows._array[0].dfc
           global.user.LimPro = result.rows._array[0].dpc
           
           this.renderContactHeader()
        }
      },
        (error) => {
          console.log(error)
        }
      )
    }
);
 }



  static propTypes = {
    avatar: PropTypes.string,//.isRequired,
    name: PropTypes.string,//.isRequired,
    //bio: PropTypes.string,//.isRequired,
    //bio: PropTypes.number,
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    tabContainerStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
    ]),
    post: PropTypes.string,//.isRequired,
    posts: PropTypes.string,//.isRequired,
  }

  static defaultProps = {
    containerStyle: {},
    tabContainerStyle: {},
  }

  state = {
    tabs: {
      index: 0,
      routes: [
        { key: '1', title: 'Search',},
        { key: '2', title: 'Log',},
       // { key: '3', title: 'following', count: 95 },
       // { key: '4', title: 'followers', count: '1.3 K' },
      ],
    },
  }

  onPressPlace = () => {
    console.log('place')
  }

  _handleIndexChange = index => {
    this.setState({
      tabs: {
        ...this.state.tabs,
        index,
      },
    })
  }

  _renderHeader = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={styles.indicatorTab}
        renderLabel={this._renderLabel(props)}
        pressOpacity={0.8}
        style={styles.tabBar}
      />
    )
  }

  _renderScene = ({ route: { key } }) => {
    const { post, posts } = this.props
    if(key == 1){
        return <Post navigation={this.props.navigation} containerStyle={styles.sceneContainer} post={post} />
    }
    else if (key == 2){
        return <Posts navigation={this.props.navigation} containerStyle={styles.sceneContainer} posts={posts} /> 
    }
  }

  _renderLabel = props => ({ route, index }) => {





    const inputRange = props.navigationState.routes.map((x, i) => i)
    const outputRange = inputRange.map(
      inputIndex => (inputIndex === index ? 'black' : 'gray')
    )
    const color = props.position.interpolate({
      inputRange,
      outputRange,
    })

    return (
      <View>
        <Animated.Text style={[styles.tabLabelText, { color }]}>
          {route.count}
        </Animated.Text>
        <Animated.Text style={[styles.tabLabelNumber, { color }]}>
          {route.title}
        </Animated.Text>
      </View>
    )
  }

  _renderPager = props => {
    return Platform.OS === 'ios' ? (
      <TabViewPagerScroll {...props} />
    ) : (
      <TabViewPagerPan {...props} />
    )
  }

  renderContactHeader = () => {
    const { avatar, name, bio } = this.props
  


    return (
      
      <View style={styles.headerContainer}>
        <View style={styles.userRow}>
          <Image
            style={styles.userImage}
        
            source={require("../Resources/avatar.png")}
            
          />
          <View style={styles.userNameRow}>
            <Text style={styles.userNameText}> {global.user.name} </Text>
          </View>
          <View style={styles.userBioRow}>
            
            <Text style={styles.userBioText}>Daily Carbs Limit: {(global.user.LimCarbs)}</Text>
            <Text style={styles.userBioText}>Daily Fats Limit: {(global.user.Limfat)}</Text>
            <Text style={styles.userBioText}>Daily Protein Limit: {(global.user.LimPro)}</Text>
            <Text style={styles.userBioText}>Daily Calories Limit: {(global.user.LimCal)}</Text>
          
          </View>
        </View>
        <View style={styles.socialRow}>
          <View>
            <Icon
              size={30}
              type="entypo"
              color="#3B5A98"
              name="cog"
              onPress={() => this.props.navigation.navigate('Settings')}
            />
          </View>
          
        </View>
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={styles.scroll}>
        <View style={[styles.container, this.props.containerStyle]}>
          <View style={styles.cardContainer}>
            {this.renderContactHeader()}
            <TabViewAnimated
              style={[styles.tabContainer, this.props.tabContainerStyle]}
              navigationState={this.state.tabs}
              renderScene={this._renderScene}
              renderPager={this._renderPager}
              renderHeader={this._renderHeader}
              onIndexChange={this._handleIndexChange}
            />
          </View>
        </View>
      </ScrollView>
    )
  }
}

export default userProfile