import React, { useEffect, useState, forwardRef } from 'react'
import { Card, Select, Stack } from '@sanity/ui'
// import { FormField } from '@sanity/base/components'
import PatchEvent, { set, unset } from '@sanity/form-builder/PatchEvent'
import { useId } from '@reach/auto-id'
// import { withDocument } from '@sanity/form-builder'
// import sanityClient from 'part:@sanity/base/client'

// const client = sanityClient.withConfig({ apiVersion: '2021-10-21' })

const GetQondorTravels = forwardRef((props, ref) => {
  const [travels, setTravels] = useState([])
  const [allTravelData, setAllTravelData] = useState([])

  const isDev = process.env.NODE_ENV === 'development'
  const inputId = useId()

  const {
    type, // Schema information
    value, // Current field value
    readOnly, // Boolean if field is not editable
    markers, // Markers including validation rules
    presence, // Presence information for collaborative avatars
    compareValue, // Value to check for "edited" functionality
    onFocus, // Method to handle focus state
    onBlur, // Method to handle blur state
    onChange, // Method to handle patch events
    document,
  } = props

  const handleChange = React.useCallback(
    (event) => {
      const inputValue = event.currentTarget.value
      onChange(PatchEvent.from(inputValue ? set(inputValue) : unset()))

      const travelData = allTravelData.find((t) => t.id == inputValue)
      if (travelData) {
        const { departureDate, returnDate, pax } = travelData
        const dateFrom = departureDate.split('T')[0]
        const dateTo = returnDate.split('T')[0]

        const objIndex = document.dates.findIndex((d) => d.qondorProjectId === value)

        client
          .patch(document._id)
          .set({
            dates: [
              ...document.dates.slice(0, objIndex),
              {
                ...document.dates[objIndex],
                dateFrom,
                dateTo,
                numberOfParticipants: pax,
              },
              ...document.dates.slice(objIndex + 1),
            ],
          })
          .commit()
      }
    },
    [onChange, allTravelData]
  )

  useEffect(() => {
    const fetchTravels = async () => {
      const projects = await fetch(
        isDev
          ? 'http://localhost:3000/api/qondor/all'
          : 'https://backpacker.no/api/qondor/all',
        { method: 'GET' }
      )
        .then((res) => res.json())
        .then((json) => {
          return {
            raw: json,
            travels: json.map((t) => {
              return {
                title: `[${t.projectNo}] - ${t.name}`,
                value: t.id,
              }
            }),
          }
        })

      setAllTravelData(projects.raw)
      setTravels(projects.travels)
    }

    fetchTravels()
  }, [])

  return (
    // <FormField
    //   description={type.description}
    //   title={type.title}
    //   __unstable_markers={markers}
    //   __unstable_presence={presence}
    //   compareValue={compareValue}
    //   inputId={inputId}>
    <Card padding={0}>
      <Stack>
        <Select
          fontSize={2}
          padding={[2, 2, 3]}
          space={[3, 3, 4]}
          value={value}
          readOnly={readOnly}
          onFocus={onFocus}
          onBlur={onBlur}
          ref={ref}
          onChange={handleChange}>
          <option value={''}>Choose a Qondor project...</option>
          {travels.map(({ title, value }) => (
            <option key={value} value={value}>
              {title}
            </option>
          ))}
        </Select>
      </Stack>
    </Card>
    // </FormField>
  )
})

export default GetQondorTravels
