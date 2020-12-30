import React, { FunctionComponent } from "react";
import { Popover, Whisper, Button } from "rsuite";

interface PopoverProps {
  content: string;
    title: string;
}

const Speaker: FunctionComponent<PopoverProps> = ({
  content,
  title,
  ...props
}) => {
  console.log(content);
  return (
    <Popover {...props}>
      <p>{content}</p>
    </Popover>
  );
};

export const CustomPopover: FunctionComponent<PopoverProps> = ({
  content,
  title,
}) => (
  <Whisper
    trigger="hover"
    placement="auto"
    speaker={<Speaker title={title} content={content} />}
  >
    <button>
      <i className="fas fa-question-circle"></i>
    </button>
  </Whisper>
);
