// src/templates/index.js

const ButtonTemplate = require('./Button');
const AlertTemplate = require('./Alert');
const AvatarTemplate = require('./Avatar');
const BadgeTemplate = require('./Badge');
const CardTemplate = require('./Card');
const DropdownTemplate = require('./Dropdown');
const ModalTemplate = require('./Modal');
const ToastTemplate = require('./Toast');

// Layout Templates
const NavbarTemplate = require('./Navbar');
const FooterTemplate = require('./Footer');
const AsideTemplate = require('./Aside');

const specificTemplates = {
  Button: ButtonTemplate,
  Alert: AlertTemplate,
  Avatar: AvatarTemplate,
  Badge: BadgeTemplate,
  Card: CardTemplate,
  Dropdown: DropdownTemplate,
  Modal: ModalTemplate,
  Toast: ToastTemplate,
  Navbar: NavbarTemplate,
  Footer: FooterTemplate,
  Aside: AsideTemplate,
};

// Fallback template...
function getDefaultTemplate(componentName) {
  return `import React from 'react';

/**
 * ${componentName} Component
 * TODO: Implementasi component ini
 */
const ${componentName} = ({ children, ...props }) => {
  return (
    <div className="${componentName.toLowerCase()}-wrapper" {...props}>
      {children}
    </div>
  );
};

export default ${componentName};
`;
}

module.exports = {
  getTemplate: (componentName) => {
    return specificTemplates[componentName] 
      ? specificTemplates[componentName](componentName) 
      : getDefaultTemplate(componentName);
  }
};