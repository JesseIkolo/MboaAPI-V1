import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from '../../ressource/svg/globalIcons';

const CustomCheckbox = ({ checked, onPress, style, children }) => {
    return (
        <TouchableOpacity
            style={[styles.customCheckbox, style]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            {checked ? (
                <View style={styles.checkedBox}>
                    <Icon iconName="check" />
                </View>
            ) : (
                <View style={styles.uncheckedBox} />
            )}
            {children}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    customCheckbox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkedBox: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#041578',
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: '#041578',
        marginRight: 8,
    },
    uncheckedBox: {
        width: 20,
        height: 20,
        backgroundColor: '#fff',
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: '#041578',
        marginRight: 8,
    },
});

export default CustomCheckbox; 