import { Component, Host, h, Prop, Watch } from '@stencil/core';
import { TrafficLightState } from './traffic-light-state';
import { TrafficLightColor } from './traffic-light-color';
import { TrafficLightMode } from './traffic-light-mode';

@Component({
  tag: 'traffic-light',
  styleUrl: 'traffic-light.css',
  shadow: true,
})
export class TrafficLight {
  @Prop({ reflect: true }) currentState: TrafficLightState = TrafficLightState.Off;
  @Prop({ reflect: true }) color: TrafficLightColor;
  @Prop({ reflect: true }) mode: TrafficLightMode;   // will default to TrafficLightMode.ThreeLights

  @Watch('currentState')
  validateCustomState(newValue: TrafficLightState) {
    if (!Object.values(TrafficLightState).includes(newValue)) {
      throw new Error('Invalid value for attribute current-state: ' + newValue);
    }
  }

  @Watch('color')
  validateColor(newValue: TrafficLightColor) {
    if (((newValue ?? null) !== null) && !Object.values(TrafficLightColor).includes(newValue)) {
      throw new Error('Invalid value for attribute color: ' + newValue);
    }
  }

  @Watch('mode')
  validateMode(newValue: TrafficLightMode) {
    if (((newValue ?? null) !== null) && !Object.values(TrafficLightMode).includes(newValue)) {
      throw new Error('Invalid value for attribute mode: ' + newValue);
    }
  }

  isOn(whichColor: TrafficLightColor) : boolean {
    return this.currentState === TrafficLightState.AllOn ||
      (this.currentState === TrafficLightState.On && this.color === whichColor && (whichColor ?? null) !== null);
  }

  getClassesForColor(whichColor: TrafficLightColor): string {
    return [
      "light",
      whichColor ? `${whichColor}-light` : "",
      this.isOn(whichColor) ? ` ${this.lightOnClassName}` : "",
    ].join(" ");
  }

  lightOnClassName: string = "on";

  render() {
    return (
      <Host>
        <div class="wrapper">
          {this.mode === TrafficLightMode.SingleLight
            ? <div class={this.getClassesForColor(this.color)}></div>
            : [
              <div class={this.getClassesForColor(TrafficLightColor.Red)}></div>,
              <div class={this.getClassesForColor(TrafficLightColor.Yellow)}></div>,
              <div class={this.getClassesForColor(TrafficLightColor.Green)}></div>
            ]}
        </div>
      </Host>
    );
  }
}
