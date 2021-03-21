import React, { useEffect, useRef, useContext, useMemo, useCallback, } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';
import { ToastContext, ToastPosition, ToastTypes, } from './ToastProvider';
const Message = ({ message, onHide }) => {
    const { duration, position, containerMessageStyle, textMessageStyle, } = useContext(ToastContext);
    const opacity = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.sequence([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.delay(duration),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => onHide());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const animationContainerStyles = useMemo(() => ({
        opacity,
        transform: [
            {
                translateY: opacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [position === ToastPosition.top ? -20 : 20, 0],
                }),
            },
        ],
    }), [opacity, position]);
    const createTypedStyles = useCallback(function (styles) {
        var _a;
        const localStyles = Object.assign({}, styles);
        const typedStyles = Object.assign({}, ((_a = localStyles[message.type]) !== null && _a !== void 0 ? _a : {}));
        for (let key in ToastTypes) {
            delete localStyles[key];
        }
        return Object.keys(typedStyles).length > 0
            ? Object.assign(Object.assign({}, localStyles), typedStyles)
            : localStyles;
    }, [message.type]);
    const typedContainerStyles = createTypedStyles(containerMessageStyle);
    const typedTextStyles = createTypedStyles(textMessageStyle);
    return (<Animated.View style={StyleSheet.flatten([
        animationContainerStyles,
        styles.messageContainer,
        typedContainerStyles,
    ])}>
      <Text style={StyleSheet.flatten([styles.message, typedTextStyles])}>
        {message.text}
      </Text>
    </Animated.View>);
};
const styles = StyleSheet.create({
    messageContainer: {
        margin: 10,
        marginBottom: 5,
        padding: 10,
        borderRadius: 4,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 6,
    },
    message: {},
});
export default Message;
