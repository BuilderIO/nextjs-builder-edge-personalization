import { builder } from '@builder.io/sdk'
import { getTargetingValues } from './url-utils'

export const getPersonalizedPage = async (
  path: string[],
  modelName: string,
  apiKey: string
) => {
  const targetingAttributes = getTargetingValues(path)
  builder.init(apiKey)
  return (
    (await builder
      .get(modelName, {
        userAttributes: targetingAttributes,
        cachebust: true,
      })
      .toPromise()) || null
  )
}
