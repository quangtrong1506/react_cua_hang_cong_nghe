import React from 'react';
import { useLocation } from 'react-router-dom';

export const UseQuery = () => {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
};
export const stringQuery = (object = {}) => {
    let result = '?';
    for (const [key, value] of Object.entries(object)) {
        if (value) {
            result += '&' + key + '=' + value;
        }
    }
    return result === '?' ? '' : result.replace('?&', '?');
};
