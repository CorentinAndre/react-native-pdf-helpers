import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ReactNativePdfHelpers.web.ts
// and on native platforms to ReactNativePdfHelpers.ts
import ReactNativePdfHelpersModule from './ReactNativePdfHelpersModule';
import ReactNativePdfHelpersView from './ReactNativePdfHelpersView';
import { ChangeEventPayload, ReactNativePdfHelpersViewProps } from './ReactNativePdfHelpers.types';

// Get the native constant value.
export const PI = ReactNativePdfHelpersModule.PI;

export function hello(): string {
  return ReactNativePdfHelpersModule.hello();
}

export async function setValueAsync(value: string) {
  return await ReactNativePdfHelpersModule.setValueAsync(value);
}

const emitter = new EventEmitter(ReactNativePdfHelpersModule ?? NativeModulesProxy.ReactNativePdfHelpers);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ReactNativePdfHelpersView, ReactNativePdfHelpersViewProps, ChangeEventPayload };
