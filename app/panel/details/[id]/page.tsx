import Details from "@/components/panel/details";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DetailsPage({ params }: Props) {
  const { id } = await params;

  return <Details id={id}  /> ;
}