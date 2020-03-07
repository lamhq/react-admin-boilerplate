import React from 'react';
import { Form, Field } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import MailOutline from '@material-ui/icons/MailOutline';

import Card from '../../../mdpr/components/Card/Card';
import CardHeader from '../../../mdpr/components/Card/CardHeader';
import CardFooter from '../../../mdpr/components/Card/CardFooter';
import CardBody from '../../../mdpr/components/Card/CardBody';
import CardIcon from '../../../mdpr/components/Card/CardIcon';
import Button from '../../../mdpr/components/CustomButtons/Button';
import styles from '../../../mdpr/assets/jss/material-dashboard-pro-react/views/regularFormsStyle';
import TextField from '../../../mdpr/components/TextField';

const useStyles = makeStyles(styles);

export default function ProfileForm() {
  const classes = useStyles();
  return (
    <Form>
      <Card>
        <CardHeader color="rose" icon>
          <CardIcon color="rose">
            <MailOutline />
          </CardIcon>
          <h4 className={classes.cardIconTitle}>Update your profile</h4>
        </CardHeader>
        <CardBody>
          <Field
            name="displayName"
            label="Full name"
            component={TextField}
            required
          />
          <Field
            name="currentPassword"
            label="Current Password"
            type="password"
            component={TextField}
          />
          <Field
            name="newPassword"
            label="New Password"
            type="password"
            component={TextField}
          />
        </CardBody>
        <CardFooter className={classes.justifyContentCenter}>
          <Button type="submit" color="rose" size="lg">Save</Button>
        </CardFooter>
      </Card>
    </Form>
  );
}

ProfileForm.propTypes = {
};
