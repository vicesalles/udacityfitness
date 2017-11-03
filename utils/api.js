import { AsyncStorage } from 'react-native';
import { CALENDAR_STORAGE_KEY } from './_calendar';


export function submitEntry({ entry, key }) {
    return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({ [key]: entry }))
}

export function removeEntry(key) {
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then((r)=>{
        const data = JSON.parse(r);
        data[key] = undefined;
        delete data[key];
        AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data));

    })
}