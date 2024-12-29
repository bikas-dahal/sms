import { auth } from "@/auth"

const DashboardPage = async () => {

    const session = await auth();

  return (
    <div>DashboardPage
        <br />
        {JSON.stringify(session)}
    </div>
  )
}

export default DashboardPage