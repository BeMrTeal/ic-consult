import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditableModule } from '@ngneat/edit-in-place';
import { randBoolean, randProduct, randText } from '@ngneat/falso';
import {
  Meta,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';
import { ToDoComponent } from './to-do.component';

const randTodo = () => {
  const { id, title, description } = randProduct();
  return {
    id,
    title,
    description,
    completed: randBoolean(),
  };
};

export default {
  title: 'ToDoComponent',
  component: ToDoComponent,
  decorators: [
    moduleMetadata({
      imports: [FontAwesomeModule, EditableModule, CommonModule],
    }),
    componentWrapperDecorator(
      (s) => `<div style="width: 500px; height: 280px; position: relative; padding: 2rem">${s}</div>`
    ),
  ],
  argTypes: {
    triggerDelete: {
      action: 'delete',
    },
    triggerEdit: {
      action: 'edit',
    },
    triggerToggleComplete: {
      action: 'toggleComplete',
    },
    triggerCreate: {
      action: 'create',
    },
  },
} as Meta<ToDoComponent>;

export const WithContent = {
  render: (args: ToDoComponent) => ({
    props: args,
  }),
  args: {
    todo: randTodo(),
  },
};

export const NoInput = {
  render: (args: ToDoComponent) => ({
    props: args,
  }),
  args: {
    todo: undefined,
  },
};

export const LongDescription = {
  render: (args: ToDoComponent) => ({
    props: args,
  }),
  args: {
    todo: {
      ...randTodo(),
      description: randText({ charCount: 350 }),
    },
  },
};

export const LongTitle = {
  render: (args: ToDoComponent) => ({
    props: args,
  }),
  args: {
    todo: {
      ...randTodo(),
      title: randText({ charCount: 100 }),
    },
  },
};
