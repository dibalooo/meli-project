import TransactionsDetails from "@/components/panel/transactionsDetails";
type Props = {
params: Promise<{ transactionId : string}>;
};

export default async function DetailsPage({ params }: Props) {
const {transactionId} = await params

return(
    <TransactionsDetails transactionId={transactionId}/>
)
 }