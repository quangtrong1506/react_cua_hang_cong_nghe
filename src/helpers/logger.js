export const logger = (value, type = 'log', name = '', note) => {
    // console.clear();
    if (['log', 'error', 'dir', 'warn', 'warning'].filter((element) => element === type))
        type = 'log';
    if (!Array.isArray(value)) {
        value = [value];
    }
    console.group(name);
    value.forEach((element) => {
        console[type](element);
    });
    if (note) console[type]('note: ' + note);
    console.groupEnd();
};
