import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ReactNativePdfHelpersViewProps } from './ReactNativePdfHelpers.types';

const NativeView: React.ComponentType<ReactNativePdfHelpersViewProps> =
  requireNativeViewManager('ReactNativePdfHelpers');

export default function ReactNativePdfHelpersView(props: ReactNativePdfHelpersViewProps) {
  return <NativeView {...props} />;
}
