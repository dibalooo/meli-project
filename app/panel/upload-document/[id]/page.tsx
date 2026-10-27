import UploadDucument from "@/components/panel/uploadDucument";
type Props = {
params: Promise<{ id :string}>;
};

export default async function DetailsPage({ params }: Props) {
const {id} = await params

return <UploadDucument id={id}/> ;
} 