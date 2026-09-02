
import Header from "@/components/Header";
import Cards from "@/components/Cards";
import SalesDashboard from "@/components/Sales";
import Kitchen from "@/components/Kitchen";
import Performance from "@/components/Performance";
import RecentOrders from "@/components/RecentOrders";

export default function DashboardPage() {
  return <div>
    <Header />
    <Cards />
    <SalesDashboard />
    <Kitchen />
    <Performance />
    <RecentOrders />
  </div>;
}
