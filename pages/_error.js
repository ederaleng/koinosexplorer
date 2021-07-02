import Head from 'next/head'

export default function NotFount() {
  return (
    <>
      <Head>
        <title> KoinosExplorer Error Page </title>
      </Head>
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        Sorry!We encountered an unexpected error.
      </div>
    </>
  )
}
