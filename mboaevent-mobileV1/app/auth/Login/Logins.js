import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Dimensions, TextInput, Animated, ActivityIndicator, Image } from 'react-native';
import { useRouter } from 'expo-router';
import FormInputBlock from '../../../assets/component/Globals Components/FormInputBlock';
import Icon from '../../../assets/ressource/svg/globalIcons';
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
const OTP_LENGTH = 4;

const Logins = () => {
    const router = useRouter();
    const [block, setBlock] = useState(1); // 1: login, 2: forgot, 3: otp, 4: new password
    const [mode, setMode] = useState('phone'); // 'phone' | 'email' | 'username'
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [forgotValue, setForgotValue] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);
    const [otpTimer, setOtpTimer] = useState(20);
    const [otpError, setOtpError] = useState('');
    const otpInputs = [useRef(), useRef(), useRef(), useRef()];
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [touched, setTouched] = useState({});
    const [globalError, setGlobalError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const animBlock = useRef(new Animated.Value(1)).current;

    // Animation
    const fadeOut = (cb) => {
        Animated.timing(animBlock, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => cb && cb());
    };
    const fadeIn = () => {
        Animated.timing(animBlock, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    };
    const goToBlock = (nextBlock) => {
        fadeOut(() => {
            setBlock(nextBlock);
            setGlobalError('');
            fadeIn();
        });
    };

    // OTP timer
    useEffect(() => {
        if (block === 3 && otpTimer > 0) {
            const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [block, otpTimer]);

    // Validation helpers
    const isPhoneValid = /^((\+|00)[0-9]{8,15}|0[0-9]{8,15})$/.test(phone);
    const isEmailValid = /.+@.+\..+/.test(email);
    const isUsernameValid = username.length >= 4;
    const isPasswordValid = password.length >= 6;
    const canLogin =
        (mode === 'phone' && isPhoneValid && isPasswordValid) ||
        (mode === 'email' && isEmailValid && isPasswordValid) ||
        (mode === 'username' && isUsernameValid && isPasswordValid);
    const canForgot =
        (mode === 'phone' && isPhoneValid) ||
        (mode === 'email' && isEmailValid) ||
        (mode === 'username' && isUsernameValid);
    const isOtpComplete = otp.every((d) => d.length === 1);
    const canContinueOtp = isOtpComplete;
    const isNewPasswordValid = newPassword.length >= 6;
    const isConfirmPasswordValid = newPassword === confirmPassword && confirmPassword.length > 0;
    const canSetNewPassword = isNewPasswordValid && isConfirmPasswordValid;

    // OTP handlers
    const handleOtpChange = (value, idx) => {
        if (/^[0-9]?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[idx] = value;
            setOtp(newOtp);
            setOtpError('');
            if (value && idx < OTP_LENGTH - 1) {
                otpInputs[idx + 1].current.focus();
            }
            if (!value && idx > 0) {
                otpInputs[idx - 1].current.focus();
            }
        }
    };

    // SwitchSelector
    const renderSwitchSelector = () => (
        <View style={styles.switchSelector}>
            <TouchableOpacity
                style={[styles.switchBtn, mode === 'phone' && styles.switchBtnActive]}
                onPress={() => setMode('phone')}
            >
                <Text style={[styles.switchText, mode === 'phone' && styles.switchTextActive]}>Téléphone</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.switchBtn, mode === 'email' && styles.switchBtnActive]}
                onPress={() => setMode('email')}
            >
                <Text style={[styles.switchText, mode === 'email' && styles.switchTextActive]}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.switchBtn, mode === 'username' && styles.switchBtnActive]}
                onPress={() => setMode('username')}
            >
                <Text style={[styles.switchText, mode === 'username' && styles.switchTextActive]}>Nom d'util...</Text>
            </TouchableOpacity>
        </View>
    );

    // Bloc 1 : Login
    const renderLoginBlock = () => (
        <>
            <Text style={styles.title}>Connectez-vous</Text>
            {globalError ? <Text style={styles.globalError}>{globalError}</Text> : <Text style={styles.introText}>Choisissez un mode de connexion afin d'accerder a votre compte</Text>}
            {renderSwitchSelector()}
            {mode === 'phone' && (
                <FormInputBlock
                    label="Numéro de téléphone"
                    value={phone}
                    onChangeText={setPhone}
                    onBlur={() => setTouched(t => ({ ...t, phone: true }))}
                    placeholder="+237 6XX XX XX XX"
                    inputStyle={isPhoneValid ? styles.inputValid : (touched.phone ? styles.inputError : {})}
                    error={touched.phone && !isPhoneValid ? "Numéro de téléphone invalide" : ''}
                    touched={touched.phone}
                    isValid={isPhoneValid}
                    keyboardType="phone-pad"
                    autoCapitalize="none"
                    iconName="call"
                    iconColor="#798588"
                />
            )}
            {mode === 'email' && (
                <FormInputBlock
                    label="Adresse email"
                    value={email}
                    onChangeText={setEmail}
                    onBlur={() => setTouched(t => ({ ...t, email: true }))}
                    placeholder="exemple@gmail.com"
                    inputStyle={isEmailValid ? styles.inputValid : (touched.email ? styles.inputError : {})}
                    error={touched.email && !isEmailValid ? "Adresse email invalide" : ''}
                    touched={touched.email}
                    isValid={isEmailValid}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    iconName="sms"
                    iconColor="#798588"
                />
            )}
            {mode === 'username' && (
                <FormInputBlock
                    label="Nom d'utilisateur"
                    value={username}
                    onChangeText={setUsername}
                    onBlur={() => setTouched(t => ({ ...t, username: true }))}
                    placeholder="mboa254"
                    inputStyle={isUsernameValid ? styles.inputValid : (touched.username ? styles.inputError : {})}
                    error={touched.username && !isUsernameValid ? "Nom d'utilisateur trop court" : ''}
                    touched={touched.username}
                    isValid={isUsernameValid}
                    autoCapitalize="none"
                    iconName="user"
                    iconColor="#798588"
                />
            )}
            <FormInputBlock
                label="Mot de passe"
                value={password}
                onChangeText={setPassword}
                onBlur={() => setTouched(t => ({ ...t, password: true }))}
                placeholder=""
                inputStyle={isPasswordValid ? styles.inputValid : (touched.password ? styles.inputError : {})}
                error={touched.password && !isPasswordValid ? "6 caractères minimum" : ''}
                touched={touched.password}
                isValid={isPasswordValid}
                secureTextEntry
                iconName="lock"
                iconColor="#798588"
            />
            <TouchableOpacity
                style={[styles.submitBtn, !canLogin && styles.submitBtnDisabled]}
                disabled={!canLogin || isLoading}
                onPress={async () => {
                    setGlobalError('');
                    setIsLoading(true);
                    setTimeout(() => {
                        setIsLoading(false);
                        if (mode === 'username' && username === 'wrong') {
                            setGlobalError('Nom d\'utilisateur ou mot de passe incorrect.');
                        } else {
                            // Simule la connexion réussie
                            router.replace('/home');
                        }
                    }, 1200);
                }}
            >
                {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitBtnText}>Se connecter</Text>}
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkBtn} onPress={() => goToBlock(2)}>
                <Text style={styles.linkText}>Mot de passe oublié ?</Text>
            </TouchableOpacity>
        </>
    );

    // Bloc 2 : Récupération mot de passe
    const renderForgotBlock = () => (
        <>
            <Text style={styles.title}>Récupération du mot de passe</Text>
            {globalError ? <Text style={styles.globalError}>{globalError}</Text> : null}
            {renderSwitchSelector()}
            {mode === 'phone' && (
                <FormInputBlock
                    label="Numéro de téléphone"
                    value={phone}
                    onChangeText={setPhone}
                    onBlur={() => setTouched(t => ({ ...t, phone: true }))}
                    placeholder="+237 6XX XX XX XX"
                    inputStyle={isPhoneValid ? styles.inputValid : (touched.phone ? styles.inputError : {})}
                    error={touched.phone && !isPhoneValid ? "Numéro de téléphone invalide" : ''}
                    touched={touched.phone}
                    isValid={isPhoneValid}
                    keyboardType="phone-pad"
                    autoCapitalize="none"
                    iconName="call"
                    iconColor="#798588"
                />
            )}
            {mode === 'email' && (
                <FormInputBlock
                    label="Adresse email"
                    value={email}
                    onChangeText={setEmail}
                    onBlur={() => setTouched(t => ({ ...t, email: true }))}
                    placeholder="exemple@gmail.com"
                    inputStyle={isEmailValid ? styles.inputValid : (touched.email ? styles.inputError : {})}
                    error={touched.email && !isEmailValid ? "Adresse email invalide" : ''}
                    touched={touched.email}
                    isValid={isEmailValid}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    iconName="sms"
                    iconColor="#798588"
                />
            )}
            {mode === 'username' && (
                <FormInputBlock
                    label="Nom d'utilisateur"
                    value={username}
                    onChangeText={setUsername}
                    onBlur={() => setTouched(t => ({ ...t, username: true }))}
                    placeholder="mboa254"
                    inputStyle={isUsernameValid ? styles.inputValid : (touched.username ? styles.inputError : {})}
                    error={touched.username && !isUsernameValid ? "Nom d'utilisateur trop court" : ''}
                    touched={touched.username}
                    isValid={isUsernameValid}
                    autoCapitalize="none"
                    iconName="user"
                    iconColor="#798588"
                />
            )}
            <TouchableOpacity
                style={[styles.submitBtn, !canForgot && styles.submitBtnDisabled]}
                disabled={!canForgot || isLoading}
                onPress={async () => {
                    setGlobalError('');
                    setIsLoading(true);
                    setTimeout(() => {
                        setIsLoading(false);
                        goToBlock(3);
                    }, 1200);
                }}
            >
                {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitBtnText}>Recevoir le code</Text>}
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkBtn} onPress={() => goToBlock(1)}>
                <Text style={styles.linkText}>Retour à la connexion</Text>
            </TouchableOpacity>
        </>
    );

    // Bloc 3 : OTP
    const renderOtpBlock = () => (
        <View style={styles.otpContainer}>
            <Text style={styles.title}>Vérification du code</Text>
            <Text style={styles.otpDesc}>Entrez le code reçu par SMS ou email.</Text>
            <View style={styles.otpInputsRow}>
                {otp.map((digit, idx) => (
                    <TextInput
                        key={idx}
                        ref={otpInputs[idx]}
                        style={styles.otpInput}
                        value={digit}
                        onChangeText={v => handleOtpChange(v, idx)}
                        keyboardType="number-pad"
                        maxLength={1}
                        onFocus={() => setOtpError('')}
                        onKeyPress={({ nativeEvent }) => {
                            if (nativeEvent.key === 'Backspace' && !digit && idx > 0) {
                                otpInputs[idx - 1].current.focus();
                            }
                        }}
                        autoFocus={idx === 0}
                    />
                ))}
            </View>
            {!!otpError && <Text style={styles.otpError}>{otpError}</Text>}
            <TouchableOpacity
                style={[styles.submitBtn, !canContinueOtp && styles.submitBtnDisabled]}
                disabled={!canContinueOtp || isLoading}
                onPress={async () => {
                    setOtpError('');
                    setIsLoading(true);
                    setTimeout(() => {
                        setIsLoading(false);
                        if (otp.join('') === '1234') {
                            goToBlock(4);
                        } else if (otpTimer === 0) {
                            setOtpError('Code expiré, veuillez renvoyer le code.');
                        } else {
                            setOtpError('Code incorrect');
                        }
                    }, 1200);
                }}
            >
                {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitBtnText}>Continuer</Text>}
            </TouchableOpacity>
            <Text style={styles.otpResend}>Pas reçu de code, renvoyer dans <Text style={styles.otpTimer}>{`00:${otpTimer < 10 ? '0' : ''}${otpTimer}`}</Text></Text>
        </View>
    );

    // Bloc 4 : Nouveau mot de passe
    const renderNewPasswordBlock = () => (
        <>
            <Text style={styles.title}>Choisisser un nouveau mot de passe</Text>
            {globalError ? <Text style={styles.globalError}>{globalError}</Text> : null}
            <FormInputBlock
                label="Nouveau mot de passe"
                value={newPassword}
                onChangeText={setNewPassword}
                onBlur={() => setTouched(t => ({ ...t, newPassword: true }))}
                placeholder=""
                inputStyle={isNewPasswordValid ? styles.inputValid : (touched.newPassword ? styles.inputError : {})}
                error={touched.newPassword && !isNewPasswordValid ? "6 caractères minimum" : ''}
                touched={touched.newPassword}
                isValid={isNewPasswordValid}
                secureTextEntry
                iconName="lock"
                iconColor="#798588"
            />
            <FormInputBlock
                label="Confirmer le mot de passe"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                onBlur={() => setTouched(t => ({ ...t, confirmPassword: true }))}
                placeholder=""
                inputStyle={isConfirmPasswordValid ? styles.inputValid : (touched.confirmPassword ? styles.inputError : {})}
                error={touched.confirmPassword && !isConfirmPasswordValid ? "Les mots de passe ne correspondent pas" : ''}
                touched={touched.confirmPassword}
                isValid={isConfirmPasswordValid}
                secureTextEntry
                iconName="lock"
                iconColor="#798588"
            />
            <TouchableOpacity
                style={[styles.submitBtn, !canSetNewPassword && styles.submitBtnDisabled]}
                disabled={!canSetNewPassword || isLoading}
                onPress={async () => {
                    setGlobalError('');
                    setIsLoading(true);
                    setTimeout(() => {
                        setIsLoading(false);
                        goToBlock(1);
                    }, 1200);
                }}
            >
                {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitBtnText}>Valider</Text>}
            </TouchableOpacity>
        </>
    );

    return (
        <ImageBackground source={require('../../../assets/component/Image/form-background.png')} style={styles.bg} resizeMode="cover">
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.cardWrapper}>
                        <View style={styles.logoContainer}>
                            <Icon iconName={'mboaEventLarge-blue'} />
                        </View>

                        <ScrollView
                            contentContainerStyle={styles.card}
                            style={{ maxHeight: SCREEN_HEIGHT * 0.8, maxWidth: SCREEN_WIDTH }}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="handled"
                        >
                            <Animated.View style={{ opacity: animBlock, width: SCREEN_WIDTH - 64, margin: 0 }}>
                                {block === 1 && renderLoginBlock()}
                                {block === 2 && renderForgotBlock()}
                                {block === 3 && renderOtpBlock()}
                                {block === 4 && renderNewPasswordBlock()}
                            </Animated.View>
                        </ScrollView>
                    </View>

                    <View style={styles.bottomRow}>
                        <Text style={styles.bottomText}>Pas encore de compte ?</Text>
                        <TouchableOpacity onPress={() => router.replace('/auth/Login/Register1')}>
                            <Text style={styles.bottomLink}>Créer un compte</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: '#020931',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        width: '100%',
        borderRadius: 32,

    },
    cardWrapper: {
        width: '100%',
        maxHeight: '85%',
        marginTop: 40,
        marginBottom: 16,
        alignItems: 'center',
        borderRadius: 32,
        backgroundColor: "#fff",
    },
    card: {
        padding: 16,
        width: '100%',
        borderRadius: 32,
        alignItems: 'stretch',
        //backgroundColor : '#fff',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 24,
        marginTop: 24,
    },
    title: {
        fontFamily: 'TitilliumWeb-Bold',
        letterSpacing : -0.5,
        fontSize: 24,
        color: '#1E2448',
        textAlign: 'center',
        marginBottom: 16,
        lineHeight : 24 * 1.25
    },
    introText : {
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 14,
        color: '#1E2448',
        marginBottom: 4,
        textAlign : "center",
    },
    linkText : {
        paddingVertical : 12,
        fontFamily: 'TitilliumWeb-Bold',
        fontSize: 14,
        color: '#1E2448',
        marginBottom: 4,
        textAlign : "center",
        textDecorationColor : "underline",

    },
    switchSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        backgroundColor: '#F5F5F6',
        borderRadius: 16,
        padding: 4,
    },
    switchBtn: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 12,
        alignItems: 'center',
        marginHorizontal: 2,
    },
    switchBtnActive: {
        backgroundColor: '#041578',
    },
    switchText: {
        color: '#041578',
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 15,
    },
    switchTextActive: {
        color: '#fff',
    },
    googleBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        marginTop: 8,
        opacity: 0.7,
    },
    googleBtnText: {
        marginLeft: 8,
        color: '#041578',
        fontFamily: 'TitilliumWeb-Bold',
        fontSize: 15,
    },
    cguRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginVertical: 8,
        alignSelf: 'flex-start',
        width: '100%',
    },
    cguText: {
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 13,
        color: '#1E2448',
        alignSelf: 'flex-start',
        width: '80%'
    },
    cguLink: {
        textDecorationLine: 'underline',
        color: '#041578',
    },
    submitBtn: {
        width: '100%',
        height: 48,
        backgroundColor: '#041578',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
    },
    submitBtnDisabled: {
        backgroundColor: '#B0B0B0',
    },
    submitBtnText: {
        color: '#fff',
        fontFamily: 'TitilliumWeb-Bold',
        fontSize: 18,
    },
    otpContainer: {
        alignItems: 'center',
        paddingVertical: 16,
    },
    otpTitle: {
        fontFamily: 'TitilliumWeb-Bold',
        fontSize: 24,
        color: '#1E2448',
        marginBottom: 8,
        textAlign: 'center',
    },
    otpDesc: {
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 16,
        color: '#1E2448',
        marginBottom: 24,
        textAlign: 'center',
    },
    otpInputsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 24,
    },
    otpInput: {
        width: 56,
        height: 64,
        borderWidth: 2,
        borderColor: '#041578',
        borderRadius: 12,
        marginHorizontal: 8,
        fontSize: 32,
        textAlign: 'center',
        fontFamily: 'TitilliumWeb-Bold',
        backgroundColor: '#F5F5F6',
    },
    otpError: {
        color: '#F52424',
        fontSize: 15,
        marginBottom: 8,
        fontFamily: 'TitilliumWeb-Regular',
    },
    otpResend: {
        marginTop: 12,
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 15,
        color: '#1E2448',
    },
    otpTimer: {
        color: '#F52424',
        fontFamily: 'TitilliumWeb-Bold',
    },
    inputValid: {
        borderColor: '#1AC97A',
    },
    inputError: {
        borderColor: '#F52424',
    },
    globalError: {
        color: '#F52424',
        fontSize: 15,
        marginBottom: 8,
        fontFamily: 'TitilliumWeb-Bold',
        textAlign: 'center',
    },
    successMsg: {
        color: '#1AC97A',
        fontSize: 16,
        marginTop: 12,
        fontFamily: 'TitilliumWeb-Bold',
        textAlign: 'center',
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    bottomText: {
        color: '#fff',
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 15,
        marginRight: 8,
    },
    bottomLink: {
        color: '#041578',
        fontFamily: 'TitilliumWeb-Bold',
        fontSize: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 4,
    },
});
export default Logins;