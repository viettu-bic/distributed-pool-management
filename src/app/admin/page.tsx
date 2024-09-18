import BicCard from "@/components/admin/BicCard";
import HandleCard from "@/components/admin/HandleCard";
import HandleControllerCard from "@/components/admin/HandleControllerCard";

function Admin() {

    return (
        <>
            <div className="grid grid-cols-2 gap-2">
            <BicCard/>
            <HandleCard />
            <HandleControllerCard/>
            </div>
        </>
    )
}

export default Admin
