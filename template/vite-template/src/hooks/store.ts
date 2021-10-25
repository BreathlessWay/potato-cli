import { InjectionKey } from 'vue';
import { useStore as baseUseStore, Store } from 'vuex';

import { RootState } from '@/store';

export const key: InjectionKey<Store<RootState>> = Symbol();
export const useStore = () => baseUseStore<RootState>(key);
