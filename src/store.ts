import { createStore, createTypedHooks } from 'easy-peasy';
import model, {IStoreModel} from './model';

const { useStoreActions, useStoreDispatch, useStoreState } = createTypedHooks<IStoreModel>();

export { useStoreActions, useStoreDispatch, useStoreState };

const store = createStore(model);

export default store;
