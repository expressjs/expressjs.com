/**
 * Select Primitive Types
 */

export interface SelectOption<T = string> {
  /** Value of the option */
  value: T;
  /** Display label */
  label: string;
  /** Whether the option is selected */
  selected?: boolean;
  /** Whether the option is disabled */
  disabled?: boolean;
  /** Optional data to pass to custom renderers */
  data?: Record<string, any>;
}

export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectVariant = 'default' | 'ghost' | 'minimal';

export interface SelectBaseProps<T = string> {
  /** Size variant */
  size?: SelectSize;
  /** Style variant */
  variant?: SelectVariant;
  /** Options for the select */
  options: SelectOption<T>[];
  /** Currently selected value */
  value?: T;
  /** Placeholder text when no value is selected */
  placeholder?: string;
  /** Full width select */
  fullWidth?: boolean;
  /** Aria label for the select button */
  ariaLabel?: string;
  /** ID for the select container */
  id?: string;
  /** Name attribute for form submission */
  name?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Callback when selection changes */
  onChange?: (value: T) => void;
}
