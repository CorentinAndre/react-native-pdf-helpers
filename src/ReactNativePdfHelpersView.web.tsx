import * as React from 'react';

import { ReactNativePdfHelpersViewProps } from './ReactNativePdfHelpers.types';

export default function ReactNativePdfHelpersView(props: ReactNativePdfHelpersViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
