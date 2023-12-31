export const USER = {
    levels: {
        super_admin: {
            value: 1,
            label: 'Super Admin',
        },
        admin: {
            value: 2,
            label: 'Admin',
        },
        user: {
            value: 3,
            label: 'User',
        },
    },
};
export const SORT = [
    {
        value: '0',
        label: 'Mặc định',
    },
    {
        value: '1',
        label: 'Tên a-z',
    },
    {
        value: '2',
        label: 'Tên z-a',
    },
    {
        value: '3',
        label: 'Giá tăng dần',
    },
    {
        value: '4',
        label: 'Giá giảm dần',
    },
];

export const USER_IMPORT = {
    status: {
        pending: {
            value: 1,
            label: 'Đang chờ',
        },
        processing: {
            value: 2,
            label: 'Đang diễn ra',
        },
        done: {
            value: 3,
            label: 'Hoàn thành',
        },
    },
    has_errors: {
        true: 1,
        false: 2,
    },
};

export const PAGINATION = {
    ellipsisPostion: 3,
    maxPagesShowAll: 10,
    limit: 20,
    startPage: 1,
};
