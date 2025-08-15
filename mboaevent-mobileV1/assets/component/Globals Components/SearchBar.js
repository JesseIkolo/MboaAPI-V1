import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import IconsearchSvgComponent from "../SVG/iconSearch";

/**
 * Barre de recherche réutilisable
 * @param {Object} props
 * @param {string} [props.titleText]
 * @param {string} [props.placeholder]
 * @param {string} [props.value]
 * @param {(text: string) => void} [props.onChangeText]
 * @param {() => void} [props.onSubmit]
 * @param {Object} [props.containerStyle]
 * @param {Object} [props.inputStyle]
 * @param {Object} [props.buttonStyle]
 * @param {Object} [props.titleStyle]
 */
const SearchBar = ({
    titleText,
    placeholder = "Rechercher...",
    value,
    onChangeText,
    onSubmit,
    containerStyle,
    inputStyle,
    buttonStyle,
    titleStyle,
    textAlign,
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {titleText ? (
                <Text style={[styles.titleText, titleStyle, { textAlign: textAlign }]}>{titleText}</Text>
            ) : null}
            <View style={styles.row}>
                <TextInput
                    style={[styles.input, inputStyle]}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    returnKeyType="search"
                    onSubmitEditing={onSubmit}
                />
                <TouchableOpacity style={[styles.searchButton, buttonStyle]} onPress={onSubmit}>
                    <IconsearchSvgComponent />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 0,
        gap: 12,
    },
    titleText: {
        color: '#020931',
        fontSize: 15,
        fontFamily: 'regularBold',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    input: {
        backgroundColor: '#E6E8F2',
        height: 53,
        borderRadius: 12,
        paddingHorizontal: 12,
        alignSelf: 'stretch',
        flex: 1,
    },
    searchButton: {
        backgroundColor: '#041578',
        width: 53,
        height: 53,
        borderRadius: 12,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SearchBar;


