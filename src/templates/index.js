// src/templates/index.js

// ==========================================
// 1. UI Components
// ==========================================
const HeroTemplate = require('./Hero');
const CarouselTemplate = require('./Carousel'); 
const AlertTemplate = require('./Alert');
const AvatarTemplate = require('./Avatar');
const BadgeTemplate = require('./Badge');
const ButtonTemplate = require('./Button');
const CardTemplate = require('./Card');
const DropdownTemplate = require('./Dropdown');
const ModalTemplate = require('./Modal');
const ToastTemplate = require('./Toast');
const SwitchTemplate = require('./Switch');
const BreadCrumbTemplate = require('./BreadCrumb');

// ==========================================
// 2. Layout Components
// ==========================================
const AsideTemplate = require('./Aside');
const FooterTemplate = require('./Footer');
const NavbarTemplate = require('./Navbar');

// ==========================================
// 3. Feedback Components
// ==========================================
const EmptyStateTemplate = require('./EmptyState');
const SkeletonTemplate = require('./Skeleton');
const SpinnerTemplate = require('./Spinner');

// ==========================================
// 4. Form Components
// ==========================================
const CheckboxTemplate = require('./Checkbox');
const ImageUploadTemplate = require('./ImageUpload');
const InputTemplate = require('./Input');
const SelectTemplate = require('./Select');
const TextareaTemplate = require('./Textarea');
const RadioButtonTemplate = require('./Radiobutton');
const SliderTemplate = require('./Slider');

// ==========================================
// 5. Data Components
// ==========================================
const PaginationTemplate = require('./Pagination');
const SearchTemplate = require('./Search');
const TableTemplate = require('./Table');
const ProgressBarTemplate = require('./ProgressBar');
const SEOTemplate = require('./SEO');
// ==========================================
// Mapping Router
// ==========================================
const specificTemplates = {
  // UI
  Hero: HeroTemplate,
  Carousel: CarouselTemplate,
  Alert: AlertTemplate,
  Avatar: AvatarTemplate,
  Badge: BadgeTemplate,
  Button: ButtonTemplate,
  Card: CardTemplate,
  Dropdown: DropdownTemplate,
  Modal: ModalTemplate,
  Toast: ToastTemplate,
  Switch: SwitchTemplate,
  BreadCrumb: BreadCrumbTemplate,

  // Layout
  Aside: AsideTemplate,
  Footer: FooterTemplate,
  Navbar: NavbarTemplate,

  // Feedback
  EmptyState: EmptyStateTemplate,
  Skeleton: SkeletonTemplate,
  Spinner: SpinnerTemplate,

  // Form
  Checkbox: CheckboxTemplate,
  ImageUpload: ImageUploadTemplate,
  Input: InputTemplate,
  Select: SelectTemplate,
  Textarea: TextareaTemplate,
  RadioButton: RadioButtonTemplate,
  Slider: SliderTemplate,

  // Data
  Pagination: PaginationTemplate,
  Search: SearchTemplate,
  Table: TableTemplate,
  ProgressBar: ProgressBarTemplate,
  SEO: SEOTemplate
};

// ==========================================
// Fallback Template (Default)
// ==========================================
function getDefaultTemplate(componentName) {
  return `import React from 'react';

/**
 * ${componentName} Component
 * Pure Tailwind CSS
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

// ==========================================
// Export Generator Function
// ==========================================
module.exports = {
  getTemplate: (componentName) => {
    // Jika ada template khusus, gunakan itu. Jika tidak, gunakan default.
    return specificTemplates[componentName] 
      ? specificTemplates[componentName](componentName) 
      : getDefaultTemplate(componentName);
  }
};