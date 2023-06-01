const Client = require("../models/Client");

// Get all clients
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new client
exports.createClient = async (req, res) => {
  const client = new Client(req.body);

  try {
    const savedClient = await client.save();
    res.status(201).json(savedClient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a client by ID
exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a client
exports.updateClient = async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!updatedClient) {
      return res.status(404).send("Client not found");
    }

    res.send(updatedClient);
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete a client
exports.deleteClient = async (req, res) => {
  try {
    const deletedClient = await Client.findByIdAndDelete(req.params.id);
    if (!deletedClient) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json({ message: "Client deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search clients by name or phone number
exports.searchClients = async (req, res) => {
  const query = req.params.query;

  try {
    const clients = await Client.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { phoneNumber: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Add a custom column
exports.addCustomColumn = async (req, res) => {
  try {
    const columnName = req.body.columnName;
    const columnType = req.body.columnType;

    // Validate the columnName and columnType
    if (!columnName || !columnType) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    // Add the custom column to the clientSchema
    const customColumn = {};
    customColumn[columnName] = columnType;
    Client.schema.add(customColumn);

    // Save the updated Client schema
    await Client.init();

    res.status(200).json({ message: "Custom column added" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
