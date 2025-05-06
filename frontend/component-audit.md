# UI Component Audit Against Storybook Design System

This document outlines the components that need to be updated to match the Storybook design system at https://syzygydocs.accesspeoplelearning.com.

## Atoms

### Button Component
**Current Issues:**
- Color variants don't match Storybook (primary, secondary, outline, link vs. contrast, filled)
- Missing radius, size, and compactVersion props
- Missing icon support for buttons with icons
- Styling doesn't match Storybook's visual appearance

**Required Changes:**
- Update variant options to match Storybook (contrast, filled)
- Add radius prop with options (sm, md, lg)
- Add compactVersion prop
- Implement proper icon support for buttons
- Update styling to match Storybook's visual appearance

### Card Component
**Current Issues:**
- Missing border and padding options
- Status styling doesn't match Storybook
- Missing hover and focus states
- Missing elevation/shadow options

**Required Changes:**
- Add border prop with options
- Add padding prop with size options
- Update status styling to match Storybook
- Implement proper hover and focus states
- Add elevation/shadow options

### LanguageToggle Component
**Current Issues:**
- Styling doesn't match Storybook design patterns
- Missing proper focus states for accessibility

**Required Changes:**
- Update styling to match Storybook design patterns
- Implement proper focus states for accessibility

### InstanceBadge Component
**Current Issues:**
- Styling doesn't match Storybook's Chip or Badge components
- Missing proper focus states

**Required Changes:**
- Update styling to match Storybook's Chip or Badge components
- Implement proper focus states

### InstanceSelector Component
**Current Issues:**
- Styling doesn't match Storybook's dropdown/select components
- Missing proper focus and hover states

**Required Changes:**
- Update styling to match Storybook's dropdown/select components
- Implement proper focus and hover states

## Layout Components

### Header Component
**Current Issues:**
- Styling doesn't match Storybook's header patterns
- Navigation links styling inconsistent with Storybook
- User dropdown menu styling doesn't match Storybook

**Required Changes:**
- Update overall styling to match Storybook's header patterns
- Update navigation links styling to be consistent with Storybook
- Update user dropdown menu styling to match Storybook

### Sidebar Component
**Current Issues:**
- Styling doesn't match Storybook's sidebar/navigation patterns
- Active/hover states inconsistent with Storybook
- Icon usage doesn't match Storybook patterns

**Required Changes:**
- Update overall styling to match Storybook's sidebar/navigation patterns
- Update active/hover states to be consistent with Storybook
- Update icon usage to match Storybook patterns

### Layout Component
**Current Issues:**
- Overall layout structure may not match Storybook's layout patterns
- Spacing and padding inconsistent with Storybook

**Required Changes:**
- Update overall layout structure to match Storybook's layout patterns
- Update spacing and padding to be consistent with Storybook

## Form Components

### Input Fields
**Current Issues:**
- Missing proper styling for form inputs
- Missing error states, focus states
- Missing label styling consistent with Storybook

**Required Changes:**
- Implement proper styling for form inputs
- Add error states, focus states
- Update label styling to be consistent with Storybook

### Form Layout
**Current Issues:**
- Form layout and spacing inconsistent with Storybook
- Missing proper grouping of form elements

**Required Changes:**
- Update form layout and spacing to be consistent with Storybook
- Implement proper grouping of form elements

## Dashboard Components

### Dashboard Cards
**Current Issues:**
- Card styling inconsistent with Storybook
- Content layout within cards doesn't match Storybook patterns

**Required Changes:**
- Update card styling to be consistent with Storybook
- Update content layout within cards to match Storybook patterns

### Priority Tasks
**Current Issues:**
- Styling inconsistent with Storybook
- Status indicators don't match Storybook patterns

**Required Changes:**
- Update styling to be consistent with Storybook
- Update status indicators to match Storybook patterns

## Document Components

### Document List
**Current Issues:**
- List styling inconsistent with Storybook
- Action buttons don't match Storybook button patterns

**Required Changes:**
- Update list styling to be consistent with Storybook
- Update action buttons to match Storybook button patterns

## Next Steps

1. Update Button component to match Storybook
2. Update Card component to match Storybook
3. Update Header and Sidebar components to match Storybook
4. Update form components to match Storybook
5. Update dashboard components to match Storybook
6. Update document components to match Storybook
7. Ensure consistent styling across all components
8. Verify WCAG 2.2 AA compliance is maintained
