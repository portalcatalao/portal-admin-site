import { fetchData } from "@/helpers/fetch";
import { Form } from "./_components/form";

export default async function Page() {
    const {results} = await fetchData('fipe/references', 0);
    const {results: brands} = await fetchData(`fipe/brands?type=1&reference=${results[0].id}`, 0);

    return (
        <div className="">
            <Form references={results} brands={brands}/>
        </div>
    )
}