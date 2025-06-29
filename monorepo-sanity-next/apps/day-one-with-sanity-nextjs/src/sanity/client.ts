import { createClient } from "next-sanity";

const projectId = process.env.SANITY_PROJECT_ID;

export const client = createClient({
  projectId: projectId,
  dataset: "production",
  apiVersion: "2024-11-01",
  useCdn: false,
});