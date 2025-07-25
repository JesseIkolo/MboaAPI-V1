import { LinearGradient } from 'expo-linear-gradient';

import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function GradientBackground({ children }) {
    return (
        <svg width="390" height="844" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="390" height="844" fill="url(#paint0_linear_53_3296)" />
            <defs>
                <linearGradient id="paint0_linear_53_3296" x1="195" y1="0" x2="195" y2="844" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#020931" stop-opacity="0" />
                    <stop offset="0.6875" stop-color="#020931" />
                </linearGradient>
            </defs>
        </svg>

    );
}
