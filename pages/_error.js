import Head from 'next/head'
import { Card } from 'react-bootstrap';

export default function NotFount() {
  return (
    <>
      <Head>
        <title> KoinosExplorer Error Page </title>
      </Head>

      <main className="container">
        <Card className="my-2">
          <Card.Body>
            <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
              Sorry!We encountered an unexpected error.
            </div>
          </Card.Body>
        </Card>
      </main>
    </>
  )
}
