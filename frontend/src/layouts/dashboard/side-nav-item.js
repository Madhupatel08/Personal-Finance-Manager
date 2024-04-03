import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { Box, ButtonBase } from '@mui/material';
import { useState } from 'react';
import { sub } from 'date-fns';

export const SideNavItem = (props) => {
  const { active = false, disabled, external, icon, path, title , subCategoryItems} = props;
  const [showSubCategory, setShowSubCategory] = useState(false);

  const handleItemClick = () => {
    setShowSubCategory(!showSubCategory);
  };
  const linkProps = path
    ? external
      ? {
        component: 'a',
        href: path,
        target: '_blank'
      }
      : {
        component: NextLink,
        href: path
      }
    : {};

  return (
    <li>
      <ButtonBase
        onClick={handleItemClick}
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          pl: '16px',
          pr: '16px',
          py: '6px',
          textAlign: 'left',
          width: '100%',
          ...(active && {
            backgroundColor: 'rgba(255, 255, 255, 0.04)'
          }),
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.04)'
          }
        }}
        {...linkProps}
      >
        {icon && (
          <Box
            component="span"
            sx={{
              alignItems: 'center',
              color: 'neutral.400',
              display: 'inline-flex',
              justifyContent: 'center',
              mr: 2,
              ...(active && {
                color: 'primary.main'
              })
            }}
          >
            {icon}
          </Box>
        )}
        <Box
          component="span"
          sx={{
            color: 'neutral.400',
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: '24px',
            whiteSpace: 'nowrap',
            ...(active && {
              color: 'common.white'
            }),
            ...(disabled && {
              color: 'neutral.500'
            })
          }}
        >
          {title}
        </Box>
      </ButtonBase>

      {
        
      }
      {showSubCategory && subCategoryItems && (
  <ul>
    {subCategoryItems.map((subItem) => (
      <li key={subItem.id}>
        <ButtonBase
          
          // Add onClick event handler if needed
          sx={{
            alignItems: 'center',
            borderRadius: 1,
            display: 'flex',
            justifyContent: 'flex-start',
            pl: '24px', // Increase left padding to indicate nesting
            pr: '16px',
            py: '4px', // Reduce vertical padding for a smaller size
            textAlign: 'left',
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.02)', // Lighter background color
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.04)' // Lighter hover background color
            }
          }}
          {...linkProps}
        >
          <Box
          component={NextLink}
          href={subItem.path}
          passHref
            sx={{
              // Update text styling for smaller size and lighter color
              color: 'neutral.300',
              fontSize: 12,
              fontWeight: 500,
              lineHeight: '16px',
              textDecoration: 'none',
            }}
          >
            {subItem.title}
          </Box>
        </ButtonBase>
      </li>
    ))}
  </ul>
)}

    </li>
  );
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired
};
