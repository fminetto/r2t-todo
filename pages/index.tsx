import { GetServerSidePropsContext } from 'next'

export default function Home() {
  return (
    <>

    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {

    }
  }
}