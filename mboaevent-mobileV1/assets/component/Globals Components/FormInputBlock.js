import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Sms, Call, Lock, User, Profile2User, Profile, Tag } from 'iconsax-react-nativejs';

const iconMap = {
  sms: Sms,
  call: Call,
  lock: Lock,
  user: User,
  'profile-2user': Profile2User,
  profile: Profile,
  tag: Tag,
};

const FormInputBlock = ({
    label,
    value,
    onChangeText,
    onBlur,
    placeholder,
    placeholderTextColor = '#B0B0B0',
    inputStyle = {},
    error = '',
    isValid = false,
    touched = false,
    secureTextEntry = false,
    keyboardType = 'default',
    autoCapitalize = 'none',
    iconName, // nouvelle prop
    iconColor = '#041578',
    children,
}) => {
    const IconComponent = iconMap[iconName];
    return (
        <View style={styles.inputBlock}>
            <Text style={styles.label}>{label}</Text>
            <View style={[styles.inputRow,styles.input]}>
                
                <TextInput
                    style={inputStyle}
                    value={value}
                    onChangeText={onChangeText}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                />
                {IconComponent && (
                    <IconComponent size={16} color={iconColor} style={{ marginRight: 8 }} />
                )}
                {children}
            </View>
            {!!error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    inputBlock: {
        width: '100%',
        marginBottom: 12,
    },
    label: {
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 15,
        color: '#1E2448',
        marginBottom: 4,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        backgroundColor: '#F5F5F6',
        paddingHorizontal: 12,
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 16,
        color: '#1E2448',
        display : 'flex',
        justifyContent : 'space-between'
    },
    error: {
        color: '#F52424',
        fontSize: 13,
        marginTop: 2,
        fontFamily: 'TitilliumWeb-Regular',
    },
});

export default FormInputBlock; 