import { useRouter } from "next/router"

import Taskcomponent from "../components/Task"

export default function NewPage() {
  const router = useRouter()
  return <>
    <button className='btn btn-outline-secondary' onClick={() => router.push('/')}>Home</button>
    <section className='home'>
      <Taskcomponent />
    </section>
  </>
}