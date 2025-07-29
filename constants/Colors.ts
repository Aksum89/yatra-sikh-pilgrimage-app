
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
    icon: '#666666',
    tabIconDefault: '#666666',
    tabIconSelected: tintColorLight,
    primary: tintColorLight,
    secondary: primaryBlue,
    accent: '#FFFFFF',
    success: forestGreen,
    card: '#FFFFFF',
    border: '#E8E8E8',
    disabled: '#CCCCCC',
    surface: '#FAFAFA',
    warning: '#F44336',
    purple: '#9C27B0',
    blueGrey: '#607D8B',
  },
  dark: {
    text: '#FFFFFF',
    background: '#121212',
    tint: tintColorDark,
    icon: '#CCCCCC',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    primary: tintColorLight,
    secondary: primaryBlue,
    accent: '#2C2C2C',
    success: forestGreen,
    card: '#1E1E1E',
    border: '#333333',
    disabled: '#666666',
    surface: '#1A1A1A',
    warning: '#F44336',
    purple: '#9C27B0',
    blueGrey: '#607D8B',
  },
};
