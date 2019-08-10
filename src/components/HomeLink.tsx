import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { THomeButtonAnchor, THomeButtonRouterLink } from '../types';

interface HomeLinkPropsBase {
  children: React.ReactElement | React.ReactElement[];
  key: string;
}

type HomeRouterLinkProps = HomeLinkPropsBase & THomeButtonRouterLink;
type HomeAnchorProps = HomeLinkPropsBase & THomeButtonAnchor;

const HomeLinkStyles = css`
  display: block;
  flex: 1 1 50%;
  padding: 4px;
  text-decoration: none;
  width: 100%;
`;

export const HomeRouterLink = styled((props: HomeRouterLinkProps) => {
  const { children, key, linkProps, ...rest } = props;
  return (
    <Link {...linkProps} key={key} {...rest}>
      {children}
    </Link>
  );
})`
  ${HomeLinkStyles}
`;

export const HomeAnchorLink = styled((props: HomeAnchorProps) => {
  const { children, key, href, target, ...rest } = props;
  return (
    <a key={key} href={href} target={target} {...rest}>
      {children}
    </a>
  );
})`
  ${HomeLinkStyles}
`;

export default HomeRouterLink;