import reduce from 'lodash/reduce';

export const parseUsersToTableData = users =>
    reduce(
        users,
        (acc, user) => {
            const name = user.student ? user.student.name : '';
            const result = [
                user.id,
                name,
                user.email,
                user.admin ? 'Admin' : 'Student',
            ];
            acc.push(result);
            return acc;
        },
        []
    );
