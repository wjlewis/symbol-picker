import React from 'react';
import './index.css';

interface HeaderProps {
  content: string;
}

const Header = ({ content }: HeaderProps) => (
  <div className="header" dangerouslySetInnerHTML={{ __html: content }}></div>
);

export default Header;
