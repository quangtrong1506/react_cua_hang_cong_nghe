export const sizeOfImage = (image) => {
    if (!image) return {};
    if (typeof image === 'string') {
        const img = new Image();
        img.src = image;
        let width = img.naturalWidth;
        let height = img.naturalHeight;
        return { width, height };
    }
    let width = image.naturalWidth;
    let height = image.naturalHeight;
    return { width, height };
};
export const getStyleBgImage = (url) => {
    return { backgroundImage: ['url("', url, '")'].join('') };
};

export const getStyleImage = (url) => {
    return ['url("', url, '")'].join('');
};
