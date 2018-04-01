---

id: lists
title: Lists
---

![Lists](/react-native-elements/img/lists.png)

#### Using Map Function. Implemented with avatar.

```js
import { List, ListItem } from 'react-native-elements'

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  ... // more items
]

<List containerStyle={{marginBottom: 20}}>
  {
    list.map((l, i) => (
      <ListItem
        key={i}
        avatar={{ source: { uri: l.avatar_url } }}
        title={l.name}
        subtitle={l.subtitle}
      />
    ))
  }
</List>
```

#### Using Map Function. Implemented with link and icon.

```js
import { List, ListItem } from 'react-native-elements'

const list = [
  {
    title: 'Appointments',
    icon: 'av-timer'
  },
  {
    title: 'Trips',
    icon: 'flight-takeoff'
  },
  ... // more items
]

<List>
  {
    list.map((item, i) => (
      <ListItem
        key={i}
        title={item.title}
        leftIcon={{ name: item.icon }}
      />
    ))
  }
</List>
```

#### Using RN FlatList. Implemented with link and avatar.

```js
import { List, ListItem } from 'react-native-elements'

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  ... // more items
]

keyExtractor = (item, index) => index

renderItem = ({ item }) => (
  <ListItem
    title={item.name}
    subtitle={item.subtitle}
    avatar={{ source: { uri: item.avatar_url } }}
  />
)
  

render () {
  return (
    <List>
      <FlatList
        keyExtractor={this.keyExtractor}
        data={this.state.dataSource}
        renderItem={this.renderItem}
      />
    </List>
  )
}
```

#### Using RN FlatList. Implemented with custom avatar component.

```js
import { List, ListItem } from 'react-native-elements'

const list = [
  {
    name: 'Amy Farha',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  ... // more items
]

keyExtractor = (item, index) => index

renderItem = ({ item }) => (
  <ListItem
    title={item.name}
    subtitle={item.subtitle}
    avatar={{
      source: item.avatar_url && { uri: item.avatar_url }
      title: item.name[0]
    }}
  />
)

render () {
  return (
    <List>
      <FlatList
        keyExtractor={this.keyExtractor}
        data={this.state.dataSource}
        renderItem={this.renderItem}
      />
    </List>
  )
}
```

#### ListItem implemented with custom View for Subtitle

```js
import { List, ListItem } from 'react-native-elements'

render () {
  return (
    <List>
      <ListItem
        title='Limited supply! Its like digital gold!'
        subtitle={
          <View style={styles.subtitleView}>
            <Image source={require('../images/rating.png')} style={styles.ratingImage}/>
            <Text style={styles.ratingText}>5 months ago</Text>
          </View>
        }
        avatar={{ source: require('../images/avatar1.jpg') }}
      />
    </List>
  )
}

styles = StyleSheet.create({
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  }
})
```

#### List Props

| prop           | default                                                                            | type           | description              |
| -------------- | ---------------------------------------------------------------------------------- | -------------- | ------------------------ |
| containerStyle | marginTop: 20, borderTopWidth: 1, borderBottomWidth: 1, borderBottomColor: #cbd2d9 | object (style) | style the list container |

#### ListItem props

