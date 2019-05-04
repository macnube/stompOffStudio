import reduce from 'lodash/reduce';
import filter from 'lodash/filter';
import forEach from 'lodash/forEach';
import includes from 'lodash/includes';

import { PARTICIPANT_STATUS } from 'contants/gql';

export const parseCourseStudentsToTableData = (
    courseStudents,
    participantCourseStudentIds
) =>
    reduce(
        filter(
            courseStudents,
            courseStudent =>
                !includes(participantCourseStudentIds, courseStudent.id)
        ),
        (acc, courseStudent) => {
            const result = [
                courseStudent.id,
                courseStudent.student.name,
                courseStudent.student.email,
                courseStudent.role,
            ];
            acc.push(result);
            return acc;
        },
        []
    );

export const parseParticipantsToTableData = participants =>
    reduce(
        participants,
        (acc, participant) => {
            const result = [
                participant.id,
                participant.courseStudent.student.id,
                participant.courseStudent.student.name,
                participant.courseStudent.student.email,
                participant.courseStudent.role,
                participant.status,
            ];
            acc.push(result);
            return acc;
        },
        []
    );

export const getCourseInstanceStudents = courseInstance => {
    const absentCourseStudentIds = [];
    const presentCourseStudentIds = [];
    forEach(courseInstance.participants, participant => {
        if (participant.status === PARTICIPANT_STATUS.ABSENT) {
            absentCourseStudentIds.push(participant.courseStudent.id);
        } else if (participant.status === PARTICIPANT_STATUS.PRESENT) {
            presentCourseStudentIds.push(participant.courseStudent.id);
        }
    });
    return reduce(
        courseInstance.course.courseStudents,
        (result, courseStudent) => {},
        []
    );
};
