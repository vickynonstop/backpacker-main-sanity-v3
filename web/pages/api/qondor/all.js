import { sanityClient } from '../../../lib/sanity'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(401).json({ message: 'Must be a GET request' })
  }

  res.setHeader('Access-Control-Allow-Origin', '*')

  const apiKey = await sanityClient.fetch(`*[_id == "settingsApi"][0].qondorApiKey`)
  if (!apiKey) return res.json([])

  const getExtraInformation = async (projectId) => {
    const extraInformation = await new Promise((resolve, reject) => {
      fetch(
        `https://qondor.azure-api.net/Prod/ParticipantStatistics/v1/ParticipantStatistics/GetStatisticsForProject?projectId=${projectId}`,
        {
          method: 'GET',
          headers: { 'Ocp-Apim-Subscription-Key': apiKey },
        }
      )
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err))
    })

    return {
      participants: extraInformation.numberOfNamedAttendingParticipants ?? 0,
    }
  }

  try {
    await fetch('https://qondor.azure-api.net/Prod/Project/v1/Project/GetAll', {
      method: 'GET',
      headers: { 'Ocp-Apim-Subscription-Key': apiKey },
    })
      .then((res) => res.json())
      .then(async (projectData) => {
        const projects = await Promise.all(
          projectData.map(async (project) => {
            const participants = await getExtraInformation(project.id)

            return {
              ...project,
              ...participants,
            }
          })
        )
        res.json(projects)
      })
      .catch((err) => reject(err))
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}
