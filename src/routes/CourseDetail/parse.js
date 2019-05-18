import filter from 'lodash/filter';
import reduce from 'lodash/reduce';

import { PARTICIPANT_STATUS, COURSE_STUDENT_STATUS } from 'constants/gql';
import { getTableDate } from 'utils/date';

export const parseActiveCourseStudentsToTableData = (courseStudents, role) =>
    reduce(
        filter(
            courseStudents,
            courseStudent =>
                courseStudent.role === role &&
                courseStudent.status === COURSE_STUDENT_STATUS.ACTIVE
        ),
        (acc, courseStudent) => {
            const { name, email, id } = courseStudent.student;
            const result = [courseStudent.id, id, name, email];
            acc.push(result);
            return acc;
        },
        []
    );

export const parseCourseStudentsByStatusToTableData = (
    courseStudents,
    status
) =>
    reduce(
        filter(
            courseStudents,
            courseStudent => courseStudent.status === status
        ),
        (acc, courseStudent) => {
            const { name, email, id } = courseStudent.student;
            const result = [
                courseStudent.id,
                id,
                name,
                email,
                courseStudent.waitlistDate
                    ? getTableDate(courseStudent.waitlistDate)
                    : '',
            ];
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

const getNumberOfParticipants = (participants, status) =>
    reduce(
        participants,
        (result, participant) => {
            if (participant.status === status) {
                return ++result;
            }
            return result;
        },
        0
    );

export const parseInstancesToTableData = instances =>
    reduce(
        instances,
        (acc, instance) => {
            const result = [
                instance.id,
                getTableDate(instance.date),
                instance.topic,
                getNumberOfParticipants(
                    instance.participants,
                    PARTICIPANT_STATUS.PRESENT
                ),
                getNumberOfParticipants(
                    instance.participants,
                    PARTICIPANT_STATUS.ABSENT
                ),
            ];
            acc.push(result);
            return acc;
        },
        []
    );
