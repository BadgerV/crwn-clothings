import React from 'react';

import MenuItem from '../menu-item/menu-item.component';
import { createStructuredSelector } from 'reselect';

import { selectDirectorySection } from '../../redux/directory/directory.selectors'

import {connect} from 'react-redux'

import './directory.styles.scss'

const  Directory = ({sections}) => (
          <div className = "directory-menu">
              {
                sections.map(({id, ...otherSectionProps}) => (
                  <MenuItem key = {id} {...otherSectionProps}></MenuItem> 
                ))
              }
          </div>
        )

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySection
})

export default connect(mapStateToProps)(Directory);