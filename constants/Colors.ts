
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
    text: '#1A1A1A', // Darker charcoal for better readability
    background: '#FEFEFE', // Pure white background
    tint: tintColorLight,
    icon: '#5A5A5A', // Slightly darker icons
    tabIconDefault: '#8A8A8A',
    tabIconSelected: tintColorLight,
    primary: tintColorLight, // Saffron orange
    secondary: primaryBlue, // Deep blue
    accent: '#FFFFFF',
    success: forestGreen,
    card: '#FFFFFF',
    border: '#E0E0E0', // Softer border
    disabled: '#BDBDBD',
    surface: '#F8F8F8', // Slightly off-white surface
    warning: '#E65100', // Orange warning to match theme
    purple: '#7B1FA2',
    blueGrey: '#546E7A',
    // Additional light theme colors
    cardShadow: '#00000008', // Very light shadow
    divider: '#F0F0F0',
    placeholder: '#9E9E9E',
    overlay: '#00000020',
    highlight: '#FFF3E0', // Light saffron highlight
    secondaryText: '#424242',
    tertiaryText: '#757575',
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
