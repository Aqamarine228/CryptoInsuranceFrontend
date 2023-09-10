<script>
import getChartColorsArray from "@/common/getChartColorsArray";
export default {
  setup() {
    return {
      series: [{
        name: "Income",
        data: [20, 25, 30, 35, 40, 55, 70, 110, 150, 180, 210, 250],
      },
      ],
      chartOptions: {
        chart: {
          height: 290,
          type: "area",
          toolbar: "false",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          width: 2,
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return "$" + value + "k";
            },
          },
          tickAmount: 5,
          min: 0,
          max: 260,
        },
        colors: getChartColorsArray('["--vz-success", "--vz-danger"]'),
        fill: {
          opacity: 0.06,
          colors: ["#0AB39C", "#F06548"],
          type: "solid",
        },
      },
    };
  },
};
</script>

<template>
  <b-card no-body class="card-height-100">
    <b-card-header class="align-items-center d-flex">
      <b-card-title class="mb-0 flex-grow-1">Referral Income Overview</b-card-title>
      <div class="flex-shrink-0">
        <div class="dropdown card-header-dropdown">
          <b-link class="text-reset dropdown-btn" href="#" data-bs-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
            <span class="fw-semibold text-uppercase fs-12">Sort by: </span><span class="text-muted">Current Year<i
                class="mdi mdi-chevron-down ms-1"></i></span>
          </b-link>
          <div class="dropdown-menu dropdown-menu-end">
            <b-link class="dropdown-item" href="#">Today</b-link>
            <b-link class="dropdown-item" href="#">Last Week</b-link>
            <b-link class="dropdown-item" href="#">Last Month</b-link>
            <b-link class="dropdown-item" href="#">Current Year</b-link>
          </div>
        </div>
      </div>
    </b-card-header>
    <b-card-body class="px-0">
      <apexchart class="apex-charts" height="290" dir="ltr" :series="series" :options="chartOptions"></apexchart>
    </b-card-body>
  </b-card>
</template>