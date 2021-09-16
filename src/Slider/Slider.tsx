import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  PanResponder,
  Platform,
  ViewStyle,
  StyleProp,
  GestureResponderEvent,
  PanResponderGestureState,
  LayoutChangeEvent,
} from 'react-native';
import { RneFunctionComponent } from '../helpers';
import { Rect } from './components/Rect';
import { SliderThumb } from './components/SliderThumb';

const TRACK_SIZE = 4;
const THUMB_SIZE = 40;
const TRACK_STYLE = Platform.select({ web: 0, default: -1 });
const DEFAULT_ANIMATION_CONFIGS = {
  spring: {
    friction: 7,
    tension: 100,
    useNativeDriver: true,
  },
  timing: {
    duration: 150,
    easing: Easing.inOut(Easing.ease),
    delay: 0,
    useNativeDriver: true,
  },
};

// return a value bounded to min/max
const getBoundedValue = (
  value: number,
  maximumValue: number,
  minimumValue: number
) => Math.max(Math.min(value, maximumValue), minimumValue);

// define handler functions not related to props or state

// Should we allow another component to take over this pan?
const handlePanResponderRequestEnd = () => false;

// Should we become active when the user moves a touch over the thumb?
const handleMoveShouldSetPanResponder = () => !TRACK_STYLE;

type Sizable = {
  width: number;
  height: number;
};

// enum to track vars that contain Sizable structures (used by handleMeasure)
enum SizableVars {
  containerSize = 'containerSize',
  thumbSize = 'thumbSize',
  trackSize = 'trackSize',
}

export type SliderProps = {
  /** Initial value of the slider. */
  value?: number;

  /** If true the user won't be able to move the slider. */
  disabled?: boolean;

  /** Initial minimum value of the slider. */
  minimumValue?: number;

  /** Initial maximum value of the slider. */
  maximumValue?: number;

  /** Step value of the slider. The value should be between 0 and maximumValue - minimumValue). */
  step?: number;

  /** The color used for the track to the left of the button. */
  minimumTrackTintColor?: string;

  /** The color used for the track to the right of the button. */
  maximumTrackTintColor?: string;

  /** If true, thumb will respond and jump to any touch along the track. */
  allowTouchTrack?: boolean;

  /** The color used for the thumb. */
  thumbTintColor?: string;

  /** The size of the touch area that allows moving the thumb. The touch area has the same center as the visible thumb. This allows to have a visually small thumb while still allowing the user to move it easily. */
  thumbTouchSize?: Sizable;

  /** Callback continuously called while the user is dragging the slider. */
  onValueChange?(value: number): void;

  /** Callback called when the user starts changing the value (e.g. when the slider is pressed). */
  onSlidingStart?(value: number): void;

  /** Callback called when the user finishes changing the value (e.g. when the slider is released). */
  onSlidingComplete?(value: number): void;

  /** The style applied to the slider container. */
  style?: StyleProp<ViewStyle>;

  /** The style applied to the track. */
  trackStyle?: StyleProp<ViewStyle>;

  /** The style applied to the thumb. */
  thumbStyle?: StyleProp<ViewStyle>;

  /** The props applied to the thumb. Uses `Component` prop which can accept `Animated` components. */
  thumbProps?: any;

  /** Set this to true to visually see the thumb touch rect in green. */
  debugTouchArea?: boolean;

  /** Set to true if you want to use the default 'spring' animation. */
  animateTransitions?: boolean;

  /** Set to 'spring' or 'timing' to use one of those two types of animations with the default [animation properties](https://reactnative.dev/docs/animations.html). */
  animationType?: 'spring' | 'timing';

  /** Set the orientation of the slider. */
  orientation?: 'horizontal' | 'vertical';

  /** Used to configure the animation parameters. These are the same parameters in the [Animated library](https://reactnative.dev/docs/animations.html). */
  animationConfig?:
    | Animated.TimingAnimationConfig
    | Animated.SpringAnimationConfig;

  /** Apply style to the container of the slider. */
  containerStyle?: typeof styles;
};

