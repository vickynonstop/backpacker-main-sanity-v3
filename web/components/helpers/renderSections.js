import { upperFirst } from 'lodash'
import { Fragment } from 'react'
import * as SectionComponents from '../../sections'

function resolveSections(section) {
  const Section = SectionComponents[upperFirst(section._type)]
  if (Section) return Section
  return null
}

function Render({ sections, config }) {
  if (!sections) return null

  return (
    <Fragment>
      {sections.map((section, index) => {
        const SectionComponent = resolveSections(section)

        if (!SectionComponent) {
          return <div key={index}>Missing section {section._type}</div>
        }

        return <SectionComponent {...section} config={config} key={section._key} />
      })}
    </Fragment>
  )
}

export default Render
