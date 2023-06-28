export enum Position {
  TopCenter = "topCenter",
  TopRight = "topRight",
  TopLeft = "topLeft",
  BottomLeft = "bottomLeft",
  BottomCenter = "bottomCenter",
  BottomRight = "bottomRight",
  LeftCenter = "leftCenter",
  LeftTop = "leftTop",
  LeftBottom = "leftBottom",
  RightCenter = "rightCenter",
  RightTop = "rightTop",
  RightBottom = "rightBottom",
}

export interface OffsetPosition {
  [position: string]: {
    topOffset: number
    leftOffset: number
  }
}
