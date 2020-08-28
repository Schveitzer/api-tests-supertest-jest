class ObjectHelper {
    removeKeys(obj, keysToRemove) {
        Object.keys(obj).forEach((key) => {
            if (keysToRemove.some((k) => k === key)) {
                delete obj[key];
            } else if (this.isObject(obj[key]) || this.isArray(obj[key])) {
                this.removeKeys(obj[key], keysToRemove);
            }
        });
        return obj;
    }

    isObject(object) {
        return {}.toString.apply(object) === '[object Object]';
    }

    isArray(array) {
        return array instanceof Array;
    }
}

export const objectHelper = new ObjectHelper();
