import map from 'lodash/map';
import filter from 'lodash/filter';
import includes from 'lodash/includes';

export const removeExistingStudentsFromImportData = (importData, students) => {
    const existingEmails = map(students, student => student.email);
    return filter(
        importData,
        importStudent =>
            !includes(existingEmails, importStudent[2].toLowerCase())
    );
};
