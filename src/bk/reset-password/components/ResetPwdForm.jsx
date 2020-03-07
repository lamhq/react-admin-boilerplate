import React from 'react';
import { Field, Form } from 'formik';
import { makeStyles } from '@material-ui/core/styles';

import GridContainer from '../../../mdpr/components/Grid/GridContainer';
import GridItem from '../../../mdpr/components/Grid/GridItem';
import Card from '../../../mdpr/components/Card/Card';
import CardHeader from '../../../mdpr/components/Card/CardHeader';
import CardFooter from '../../../mdpr/components/Card/CardFooter';
import CardBody from '../../../mdpr/components/Card/CardBody';
import Button from '../../../mdpr/components/CustomButtons/Button';
import loginPageStyle from '../../../mdpr/assets/jss/material-dashboard-pro-react/views/loginPageStyle';
import TextField from '../../../mdpr/components/TextField';

const useStyles = makeStyles(loginPageStyle);

export default function ResetPwdForm() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <Form>
            <Card login>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="rose"
              >
                <h4 className={classes.cardTitle}>Set new password</h4>
              </CardHeader>
              <CardBody>
                <p>Enter your new password.</p>
                <Field
                  name="password"
                  label="Password"
                  type="password"
                  component={TextField}
                  required
                />
                <Field
                  name="confirmPassword"
                  label="Re-enter Password"
                  type="password"
                  component={TextField}
                  required
                />
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button type="submit" color="rose" size="lg">Update Password</Button>
              </CardFooter>
            </Card>
          </Form>
        </GridItem>
      </GridContainer>
    </div>
  );
}

ResetPwdForm.propTypes = {
};
