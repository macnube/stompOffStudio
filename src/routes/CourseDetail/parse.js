import filter from 'lodash/filter';
import reduce from 'lodash/reduce';

import { getTableDate } from 'utils/date';

export const parseCourseStudentsToTableData = (courseStudents, role) =>
    reduce(
        filter(courseStudents, courseStudent => courseStudent.role === role),
        (acc, courseStudent) => {
            const { name, email } = courseStudent.student;
            const result = [courseStudent.id, name, email];
            acc.push(result);
            return acc;
        },
        []
    );

export const parseTeachersToTableData = teachers =>
    reduce(
        teachers,
        (acc, teacher) => {
            const result = [teacher.id, teacher.name, teacher.email];
            acc.push(result);
            return acc;
        },
        []
    );

const getNumberOfParticipants = participants =>
    participants && participants.length ? participants.length : 0;

export const parseInstancesToTableData = instances =>
    reduce(
        instances,
        (acc, instance) => {
            const result = [
                instance.id,
                getTableDate(instance.date),
                instance.topic,
                getNumberOfParticipants(instance.attendees),
                getNumberOfParticipants(instance.absentees),
            ];
            acc.push(result);
            return acc;
        },
        []
    );
