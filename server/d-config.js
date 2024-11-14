module.exports = {
  forbidden: [
    {
      name: "no-db-to-controller",
      from: { path: ".*db.*" },
      to: { path: ".*controller.*" },
      comment: "db layer should not import from controllers.",
    },
    {
      name: "no-controller-to-db",
      from: { path: ".*controller.*" },
      to: { path: ".*db.*" },
      comment:
        "Controllers should not import directly from db layer; use services instead.",
    },
    {
      name: "no-direct-imports-between-modules",
      comment: "These modules should not import from each other directly",
      severity: "error",
      from: {
        path: "^(chat-logs|products|admins|accounts|categories)",
      },
      to: {
        path: "^(chat-logs|products|admins|accounts|categories)",
      },
    },
  ],
  options: {
    doNotFollow: {
      path: "node_modules",
    },
    exclude: {
      path: "node_modules",
    },
  },
};
