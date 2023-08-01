export const getStyleBgImage = (url) => {
    return { backgroundImage: ['url("', url, '")'].join('') };
};

export const getStyleImage = (url) => {
    return ['url("', url, '")'].join('');
};
