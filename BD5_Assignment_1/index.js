let express = require("express");
let { sequelize } = require("./lib");
let { customer } = require("./models/customer.model");
let { agent } = require("./models/agent.model");
let { ticket } = require("./models/ticket.modl");
let app = express();

app.use(express.json());

const tickets = [
  {
    title: "Login Issue",
    description: "Cannot login to account",
    status: "open",
    priority: 1,
    customerId: 1,
    agentId: 1,
  },
  {
    title: "Payment Failure",
    description: "Payment not processed",
    status: "closed",
    priority: 2,
    customerId: 2,
    agentId: 2,
  },
  {
    title: "Bug Report",
    description: "Found a bug in the system",
    status: "open",
    priority: 3,
    customerId: 1,
    agentId: 1,
  },
];

const customers = [
  { customerId: 1, name: "Alice", email: "alice@example.com" },
  { customerId: 2, name: "Bob", email: "bob@example.com" },
];

const agents = [
  { agentId: 1, name: "Charlie", email: "charlie@example.com" },
  { agentId: 2, name: "Dave", email: "dave@example.com" },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await customer.bulkCreate(customers);
    await agent.bulkCreate(agents);
    await ticket.bulkCreate(tickets);
    res.status(200).json({ message: "Databse seeding successful." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 1: Get All Tickets
async function getAllTickets() {
  let result = await ticket.findAll();
  return { tickets: result };
}
app.get("/tickets", async (req, res) => {
  try {
    let response = await getAllTickets();
    if (response.tickets.length === 0) {
      return res.status(404).json({ message: "No ticket found." });
    }
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Get Ticket by ID
async function getTicketById(id) {
  let result = await ticket.findOne({ where: { id: id } });
  return { ticket: result };
}
app.get("/tickets/details/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let response = await getTicketById(id);
    if (response.ticket.length === 0) {
      return res.status(404).json({ message: "No ticket found with id " + id });
    }
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Get Tickets by Status
async function getTicketByStatus(status) {
  let result = await ticket.findAll({ where: { status: status } });
  return { tickets: result };
}
app.get("/tickets/status/:status", async (req, res) => {
  try {
    let status = req.params.status;
    let response = await getTicketByStatus(status);
    if (response.tickets.length === 0) {
      return res
        .status(404)
        .json({ message: "No ticket found with status " + status });
    }
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Get Tickets Sorted by Priority
async function getTicketsSortedByPriority() {
  let result = await ticket.findAll({ order: [["priority", "ASC"]] });
  return { tickets: result };
}
app.get("/tickets/sort-by-priority", async (req, res) => {
  try {
    let response = await getTicketsSortedByPriority();
    if (response.tickets.length === 0) {
      return res.status(404).json({ message: "No tickets found." });
    }
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 5: Add a New Ticket
async function addNewTicket(newTicket) {
  let result = await ticket.create(newTicket);
  if (!result) return {};
  let tickets = await ticket.findAll();
  return { tickets };
}
app.post("/tickets/new", async (req, res) => {
  try {
    let newTicket = req.body;
    let response = await addNewTicket(newTicket);
    if (response.tickets.length === 0) {
      return res.status(404).json({ message: "No tickets found." });
    }
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 6: Update Ticket Details
async function updateTicketDetails(data) {
  let result = await ticket.findOne({ where: { id: data.id } });
  if (!result) {
    return { message: "No ticket found with this id." };
  }
  result.set(data.updateData);
  await result.save();
  let tickets = await ticket.findAll();
  return { tickets };
}
app.post("/tickets/update/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let updateData = req.body;
    let response = await updateTicketDetails({ id, updateData });
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 7: Delete a Ticket
async function deleteTicket(id) {
  let result = await ticket.destroy({ where: { id: id } });
  if (!result) return {};
  return { message: "Ticket with ID " + id + " deleted successfully." };
}
app.post("/tickets/delete", async (req, res) => {
  try {
    let id = parseInt(req.body.id);
    let response = await deleteTicket(id);
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 8: Get All Tickets for a Customer
async function getAllTicketsForCustomer(customerId) {
  let result = await ticket.findAll({ where: { customerId: customerId } });
  if (!result) return {};
  return { tickets: result };
}
app.get("/tickets/customer/:id", async (req, res) => {
  try {
    let customerId = parseInt(req.params.id);
    let response = await getAllTicketsForCustomer(customerId);
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 9: Get All Tickets Handled by an Agent
async function getAllTicketsForAgent(agentId) {
  let result = await ticket.findAll({ where: { agentId: agentId } });
  if (!result) return {};
  return { tickets: result };
}
app.get("/tickets/agent/:id", async (req, res) => {
  try {
    let agentId = parseInt(req.params.id);
    let response = await getAllTicketsForAgent(agentId);
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on 3000 PORT.");
});
