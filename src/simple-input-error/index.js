import React from "react"
import PropTypes from "prop-types"

import {
  Container,
  MessageContainer,
  Message,
  CaretContainer,
  Caret
} from "./elements"

const defaultContainerStyle = {
  zIndex: 10
}
const defaultCaretStyle = {}
const defaultMessageStyle = {
  backgroundColor: "#FF0000",
  color: "#FFFFFF",
  padding: "0.333em",
  borderRadius: "0.333em"
}

SimpleInputError.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  caretStyle: PropTypes.object,
  messageStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  onClick: PropTypes.func,
}

SimpleInputError.defaultProps = {
  containerStyle: {},
  messageStyle: {},
  caretStyle: {},
  onClick: () => {}
}

const getInitialCaretStyle = (backgroundColor, position) => {
  const initialCaretStyle = defaultCaretStyle

  switch (position) {
    case "left":
    case "leftCenter":
    case "leftBottom":
    case "leftTop": {
      initialCaretStyle.borderRightColor = backgroundColor
      break
    }
    case "right":
    case "rightCenter":
    case "rightBottom":
    case "rightTop": {
      initialCaretStyle.borderLeftColor = backgroundColor
      break
    }
    case "top":
    case "topCenter":
    case "topLeft":
    case "topRight": {
      initialCaretStyle.borderTopColor = backgroundColor
      break
    }
    case "bottom":
    case "bottomCenter":
    case "bottomLeft":
    case "bottomRight": {
      initialCaretStyle.borderBottomColor = backgroundColor
      break
    }
  }

  return initialCaretStyle
}

export function SimpleInputError({
  isVisible,
  position,
  onClick,
  message,
  messageStyle,
  containerStyle,
  caretStyle,
}) {
  const { backgroundColor } = messageStyle
  const initialCaretStyle = getInitialCaretStyle(
    backgroundColor,
    position,
  )

  return isVisible ? (
    <Container
      className={"SimpleInputError"}
      position={position}
      onClick={onClick}
      css={{
        ...defaultContainerStyle,
        ...containerStyle,
      }}>
      <CaretContainer>
        <Caret
          className={"SimpleInputError-Caret"}
          position={position}
          css={{
            ...initialCaretStyle,
            ...caretStyle,
          }}
        />
      </CaretContainer>
      <MessageContainer>
        <Message
          className={"SimpleInputError-Message"}
          css={{
            ...defaultMessageStyle,
            ...messageStyle,
          }}>
          {message}
        </Message>
      </MessageContainer>
    </Container>
  ) : null
}

