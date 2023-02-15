// sanity.config.js
import { defineConfig } from "sanity";
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision'
import schemas from './schemas/schema'
import deskStructure from './deskStructure'

export default defineConfig({
    title: "Backpacker Norge",
    projectId: "9an3r9gw",
    dataset: "production",
    plugins: [deskTool({
        structure: deskStructure
      }), visionTool()],
    schema: { 
        types: schemas 
    },
});