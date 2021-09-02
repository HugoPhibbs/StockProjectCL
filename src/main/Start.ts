// Start the application

import { setgroups } from "process";
import { LoadApp } from '../coreClasses/coreLogic/LoadApp';

let loadApp : LoadApp = new LoadApp();
loadApp.start();