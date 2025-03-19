import { NextApiRequest, NextApiResponse } from "next";
import { Action, store, history, prisma } from "@/lib/store";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { actions } = req.body;

  if (!Array.isArray(actions)) {
    return res.status(400).json({ error: "Actions must be an array" });
  }

  try {
    // Take a snapshot after each commit
    // If any action fails validation, they all fail
    if (actions.length) {
      let chunk: Action[] = [];
      chunk.push({ action: "start" });
      actions.forEach((action) => processAction(action, chunk));
      chunk.push({ action: "commit" });

      // store history in database
      try {
        const rows = await Promise.all(
          chunk.map((action, index) => {
            const now = new Date();
            const created = new Date(now.getTime() + index * 1000);
            return prisma.action.create({
              data: { ...action, created },
              select: { id: true, action: true, key: true, value: true },
            });
          })
        );
        rows.forEach((row) => history.push({
            id: row.id,
            action: row.action, 
            key: row.key, 
            value: row.value 
        }));
      } catch (error) {
        // in case db error occurs
        console.error(error);
        chunk.forEach((action) => history.push(action));
      }

      console.log(history);
    }
    return res.json({ success: true, store, history });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}

function processAction(action: any, chunk: Action[]) {
  const { key, value } = action;
  switch (action.action) {
    case "set":
      if (!key || !value) throw new Error("Set action missing key and value");
      chunk.push({ action: "set", key, value });
      store[key] = value;
      break;
    case "delete":
      if (!key) throw new Error("Delete action missing key");
      chunk.push({ action: "delete", key, value: store[key] });
      delete store[key];
      break;
    default:
      throw new Error(`Unknown action: ${action.action}`);
  }
}
