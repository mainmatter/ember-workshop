import Component from "@glimmer/component";
import { action } from "@ember/object";

export default class MyChartComponent extends Component {
  @action
  initializeChart(element) {
    this.args.highcharts.chart(element, {
      series: [
        {
          name: "Some data",
          data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
        },
      ],
    });
  }
}
