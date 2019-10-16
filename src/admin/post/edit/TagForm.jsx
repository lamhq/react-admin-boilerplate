import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'formik';
import { Link } from 'react-router-dom';
import MailOutline from '@material-ui/icons/MailOutline';
import { makeStyles } from '@material-ui/core/styles';

import Button from '../../../../mdpr/components/CustomButtons/Button';
import Loadable from '../../../../common/components/Loadable/Loadable';
import TextField from '../../../../mdpr/components/TextField';
import Card from '../../../../mdpr/components/Card/Card';
import CardHeader from '../../../../mdpr/components/Card/CardHeader';
import CardIcon from '../../../../mdpr/components/Card/CardIcon';
import CardBody from '../../../../mdpr/components/Card/CardBody';
import styles from '../../../../mdpr/assets/jss/material-dashboard-pro-react/views/regularFormsStyle';

const useStyles = makeStyles(styles);

export default function TagForm({ formProps }) {
  const classes = useStyles();

  return (
    <Form>
      <Loadable visible={formProps.isSubmitting} full />
      <Card>
        <CardHeader color="rose" icon>
          <CardIcon color="rose">
            <MailOutline />
          </CardIcon>
          <h4 className={classes.cardIconTitle}>Tag Detail</h4>
        </CardHeader>
        <CardBody>
          <Field
            name="name"
            label="Name"
            component={TextField}
          />
          <div>
            <Button type="submit" color="primary">Save</Button>
            <Link to="/diary/tags">
              <Button type="button" color="info">Cancel</Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </Form>
  );
}

TagForm.propTypes = {
  formProps: PropTypes.object.isRequired,
};
