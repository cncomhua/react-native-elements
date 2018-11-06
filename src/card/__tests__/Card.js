import React from 'react';
import { TextInput } from 'react-native';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { create } from 'react-test-renderer';

import conditionalWrap from '../../helpers/conditionalWrap';

import theme from '../../config/theme';
import { ThemeProvider } from '../../config';

import ThemedCard, { Card } from '../Card';

describe('Card Component', () => {
  it('should render without issues', () => {
    const component = shallow(<Card theme={theme} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should have Card title without image', () => {
    const component = shallow(
      <Card
        theme={theme}
        title="Card Title"
        containerStyle={{ backgroundColor: 'red' }}
        fontFamily="arial"
        dividerStyle={{ backgroundColor: 'red' }}
        flexDirection="row"
      />
    );

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should have Card title with image', () => {
    const component = shallow(
      <Card
        theme={theme}
        title="HELLO WORLD"
        image={{
          uri:
            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        }}
        containerStyle={{ backgroundColor: 'red' }}
        titleStyle={{ backgroundColor: 'red' }}
        fontFamily="arial"
      />
    );

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should have Card with featured title', () => {
    const component = shallow(
      <Card
        theme={theme}
        title="foo title"
        image={{
          uri:
            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        }}
        imageWrapperStyle={{ backgroundColor: 'red' }}
        imageStyle={{ backgroundColor: 'red' }}
        wrapperStyle={{ backgroundColor: 'red' }}
        featuredTitle="featured title"
        featuredSubtitle="featured sub title"
        featuredTitleStyle={{ backgroundColor: 'red' }}
        featuredSubtitleStyle={{ backgroundColor: 'red' }}
      />
    );

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should have custom component as title', () => {
    const component = shallow(<Card theme={theme} title={<TextInput />} />);

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should apply values from theme', () => {
    const theme = {
      Card: {
        title: 'Yea b',
      },
    };

    const component = create(
      <ThemeProvider theme={theme}>
        <ThemedCard />
      </ThemeProvider>
    );

    expect(
      component.root.findByProps({ testID: 'cardTitle' }).props.children
    ).toBe('Yea b');
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should render with TouchableOpacity on the image', () => {
    const component = shallow(
      <Card
        theme={theme}
        image={{
          uri:
            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        }}
        onPressImage={() => {}}
      />
    );

    expect(component.length).toBe(1);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should wrap image in conditionalWrap if onPressImage is passed ', () => {
    const component = shallow(
      <Card
        theme={theme}
        image={{
          uri:
            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        }}
        onPressImage={jest.fn()}
      />
    );

    expect(component.find(conditionalWrap).length).toBe(1);
  });
});
