import nc from 'next-connect'
import dbConnect from '../../../../config/dbConnect'
import onError from '../../../../middleware/errors'
import { isAuthenticatedUser, authorizeRoles } from '../../../../middleware/auth'
import { allAdminBookings } from '../../../../controllers/bookingControllers'

const handler = nc({ onError });

dbConnect();

handler
    .use(isAuthenticatedUser, authorizeRoles('admin'))
    .get(allAdminBookings)

export default handler;