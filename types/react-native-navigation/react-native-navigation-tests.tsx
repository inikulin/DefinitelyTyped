import * as React from 'react';
import { Text, View } from 'react-native';
import { Navigation, NavigationComponentProps, NavigatorStyle, NavigatorButtons, NavigatorEvent } from 'react-native-navigation';

type Props = NavigationComponentProps & { height: number };

class Screen1 extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent = (event: NavigatorEvent) => {
        if (event.id === 'willAppear') {
            console.log('will appear');
        }
    }

    static navigatorButtons: NavigatorButtons = {
        leftButtons: [{
            id: 'sideMenu'
        }]
    };

    componentDidMount() {
        this.props.navigator.push({ screen: 'example.Screen2', overrideBackPress: false });
        this.props.navigator.setTabBadge({ badge: null });
    }

    render() {
        return (
            <View style={{ height: this.props.height }}>
                <Text>Screen 1</Text>
            </View>
        );
    }
}

class Screen2 extends React.Component<NavigationComponentProps> {
    static navigatorStyle: NavigatorStyle = {
        drawUnderNavBar: true,
        navBarTranslucent: true
    };

    componentDidMount() {
        this.props.navigator.resetTo({ screen: 'example.Screen1' });
    }

    render() {
        return (
            <View>
                <Text>Screen 2</Text>
            </View>
        );
    }
}

const Drawer = (props: NavigationComponentProps) => {
    return (
        <View>
            <Text>Drawer</Text>
        </View>
    );
};

Navigation.registerComponent('example.Screen1', () => Screen1);
Navigation.registerComponent('example.Screen2', () => Screen2);
Navigation.registerComponent('example.Drawer', () => Drawer);

Navigation.startSingleScreenApp({
    screen: {
        screen: 'example.Screen1',
        title: 'Screen 1',
    },
    drawer: {
        left: {
            screen: 'example.Drawer',
        }
    }
});