|            prop            |                            default                            |                                                  type                                                   |                                                        description                                                        |
| -------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| component                  | View or TouchableHighlight if onPress method is added as prop | component                                                                                               | replace element with custom element (optional)                                                                            |
| containerStyle             | none                                                          | object (style)                                                                                          | additional main container styling (optional)                                                                              |
| contentContainerStyle      | none                                                          | object (style)                                                                                          | additional wrapper styling (title and subtitle container)                                                                 |
| rightContentContainerStyle | none                                                          | object (style)                                                                                          | additional wrapper styling (right title and subtitle container)                                                           |
| chevron                    | none                                                          | boolean                                                                                                 | set it to true if you want a chevron (optional)                                                                           |
| chevronColor               | #D1D1D6                                                       | string                                                                                                  | set disclosure color                                                                                                      |
| checkmark                  | none                                                          | boolean                                                                                                 | set it to true if you want a checkmark (optional)                                                                         |
| checkmarkColor             | iOS: #007AFF, Android: rgba(0, 0, 0, 0.54)                    | string                                                                                                  | set disclosure color                                                                                                      |
| onPress                    | none                                                          | function                                                                                                | onPress method for link (optional)                                                                                        |
| onLongPress                | none                                                          | function                                                                                                | onLongPress method for link (optional)                                                                                    |
| title                      | none                                                          | React node                                                                                              | Main title of list item                                                                                                   |
| titleStyle                 | none                                                          | Text style                                                                                              | Add additional styling                                                                                                    |
| titleProps                 | none                                                          | {[...Text props](https://facebook.github.io/react-native/docs/text.html#props)}                         | provide all props from react-native Text component                                                                        |
| subtitle                   | none                                                          | React node                                                                                              | subtitle text or custom view (optional)                                                                                   |
| subtitleStyle              | none                                                          | Text style                                                                                              | Add additional styling                                                                                                    |
| subtitleProps              | none                                                          | {[...Text props](https://facebook.github.io/react-native/docs/text.html#props)}                         | Number of lines for Subtitle                                                                                              |
| rightTitle                 | none                                                          | React node                                                                                              | Show up a title on the right side of the list item                                                                        |
| rightTitleStyle            | none                                                          | Text style                                                                                              | add additional styling                                                                                                    |
| rightTitleProps            | none                                                          | {[...Text props](https://facebook.github.io/react-native/docs/text.html#props)}                         | provide all props from react-native Text component                                                                        |
| rightSubtitle              | none                                                          | React node                                                                                              | Show up a subtitle on the right side of the list item                                                                     |
| rightSubtitleStyle         | none                                                          | Text style                                                                                              | Add additional styling                                                                                                    |
| rightSubtitleProps         | none                                                          | {[...Text props](https://facebook.github.io/react-native/docs/text.html#props)}                         | provide all props from react-native Text component                                                                        |
| leftIcon                   | none                                                          | {[...Icon props](/react-native-elements/docs/icon.html#icon-props)}<br/>**OR**<br/>React-Native element | icon configuration for left icon (optional)                                                                               |
| rightIcon                  | none                                                          | {[...Icon props](/react-native-elements/docs/icon.html#icon-props)}<br/>**OR**<br/>React-Native element | icon configuration for right icon (optional)                                                                              |
| leftAvatar                 | none                                                          | {[...Avatar props](/react-native-elements/docs/avatar.html#avatar-props)}<br/>**OR**<br/>component      | Left avatar (optional)                                                                                                    |
| rightAvatar                | none                                                          | {[...Avatar props](/react-native-elements/docs/avatar.html#avatar-props)}<br/>**OR**<br/>component      | Right avatar (optional)                                                                                                   |
| leftElement                | none                                                          | React node                                                                                              | Add this element at the left side of the list item                                                                        |
| rightElement               | none                                                          | React node                                                                                              | Add this element at the right side of the list item                                                                       |
| switch                     | none                                                          | {[...Switch props](https://facebook.github.io/react-native/docs/switch.html#props)}                     | add a switch to the right side (Note: you just have to set this prop to display the switch)                               |
| input                      | none                                                          | {[...Input props](/react-native-elements/docs/input.html#input-props)}                                  | Whether to have the right area be an input text component (Note: you just have to set this prop to display the textinput) |
| buttonGroup                | none                                                          | {[...ButtonGroup props](/react-native-elements/docs/button_group.html#buttongroup-props)}               | add button group to the right side (Note: you just have to set this prop to display the button group)                     |
| checkbox                   | none                                                          | {[...CheckBox props](/react-native-elements/docs/checkbox.html#checkbox-props)}                         | add a checkbox to the right side (Note: you just have to set this prop to display the checkbox)                           |
| badge                      | none                                                          | {[...Badge props](/react-native-elements/docs/badge.html#badge-props)}                                  | add a badge to the right side (Note: you just have to set this prop to display the badge)                                 |
| disabled                   | false                                                         | boolean                                                                                                 | If true the user won't be able to perform any action on the list item.                                                    |
| disabledStyle              | none                                                          | object (style)                                                                                          | Specific styling to be used when list item is disabled.                                                                   |
| topDivider                 | false                                                         | bool                                                                                                    | Add divider at the top of the list item                                                                                   |
| bottomDivider              | false                                                         | bool                                                                                                    | Add divider at the bottom of the list item                                                                                |
| scaleProps                 | none                                                          | {[...Scale props](https://github.com/kohver/react-native-touchable-scale)}                              | Provide all props for scale feedback                                                                                      |
| ViewComponent              | View                                                          | React Native Component                                                                                  | Container for linear gradient (for non-expo user)                                                                         |

#### Badges

![Badges](/react-native-elements/img/list-badges.jpeg)

Example badge usage

```js
<ListItem
  ...
  badge={{ value: 3, textStyle: { color: 'orange' }, containerStyle: { marginTop: -20 } }}
/>
```

#### Linear gradient + Scale feedback

<img src="/react-native-elements/img/listitem_with_gradient_scale.gif" width="500" >

```js
import LinearGradient from 'react-native-linear-gradient' // Only if no expo

  <ListItem
    scaleProps={{
      friction: 90,
      tension: 100,
      activeScale: 0.95,
    }}
    linearGradientProps={{
      colors: ['#FF9800', '#F44336'],
      start: [1, 0],
      end: [0.2, 0],
    }}
    ViewComponent={LinearGradient} // Only if no expo
    leftAvatar={{ rounded: true, source: { uri: avatar_url } }}
    title="Chris Jackson"
    titleStyle={{ color: 'white', fontWeight: 'bold' }}
    subtitleStyle={{ color: 'white' }}
    subtitle="Vice Chairman"
    chevronColor="white"
    chevron
  />
```
