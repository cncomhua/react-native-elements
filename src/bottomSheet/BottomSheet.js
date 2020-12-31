import React, { Component } from 'react';
import {
  Modal,
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { withTheme } from '../config';
import PropTypes from 'prop-types';

const MAX_HEIGHT = 300;

class BottomSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listHeight: undefined,
    };
  }

  onLayout = (event) =>
    this.setState({ listHeight: event.nativeEvent.layout.height });

  render() {
    const { listHeight } = this.state;
    const {
      containerStyle,
      isVisible,
      modalProps,
      children,
      touchOutsideToClose,
    } = this.props;
    const maxHeight = listHeight < MAX_HEIGHT ? listHeight : MAX_HEIGHT;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        {...modalProps}
      >
        <SafeAreaView
          style={StyleSheet.flatten([
            styles.safeAreaView,
            containerStyle && containerStyle,
          ])}
        >
          {touchOutsideToClose && (
            <TouchableOpacity
              style={{ flex: 1 }}
              activeOpacity={1}
              onPress={() => this.setState({ isVisible: false })}
            />
          )}
          <View style={styles.modalView}>
            <View
              style={([styles.listContainer], { maxHeight })}
              onLayout={this.onLayout}
            >
              <ScrollView>{children}</ScrollView>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: { flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' },
  modalView: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  listContainer: { backgroundColor: 'white' },
});

BottomSheet.defaultProps = {
  modalProps: {},
  isVisible: false,
};

BottomSheet.propTypes = {
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  modalProps: PropTypes.object,
  isVisible: PropTypes.bool,
};

export { BottomSheet };

export default withTheme(BottomSheet, 'BottomSheet');
