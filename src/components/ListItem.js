import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from './common';

class ListItem extends Component {
  render() {
    const { title, children, icons } = this.props;
    const { containerStyle,
            rowContainerStyle,
            titleTextStyle,
            iconContainerStyle,
            titleContainerStyle,
            moreInfoContainer,
            iconStyle
         } = styles;
    // this func will render icons passed from props
    const renderIcons = () => {
      return icons.map((iconName) => {
          return (
            <Icon key={iconName} style={iconStyle} name={iconName} size={18} color="#a8b5bd" />
          );
      });
    };
    return (
      <View style={containerStyle}>
        <View style={rowContainerStyle}>
          <View style={iconContainerStyle}>
            {renderIcons()}
          </View>
          <View style={titleContainerStyle}>
            <Text style={titleTextStyle}>{title}</Text>
            <Icon name="line" size={12} color="#214a60" />
          </View>
        </View>
          <View style={moreInfoContainer}>
            {children}
          </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    borderTopWidth: 1,
    borderColor: 'rgba(0,0,0,.1)',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10
  },
  rowContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleTextStyle: {
    color: '#214a60',
    fontFamily: 'IS_Med',
    fontSize: 19,
    marginRight: 3
  },
  iconContainerStyle: {
    flexDirection: 'row'
  },
  iconStyle: {
    marginRight: 5
  },
  moreInfoContainer: {
    paddingRight: 15
  }
};
export default ListItem;
