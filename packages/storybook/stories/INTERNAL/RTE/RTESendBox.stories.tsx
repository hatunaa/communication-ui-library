// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RTESendBox as RTESendBoxComponent } from '@internal/react-components';
import { Meta } from '@storybook/react/types-6-0';
import React from 'react';
import { COMPONENT_FOLDER_PREFIX } from '../../constants';

const RTESendBoxStory = (): JSX.Element => {
  return <RTESendBoxComponent />;
};

// This must be the only named export from this module, and must be named to match the storybook path suffix.
// This ensures that storybook hoists the story instead of creating a folder with a single entry.
export const RTESendBox = RTESendBoxStory.bind({});

export default {
  id: `${COMPONENT_FOLDER_PREFIX}-internal-rtesendbox`,
  title: `${COMPONENT_FOLDER_PREFIX}/Internal/RTESendBox`,
  component: RTESendBoxComponent,
  argTypes: {}
} as Meta;
