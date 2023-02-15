import style from './style.module.scss'
import { FAQPageJsonLd } from 'next-seo'
import { useEffect, useState } from 'react'
import BlockContent from '../../components/helpers/blockContent'

function Faq(props) {
  const { _key, heading, questions = [] } = props
  const [faqs, setFaqs] = useState([])

  if (questions?.length <= 0 || !questions) return null

  useEffect(() => {
    setFaqs([])

    questions.map((question) => {
      setFaqs((prev) => [
        ...prev,
        {
          question: question.question,
          answer: question.answer,
          open: false,
          key: question._key,
        },
      ])
    })
  }, [])

  const toggleFAQ = (index) => {
    setFaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open
        } else {
          faq.open = false
        }

        return faq
      })
    )
  }

  return (
    <section id='faq' key={_key}>
      {heading && <h2 className='fancy_heading'>{heading}</h2>}

      <FAQPageJsonLd
        mainEntity={faqs.map((faq) => {
          return {
            questionName: faq.question,
            acceptedAnswerText: faq.answer,
          }
        })}
      />

      <div className={style.questions}>
        {faqs.map((faq, index) => {
          return (
            <div
              className={`${style.question} ${faq.open && style.current_question}`}
              key={faq.key}>
              <div className={style.question_title} onClick={() => toggleFAQ(index)}>
                <p>{faq.question}</p>
                <span>{faq.open ? '-' : '+'}</span>
              </div>
              <div className={style.answer}>
                {faq.answer && <BlockContent value={faq.answer} />}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Faq
