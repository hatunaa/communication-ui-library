// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React, { useCallback, useMemo, useState } from 'react';
import { RTEInputBoxComponent } from './RTEInputBoxComponent';
import { Icon, Stack, useTheme } from '@fluentui/react';
import { useLocale } from '../../localization';
import { SendBoxStrings } from '../SendBox';
import { borderAndBoxShadowStyle, sendButtonStyle, sendIconStyle } from '../styles/SendBox.styles';
import { InputBoxButton } from '../InputBoxButton';
import { RTESendBoxErrors, RTESendBoxErrorsProps } from './RTESendBoxErrors';
/* @conditional-compile-remove(file-sharing) */
import { ActiveFileUpload } from '../FileUploadCards';

/**
 * Props for {@link RTESendBox}.
 *
 * @beta
 */
export interface RTESendBoxProps {
  /**
   * Optional boolean to disable text box
   * @defaultValue false
   */
  disabled?: boolean;
  /**
   * Optional strings to override in component
   */
  strings?: Partial<SendBoxStrings>;
  /**
   * Optional text for system message below text box
   */
  systemMessage?: string;
  /* @conditional-compile-remove(file-sharing) */
  /**
   * Optional callback to render uploaded files in the SendBox. The sendBox will expand
   * vertically to accommodate the uploaded files. File uploads will
   * be rendered below the text area in sendBox.
   * @beta
   */
  onRenderFileUploads?: () => JSX.Element;
  /* @conditional-compile-remove(file-sharing) */
  /**
   * Optional array of active file uploads where each object has attributes
   * of a file upload like name, progress, errorMessage etc.
   * @beta
   */
  activeFileUploads?: ActiveFileUpload[];
  /* @conditional-compile-remove(file-sharing) */
  /**
   * Optional callback to remove the file upload before sending by clicking on
   * cancel icon.
   * @beta
   */
  onCancelFileUpload?: (fileId: string) => void;
}

/**
 * A component to render SendBox with Rich Text Editor support.
 *
 * @beta
 */
export const RTESendBox = (props: RTESendBoxProps): JSX.Element => {
  const { disabled, systemMessage } = props;

  const theme = useTheme();
  const localeStrings = useLocale().strings.sendBox;
  const strings = { ...localeStrings, ...props.strings };

  const [contentValue] = useState('');
  const [contentValueOverflow] = useState(false);

  const contentTooLongMessage = contentValueOverflow ? strings.textTooLong : undefined;
  const errorMessage = systemMessage ?? contentTooLongMessage;

  const sendMessageOnClick = (): void => {
    if (disabled || contentValueOverflow) {
      return;
    }
  };

  const onRenderSendIcon = useCallback(
    (isHover: boolean) => (
      <Icon
        iconName={isHover && contentValue ? 'SendBoxSendHovered' : 'SendBoxSend'}
        className={sendIconStyle({
          theme,
          hasText: !!contentValue,
          /* @conditional-compile-remove(file-sharing) */ hasFile: false,
          hasErrorMessage: !!errorMessage
        })}
      />
    ),
    [contentValue, errorMessage, theme]
  );

  const sendBoxErrorsProps = useMemo<RTESendBoxErrorsProps>(() => {
    return {
      fileUploadsPendingError: undefined,
      fileUploadError: undefined,
      systemError: systemMessage ? { message: systemMessage, timestamp: Date.now() } : undefined,
      messageTooLongError: contentValueOverflow ? { message: strings.textTooLong, timestamp: Date.now() } : undefined
    };
  }, [contentValueOverflow, strings.textTooLong, systemMessage]);

  return (
    <Stack
      className={borderAndBoxShadowStyle({
        theme: theme,
        hasErrorMessage: !!errorMessage,
        disabled: !!disabled
      })}
    >
      <RTESendBoxErrors {...sendBoxErrorsProps} />
      <RTEInputBoxComponent placeholderText={strings.placeholderText} content={contentValue} />
      <InputBoxButton
        onRenderIcon={onRenderSendIcon}
        onClick={(e) => {
          sendMessageOnClick();
          e.stopPropagation(); // Prevents the click from bubbling up and triggering a focus event on the chat.
        }}
        className={sendButtonStyle}
        ariaLabel={localeStrings.sendButtonAriaLabel}
        tooltipContent={localeStrings.sendButtonAriaLabel}
      />
      {/* File Upload */}
    </Stack>
  );
};
