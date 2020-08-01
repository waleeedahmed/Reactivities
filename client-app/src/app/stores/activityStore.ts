import {observable} from 'mobx';
import { createContext } from 'react';

class ActivityStore {
  @observable title = "Hello Mobx!";
}

export default createContext(new ActivityStore());