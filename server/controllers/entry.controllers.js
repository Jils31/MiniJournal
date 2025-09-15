import Entry from "../models/entry.model.js";

export async function postEntry(req, res) {
  try {
    const { date, content } = req.body;
    const userId = req.userId;

    if (!date || !content)
      return res.status(400).json({ message: "All fields are required" });

    const newEntry = await Entry.create({ userId, date, content });
    return res
      .status(201)
      .json({ message: "Entry posted successfully", newEntry });
  } catch (error) {
    console.error("Error in posting entry:", error);
    return res.status(500).json({ message: "Internal sever error" });
  }
}

export async function getEntry(req, res) {
  try {
    const userId = req.userId;
    const entries = await Entry.find({ userId }).sort({ date: -1 });
    return res
      .status(200)
      .json({ message: "Entries fetched successfully", entries });
  } catch (error) {
    console.error("Error in getting entry: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateEntry(req, res) {
  try {
    const { id } = req.params;
    const { date, content } = req.body;
    const userId = req.userId;

    if (!date || !content)
      return res.status(400).json({ message: "All fields are required" });
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      { date, content },
      { new: true }
    );
    if (!updatedEntry)
      return res.status(404).json({ message: "Entry not found" });
    return res
      .status(200)
      .json({ message: "Entry updated successfully", updatedEntry });
  } catch (error) {
    console.error("Error in updating entry:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteEntry(req,res){
    try{
        const {id} = req.params
        const userId = req.userId

        const deleteEntry = await Entry.findByIdAndDelete(id)
        if(!deleteEntry) return res.status(404).json({message:"Entry not found"})
        return res.status(200).json({message:"Entry deleted successfully"})
    }catch(error){
        console.error("Error in deleting entry:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
