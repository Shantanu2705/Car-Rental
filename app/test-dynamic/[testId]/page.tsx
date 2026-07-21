export default async function TestDynamicPage(props: {
  params: Promise<{ testId: string }>
}) {
  const params = await props.params;
  return <div>DYNAMIC ID: {params.testId}</div>
}
