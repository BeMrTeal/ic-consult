import { FormsModule } from '@angular/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { IcCheckboxComponent } from './ic-checkbox.component';

type StoryType = IcCheckboxComponent & { label?: string };

export default {
  title: 'Checkbox',
  component: IcCheckboxComponent,
  decorators: [
    moduleMetadata({
      imports: [FormsModule],
    }),
  ],
  render: (args) => {
    const { label, ...props } = args;
    return {
      props,
      template: `
        <ic-checkbox [checked]="checked">
          ${label}
        </ic-checkbox>
      `
    };
  },
  argTypes: {
    checked: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
  },
  args: {
    checked: false,
  },
} as Meta<StoryType>;
export const Checked: StoryObj<StoryType> = {
  args: {
    checked: true,
  },
};
export const Unchecked: StoryObj<StoryType> = {
  args: {
    checked: false,
  },
};
export const WithLabel: StoryObj<StoryType> = {
  args: {
    label: 'I have a label.',
  },
};
