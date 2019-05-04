import reduce from 'lodash/reduce';

export const parseCardDataToArray = card =>
    reduce(
        card.useHistory,
        (acc, courseInstance) => {
            const result = [
                courseInstance.id,
                courseInstance.topic,
                courseInstance.date,
            ];
            acc.push(result);
            return acc;
        },
        []
    );
