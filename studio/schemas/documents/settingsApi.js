export default {
  name: 'settingsApi',
  type: 'document',
  title: 'Settings - API',
  __experimental_actions: [/* 'create', 'delete', */ 'update', 'publish'],
  fields: [
    {
      title: 'Google Tag Manager ID',
      name: 'googleTagmanagerId',
      type: 'string',
    },
    {
      title: 'Mailchimp Action URL',
      name: 'mailchimpActionUrl',
      type: 'string',
    },
    {
      title: 'Instagram client token',
      name: 'instagramClientToken',
      type: 'string',
    },
    {
      title: 'Qondor API key',
      name: 'qondorApiKey',
      type: 'string',
    },
    {
      title: 'Facebook Page ID',
      name: 'facebookPageId',
      type: 'string',
    },
  ],
}
