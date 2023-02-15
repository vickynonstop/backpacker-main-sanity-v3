import { useEffect, useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import MailchimpSubscribe from 'react-mailchimp-subscribe'
import style from './style.module.scss'

function Newsletter(props) {
  const { _key, config, heading } = props
  const [feedback, setFeedback] = useState(null)

  if (!heading) return null

  const mailchimpUrl = config.api.mailchimpActionUrl

  const CustomForm = ({ status, onSubmit }) => {
    useEffect(() => {
      if (status === 'success') {
        setFeedback('Velkommen! Du er nå påmeldt våres nyhetsbrev ')
      } else if (status === 'error') {
        setFeedback('Hmmm... Her skjedde det noe galt. Prøv igjen senere.')
      }
    }, [status])

    const handleSubmit = (e) => {
      e.preventDefault()
      const email = e.target.elements.email.value
      onSubmit({ EMAIL: email })
    }

    return (
      <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
        <input type='mail' name='email' placeholder='Hva er e-postadressen din?' />
        <button type='submit'>
          <FiArrowRight />
        </button>
      </form>
    )
  }

  return (
    <section id='newsletter' key={_key} className={style.newsletter_container}>
      <div className={style.wrapper}>
        <div className={style.content}>
          {heading && <h2 className={style.heading}>{heading}</h2>}

          <MailchimpSubscribe
            url={mailchimpUrl}
            render={({ subscribe, status, message }) => (
              <CustomForm status={status} onSubmit={(formData) => subscribe(formData)} />
            )}
          />

          <p className={style.feedback}>{feedback}</p>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
