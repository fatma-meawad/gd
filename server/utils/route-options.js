var options = {
  explorer: true,
  swaggerOptions: {
    urls: [
      {
        url: "/api/s4/docs.yaml",
        name: "Accounts",
      },
      {
        url: "/api/s1/docs.yaml",
        name: "Admins",
      },
      {
        url: "/api/s3/docs.yaml",
        name: "Chat-logs",
      },
      {
        url: "/api/s2/docs.yaml",
        name: "Categories",
      },
      {
        url: "/api/s5/docs.yaml",
        name: "Products",
      },
    ],
  },
};

var homepage =
  "<h1 style='text-align: center'>Galleria Admin Dashboard API</h1>";
var hintpage =
  "<h1 style='text-align: center'>Are you looking for /api/docs? </h1>";

module.exports = { options, homepage, hintpage };
