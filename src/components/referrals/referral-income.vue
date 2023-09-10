<script>
export default {
  setup() {
    return {
      referralIncome: [
        {
          id: 1,
          dealName: "Acme Inc Install",
          img: require("@/assets/images/users/avatar-1.jpg"),
          salesRep: "Donald Risher",
          amount: "96",
          closeDate: "31 Dec 2021",
        },
        {
          id: 2,
          dealName: "Save lots Stores",
          img: require("@/assets/images/users/avatar-2.jpg"),
          salesRep: "Jansh Brown",
          amount: "55.7",
          closeDate: "30 Dec 2021",
        },
        {
          id: 3,
          dealName: "William PVT",
          img: require("@/assets/images/users/avatar-7.jpg"),
          salesRep: "Ayaan Hudda",
          amount: "102",
          closeDate: "25 Nov 2021",
        },
        {
          id: 4,
          dealName: "Raitech Soft",
          img: require("@/assets/images/users/avatar-4.jpg"),
          salesRep: "Julia William",
          amount: "89.5",
          closeDate: "20 Sep 2021",
        },
        {
          id: 5,
          dealName: "Absternet LLC",
          img: require("@/assets/images/users/avatar-4.jpg"),
          salesRep: "Vitoria Rodrigues",
          amount: "89.5",
          closeDate: "20 Sep 2021",
        },
      ],
    };
  },
};
</script>

<template>
  <b-card no-body class="card-height-100">
    <b-card-header class="align-items-center d-flex">
      <b-card-title class="mb-0 flex-grow-1">Referral Income</b-card-title>
      <div class="flex-shrink-0">
        <select class="form-select form-select-sm" aria-label=".form-select-sm example">
          <option selected="">Today</option>
          <option value="1">Week</option>
          <option value="2">Month</option>
          <option value="3">Year</option>
        </select>
      </div>
    </b-card-header>

    <b-card-body>
      <div class="table-responsive">
        <table class="table table-bordered table-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th scope="col" style="width: 30%">Name</th>
              <th scope="col" style="width: 20%">Amount</th>
              <th scope="col" style="width: 20%">Date</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) of referralIncome" :key="index">
              <td>{{ item.dealName }}</td>
              <td>${{ item.amount }}</td>
              <td>{{ item.closeDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-card-body>
  </b-card>
</template>
