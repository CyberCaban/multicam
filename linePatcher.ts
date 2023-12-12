import { Svg, SVG } from "@svgdotjs/svg.js";

export class Line {
  draw;
  line;
  color: string;
  width: number;
  constructor(addToElement: string, color: string, width: number) {
    this.draw = SVG()
      .addTo(addToElement)
      .size(window.screen.availWidth, window.screen.availHeight);
    this.line;
    this.color = color;
    this.width = width;
  }

  drawLine(fromX, fromY, toX, toY) {
    this.line = this.draw.line(fromX, fromY, toX, toY);
    this.line.stroke({ color: this.color, width: this.width });
  }

  updateLine(fromX, fromY, toX, toY) {
    this.line.plot(fromX, fromY, toX, toY);
  }

  get getLine() {
    return this.line;
  }
}
