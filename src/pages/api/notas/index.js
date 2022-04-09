import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../lib/db";
export default async function handler(req, res) {
  const db = await connectToDatabase();
  const collection = db.collection("notas");
  const { _id, content } = req.body;
  switch (req.method) {
    case "GET":
      const notas = await collection
        .find({})
        .sort({ created_at: -1 })
        .toArray();

      res.json(notas);

      break;
    case "POST":
      if (!content) {
        res.json({ error: "Nota vacia" });
        break;
      }
      await collection.insertOne({
        content,
        created_at: new Date().toISOString(),
      });
      res.json({ msg: "nota creada" });
      break;
    case "DELETE":
      if (!_id) {
        res.json({ error: "no proveyo un id" });
        break;
      }
      const eliminada = await collection.deleteOne({ _id: ObjectId(_id) });
      res.json({ msg: "nota eliminada", eliminada });
      break;

    case "PUT":
      if (!content || !_id) {
        res.json({ error: "faltan datos" });
        break;
      }
      try {
        const actualizada = await collection.updateOne(
          { _id: ObjectId(_id) },
          { $set: { content } }
        );
        res.json(actualizada);
      } catch (error) {
        res.json({ error: error.toString() });
      }
      break;
    default:
      res.json({ error: "ruta no implementada" });
      break;
  }
}
