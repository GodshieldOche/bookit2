import { getSession } from 'next-auth/react'
import UpdateUser from '../../../components/admin/UpdateUser'
import Layout from '../../../components/layout/Layout'
import { getBookingDetails } from '../../../redux/features/bookingDetails'
import { wrapper } from '../../../redux/store'

const UpdateUserPage = () => {
    return (
        <Layout title='Update User'>
            <UpdateUser />
        </Layout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, params }) => {
    const session = await getSession({ req })
    const { id } = params
    if (!session || session.user.role !== 'admin') {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }
    const authCookie = req.headers.cookie
    await store.dispatch(getBookingDetails({ req, authCookie, id }))
})
export default UpdateUserPage
