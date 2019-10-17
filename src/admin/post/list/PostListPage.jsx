import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Assignment from '@material-ui/icons/Assignment';
import { Link } from 'react-router-dom';
import Edit from '@material-ui/icons/Edit';

import Button from '../../../mdpr/components/CustomButtons/Button';
import Table from '../../../mdpr/components/Table/Table';
import Card from '../../../mdpr/components/Card/Card';
import CardHeader from '../../../mdpr/components/Card/CardHeader';
import CardIcon from '../../../mdpr/components/Card/CardIcon';
import CardBody from '../../../mdpr/components/Card/CardBody';
import AdminLayout from '../../layout/admin/AdminLayout';
import Loadable from '../../../common/components/Loadable';
import DeleteButton from './DeleteButton';
import useLoad from '../../../common/hooks/useLoad';
import { useApi } from '../../../common/api';
import { cardTitle } from '../../../mdpr/assets/jss/material-dashboard-pro-react';

const styles = {
  customCardContentClass: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: '15px',
    marginBottom: 0,
  },
  actionButton: {
    margin: '0 0 0 5px',
    padding: '5px',
    '& svg': {
      marginRight: '0px',
    },
  },
};
const useStyles = makeStyles(styles);

/**
 * Active report list page
 */
export default function PostListPage() {
  const classes = useStyles();
  const { getPosts } = useApi();
  const { data: posts, load: loadPosts, loading } = useLoad(getPosts);

  // load report on load
  React.useEffect(() => {
    loadPosts(true);
  }, []);

  return (
    <AdminLayout title="Manage Posts">
      <Card>
        <CardHeader color="rose" icon>
          <CardIcon color="rose">
            <Assignment />
          </CardIcon>
          <h4 className={classes.cardIconTitle}>Posts</h4>
        </CardHeader>
        <CardBody>
          <Loadable visible={loading} />
          {posts && posts.length === 0 && (
            <p><em>No Result Found!</em></p>
          )}
          {posts && posts.length > 0 && (
            <Table
              tableHeaderColor="primary"
              tableHead={['Title', 'Actions']}
              tableData={posts.map(post => [
                post.title,
                (
                  <>
                    <Link to={`/admin/posts/edit/${post.id}`}>
                      <Button color="success" className={classes.actionButton}>
                        <Edit />
                      </Button>
                    </Link>
                    &nbsp;
                    <DeleteButton
                      post={post}
                      afterDelete={() => loadPosts(true)}
                      className={classes.actionButton}
                    />
                  </>
                ),
              ])}
              coloredColls={[3]}
              colorsColls={['primary']}
            />
          )}
        </CardBody>
      </Card>
    </AdminLayout>
  );
}

PostListPage.propTypes = {
};
