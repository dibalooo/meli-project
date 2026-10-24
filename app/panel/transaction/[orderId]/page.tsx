import Transaction from "@/components/panel/transaction";

type Props = {
params: Promise<{ orderId :string}>;
};

export default async function DetailsPage({ params }: Props) {
const {orderId} = await params

return <Transaction id={orderId} orderId = {orderId}/> ;
}