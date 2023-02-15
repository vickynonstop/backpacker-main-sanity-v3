import { FiHelpCircle } from 'react-icons/fi'

export default {
  title: 'FAQ',
  name: 'faq',
  type: 'object',
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
    },
    {
      title: 'Questions',
      name: 'questions',
      type: 'array',
      of: [
        {
          title: 'Question',
          name: 'faqItem',
          type: 'object',
          fields: [
            {
              title: 'Question',
              name: 'question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              title: 'Answer',
              name: 'answer',
              type: 'texteditor',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              question: 'question',
            },
            prepare({ question }) {
              return {
                title: question,
                media: FiHelpCircle,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      questions: 'questions',
    },
    prepare({ questions }) {
      return {
        title: 'FAQ',
        subtitle: `${questions ? questions.length : 0} question`,
        media: FiHelpCircle,
      }
    },
  },
}
