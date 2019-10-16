import React from 'react';
import PropTypes from 'prop-types';

import FirstPage from '@material-ui/icons/FirstPage';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import LastPage from '@material-ui/icons/LastPage';
import MPagination from '../../mdpr/components/Pagination/Pagination';

/**
 * Display pagination component with bootstrap 3 style
 */
export default function Pagination({ onChange, page, totalPage }) {
  if (totalPage < 2) {
    return null;
  }
  const lastPage = totalPage - 1;
  const range = [...Array(totalPage).keys()];
  const pages = [
    {
      active: false,
      disabled: false,
      visible: page > 0,
      text: <FirstPage />,
      onClick: () => onChange(0),
    },
    {
      active: false,
      disabled: false,
      visible: page > 1,
      text: <ChevronLeft />,
      onClick: () => onChange(page - 1),
    },
    ...range.map(pageIndex => (
      {
        active: page === pageIndex,
        disabled: false,
        visible: true,
        text: pageIndex + 1,
        onClick: () => onChange(pageIndex),
      }
    )),
    {
      active: false,
      disabled: false,
      visible: page < (lastPage - 1),
      text: <ChevronRight />,
      onClick: () => onChange(lastPage - 1),
    },
    {
      active: false,
      disabled: false,
      visible: page < lastPage,
      text: <LastPage />,
      onClick: () => onChange(lastPage),
    },
  ].filter(p => p.visible);
  return (
    <div className="text-right">
      <MPagination pages={pages} />
    </div>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
