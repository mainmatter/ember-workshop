import Component from "@ember/component";

export default Component.extend({
  didRender() {
    this.highcharts.chart(this.element, {
      series: [
        {
          name: "Some data",
          data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
        },
      ],
    });
  },
});
