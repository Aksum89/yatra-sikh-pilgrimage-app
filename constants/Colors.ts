
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
    text: '#4A4A4A', // Softer dark text
    background: '#FAFAFA', // Very light gray background instead of pure white
    tint: tintColorLight,
    icon: '#7A7A7A', // Softer gray icons
    tabIconDefault: '#A5A5A5',
    tabIconSelected: tintColorLight,
    primary: tintColorLight, // Saffron orange
    secondary: '#4A90E2', // Much lighter, softer blue
    accent: '#FFFFFF',
    success: '#66BB6A', // Softer green
    card: '#FFFFFF',
    border: '#E8E8E8',
    disabled: '#CCCCCC',
    surface: '#F5F5F5', // Light gray surface
    warning: '#FF8A65', // Softer orange warning
    purple: '#AB47BC', // Softer purple
    blueGrey: '#78909C', // Softer blue-grey
    // Additional light theme colors
    cardShadow: '#00000008', // Very subtle shadow
    divider: '#F0F0F0',
    placeholder: '#AAAAAA',
    overlay: '#00000020',
    highlight: '#FFF8F0',
    secondaryText: '#6A6A6A', // Softer secondary text
    tertiaryText: '#8A8A8A', // Softer tertiary text
    // New colors for grid buttons
    gridButtonBg: '#F8F9FA', // Very light background for grid buttons
    saffronLight: '#FFF3E6', // Light saffron background
    blueLight: '#E3F2FD', // Light blue background
    greenLight: '#E8F5E8', // Light green background
    purpleLight: '#F3E5F5', // Light purple background
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
