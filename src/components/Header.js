import React from 'react';
import { View, Text } from 'react-native';

const Header = ({ headerText }) => {
    const { headerSection, titleStyle } = styles;
    return (
        <View style={headerSection}>
            <Text style={titleStyle}>{ headerText }</Text>
        </View>
    );
};

const styles = {
    headerSection: {
        backgroundColor: '#f1f1f1',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
    },
    titleStyle: {
        fontSize: 20,
    }
};

export default Header;

