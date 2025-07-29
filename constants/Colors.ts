
/**
 * Sikh Pilgrimage App Color Scheme
 * Inspired by traditional Sikh colors and cultural significance
 */

const tintColorLight = '#FF9933'; // Saffron orange
const tintColorDark = '#FFFFFF'; // White
const primaryBlue = '#000080'; // Deep blue
const forestGreen = '#228B22'; // Success green

export const Colors = {
  light: {
    text: '#2C2C2C', // Charcoal
    background: '#F7F7F7', // Light grey
    tint: tintColorLight,
    icon: '#2C2C2C',
    tabIconDefault: '#666666',
    tabIconSelected: tintColorLight,
    primary: tintColorLight,
    secondary: primaryBlue,
    accent: '#FFFFFF',
    success: forestGreen,
    card: '#FFFFFF',
    border: '#E0E0E0',
    disabled: '#CCCCCC',
  },
  dark: {
    text: '#FFFFFF',
    background: '#1A1A1A',
    tint: tintColorDark,
    icon: '#FFFFFF',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    primary: tintColorLight,
    secondary: primaryBlue,
    accent: '#2C2C2C',
    success: forestGreen,
    card: '#2C2C2C',
    border: '#404040',
    disabled: '#666666',
  },
};
