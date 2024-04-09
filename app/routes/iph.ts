import { LoaderFunction} from '@remix-run/node'
import { requireUserId } from '~/server/auth/auth.server'

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request)
  return null
}