/** Sliders allow users to select a value from a fixed set of values using drag utility.*/
export const Slider: RneFunctionComponent<SliderProps> = ({
  allowTouchTrack,
  animateTransitions,
  animationConfig,
  animationType,
  containerStyle,
  debugTouchArea,
  disabled,
  maximumTrackTintColor,
  maximumValue,
  minimumTrackTintColor,
  minimumValue,
  onSlidingComplete,
  onSlidingStart,
  onValueChange,
  orientation,
  step,
  style,
  thumbProps,
  thumbStyle,
  thumbTintColor,
  thumbTouchSize,
  trackStyle,
  value: _value,
  ...other
}) => {
  const value = getBoundedValue(_value, maximumValue, minimumValue);
  const _previousLeft = useRef(0);
  const [allMeasured, setAllMeasured] = useState(false);
  const [containerSize, setContainerSize] = useState<Sizable>({
    width: 0,
    height: 0,
  });
  const [trackSize, setTrackSize] = useState<Sizable>({ width: 0, height: 0 });
  const [thumbSize, setThumbSize] = useState<Sizable>({ width: 0, height: 0 });
  const isVertical = orientation === 'vertical';

  const animatedValue = useRef(new Animated.Value(value));

  // update size rect for given variable
  const handleMeasure = useCallback(
    (name: SizableVars, event: LayoutChangeEvent) => {
      console.debug(
        `handleMeasure: name=${name}, event.nativeEvent.layout=`,
        event.nativeEvent.layout
      ); //DELETE
      // get current value and setter for the appropriate variable
      const varInfo = {
        containerSize: { size: containerSize, setSize: setContainerSize },
        thumbSize: { size: thumbSize, setSize: setThumbSize },
        trackSize: { size: trackSize, setSize: setTrackSize },
      };
      const { size, setSize } = varInfo[name];

      // update the var's size, adjusting for horizontal/vertical
      const rect = event.nativeEvent.layout;
      const rectWidth = rect?.width ?? size.width;
      const rectHeight = rect?.height ?? size.height;
      const newSize = {
        height: isVertical ? rectWidth : rectHeight,
        width: isVertical ? rectHeight : rectWidth,
      };
      setSize(newSize);
    },
    [containerSize, isVertical, thumbSize, trackSize]
  );

  // use an effect to update allMeasured when sizes change
  useEffect(
    () =>
      setAllMeasured(
        !!(
          containerSize.height &&
          containerSize.width &&
          thumbSize.height &&
          thumbSize.width &&
          trackSize.height &&
          trackSize.width
        )
      ),
    [
      containerSize.height,
      containerSize.width,
      thumbSize.height,
      thumbSize.width,
      trackSize.height,
      trackSize.width,
    ]
  );

  const measureContainer = useCallback(
    (event) => handleMeasure(SizableVars.containerSize, event),
    [handleMeasure]
  );
  const measureTrack = useCallback(
    (event) => handleMeasure(SizableVars.trackSize, event),
    [handleMeasure]
  );
  const measureThumb = useCallback(
    (event) => handleMeasure(SizableVars.thumbSize, event),
    [handleMeasure]
  );

  const currentPropValue = useRef(value);
  const prevPropValue = useRef(value);

  const setCurrentValue = useCallback(
    (v: number) => animatedValue.current.setValue(v),
    [animatedValue]
  );

  // update current value if is changed
  useEffect(() => setCurrentValue(value), [setCurrentValue, value]);

  const setCurrentValueAnimated = useCallback(
    (v: Animated.Value) => {
      Animated[animationType](animatedValue.current, {
        ...DEFAULT_ANIMATION_CONFIGS[animationType],
        ...animationConfig,
        toValue: v,
      }).start();
    },
    [animationConfig, animationType]
  );

  // update animation values if value changed
  useEffect(() => {
    // if value prop changed, we need to update
    if (prevPropValue.current !== value) {
      prevPropValue.current = value;
      if (animateTransitions) {
        setCurrentValueAnimated(new Animated.Value(value));
      } else {
        setCurrentValue(value);
      }
    }
  }, [
    animateTransitions,
    maximumValue,
    minimumValue,
    setCurrentValue,
    setCurrentValueAnimated,
    value,
  ]);

  const getValueForTouch = useCallback(
    (location: number) => {
      const length = containerSize.width - thumbSize.width;
      const ratio = location / length;
      let newValue = ratio * (maximumValue - minimumValue);
      if (step) {
        newValue = Math.round(newValue / step) * step;
      }

      return getBoundedValue(
        newValue + minimumValue,
        maximumValue,
        minimumValue
      );
    },
    [containerSize.width, maximumValue, minimumValue, step, thumbSize.width]
  );

  // get value of where some touched on slider.
  const getOnTouchValue = useCallback(
    ({ nativeEvent }: GestureResponderEvent) => {
      const location = isVertical
        ? nativeEvent.locationY
        : nativeEvent.locationX;
      return getValueForTouch(location);
    },
    [getValueForTouch, isVertical]
  );

  const getRatio = useCallback(
    (value1: number) => (value1 - minimumValue) / (maximumValue - minimumValue),
    [maximumValue, minimumValue]
  );

  const getThumbLeft = useCallback(
    (value1: number) => {
      const ratio = getRatio(value1);
      return ratio * (containerSize.width - thumbSize.width);
    },
    [containerSize.width, getRatio, thumbSize.width]
  );

  const getTouchOverflowSize = useCallback(
    (): Sizable =>
      allMeasured
        ? {
            height: Math.max(0, thumbTouchSize.height - containerSize.height),
            width: Math.max(0, thumbTouchSize.width - thumbSize.width),
          }
        : { height: 0, width: 0 },
    [
      allMeasured,
      containerSize.height,
      thumbSize.width,
      thumbTouchSize.height,
      thumbTouchSize.width,
    ]
  );

  const getThumbTouchRect = useCallback(() => {
    const touchOverflowSize: any = getTouchOverflowSize();
    const thumbTouchHeight = thumbTouchSize?.height || THUMB_SIZE;
    const thumbTouchWidth = thumbTouchSize?.width || THUMB_SIZE;
    const height =
      touchOverflowSize.height / 2 +
      (containerSize.height - thumbTouchHeight) / 2;
    const width =
      touchOverflowSize.width / 2 +
      getThumbLeft(currentPropValue.current) +
      (thumbSize.width - thumbTouchWidth) / 2;
    return isVertical
      ? new Rect(height, width, thumbTouchWidth, thumbTouchHeight)
      : new Rect(width, height, thumbTouchWidth, thumbTouchHeight);
  }, [
    containerSize.height,
    getThumbLeft,
    getTouchOverflowSize,
    isVertical,
    thumbSize.width,
    thumbTouchSize?.height,
    thumbTouchSize?.width,
  ]);

  const getValue = useCallback(
    (gestureState: PanResponderGestureState) => {
      const location =
        _previousLeft.current +
        (isVertical ? gestureState.dy : gestureState.dx);
      return getValueForTouch(location);
    },
    [getValueForTouch, isVertical]
  );

  const handlePanResponderGrant = useCallback(() => {
    _previousLeft.current = getThumbLeft(currentPropValue.current);
    onSlidingStart(currentPropValue.current);
  }, [getThumbLeft, onSlidingStart]);

  const handlePanResponderMove = useCallback(
    (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
      if (disabled) {
        return;
      }
      setCurrentValue(getValue(gestureState));
      onValueChange(currentPropValue.current);
    },
    [disabled, getValue, onValueChange, setCurrentValue]
  );

  const handlePanResponderEnd = useCallback(
    (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
      if (disabled) {
        return;
      }
      setCurrentValue(getValue(gestureState));
      onSlidingComplete(currentPropValue.current);
    },
    [disabled, getValue, onSlidingComplete, setCurrentValue]
  );

  const thumbHitTest = useCallback(
    ({ nativeEvent }: GestureResponderEvent) => {
      const thumbTouchRect = getThumbTouchRect();
      return thumbTouchRect.containsPoint(
        nativeEvent.locationX,
        nativeEvent.locationY
      );
    },
    [getThumbTouchRect]
  );

  const handleStartShouldSetPanResponder = useCallback(
    (e: GestureResponderEvent /* gestureState: Object */) => {
      // Should we become active when the user presses down on the thumb?

      if (!allowTouchTrack && !TRACK_STYLE) {
        return thumbHitTest(e);
      }
      if (!trackStyle) {
        setCurrentValue(getOnTouchValue(e));
      }
      onValueChange(currentPropValue.current);
      return true;
    },
    [
      allowTouchTrack,
      getOnTouchValue,
      onValueChange,
      setCurrentValue,
      thumbHitTest,
      trackStyle,
    ]
  );

  const getTouchOverflowStyle = useCallback(() => {
    const { width, height } = getTouchOverflowSize();
    const touchOverflowStyle: ViewStyle = {};
    const verticalMargin = -height / 2;
    touchOverflowStyle.marginTop = verticalMargin;
    touchOverflowStyle.marginBottom = verticalMargin;
    const horizontalMargin = -width / 2;
    touchOverflowStyle.marginLeft = horizontalMargin;
    touchOverflowStyle.marginRight = horizontalMargin;
    if (debugTouchArea === true) {
      touchOverflowStyle.backgroundColor = 'orange';
      touchOverflowStyle.opacity = 0.5;
    }
    return touchOverflowStyle;
  }, [debugTouchArea, getTouchOverflowSize]);

  useEffect(() => {
    const _animatedValue = animatedValue.current;
    let listenerID = _animatedValue.addListener((obj) => {
      console.debug('animatedValue.listener: obj=', obj); //DELETE
      currentPropValue.current = obj.value;
    });
    return () => _animatedValue.removeListener(listenerID);
  }, []);

  const renderDebugThumbTouchRect = useCallback(
    (thumbLeft: Animated.AnimatedInterpolation) => {
      const thumbTouchRect = getThumbTouchRect();
      const positionStyle = {
        left: thumbLeft,
        top: thumbTouchRect.y,
        width: thumbTouchRect.width,
        height: thumbTouchRect.height,
      };

      return <Animated.View style={positionStyle} pointerEvents="none" />;
    },
    [getThumbTouchRect]
  );

  const getMinimumTrackStyles = useCallback(
    (thumbStart: Animated.Animated) => {
      const minimumTrackStyle: StyleProp<any> = {
        position: 'absolute',
      };
      if (!allMeasured) {
        minimumTrackStyle.height = 0;
        minimumTrackStyle.width = 0;
      } else if (isVertical) {
        minimumTrackStyle.height = Animated.add(
          thumbStart,
          thumbSize.height / 2
        );
        minimumTrackStyle.marginLeft = trackSize.width * TRACK_STYLE;
      } else {
        minimumTrackStyle.width = Animated.add(thumbStart, thumbSize.width / 2);
        minimumTrackStyle.marginTop = trackSize.height * TRACK_STYLE;
      }
      return minimumTrackStyle;
    },
    [
      allMeasured,
      isVertical,
      thumbSize.height,
      thumbSize.width,
      trackSize.height,
      trackSize.width,
    ]
  );

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: handleStartShouldSetPanResponder,
        onMoveShouldSetPanResponder: handleMoveShouldSetPanResponder,
        onPanResponderGrant: handlePanResponderGrant,
        onPanResponderMove: handlePanResponderMove,
        onPanResponderRelease: handlePanResponderEnd,
        onPanResponderTerminationRequest: handlePanResponderRequestEnd,
        onPanResponderTerminate: handlePanResponderEnd,
      }),
    [
      handleStartShouldSetPanResponder,
      handlePanResponderGrant,
      handlePanResponderMove,
      handlePanResponderEnd,
    ]
  );

  const mainStyles = containerStyle ?? styles;
  const appliedTrackStyle = StyleSheet.flatten([styles.track, trackStyle]);
  const thumbStart = animatedValue.current.interpolate({
    inputRange: [minimumValue, maximumValue],
    outputRange: [0, containerSize.width - thumbSize.width],
  });
  const minimumTrackStyle = {
    ...getMinimumTrackStyles(thumbStart),
    backgroundColor: minimumTrackTintColor,
  };
  const touchOverflowStyle = getTouchOverflowStyle();

  return (
    <View
      testID="RNE__Slider_Container"
      {...other}
      style={StyleSheet.flatten([
        isVertical
          ? mainStyles.containerVertical
          : mainStyles.containerHorizontal,
        style,
      ])}
      onLayout={measureContainer}
      accessibilityRole="adjustable"
      accessibilityValue={{
        min: minimumValue,
        max: maximumValue,
        now: currentPropValue.current,
      }}
    >
      <View
        testID="RNE__Slider_Track_maximum"
        style={StyleSheet.flatten([
          mainStyles.track,
          isVertical ? mainStyles.trackVertical : mainStyles.trackHorizontal,
          appliedTrackStyle,
          { backgroundColor: maximumTrackTintColor },
        ])}
        onLayout={measureTrack}
      />

      <Animated.View
        testID="RNE__Slider_Track_minimum"
        style={StyleSheet.flatten([
          mainStyles.track,
          isVertical ? mainStyles.trackVertical : mainStyles.trackHorizontal,
          appliedTrackStyle,
          minimumTrackStyle,
        ])}
      />
      <SliderThumb
        isVisible={allMeasured}
        onLayout={measureThumb}
        style={thumbStyle}
        color={thumbTintColor}
        start={thumbStart}
        vertical={isVertical}
        {...thumbProps}
      />
      <View
        testID="RNE__Slider_TouchArea"
        style={StyleSheet.flatten([styles.touchArea, touchOverflowStyle])}
        {...panResponder.panHandlers}
      >
        {debugTouchArea === true && renderDebugThumbTouchRect(thumbStart)}
      </View>
    </View>
  );
};

Slider.defaultProps = {
  value: 0,
  minimumValue: 0,
  maximumValue: 1,
  step: 0,
  minimumTrackTintColor: '#3f3f3f',
  maximumTrackTintColor: '#b3b3b3',
  allowTouchTrack: false,
  thumbTintColor: 'red',
  thumbTouchSize: { width: THUMB_SIZE, height: THUMB_SIZE },
  debugTouchArea: false,
  animationType: 'timing',
  orientation: 'horizontal',
};

const styles = StyleSheet.create({
  containerHorizontal: {
    height: 40,
    justifyContent: 'center',
  },
  containerVertical: {
    width: 40,
    flexDirection: 'column',
    alignItems: 'center',
  },
  track: {
    borderRadius: TRACK_SIZE / 2,
  },
  trackHorizontal: {
    height: TRACK_SIZE,
  },
  trackVertical: {
    flex: 1,
    width: TRACK_SIZE,
  },

  touchArea: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  debugThumbTouchArea: {
    position: 'absolute',
    backgroundColor: 'green',
    opacity: 0.5,
  },
});

Slider.displayName = 'Slider';
