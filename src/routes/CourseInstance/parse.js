import reduce from 'lodash/reduce';
import filter from 'lodash/filter';
import includes from 'lodash/includes';

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
