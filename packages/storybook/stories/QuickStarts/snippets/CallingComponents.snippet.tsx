import {
  CameraButton,
  ControlBar,
  EndCallButton,
  GridLayout,
  MicrophoneButton,
  OptionsButton,
  ScreenShareButton,
  VideoTile
} from '@azure/communication-react';

import { IContextualMenuProps, mergeStyles, Stack, Text } from '@fluentui/react';
import React, { useState } from 'react';

export const CallingComponents = (): JSX.Element => {
  const exampleOptionsMenuProps: IContextualMenuProps = {
    items: [
      {
        key: '1',
        name: 'Choose Camera',
        iconProps: { iconName: 'LocationCircle' },
        onClick: () => alert('Choose Camera Menu Item Clicked!')
      }
    ]
  };
  const [videoButtonChecked, setVideoButtonChecked] = useState<boolean>(false);
  const [audioButtonChecked, setAudioButtonChecked] = useState<boolean>(false);
  const [screenshareButtonChecked, setScreenshareButtonChecked] = useState<boolean>(false);

  return (
    <Stack className={mergeStyles({ height: '100%' })}>
      {/* GridLayout Component relies on the parent's height and width, so it's required to set the height and width on its parent. */}
      <div style={{ height: '30rem', width: '30rem', border: '1px solid' }}>
        <GridLayout>
          <VideoTile isVideoReady={false} renderElement={null} displayName={'Michael'}>
            <Text>Michael</Text>
          </VideoTile>
        </GridLayout>
      </div>

      {/* Control Bar with default set up */}
      <ControlBar styles={{ root: { justifyContent: 'center' } }}>
        <CameraButton checked={videoButtonChecked} onClick={() => setVideoButtonChecked(!videoButtonChecked)} />
        <MicrophoneButton checked={audioButtonChecked} onClick={() => setAudioButtonChecked(!audioButtonChecked)} />
        <ScreenShareButton
          checked={screenshareButtonChecked}
          onClick={() => setScreenshareButtonChecked(!screenshareButtonChecked)}
        />
        <OptionsButton menuProps={exampleOptionsMenuProps} />
        <EndCallButton />
      </ControlBar>
    </Stack>
  );
};
