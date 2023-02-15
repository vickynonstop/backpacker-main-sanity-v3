import { sanityClient } from '../../../lib/sanity'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(401).json({ message: 'Must be a GET request' })
  }

  res.setHeader('Access-Control-Allow-Origin', '*')

  const apiKey = await sanityClient.fetch(`*[_id == "settingsApi"][0].qondorApiKey`)
  const { id } = req.query

  if (!apiKey || !id) return res.status(401).json({ message: 'Missing parameters' })

  try {
    await fetch(
      `https://qondor.azure-api.net/Prod/ParticipantStatistics/v1/ParticipantStatistics/GetStatisticsForProject?projectId=${id}`,
      {
        method: 'GET',
        headers: { 'Ocp-Apim-Subscription-Key': apiKey },
      }
    )
      .then((res) => res.json())
      .then(async (data) =>
        res.json({
          participants: data.numberOfNamedAttendingParticipants ?? 0,
        })
      )
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}
