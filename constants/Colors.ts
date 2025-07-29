
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
    text: '#2C2C2C', // Dark text for readability
    background: '#FFFFFF', // Pure white background
    tint: tintColorLight,
    icon: '#666666', // Medium gray icons
    tabIconDefault: '#999999',
    tabIconSelected: tintColorLight,
    primary: tintColorLight, // Saffron orange
    secondary: primaryBlue, // Deep blue
    accent: '#FFFFFF',
    success: forestGreen,
    card: '#FFFFFF',
    border: '#E8E8E8', // Light gray border
    disabled: '#CCCCCC',
    surface: '#FAFAFA', // Very light gray surface
    warning: '#FF6B35', // Orange warning
    purple: '#9C27B0',
    blueGrey: '#607D8B',
    // Additional light theme colors
    cardShadow: '#00000010', // Subtle shadow
    divider: '#F0F0F0',
    placeholder: '#AAAAAA',
    overlay: '#00000030',
    highlight: '#FFF8F0', // Very light saffron highlight
    secondaryText: '#555555',
    tertiaryText: '#888888',
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
