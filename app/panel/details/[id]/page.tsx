import Details from "@/components/panel/details";
type props = {
    params: Promise<{ id: string }>
};

export default async function DatailsPage({ params }: props) {
    const { id } = await params;
    return <Details id={id} />


}