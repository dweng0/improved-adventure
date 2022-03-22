import { WrappedIndexes } from "./interface";

export const wrapIndex = (acc: Array<WrappedIndexes>, cur) => { 
    const wrapper = {
        name: cur[0].name.split("(")[0].trim(),
        indexes: cur
    }
    acc.push(wrapper);
    return acc;
}