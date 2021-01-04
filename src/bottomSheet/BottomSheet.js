import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { withTheme } from '../config';
import PropTypes from 'prop-types';

function BottomSheet({
  containerStyle,
  isVisible,
  modalProps,
  children,
  touchOutsideToClose,
  ...props
}) {
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
        {...props}
      >
        {touchOutsideToClose && (
          <TouchableWithoutFeedback
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={() => this.setState({ isVisible: false })}
          />
        )}
        <View>
          <ScrollView>{children}</ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
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
