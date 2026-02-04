/**
 * Select Primitive Types
 */

export interface SelectOption {
  /** Value of the option */
  value: string;
  /** Display label */
  label: string;
  /** Whether the option is selected */
  selected?: boolean;
  /** Whether the option is disabled */
  disabled?: boolean;
}

export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectVariant = 'default' | 'ghost' | 'minimal';

export interface SelectBaseProps {
  /** Size variant */
  size?: SelectSize;
  /** Style variant */
  variant?: SelectVariant;
  /** Options for the select */
  options?: SelectOption[];
  /** Currently selected value */
  value?: string;
  /** Placeholder text when no value is selected */
  placeholder?: string;
  /** Full width select */
  fullWidth?: boolean;
}
