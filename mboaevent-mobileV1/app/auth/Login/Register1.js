import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Dimensions, TextInput, Animated, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from '../../../assets/ressource/svg/globalIcons';
import CustomCheckbox from '../../../assets/component/Globals Components/CustomCheckbox';
import FormInputBlock from '../../../assets/component/Globals Components/FormInputBlock';
import ConfettiCannon from 'react-native-confetti-cannon';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
const OTP_LENGTH = 4;

const Register1 = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [mode, setMode] = useState('phone'); // 'phone' | 'email' | 'google'
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [acceptedCGU, setAcceptedCGU] = useState(false);
    const [touched, setTouched] = useState({});
    const [otp, setOtp] = useState(['', '', '', '']);
    const [otpTimer, setOtpTimer] = useState(20);
    const [otpError, setOtpError] = useState('');
    const otpInputs = [useRef(), useRef(), useRef(), useRef()];
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [finalUsername, setFinalUsername] = useState('');
    const [profileTouched, setProfileTouched] = useState({});
    const [globalError, setGlobalError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [parrainage, setParrainage] = useState('');
    const [showSuccessScreen, setShowSuccessScreen] = useState(false);
    const [successTimer, setSuccessTimer] = useState(5);
    const animSuccess = useRef(new Animated.Value(0)).current;
    const animCheckScale = useRef(new Animated.Value(0.5)).current;

    // Animation d'opacité
    const animStep = useRef(new Animated.Value(1)).current;
    const fadeOut = (cb) => {
        Animated.timing(animStep, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => cb && cb());
    };
    const fadeIn = () => {
        Animated.timing(animStep, { toValue: 1, duration: 200, useNativeDriver: true }).start();
    };
    const goToStep = (nextStep) => {
        fadeOut(() => {
            setStep(nextStep);
            setGlobalError('');
            fadeIn();
        });
    };

    // Timer OTP
    useEffect(() => {
        if (step === 2 && otpTimer > 0) {
            const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [step, otpTimer]);

    // Redirection après succès
    useEffect(() => {
        if (showSuccessScreen) {
            Animated.parallel([
                Animated.timing(animSuccess, { toValue: 1, duration: 400, useNativeDriver: true }),
                Animated.spring(animCheckScale, { toValue: 1, friction: 4, useNativeDriver: true })
            ]).start();
            if (successTimer > 0) {
                const timer = setTimeout(() => setSuccessTimer(t => t - 1), 1000);
                return () => clearTimeout(timer);
            } else {
                router.replace('/(tabs)');
            }
        }
    }, [showSuccessScreen, successTimer]);

    // Validation helpers
    const isPhoneValid = /^((\+|00)[0-9]{8,15}|0[0-9]{8,15})$/.test(phone);
    const isEmailValid = /.+@.+\..+/.test(email);
    const isPasswordValid = password.length >= 6;
    const canContinueStep1 =
        (mode === 'phone' && isPhoneValid && isPasswordValid && acceptedCGU) ||
        (mode === 'email' && isEmailValid && isPasswordValid && acceptedCGU) ||
        (mode === 'google');
    const isOtpComplete = otp.every((d) => d.length === 1);
    const canContinueStep2 = isOtpComplete;
    const isFinalUsernameValid = finalUsername.length >= 4;
    const isLastNameValid = lastName.length > 0;
    const isFirstNameValid = firstName.length > 0;
    const canFinish = isFinalUsernameValid && isLastNameValid && isFirstNameValid;

    // Handlers OTP
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
    const handleOtpPaste = (text) => {
        if (/^[0-9]{4}$/.test(text)) {
            setOtp(text.split(''));
            otpInputs[3].current.focus();
        }
    };

    // SwitchSelector custom
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
                style={[styles.switchBtn, mode === 'google' && styles.switchBtnActive]}
                onPress={() => setMode('google')}
            >
                <Text style={[styles.switchText, mode === 'google' && styles.switchTextActive]}>Google</Text>
            </TouchableOpacity>
        </View>
    );

    // Bloc étape 1
    const renderStep1 = () => (
        <>
            <Text style={styles.title}>Créer un Compte</Text>

            {globalError ? <Text style={styles.globalError}>{globalError}</Text> : <Text style={styles.introText}>Renseignez vos informations afin de creer votre compte</Text>}
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
            {mode !== 'google' && (
                <FormInputBlock
                    label="Mot de Passe"
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
            )}
            {mode === 'google' && (
                <TouchableOpacity style={styles.googleBtn} disabled>
                    <Icon iconName="google" />
                    <Text style={styles.googleBtnText}>Connexion Google (démo)</Text>
                </TouchableOpacity>
            )}
            <View style={styles.cguRow}>
                <CustomCheckbox
                    checked={acceptedCGU}
                    onPress={() => setAcceptedCGU(v => !v)}
                >
                    <Text style={styles.cguText}>En créant votre compte, vous acceptez nos <Text style={styles.cguLink}>Termes et conditions</Text></Text>
                </CustomCheckbox>
            </View>
            <TouchableOpacity
                style={[styles.submitBtn, !canContinueStep1 && styles.submitBtnDisabled]}
                disabled={!canContinueStep1 || isLoading}
                onPress={async () => {
                    setGlobalError('');
                    setIsLoading(true);
                    // Simule une requête réseau et une erreur potentielle
                    setTimeout(() => {
                        setIsLoading(false);
                        if (mode === 'email' && email === 'test@existant.com') {
                            setGlobalError('Cet email est déjà utilisé.');
                        } else {
                            goToStep(2);
                        }
                    }, 1200);
                }}
            >
                {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitBtnText}>Continuer</Text>}
            </TouchableOpacity>
        </>
    );

    // Bloc étape 2 (OTP)
    const renderStep2 = () => (
        <View style={styles.otpContainer}>
            <Text style={styles.otpTitle}>Confirmation</Text>
            <Text style={styles.otpDesc}>Avant de pouvoir utiliser votre compte, veuillez confirmer votre numéro de téléphone en entrant le code reçu par SMS.</Text>
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
                style={[styles.submitBtn, !canContinueStep2 && styles.submitBtnDisabled]}
                disabled={!canContinueStep2 || isLoading}
                onPress={async () => {
                    setOtpError('');
                    setIsLoading(true);
                    // Simule une requête réseau et une erreur potentielle
                    setTimeout(() => {
                        setIsLoading(false);
                        if (otp.join('') === '1234') {
                            goToStep(3);
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

    // Bloc étape 3 (infos profil)
    const renderStep3 = () => (
        <>
            {globalError ? <Text style={styles.globalError}>{globalError}</Text> : null}
            <FormInputBlock
                label="Nom d'utilisateur"
                value={finalUsername}
                onChangeText={setFinalUsername}
                onBlur={() => setProfileTouched(t => ({ ...t, finalUsername: true }))}
                placeholder="mboa254"
                inputStyle={isFinalUsernameValid ? styles.inputValid : (profileTouched.finalUsername ? styles.inputError : {})}
                error={profileTouched.finalUsername && !isFinalUsernameValid ? "Nom d'utilisateur trop court" : ''}
                touched={profileTouched.finalUsername}
                isValid={isFinalUsernameValid}
                autoCapitalize="none"
                iconName="user"
                iconColor="#041578"
            />
            <FormInputBlock
                label="Nom"
                value={lastName}
                onChangeText={setLastName}
                onBlur={() => setProfileTouched(t => ({ ...t, lastName: true }))}
                placeholder="Ex: Malo"
                inputStyle={isLastNameValid ? styles.inputValid : (profileTouched.lastName ? styles.inputError : {})}
                error={profileTouched.lastName && !isLastNameValid ? "Nom requis" : ''}
                touched={profileTouched.lastName}
                isValid={isLastNameValid}
                iconName="profile-2user"
                iconColor="#041578"
            />
            <FormInputBlock
                label="Prénom"
                value={firstName}
                onChangeText={setFirstName}
                onBlur={() => setProfileTouched(t => ({ ...t, firstName: true }))}
                placeholder="Ex: Eric"
                inputStyle={isFirstNameValid ? styles.inputValid : (profileTouched.firstName ? styles.inputError : {})}
                error={profileTouched.firstName && !isFirstNameValid ? "Prénom requis" : ''}
                touched={profileTouched.firstName}
                isValid={isFirstNameValid}
                iconName="profile"
                iconColor="#041578"
            />
            <FormInputBlock
                label="Code de parrainage (optionnel)"
                value={parrainage}
                onChangeText={setParrainage}
                placeholder="Ex: ABC123"
                autoCapitalize="characters"
                iconName="tag"
                iconColor="#041578"
            />
            <TouchableOpacity
                style={[styles.submitBtn, !canFinish && styles.submitBtnDisabled]}
                disabled={!canFinish || isLoading}
                onPress={async () => {
                    setGlobalError('');
                    setIsLoading(true);
                    // Simule une requête réseau et une erreur potentielle
                    setTimeout(() => {
                        setIsLoading(false);
                        if (finalUsername === 'existant') {
                            setGlobalError('Ce nom d\'utilisateur est déjà pris.');
                        } else {
                            setShowSuccessScreen(true);
                        }
                    }, 1200);
                }}
            >
                {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitBtnText}>Créer mon compte</Text>}
            </TouchableOpacity>
        </>
    );

    // Bloc écran de succès
    const renderSuccessScreen = () => (
        <Animated.View style={{ opacity: animSuccess, alignItems: 'center', justifyContent: 'center', flex: 1, minHeight: 400 }}>
            <ConfettiCannon count={80} origin={{ x: SCREEN_WIDTH / 2, y: 0 }} fadeOut autoStart={true} explosionSpeed={350} fallSpeed={2500} />
            <View style={{ alignItems: 'center', marginBottom: 24 }}>
                <Animated.View style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: '#041578', alignItems: 'center', justifyContent: 'center', marginBottom: 24, transform: [{ scale: animCheckScale }] }}>
                    <Icon iconName="check" width={64} height={64} color="#fff" />
                </Animated.View>
            </View>
            <Text style={{ fontFamily: 'TitilliumWeb-Bold', fontSize: 24, color: '#041578', textAlign: 'center', marginBottom: 12 }}>
                Bienvenue {firstName ? firstName : '!'}</Text>
            <Text style={{ fontFamily: 'TitilliumWeb-Regular', fontSize: 16, color: '#1E2448', textAlign: 'center', marginBottom: 8 }}>
                Votre compte a été créé l’application <Text style={{ fontFamily: 'TitilliumWeb-Bold' }}>MBO'A EVENTS</Text>, profitez de votre expérience !
            </Text>
            <Text style={{ fontFamily: 'TitilliumWeb-Regular', fontSize: 15, color: '#1E2448', textAlign: 'center', marginBottom: 8 }}>
                Vous allez être redirigé vers l'accueil dans <Text style={{ color: '#F52424', fontFamily: 'TitilliumWeb-Bold' }}>{successTimer}s</Text>...
            </Text>
        </Animated.View>
    );

    return (
        <ImageBackground source={require('../../../assets/component/Image/form-background.png')} style={styles.bg} resizeMode="cover">
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.cardWrapper}>
                        {!showSuccessScreen && (
                            <>
                                <View style={styles.logoContainer}>
                                    <Icon iconName={'mboaEventLarge-blue'} />
                                </View>
                            </>
                        )}
                        <ScrollView
                            contentContainerStyle={styles.card}
                            style={{ maxHeight: SCREEN_HEIGHT * 0.8, maxWidth: SCREEN_WIDTH }}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="handled"
                        >
                            <Animated.View style={{ opacity: animStep, width: SCREEN_WIDTH - 64, margin: 0, }}>
                                {showSuccessScreen
                                    ? renderSuccessScreen()
                                    : <>
                                        {step === 1 && renderStep1()}
                                        {step === 2 && renderStep2()}
                                        {step === 3 && renderStep3()}
                                    </>
                                }
                            </Animated.View>
                        </ScrollView>
                    </View>
                    {!showSuccessScreen && (
                        <View style={styles.bottomRow}>
                            <Text style={styles.bottomText}>Déjà un compte?</Text>
                            <TouchableOpacity onPress={() => router.replace('/auth/Login/Logins')}>
                                <Text style={styles.bottomLink}>Se Connecter</Text>
                            </TouchableOpacity>
                        </View>
                    )}
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
        backgroundColor: '#fff',
        borderRadius: 32,
        //backgroundColor : 'green',


    },
    card: {
        padding: 16,
        width: '100%',
        borderRadius: 32,
        alignItems: 'stretch',
        //backgroundColor : 'yellow',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 24,
        marginTop: 24,
    },
    title: {
        fontFamily: 'TitilliumWeb-Bold',
        fontSize: 24,
        color: '#1E2448',
        textAlign: 'center',
        marginBottom: 16,
    },
    introText : {
        fontFamily: 'TitilliumWeb-Regular',
        fontSize: 14,
        color: '#1E2448',
        marginBottom: 4,
        textAlign : "center"
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
        fontFamily: 'TitilliumWeb-Bold',
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

export default Register1;