// sanity.config.js
import { defineConfig } from "sanity";
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision'
import deskStructure from './deskStructure'
import schemas from './schemas/schema';
import { Logo } from './plugins/my-studio-logo/Logo'

export default defineConfig({
    title: "Backpacker Norge",
    projectId: "9an3r9gw",
    dataset: "production",
    plugins: [deskTool({
        structure: deskStructure
    }), visionTool()],
    schema: {
        types: schemas,
    },
    tools: (prev, context) => {
        const isAdmin = context.currentUser.roles
            .find(({ name }) => name === 'administrator')
        if (isAdmin) {
            return prev
        }
        return prev.filter((tool) => tool.name !== 'vision')
    },
    studio: {
        components: {
            logo: Logo
        }
    },
    document: {
        newDocumentOptions: (prev, { creationContext }) => {
            if (creationContext.type === 'global') {
                return prev.filter((templateItem) => templateItem.templateId != 'settings')
            }
            return prev
        },
        actions: (prev, { schemaType }) => {
            if (schemaType === 'settings') {
                return prev.filter(({ action }) => !['unpublish', 'delete', 'duplicate'].includes(action))
            }
            return prev
        },
    },
});