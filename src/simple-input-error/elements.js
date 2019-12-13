import {jsx, css} from "@emotion/core"
import styled from "@emotion/styled"

export const Container = styled.div`
  position: absolute;
  display: flex;
  ${props =>
    props.position == "left" ||
    props.position == "leftTop" && css`
      top: 0;
      right: 100%;
      flex-direction: row-reverse;
    `}
  ${props =>
    props.position == "leftCenter" && css`
      top: 50%;
      right: 100%;
      flex-direction: row-reverse;
      transform: translate(0, -50%);
    `}
  ${props =>
    props.position == "leftBottom" && css`
      top: 100%;
      right: 100%;
      flex-direction: row-reverse;
    `}
  ${props =>
    props.position == "right" ||
    props.position == "rightTop" && css`
      top: 0;
      left: 100%;
    `}
  ${props =>
    props.position == "rightCenter" && css`
      top: 50%;
      left: 100%;
      flex-direction: row-reverse;
      transform: translate(0, -50%);
    `}
  ${props =>
    props.position == "rightBottom" && css`
      top: 100%;
      left: 100%;
      flex-direction: row-reverse;
    `}
  ${props =>
    props.position == "top" ||
    props.position == "topLeft" && css`
      left: 0;
      top: -100%;
      flex-direction: column-reverse;
    `}
  ${props =>
    props.position == "topCenter" && css`
      flex-direction: column-reverse;
      top: -100%;
      left: 50%;
      transform: translate(-50%, 0);
    `}
  ${props =>
    props.position == "topRight" && css`
      flex-direction: column-reverse;
      left: 100%;
      top: -100%;
    `}
  ${props =>
    props.position == "bottom" ||
    props.position == "bottomLeft" && css`
      flex-direction: column;
      bottom: -100%;
      left: 0;
    `}
  ${props =>
    props.position == "bottomCenter" && css`
      flex-direction: column;
      bottom: -100%;
      left: 50%;
      transform: translate(-50%, 0);
    `}
  ${props =>
    props.position == "bottomRight" && css`
      flex-direction: column;
      bottom: -100%;
      left: 100%;
    `}
  ${props =>
    props.position == "insideCenter" && css`
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    `}
  ${props =>
    props.position == "inside" ||
    props.position == "insideTopLeft" && css`
      height: auto;
      left: 0;
      top: 0;
    `}
  ${props =>
    props.position == "insideTopCenter" && css`
      height: auto;
      top: 0;
      left: 50%;
      transform: translate(-50%, 0);
    `}
  ${props =>
    props.position == "insideTopRight" && css`
      height: auto;
      top: 0;
      right: 0;
    `}
  ${props =>
    props.position == "insideBottomLeft" && css`
      height: auto;
      bottom: 0;
      left: 0;
    `}
  ${props =>
    props.position == "insideBottomCenter" && css`
      height: auto;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 0);
    `}
  ${props =>
    props.position == "insideBottomRight" && css`
      height: auto;
      bottom: 0;
      right: 0;
    `}
  ${props =>
    props.position == "insideCenterLeft" && css`
      height:auto;
      top: 50%;
      transform: translate(0, -50%);
      left: 0;
    `}
  ${props =>
    props.position == "insideCenterRight" && css`
      height:auto;
      top: 50%;
      transform: translate(0, -50%);
      right: 0;
    `}
`

export const CaretContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Caret = styled.div`
  width: 0;
  height: 0;
  ${props =>
    props.position == "left" ||
    props.position == "leftCenter" ||
    props.position == "leftTop" ||
    props.position == "leftBottom" && css`
      border-top: 0.5em solid transparent;
      border-bottom: 0.5em solid transparent;
      border-left: 0.5em solid green;
      margin-left: -0.1em;
    `}
  ${props =>
    props.position == "right" ||
    props.position == "rightCenter" ||
    props.position == "rightTop" ||
    props.position == "rightBottom" && css`
      border-top: 0.5em solid transparent;
      border-bottom: 0.5em solid transparent;
      border-right: 0.5em solid green;
      margin-right: -0.1em;
    `}
  ${props =>
    props.position == "top" ||
    props.position == "topLeft" ||
    props.position == "topRight" ||
    props.position == "topCenter" && css`
      border-left: 0.5em solid transparent;
      border-right: 0.5em solid transparent;
      border-bottom: 0.5em solid transparent;
    `}
  ${props =>
    props.position == "bottom" ||
    props.position == "bottomLeft" ||
    props.position == "bottomRight" ||
    props.position == "bottomCenter" && css`
      border-left: 0.5em solid transparent;
      border-right: 0.5em solid transparent;
      border-top: 0.5em solid transparent;
    `}
`

export const MessageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Message = styled.div`
  white-space: nowrap;
`
