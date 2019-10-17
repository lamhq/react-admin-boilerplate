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
import TextAreaField from '../../../mdpr/components/TextAreaField';

const useStyles = makeStyles(styles);

export default function PostForm() {
  const classes = useStyles();
  return (
    <Form>
      <Card>
        <CardHeader color="rose" icon>
          <CardIcon color="rose">
            <MailOutline />
          </CardIcon>
          <h4 className={classes.cardIconTitle}>Post Info</h4>
        </CardHeader>
        <CardBody>
          <Field
            name="title"
            label="Title"
            component={TextField}
            required
          />
          <Field
            name="content"
            label="Content"
            component={TextAreaField}
          />
        </CardBody>
        <CardFooter className={classes.justifyContentCenter}>
          <Button type="submit" color="rose" size="lg">Save</Button>
        </CardFooter>
      </Card>
    </Form>
  );
}

PostForm.propTypes = {
};
