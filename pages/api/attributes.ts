import { getAttributes } from '@builder.io/personalization-utils/dist/get-attributes'
import { NextApiRequest, NextApiResponse } from 'next'

if (!process.env.BUILDER_PRIVATE_KEY) {
  throw new Error('No BUILDER_PRIVATE_KEY defined')
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const attributes = await getAttributes(process.env.BUILDER_PRIVATE_KEY!)
  res.send(attributes)
}
