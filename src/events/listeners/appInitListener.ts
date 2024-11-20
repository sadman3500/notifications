import eventEmitter from '../eventEmitter';
import { initGmailAuth } from '../../api/gmailAuthInit';


export function appInitListener(): void {
    eventEmitter.on('init', async (app) => {
        initGmailAuth();      
  });
}