// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight, SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  'house.fill': 'home',
  'building.2.fill': 'domain',
  'calendar': 'event',
  'star.fill': 'star',
  'wifi': 'wifi',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'gear': 'settings',
  'exclamationmark.triangle.fill': 'warning',
  'magnifyingglass': 'search',
  'location': 'location-on',
  'plus': 'add',
  'shield.fill': 'security',
  'doc.on.doc': 'content-copy',
  'cross.fill': 'local-hospital',
  'flame.fill': 'local-fire-department',
  'info.circle.fill': 'info',
  'mappin.and.ellipse': 'place',
  'phone.fill': 'phone',
  'checkmark.circle.fill': 'check-circle',
  'backpack': 'travel-explore',
  'phone.circle.fill': 'phone',
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const mappedName = MAPPING[name];

  // Fallback to a default icon if mapping doesn't exist
  const iconName = mappedName || 'help';

  return <MaterialIcons color={color} size={size} name={iconName} style={style} />;
}