import { testListener } from './listeners/testListener';
import { appInitListener } from './listeners/appInitListener'; 


export function initializeEventListeners(): void {
    testListener();
    appInitListener();
  }