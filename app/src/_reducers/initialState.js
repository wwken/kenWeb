import Immutable from 'immutable';

import initialStateKenWeb from './initialState-kenWeb';

const initialState = {
  KENWEB: initialStateKenWeb,
};

export default Immutable.fromJS(initialState['KENWEB']);
