import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import find from 'lodash/find';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { DANCE_ROLE } from 'constants/gql';
import styles from './styles';

const REGISTRATION_TO_COURSE_NAME_MAP = {
    'Balboa II': 'Balboa II',
    'Authentic Jazz II': 'Solo Jazz II',
    'Lindy Hop II': 'Lindy Hop III',
};

const TEST_REGISTRATION_TO_COURSE_NAME_MAP = {
    'Balboa II': 'Balboa',
    'Balboa III': 'Balboa',
    'Balboa I': 'Balboa',
    'Lindy Hop II': 'Lindy Hop III',
    'Authentic Jazz II': 'Solo Jazz II',
};

class ImportStudentForm extends React.Component {
    getCourseNameAndIdFromRegistrationForm = student => {
        const { courses } = this.props;
        const courseMap =
            process.env.NODE_ENV === 'development'
                ? TEST_REGISTRATION_TO_COURSE_NAME_MAP
                : REGISTRATION_TO_COURSE_NAME_MAP;
        const courseNames = [courseMap[student.firstClass]];
        if (courseMap[student.secondClass]) {
            courseNames.push(courseMap[student.secondClass]);
        }
        return courseNames.reduce((acc, name) => {
            const course = find(courses, { name });
            acc.push({ name, id: course.id });
            return acc;
        }, []);
    };

    getRoleEnum = role => {
        if (role === 'Leader' || role === 'Both') {
            return DANCE_ROLE.LEADER;
        } else if (role === 'Follower') {
            return DANCE_ROLE.FOLLOWER;
        } else {
            return DANCE_ROLE.SOLO;
        }
    };

    handleImport = courseId => {
        const { student, importStudent } = this.props;
        const { name, email, mobile, role, waitlistDate } = student;
        importStudent({
            variables: {
                name,
                email,
                role: this.getRoleEnum(role),
                mobile,
                courseId,
                waitlistDate: new Date(waitlistDate),
            },
        });
    };

    renderWaitlistButtons = () => {
        const { student, addedStudent } = this.props;
        const courses = this.getCourseNameAndIdFromRegistrationForm(student);
        let addedCourses = [];
        if (addedStudent && student.name === addedStudent.name) {
            addedCourses = addedStudent.memberships.map(
                membership => membership.course.id
            );
        }
        const filteredCourses = filter(
            courses,
            course => !includes(addedCourses, course.id)
        );
        return (
            <Fragment>
                {filteredCourses.map(({ id, name }) => (
                    <Button
                        key={id}
                        onClick={() => this.handleImport(id)}
                        color="primary"
                    >
                        {`Add to ${name} waitlist`}
                    </Button>
                ))}
            </Fragment>
        );
    };

    render() {
        const { open, handleClose, student } = this.props;
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        {`Add ${student.name} to waitlists: `}
                    </DialogTitle>
                    <DialogContent>
                        {student.experience ? (
                            <DialogContentText>{`${
                                student.name
                            }'s previous experience is: ${
                                student.experience
                            }`}</DialogContentText>
                        ) : null}
                        {student.referredBy ? (
                            <DialogContentText>{`${
                                student.name
                            } was referred by: ${
                                student.referredBy
                            }`}</DialogContentText>
                        ) : null}
                    </DialogContent>
                    {this.renderWaitlistButtons()}

                    <DialogActions>
                        <Button
                            onClick={handleClose.bind(null, this.clearForm)}
                            color="primary"
                        >
                            Done
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

ImportStudentForm.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    importStudent: PropTypes.func.isRequired,
    student: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    addedStudent: PropTypes.object,
};

export default withStyles(styles)(ImportStudentForm);
